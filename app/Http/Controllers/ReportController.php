<?php

namespace App\Http\Controllers;

use App\Models\Division;
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
            ->leftJoin('divisions', 'divisions.id', '=', 'users.division_id')
            ->select(
                'users.id as user_id',
                'users.name',
                'divisions.name as division',
                DB::raw('SUM(TIMESTAMPDIFF(HOUR, overtimes.jam_mulai, overtimes.jam_selesai)) as total_jam')
            )
            ->groupBy('users.id', 'users.name', 'divisions.name');

        if ($request->filled('from')) {
            $query->whereDate('overtimes.tanggal', '>=', $request->from);
        }

        if ($request->filled('to')) {
            $query->whereDate('overtimes.tanggal', '<=', $request->to);
        }

        if ($request->filled('status')) {
            $query->where('overtimes.status', $request->status);
        }

        if ($request->filled('search')) {
            $query->where('users.name', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('division_id')) {
            $query->where('users.division_id', $request->division_id);
        }

        if (auth()->user()->role === 'manager') {
            $query->where('users.division_id', auth()->user()->division_id);
        }

        return Inertia::render('report/overtime', [
            'filters' => $request->only('from', 'to', 'status', 'search', 'division_id'),
            'reports' => $query->get(),
            'divisions' => Division::get(),
        ]);
    }
}
