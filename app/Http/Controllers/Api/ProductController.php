<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\Catalog\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductController extends Controller
{
    public function __construct(
        private readonly ProductService $productService,
    ) {
        $this->authorizeResource(Product::class, 'product');
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        $filters = [
            'search' => $request->string('search')->toString() ?: null,
            'category_id' => $request->integer('category_id') ?: null,
        ];

        $products = $this->productService->getPaginated(
            $filters,
            (int) $request->integer('per_page', 15),
        );

        return ProductResource::collection($products);
    }

    public function store(StoreProductRequest $request): JsonResponse
    {
        $product = $this->productService->create($request->validated());

        return ProductResource::make($product)
            ->additional([
                'message' => 'Producto creado correctamente.',
            ])
            ->response()
            ->setStatusCode(201);
    }

    public function show(Product $product): ProductResource
    {
        $this->authorize('view', $product);

        return ProductResource::make(
            $this->productService->findOrFail($product->id),
        );
    }

    public function update(UpdateProductRequest $request, Product $product): ProductResource
    {
        $this->authorize('update', $product);

        return ProductResource::make(
            $this->productService->update($product, $request->validated()),
        )->additional([
            'message' => 'Producto actualizado correctamente.',
        ]);
    }

    public function destroy(Product $product): JsonResponse
    {
        $this->authorize('delete', $product);

        $this->productService->delete($product);

        return response()->json([
            'message' => 'Producto eliminado correctamente.',
        ]);
    }
}
