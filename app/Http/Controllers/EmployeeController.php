<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeStoreRequest;
use App\Http\Requests\EmployeeUpdateRequest;
use App\Models\Employee;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
   * Display the resource.
   */
  public function index()
  {
      $employees = Employee::orderBy('first_name', 'ASC')
          ->orderBy('last_name', 'ASC')->get();

      return Inertia::render('employees/employees', [
          'employees' => $employees,
      ]);
  }

    /**
     * Store the newly created resource in storage.
     */
    public function store(EmployeeStoreRequest $request): RedirectResponse
    {
        Employee::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'gender' => $request->gender,
            'address' => $request->address,
        ]);

        return to_route('employees');
    }

    /**
     * Show the form for editing the resource.
     */
    public function edit(string $id)
    {
        $employee = Employee::findOrFail($id)->first();
        return Inertia::render('employees/employeeForm', [
            'employee' => $employee
        ]);
    }

    /**
     * Update the resource in storage.
     */
    public function update(string $id, EmployeeUpdateRequest $request): RedirectResponse
    {
        $employee = Employee::findOrFail($id)->first();
        $employee->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            // 'email' => $request->email,
            'phone' => $request->phone,
            'gender' => $request->gender,
            'address' => $request->address
        ]);

        return to_route('employees');
    }

    /**
     * Remove the resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $employee = Employee::findOrFail($id);
        $employee->delete();

        return to_route('employees');
    }
}
