<?php

namespace App\Http\Controllers;

use App\Models\Overtime;
use Illuminate\Http\Request;

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

        return response()->json(['message' => 'Pengajuan lembur berhasil']);
    }

    // MANAGER
    public function index()
    {
        return Overtime::with(['staff', 'leader'])->latest()->get();
    }

    public function approve(int $id)
    {
        Overtime::findOrFail($id)->update(['status' => 'approved']);
        return response()->json(['message' => 'Approved']);
    }

    public function reject(int $id)
    {
        Overtime::findOrFail($id)->update(['status' => 'rejected']);
        return response()->json(['message' => 'Rejected']);
    }

    // STAFF
    public function staffList()
    {
        return Overtime::where('staff_id', auth()->id())->get();
    }

    // LEADER
    public function leaderList()
    {
        return Overtime::where('leader_id', auth()->id())->get();
    }
}
