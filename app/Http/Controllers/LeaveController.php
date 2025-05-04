<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeaveStoreRequest;
use App\Models\Employee;
use App\Models\Leave;
use App\Models\LeaveType;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaveController extends Controller
{
    /**
     * Display the resource.
     */
    public function index()
    {
        $leaves = Leave::with('employee')->with('leaveType')->get();

        return Inertia::render('leaves/leaves', [
            'leaves' => $leaves,
        ]);
    }

    /**
     * Show the form for creating the resource.
     */
    public function create()
    {
        $employees = Employee::orderBy('first_name', 'ASC')->orderBy('last_name', 'ASC')->get();
        $leaveTypes = LeaveType::all();
        return Inertia::render('leaves/leaveForm', [
            'employees' => $employees,
            'leaveTypes' => $leaveTypes
        ]);
    }

    /**
     * Store the newly created resource in storage.
     */
    public function store(LeaveStoreRequest $request): RedirectResponse
    {

    $start = Carbon::parse($request->start_date);
    $end = Carbon::parse($request->end_date);

    $daysRequested = $start->diffInDaysFiltered(function ($date) {
        return !$date->isWeekend();
    }, $end) + 1;

    $overlapMonth = Leave::where('employee_id', $request->employee_id)
    ->where(function ($query) use ($start, $end) {
        $query->whereBetween('start_date', [$start->copy()->startOfMonth(), $end->copy()->endOfMonth()])
              ->orWhereBetween('end_date', [$start->copy()->startOfMonth(), $end->copy()->endOfMonth()]);
    })
    ->exists();

    if ($overlapMonth) {
        return back()->withErrors(['start_date' => 'This employee has already applied for leave in this month.']);
    }

    $leavesThisYear = Leave::where('employee_id', $request->employee_id)
        ->whereYear('start_date', $start->year)
        ->get();

    $totalLeaveDays = 0;
    foreach ($leavesThisYear as $leave) {
        $period = CarbonPeriod::create($leave->start_date, $leave->end_date);
        foreach ($period as $date) {
            if (!$date->isWeekend()) {
                $totalLeaveDays++;
            }
        }
    }

    if (($totalLeaveDays + $daysRequested) > 12) {
        return back()->withErrors(['start_date' => 'This employee total leave days in this year exceeds the 12-day limit.']);
    }

        Leave::create([
            'employee_id' => $request->employee_id,
            'leave_type_id' => $request->leave_type_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'reason' => $request->reason,
        ]);

        return to_route('leaves');
    }

    /**
     * Display the resource.
     */
    public function show()
    {
        //
    }

    /**
     * Show the form for editing the resource.
     */
    public function edit(string $id)
    {
        $leave = Leave::findOrFail($id);
        $employees = Employee::orderBy('first_name', 'ASC')->orderBy('last_name', 'ASC')->get();
        $leaveTypes = LeaveType::all();
        return Inertia::render('leaves/leaveForm', [
            'leave' => $leave,
            'employees' => $employees,
            'leaveTypes' => $leaveTypes
        ]);
    }

    /**
     * Update the resource in storage.
     */
    public function update(string $id, LeaveStoreRequest $request): RedirectResponse
    {
        $leave = Leave::findOrFail($id)->first();
        $leave->update([
            'employee_id' => $request->employee_id,
            'leave_type_id' => $request->leave_type_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'reason' => $request->reason,
        ]);

        return to_route('leaves');
    }

    /**
     * Remove the resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $leave = Leave::findOrFail($id);
        $leave->delete();

        return to_route('leaves');
    }
}
