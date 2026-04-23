<?php

namespace App\Services\Catalog;

use App\Models\Product;
use App\Repositories\ProductRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ProductService
{
    public function __construct(
        private readonly ProductRepository $productRepository,
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
     * @param array{category_id: int, name: string, description?: string|null, price: string|float|int, image?: UploadedFile|null} $data
     */
    public function create(array $data): Product
    {
        return $this->productRepository->create([
            'category_id' => $data['category_id'],
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'price' => $data['price'],
            'image_path' => $this->storeImage($data['image'] ?? null),
        ])->load('category:id,name');
    }

    /**
     * @param array{category_id: int, name: string, description?: string|null, price: string|float|int, image?: UploadedFile|null, remove_image?: bool} $data
     */
    public function update(Product $product, array $data): Product
    {
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
            'image_path' => $imagePath,
        ]);
    }

    public function delete(Product $product): void
    {
        $this->deleteImage($product->image_path);
        $this->productRepository->delete($product);
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
}
