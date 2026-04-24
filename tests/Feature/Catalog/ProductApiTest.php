<?php

namespace Tests\Feature\Catalog;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ProductApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_a_product_via_api(): void
    {
        $admin = User::factory()->admin()->create();
        $category = Category::factory()->create();

        Sanctum::actingAs($admin);

        $response = $this->postJson('/api/products', [
            'category_id' => $category->id,
            'name' => 'Combo especial',
            'description' => 'Incluye papas y bebida',
            'price' => '29.90',
            'stock' => 15,
            'is_active' => true,
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('message', 'Producto creado correctamente.')
            ->assertJsonPath('data.name', 'Combo especial')
            ->assertJsonPath('data.stock', 15)
            ->assertJsonPath('data.category.id', $category->id);

        $this->assertDatabaseHas('products', [
            'name' => 'Combo especial',
            'category_id' => $category->id,
            'stock' => 15,
        ]);
    }

    public function test_product_creation_fails_when_category_is_inactive(): void
    {
        $admin = User::factory()->admin()->create();
        $inactiveCategory = Category::factory()->create([
            'is_active' => false,
        ]);

        Sanctum::actingAs($admin);

        $response = $this->postJson('/api/products', [
            'category_id' => $inactiveCategory->id,
            'name' => 'Combo bloqueado',
            'price' => '19.90',
            'stock' => 4,
        ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors('category_id');

        $this->assertDatabaseMissing('products', [
            'name' => 'Combo bloqueado',
        ]);
    }
}
