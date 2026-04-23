<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForcePasswordChangeRequest;
use App\Services\Auth\UserPasswordService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ForcePasswordChangeController extends Controller
{
    public function __construct(
        private readonly UserPasswordService $userPasswordService,
    ) {
    }

    public function edit(): Response|RedirectResponse
    {
        if (! request()->user()?->force_password_change) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('Auth/ForcePasswordChange');
    }

    public function update(ForcePasswordChangeRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $this->userPasswordService->update(
            $request->user(),
            $validated['password'],
            true,
        );

        return redirect()
            ->route('dashboard')
            ->with('status', 'Tu contraseña fue actualizada correctamente.');
    }
}
