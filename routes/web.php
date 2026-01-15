<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OvertimeController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

Route::middleware('auth')->group(function () {

    Route::middleware('role:leader')->group(function () {
        Route::get('/overtime/create', [OvertimeController::class, 'create'])->name('overtime.create');
        Route::post('/overtime', [OvertimeController::class, 'store']);
        Route::get('/overtime/leader', [OvertimeController::class, 'leaderList']);
    });

    Route::middleware('role:manager')->group(function () {
        Route::get('/overtime', [OvertimeController::class, 'index'])->name('overtime.index');
        Route::post('/overtime/{id}/approve', [OvertimeController::class, 'approve']);
        Route::post('/overtime/{id}/reject', [OvertimeController::class, 'reject']);
    });

    Route::middleware('role:staf')->group(function () {
        Route::get('/overtime/staff', [OvertimeController::class, 'staffList'])
            ->name('overtime.staffList');
    });

    Route::middleware('role:admin,manager')->group(function () {
        Route::get('/report/overtime', [ReportController::class, 'overtimeReport'])
            ->name('report.overtimeReport');
    });
});

require __DIR__ . '/settings.php';
