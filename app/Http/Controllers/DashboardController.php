<?php

namespace App\Http\Controllers;

use App\Models\Overtime;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        return Inertia::render('dashboard', [
            'role' => $user->role->value,
            'stats' => [
                'pending' => Overtime::where('status', 'pending')->count(),
                'approved' => Overtime::where('status', 'approved')->count(),
                'my_overtime' => Overtime::where('staff_id', $user->id)->count(),
                'my_approved_overtime' => Overtime::where('staff_id', $user->id)
                    ->where('status', 'approved')
                    ->count(),
            ]
        ]);
    }
}
