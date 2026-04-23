<?php

namespace Tests\Feature\Catalog;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProductManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_users_can_view_products_index(): void
    {
        $user = User::factory()->create();
        Product::factory()->count(2)->create();

        $this->actingAs($user)
            ->get(route('products.index'))
            ->assertOk()
            ->assertSee('Products\\/Index');
    }

    public function test_admin_can_create_a_product(): void
    {
        Storage::fake('public');

        $admin = User::factory()->admin()->create();
        $category = Category::factory()->create();

        $response = $this
            ->actingAs($admin)
            ->post(route('products.store'), [
                'category_id' => $category->id,
                'name' => 'Combo especial',
                'description' => 'Incluye papas y bebida',
                'price' => '29.90',
                'image' => UploadedFile::fake()->image('combo.png'),
            ]);

        $response->assertRedirect(route('products.index'));

        $this->assertDatabaseHas('products', [
            'name' => 'Combo especial',
            'category_id' => $category->id,
        ]);

        Storage::disk('public')->assertExists(Product::first()->image_path);
    }
}
