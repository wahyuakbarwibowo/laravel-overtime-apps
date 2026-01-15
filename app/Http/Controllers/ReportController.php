<?php

namespace App\Http\Controllers;

use App\Models\Overtime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $query = Overtime::query()
            ->join('users', 'users.id', '=', 'overtimes.staff_id')
            ->select(
                'users.id',
                'users.name',
                DB::raw('SUM(TIMESTAMPDIFF(HOUR, jam_mulai, jam_selesai)) as total_jam')
            )
            ->groupBy('users.id', 'users.name');

        if ($request->filled('from')) {
            $query->whereDate('tanggal', '>=', $request->from);
        }

        if ($request->filled('to')) {
            $query->whereDate('tanggal', '<=', $request->to);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $query->where('users.name', 'like', '%' . $request->search . '%');
        }

        return Inertia::render('report/overtime', [
            'filters' => $request->only('from','to','status','search'),
            'reports' => $query->get(),
        ]);
    }
}
