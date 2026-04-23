<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Product;
use App\Services\Catalog\CategoryService;
use App\Services\Catalog\ProductService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function __construct(
        private readonly ProductService $productService,
        private readonly CategoryService $categoryService,
    ) {
        $this->authorizeResource(Product::class, 'product');
    }

    public function index(): Response
    {
        $filters = [
            'search' => request()->string('search')->toString() ?: null,
            'category_id' => request()->integer('category_id') ?: null,
        ];

        return Inertia::render('Products/Index', [
            'filters' => [
                'search' => $filters['search'],
                'category_id' => $filters['category_id'],
            ],
            'products' => $this->productService->getPaginated($filters),
            'categories' => $this->categoryService->listForSelect(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Products/Create', [
            'categories' => $this->categoryService->listForSelect(),
        ]);
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        $this->productService->create($request->validated());

        return redirect()
            ->route('products.index')
            ->with('status', 'Producto creado correctamente.');
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('Products/Edit', [
            'product' => $this->productService->findOrFail($product->id),
            'categories' => $this->categoryService->listForSelect(),
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $this->productService->update($product, $request->validated());

        return redirect()
            ->route('products.index')
            ->with('status', 'Producto actualizado correctamente.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $this->productService->delete($product);

        return redirect()
            ->route('products.index')
            ->with('status', 'Producto eliminado correctamente.');
    }
}
