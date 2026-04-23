<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->resetApplicationTables();
        $this->seedAdminUser();
        $this->seedHamburgerCatalog();
    }

    protected function resetApplicationTables(): void
    {
        $tables = [
            'sessions',
            'jobs',
            'cache',
            'password_reset_tokens',
            'products',
            'categories',
            'users',
        ];

        DB::statement($this->disableForeignKeyChecksStatement());

        foreach ($tables as $table) {
            DB::table($table)->truncate();
        }

        DB::statement($this->enableForeignKeyChecksStatement());
    }

    protected function seedAdminUser(): void
    {
        User::query()->create([
            'name' => 'Administrador FASTFOOD',
            'email' => 'admin@fastfood.test',
            'password' => 'Admin12345*',
            'role' => UserRole::ADMIN,
            'force_password_change' => false,
            'email_verified_at' => now(),
        ]);
    }

    protected function seedHamburgerCatalog(): void
    {
        $category = Category::query()->create([
            'name' => 'Hamburguesas',
        ]);

        Product::query()->create([
            'category_id' => $category->id,
            'name' => 'Hamburguesa Clasica',
            'description' => 'Pan brioche, carne a la plancha, queso cheddar, tomate y lechuga fresca.',
            'price' => 18.50,
        ]);

        Product::query()->create([
            'category_id' => $category->id,
            'name' => 'Hamburguesa Doble Bacon',
            'description' => 'Doble carne, bacon crocante, cheddar fundido, cebolla caramelizada y salsa especial.',
            'price' => 27.90,
        ]);
    }

    protected function disableForeignKeyChecksStatement(): string
    {
        return match (DB::getDriverName()) {
            'mysql' => 'SET FOREIGN_KEY_CHECKS=0;',
            'pgsql' => 'SET CONSTRAINTS ALL DEFERRED;',
            'sqlite' => 'PRAGMA foreign_keys = OFF;',
            default => 'PRAGMA foreign_keys = OFF;',
        };
    }

    protected function enableForeignKeyChecksStatement(): string
    {
        return match (DB::getDriverName()) {
            'mysql' => 'SET FOREIGN_KEY_CHECKS=1;',
            'pgsql' => 'SET CONSTRAINTS ALL IMMEDIATE;',
            'sqlite' => 'PRAGMA foreign_keys = ON;',
            default => 'PRAGMA foreign_keys = ON;',
        };
    }
}
