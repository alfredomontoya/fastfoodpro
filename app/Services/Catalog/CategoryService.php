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
     * @param array{name: string, image?: UploadedFile|null} $data
     */
    public function create(array $data): Category
    {
        return $this->categoryRepository->create([
            'name' => $data['name'],
            'image_path' => $this->storeImage($data['image'] ?? null),
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
            'image_path' => $imagePath,
        ]);
    }

    public function delete(Category $category): void
    {
        $this->deleteImage($category->image_path);
        $this->categoryRepository->delete($category);
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
