<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeaveTypeStoreRequest;
use App\Models\LeaveType;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaveTypeController extends Controller
{

    /**
     * Display the resource.
     */
    public function index()
    {
        $leaveTypes = LeaveType::all();

        return Inertia::render('leave-types/leaveTypes', [
            'leaveTypes' => $leaveTypes,
        ]);
    }

    /**
     * Show the form for creating the resource.
     */
    public function create()
    {
        return Inertia::render('leave-types/leaveTypeForm');
    }

    /**
     * Store the newly created resource in storage.
     */
    public function store(LeaveTypeStoreRequest $request): RedirectResponse
    {
        LeaveType::create([
            'name' => $request->name,
            'max_days_per_year' => $request->max_days_per_year,
            'carry_forward' => $request->carry_forward
        ]);
        return to_route('leave-types');
    }

    /**
     * Show the form for editing the resource.
     */
    public function edit(string $id)
    {
        $leaveType = LeaveType::findOrFail($id)->first();
        return Inertia::render('leave-types/leaveTypeForm', [
            'leaveTypes' => $leaveType
        ]);
    }

    /**
     * Update the resource in storage.
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $leaveType = LeaveType::findOrFail($id);
        $leaveType->delete();

        return to_route('leave-types');
    }
}
