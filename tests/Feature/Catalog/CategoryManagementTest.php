<?php

namespace Tests\Feature\Catalog;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class CategoryManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_root_redirects_guests_to_login(): void
    {
        $this->get('/')
            ->assertRedirect(route('login'));
    }

    public function test_admin_can_create_a_category(): void
    {
        Storage::fake('public');

        $admin = User::factory()->admin()->create();

        $response = $this
            ->actingAs($admin)
            ->post(route('categories.store'), [
                'name' => 'Hamburguesas',
                'image' => UploadedFile::fake()->image('hamburguesas.png'),
            ]);

        $response->assertRedirect(route('categories.index'));
        $this->assertDatabaseHas('categories', [
            'name' => 'Hamburguesas',
        ]);
        Storage::disk('public')->assertExists(Category::first()->image_path);
    }

    public function test_operator_cannot_create_a_category(): void
    {
        $operator = User::factory()->create();

        $this->actingAs($operator)
            ->post(route('categories.store'), [
                'name' => 'Bebidas',
            ])
            ->assertForbidden();
    }
}
