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
            'alasan' => ['required']
        ]);

        Overtime::create([
            ...$validated,
            'leader_id' => auth()->id(),
        ]);

        return redirect()->route('overtime.create')->with('success', 'Pengajuan lembur berhasil');
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

    public function approve(int $id)
    {
        Overtime::findOrFail($id)->update(['status' => 'approved']);
        return redirect()->route('overtime.index')->with('success', 'Approved');
    }

    public function reject(int $id)
    {
        Overtime::findOrFail($id)->update(['status' => 'rejected']);
        return redirect()->route('overtime.index')->with('success', 'Rejected');
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
        return Inertia::render('Overtime/Leader', [
            'overtimes' => Overtime::with('staff')
                ->where('leader_id', auth()->id())
                ->latest()
                ->get(),
        ]);
    }
}
