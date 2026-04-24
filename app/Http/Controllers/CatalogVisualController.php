<?php

namespace App\Http\Controllers;

use App\Services\Catalog\CategoryService;
use App\Services\Catalog\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CatalogVisualController extends Controller
{
    public function __construct(
        private readonly CategoryService $categoryService,
        private readonly ProductService $productService,
    ) {
    }

    public function index(Request $request): Response
    {
        $categories = $this->categoryService->listForVisual();
        $selectedCategoryId = $request->integer('category_id') ?: null;
        $selectedCategory = $selectedCategoryId
            ? $categories->firstWhere('id', $selectedCategoryId)
            : null;

        if (! $selectedCategory?->is_active) {
            $selectedCategoryId = null;
            $selectedCategory = null;
        }

        return Inertia::render('Catalog/Visual', [
            'filters' => [
                'category_id' => $selectedCategoryId,
            ],
            'categories' => $categories->values(),
            'selectedCategory' => $selectedCategory,
            'products' => $selectedCategoryId
                ? $this->productService->listByCategory($selectedCategoryId)
                : [],
        ]);
    }
}
