<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Product;
use App\Models\User;

class ProductPolicy
{
    public function viewAny(User $user): bool
    {
        return in_array($user->role, [UserRole::ADMIN, UserRole::OPERADOR], true);
    }

    public function view(User $user, Product $product): bool
    {
        return $this->viewAny($user);
    }

    public function create(User $user): bool
    {
        return $user->role === UserRole::ADMIN;
    }

    public function update(User $user, Product $product): bool
    {
        return $user->role === UserRole::ADMIN;
    }

    public function delete(User $user, Product $product): bool
    {
        return $user->role === UserRole::ADMIN;
    }
}
