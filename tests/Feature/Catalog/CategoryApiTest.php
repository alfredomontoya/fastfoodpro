<?php

namespace Tests\Feature\Catalog;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CategoryApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_a_category_via_api(): void
    {
        $admin = User::factory()->admin()->create();

        Sanctum::actingAs($admin);

        $response = $this->postJson('/api/categories', [
            'name' => 'Hamburguesas',
            'description' => 'Linea principal del menu',
            'is_active' => true,
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('message', 'Categoria creada correctamente.')
            ->assertJsonPath('data.name', 'Hamburguesas')
            ->assertJsonPath('data.description', 'Linea principal del menu')
            ->assertJsonPath('data.is_active', true);

        $this->assertDatabaseHas('categories', [
            'name' => 'Hamburguesas',
            'is_active' => true,
        ]);
    }

    public function test_operator_cannot_create_a_category_via_api(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $this->postJson('/api/categories', [
            'name' => 'Bebidas',
        ])->assertForbidden();
    }
}
