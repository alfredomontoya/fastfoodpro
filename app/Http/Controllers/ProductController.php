<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Product;
use App\Services\Catalog\CategoryService;
use App\Services\Catalog\ProductService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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

        return $this->redirectWithStatus(
            $request,
            'products.index',
            'Producto creado correctamente.',
        );
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

        return $this->redirectWithStatus(
            $request,
            'products.index',
            'Producto actualizado correctamente.',
        );
    }

    public function destroy(Request $request, Product $product): RedirectResponse
    {
        $this->productService->delete($product);

        return $this->redirectWithStatus(
            $request,
            'products.index',
            'Producto eliminado correctamente.',
        );
    }

    public function toggleStatus(Request $request, Product $product): RedirectResponse
    {
        $this->authorize('update', $product);

        $this->productService->toggleStatus($product);

        return $this->redirectWithStatus(
            $request,
            'products.index',
            $product->is_active
                ? 'Producto desactivado correctamente.'
                : 'Producto activado correctamente.',
        );
    }

    private function redirectWithStatus(
        Request $request,
        string $defaultRoute,
        string $status,
    ): RedirectResponse {
        $redirectTo = $request->string('redirect_to')->toString();

        if ($redirectTo !== '' && str_starts_with($redirectTo, '/')) {
            return redirect($redirectTo)->with('status', $status);
        }

        return redirect()->route($defaultRoute)->with('status', $status);
    }
}
