<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Repositories\UserRepository;

class UserPasswordService
{
    public function __construct(
        private readonly UserRepository $userRepository,
    ) {
    }

    public function update(User $user, string $password, bool $clearForcePasswordChange = false): User
    {
        return $this->userRepository->update($user, [
            'password' => $password,
            'force_password_change' => $clearForcePasswordChange ? false : $user->force_password_change,
        ]);
    }
}
