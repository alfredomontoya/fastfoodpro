<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class ProductRepository
{
    /**
     * @param array{search?: string|null, category_id?: int|null} $filters
     */
    public function getAll(array $filters = [], int $perPage = 12): LengthAwarePaginator
    {
        return Product::query()
            ->with('category:id,name')
            ->search($filters['search'] ?? null)
            ->filterByCategory($filters['category_id'] ?? null)
            ->latest('id')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function findById(int $id): ?Product
    {
        return Product::query()
            ->with('category:id,name')
            ->find($id);
    }

    /**
     * @param array<string, mixed> $data
     */
    public function create(array $data): Product
    {
        return Product::query()->create($data);
    }

    /**
     * @param array<string, mixed> $data
     */
    public function update(Product $product, array $data): Product
    {
        $product->fill($data);
        $product->save();

        return $product->refresh()->load('category:id,name');
    }

    public function delete(Product $product): ?bool
    {
        return $product->delete();
    }

    /**
     * @return Collection<int, Product>
     */
    public function listByCategory(int $categoryId, bool $activeOnly = true): Collection
    {
        return Product::query()
            ->with('category:id,name')
            ->where('category_id', $categoryId)
            ->when($activeOnly, fn ($query) => $query->active())
            ->latest('id')
            ->get();
    }
}
