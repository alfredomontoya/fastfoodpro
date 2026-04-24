<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Services\Catalog\CategoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CategoryController extends Controller
{
    public function __construct(
        private readonly CategoryService $categoryService,
    ) {
        $this->authorizeResource(Category::class, 'category');
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        $categories = $this->categoryService->getPaginated(
            $request->only('search'),
            (int) $request->integer('per_page', 15),
        );

        return CategoryResource::collection($categories);
    }

    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $category = $this->categoryService->create($request->validated());

        return CategoryResource::make($category)
            ->additional([
                'message' => 'Categoria creada correctamente.',
            ])
            ->response()
            ->setStatusCode(201);
    }

    public function show(Category $category): CategoryResource
    {
        $this->authorize('view', $category);

        return CategoryResource::make(
            $this->categoryService->findOrFail($category->id),
        );
    }

    public function update(UpdateCategoryRequest $request, Category $category): CategoryResource
    {
        $this->authorize('update', $category);

        return CategoryResource::make(
            $this->categoryService->update($category, $request->validated()),
        )->additional([
            'message' => 'Categoria actualizada correctamente.',
        ]);
    }

    public function destroy(Category $category): JsonResponse
    {
        $this->authorize('delete', $category);

        $this->categoryService->delete($category);

        return response()->json([
            'message' => 'Categoria eliminada correctamente.',
        ]);
    }
}
