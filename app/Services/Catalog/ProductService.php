<?php

namespace App\Services\Catalog;

use App\Models\Product;
use App\Repositories\CategoryRepository;
use App\Repositories\ProductRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class ProductService
{
    public function __construct(
        private readonly ProductRepository $productRepository,
        private readonly CategoryRepository $categoryRepository,
    ) {
    }

    /**
     * @param array{search?: string|null, category_id?: int|null} $filters
     */
    public function getPaginated(array $filters = [], int $perPage = 12): LengthAwarePaginator
    {
        return $this->productRepository->getAll($filters, $perPage);
    }

    public function findOrFail(int $id): Product
    {
        return Product::query()
            ->with('category:id,name')
            ->findOrFail($id);
    }

    /**
     * @return Collection<int, Product>
     */
    public function listByCategory(int $categoryId): Collection
    {
        return $this->productRepository->listByCategory($categoryId);
    }

    /**
     * @param array{category_id: int, name: string, description?: string|null, price: string|float|int, image?: UploadedFile|null} $data
     */
    public function create(array $data): Product
    {
        $this->ensureCategoryCanBeAssigned($data['category_id']);

        return $this->productRepository->create([
            'category_id' => $data['category_id'],
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'price' => $data['price'],
            'stock' => $data['stock'] ?? 0,
            'image_path' => $this->storeImage($data['image'] ?? null),
            'is_active' => $data['is_active'] ?? true,
        ])->load('category:id,name');
    }

    /**
     * @param array{category_id: int, name: string, description?: string|null, price: string|float|int, image?: UploadedFile|null, remove_image?: bool} $data
     */
    public function update(Product $product, array $data): Product
    {
        $this->ensureCategoryCanBeAssigned($data['category_id'], $product);

        $imagePath = $product->image_path;

        if (! empty($data['remove_image'])) {
            $this->deleteImage($imagePath);
            $imagePath = null;
        }

        if (! empty($data['image'])) {
            $this->deleteImage($imagePath);
            $imagePath = $this->storeImage($data['image']);
        }

        return $this->productRepository->update($product, [
            'category_id' => $data['category_id'],
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'price' => $data['price'],
            'stock' => $data['stock'] ?? $product->stock,
            'image_path' => $imagePath,
            'is_active' => $data['is_active'] ?? $product->is_active,
        ]);
    }

    public function delete(Product $product): void
    {
        $this->deleteImage($product->image_path);
        $this->productRepository->delete($product);
    }

    public function toggleStatus(Product $product): Product
    {
        return $this->productRepository->update($product, [
            'is_active' => ! $product->is_active,
        ]);
    }

    private function storeImage(?UploadedFile $image): ?string
    {
        return $image?->store('products', 'public');
    }

    private function deleteImage(?string $path): void
    {
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }

    private function ensureCategoryCanBeAssigned(int $categoryId, ?Product $product = null): void
    {
        if ($product && $product->category_id === $categoryId) {
            return;
        }

        if ($this->categoryRepository->findActiveById($categoryId)) {
            return;
        }

        throw ValidationException::withMessages([
            'category_id' => 'La categoria seleccionada no esta activa.',
        ]);
    }
}
