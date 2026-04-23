<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UpdatePasswordRequest;
use App\Services\Auth\UserPasswordService;
use Illuminate\Http\RedirectResponse;

class PasswordController extends Controller
{
    public function __construct(
        private readonly UserPasswordService $userPasswordService,
    ) {
    }

    public function update(UpdatePasswordRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $this->userPasswordService->update($request->user(), $validated['password'], true);

        return back();
    }
}
