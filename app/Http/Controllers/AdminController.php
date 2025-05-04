<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminStoreRequest;
use App\Http\Requests\AdminUpdateRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminController extends Controller
{
      /**
     * Display the resource.
     */
    public function index()
    {
        $users = User::orderBy('first_name', 'ASC')
            ->orderBy('last_name', 'ASC')->get();

        return Inertia::render('admins/admins', [
            'users' => $users,
        ]);
    }

    /**
     * Store the newly created resource in storage.
     */
    public function store(AdminStoreRequest $request): RedirectResponse
    {
        User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'birthdate' => $request->birthdate,
            'gender' => $request->gender,
            'password' => Hash::make($request->password),
        ]);

        return to_route('admins');
    }

    /**
     * Show the form for editing the resource.
     */
    public function edit(string $id)
    {
        $user = User::findOrFail($id)->first();
        return Inertia::render('admins/adminForm', [
            'user' => $user
        ]);
    }

    /**
     * Update the resource in storage.
     */
    public function update(string $id, AdminUpdateRequest $request): RedirectResponse
    {
        $user = User::findOrFail($id)->first();
        $user->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            // 'email' => $request->email,
            'birthdate' => $request->birthdate,
            'gender' => $request->gender,
        ]);

        return to_route('admins');
    }

    /**
     * Remove the resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $user = User::findOrFail($id);
        $user->delete();

        return to_route('admins');
    }
}
