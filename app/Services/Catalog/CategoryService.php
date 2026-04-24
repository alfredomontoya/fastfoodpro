<?php

namespace App\Services\Catalog;

use App\Models\Category;
use App\Repositories\CategoryRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class CategoryService
{
    public function __construct(
        private readonly CategoryRepository $categoryRepository,
    ) {
    }

    /**
     * @param array{search?: string|null} $filters
     */
    public function getPaginated(array $filters = [], int $perPage = 12): LengthAwarePaginator
    {
        return $this->categoryRepository->getAll($filters, $perPage);
    }

    public function findOrFail(int $id): Category
    {
        return Category::query()->withCount('products')->findOrFail($id);
    }

    /**
     * @return Collection<int, Category>
     */
    public function listForSelect(): Collection
    {
        return $this->categoryRepository->listForSelect();
    }

    /**
     * @return Collection<int, Category>
     */
    public function listForVisual(): Collection
    {
        return $this->categoryRepository->listForVisual();
    }

    /**
     * @param array{name: string, image?: UploadedFile|null} $data
     */
    public function create(array $data): Category
    {
        return $this->categoryRepository->create([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'image_path' => $this->storeImage($data['image'] ?? null),
            'is_active' => $data['is_active'] ?? true,
        ]);
    }

    /**
     * @param array{name: string, image?: UploadedFile|null, remove_image?: bool} $data
     */
    public function update(Category $category, array $data): Category
    {
        $imagePath = $category->image_path;

        if (! empty($data['remove_image'])) {
            $this->deleteImage($imagePath);
            $imagePath = null;
        }

        if (! empty($data['image'])) {
            $this->deleteImage($imagePath);
            $imagePath = $this->storeImage($data['image']);
        }

        return $this->categoryRepository->update($category, [
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'image_path' => $imagePath,
            'is_active' => $data['is_active'] ?? $category->is_active,
        ]);
    }

    public function delete(Category $category): void
    {
        $this->deleteImage($category->image_path);
        $this->categoryRepository->delete($category);
    }

    public function toggleStatus(Category $category): Category
    {
        return $this->categoryRepository->update($category, [
            'is_active' => ! $category->is_active,
        ]);
    }

    private function storeImage(?UploadedFile $image): ?string
    {
        return $image?->store('categories', 'public');
    }

    private function deleteImage(?string $path): void
    {
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}
