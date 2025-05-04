<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\LeaveTypeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admins
    Route::get('admins', [AdminController::class, 'index'])->name('admins');
    Route::get('admins/create', function () {
        return Inertia::render('admins/adminForm');
    })->name('admins.create');
    Route::post('admins/store', [AdminController::class, 'store'])->name('admins.store');
    Route::get('admins/{id}/edit', [AdminController::class, 'edit'])->name('admins.edit');
    Route::put('admins/{id}', [AdminController::class, 'update'])->name('admins.update');
    Route::delete('admins/{id}', [AdminController::class, 'destroy'])->name('admins.destroy');

    // Employees
    Route::get('employees', [EmployeeController::class, 'index'])->name('employees');
    Route::get('employees/create', function () {
        return Inertia::render('employees/employeeForm');
    })->name('employees.create');
    Route::post('employees/store', [EmployeeController::class, 'store'])->name('employees.store');
    Route::get('employees/{id}/edit', [EmployeeController::class, 'edit'])->name('employees.edit');
    Route::put('employees/{id}', [EmployeeController::class, 'update'])->name('employees.update');
    Route::delete('employees/{id}', [EmployeeController::class, 'destroy'])->name('employees.destroy');

    // Leaves
    Route::get('leaves', [LeaveController::class, 'index'])->name('leaves');
    Route::get('leaves/create',  [LeaveController::class, 'create'])->name('leaves.create');
    Route::post('leaves/store', [LeaveController::class, 'store'])->name('leaves.store');
    Route::get('leaves/{id}/edit', [LeaveController::class, 'edit'])->name('leaves.edit');
    Route::put('leaves/{id}', [LeaveController::class, 'update'])->name('leaves.update');
    Route::delete('leaves/{id}', [LeaveController::class, 'destroy'])->name('leaves.destroy');

    // Leave Types
    Route::get('leave-types', [LeaveTypeController::class, 'index'])->name('leave-types');
    Route::get('leave-types/create',  [LeaveTypeController::class, 'create'])->name('leave-types.create');
    Route::post('leave-types/store', [LeaveTypeController::class, 'store'])->name('leave-types.store');
    Route::get('leave-types/{id}/edit', [LeaveTypeController::class, 'edit'])->name('leave-types.edit');
    Route::put('leave-types/{id}', [LeaveTypeController::class, 'update'])->name('leave-types.update');
    Route::delete('leave-types/{id}', [LeaveTypeController::class, 'destroy'])->name('leave-types.destroy');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
