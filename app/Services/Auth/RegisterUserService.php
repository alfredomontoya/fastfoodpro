<?php

namespace App\Services\Auth;

use App\Enums\UserRole;
use App\Models\User;
use App\Repositories\UserRepository;

class RegisterUserService
{
    public function __construct(
        private readonly UserRepository $userRepository,
    ) {
    }

    /**
     * @param array{name: string, email: string, password: string} $data
     */
    public function handle(array $data): User
    {
        return $this->userRepository->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'role' => UserRole::OPERADOR,
            'force_password_change' => false,
        ]);
    }
}
