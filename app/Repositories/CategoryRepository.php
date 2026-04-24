<?php

namespace App\Repositories;

use App\Models\Category;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class CategoryRepository
{
    /**
     * @param array{search?: string|null} $filters
     */
    public function getAll(array $filters = [], int $perPage = 12): LengthAwarePaginator
    {
        return Category::query()
            ->withCount('products')
            ->search($filters['search'] ?? null)
            ->orderBy('name')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function findById(int $id): ?Category
    {
        return Category::query()
            ->withCount('products')
            ->find($id);
    }

    public function findActiveById(int $id): ?Category
    {
        return Category::query()
            ->active()
            ->find($id);
    }

    /**
     * @param array<string, mixed> $data
     */
    public function create(array $data): Category
    {
        return Category::query()->create($data);
    }

    /**
     * @param array<string, mixed> $data
     */
    public function update(Category $category, array $data): Category
    {
        $category->fill($data);
        $category->save();

        return $category->refresh();
    }

    public function delete(Category $category): ?bool
    {
        return $category->delete();
    }

    /**
     * @return Collection<int, Category>
     */
    public function listForSelect(): Collection
    {
        return Category::query()
            ->active()
            ->orderBy('name')
            ->get(['id', 'name']);
    }

    /**
     * @return Collection<int, Category>
     */
    public function listForVisual(): Collection
    {
        return Category::query()
            ->withCount([
                'products',
                'products as active_products_count' => fn ($query) => $query->where('is_active', true),
            ])
            ->orderByDesc('is_active')
            ->orderBy('name')
            ->get();
    }
}
