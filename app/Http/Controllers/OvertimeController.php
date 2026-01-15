<?php

namespace App\Http\Controllers;

use App\Models\Overtime;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OvertimeController extends Controller
{
    // LEADER
    public function store(Request $request)
    {
        $validated = $request->validate([
            'staff_id' => ['required', 'exists:users,id'],
            'tanggal' => ['required', 'date'],
            'jam_mulai' => ['required'],
            'jam_selesai' => ['required', 'after:jam_mulai'],
            'alasan' => ['required'],
            'attachment' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('attachment')) {
            $validated['attachment_path'] = $request
                ->file('attachment')
                ->store('overtime-attachments', 'public');
        }

        Overtime::create([
            ...$validated,
            'status' => 'pending',
            'leader_id' => auth()->id(),
        ]);

        return redirect()->route('overtime.leader')->with('success', 'Pengajuan lembur berhasil');
    }

    public function create()
    {
        return Inertia::render('overtime/create', [
            'staffs' => User::where('role', 'staf')->get(['id', 'name'])
        ]);
    }

    // MANAGER
    public function index()
    {
        return Inertia::render('overtime/index', [
            'overtimes' => Overtime::with('staff', 'leader')->latest()->get()
        ]);
    }

    public function approve(Overtime $overtime)
    {
        $overtime->update(['status' => 'approved']);
        return back();
    }

    public function reject(Overtime $overtime)
    {
        $overtime->update(['status' => 'rejected']);
        return back();
    }

    // STAFF
    public function staffList()
    {
        return Inertia::render('overtime/staff', [
            'overtimes' => Overtime::where('staff_id', auth()->id())->get()
        ]);
    }

    // LEADER
    public function leaderList()
    {
        return Inertia::render('overtime/leader', [
            'overtimes' => Overtime::with('staff')
                ->where('leader_id', auth()->id())
                ->latest()
                ->get(),
        ]);
    }

    public function approvalList()
    {
        return Inertia::render('overtime/approval', [
            'overtimes' => Overtime::with(['staff', 'leader'])
                ->latest()
                ->get(),
        ]);
    }
}
