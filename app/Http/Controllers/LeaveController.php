<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeaveStoreRequest;
use App\Models\Employee;
use App\Models\Leave;
use App\Models\LeaveType;
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
        $leaves = Leave::select('leaves.*')
            ->leftJoin('employees', 'employees.id', '=', 'leaves.employee_id')
            ->orderBy('leaves.start_date', 'DESC')
            ->orderBy('employees.first_name', 'ASC')
            ->orderBy('employees.last_name', 'ASC')->get();

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
    public function edit()
    {
        //
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
    public function destroy(): never
    {
        abort(404);
    }
}
