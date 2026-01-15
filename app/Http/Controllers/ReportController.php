<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function overtimeReport(Request $request)
    {
        $request->validate([
            'start' => 'required|date',
            'end' => 'required|date',
        ]);

        return DB::table('overtimes')
            ->join('users','users.id','=','overtimes.staff_id')
            ->select(
                'users.name',
                DB::raw('SUM(TIMESTAMPDIFF(HOUR, jam_mulai, jam_selesai)) as total_jam')
            )
            ->whereBetween('tanggal', [$request->start,$request->end])
            ->where('status','approved')
            ->groupBy('users.id','users.name')
            ->get();
    }
}
