<?php

namespace Tests\Feature\Catalog;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CatalogVisualPageTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        file_put_contents(public_path('hot'), 'http://localhost:5173');
    }

    protected function tearDown(): void
    {
        @unlink(public_path('hot'));

        parent::tearDown();
    }

    public function test_authenticated_users_can_view_visual_catalog_page(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('catalog.visual'))
            ->assertOk()
            ->assertSee('Catalog\\/Visual');
    }

    public function test_visual_catalog_filters_products_by_selected_category_and_hides_inactive_items(): void
    {
        $user = User::factory()->create();
        $selectedCategory = Category::factory()->create([
            'name' => 'Hamburguesas',
            'is_active' => true,
        ]);
        $otherCategory = Category::factory()->create([
            'name' => 'Bebidas',
            'is_active' => true,
        ]);

        Product::factory()->create([
            'category_id' => $selectedCategory->id,
            'name' => 'Doble queso',
            'is_active' => true,
        ]);

        Product::factory()->create([
            'category_id' => $selectedCategory->id,
            'name' => 'Producto oculto',
            'is_active' => false,
        ]);

        Product::factory()->create([
            'category_id' => $otherCategory->id,
            'name' => 'Gaseosa fria',
            'is_active' => true,
        ]);

        $response = $this->actingAs($user)
            ->get(route('catalog.visual', [
                'category_id' => $selectedCategory->id,
            ]));

        $response
            ->assertOk()
            ->assertSee('Doble queso')
            ->assertDontSee('Producto oculto')
            ->assertDontSee('Gaseosa fria');
    }
}
