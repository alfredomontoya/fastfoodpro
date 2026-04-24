<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Models\Category;
use App\Services\Catalog\CategoryService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class CategoryController extends Controller
{
    public function __construct(
        private readonly CategoryService $categoryService,
    ) {
        $this->authorizeResource(Category::class, 'category');
    }

    public function index(): Response
    {
        return Inertia::render('Categories/Index', [
            'filters' => request()->only('search'),
            'categories' => $this->categoryService->getPaginated(request()->only('search')),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Categories/Create');
    }

    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        $this->categoryService->create($request->validated());

        return $this->redirectWithStatus(
            $request,
            'categories.index',
            'Categoria creada correctamente.',
        );
    }

    public function edit(Category $category): Response
    {
        return Inertia::render('Categories/Edit', [
            'category' => $this->categoryService->findOrFail($category->id),
        ]);
    }

    public function update(UpdateCategoryRequest $request, Category $category): RedirectResponse
    {
        $this->categoryService->update($category, $request->validated());

        return $this->redirectWithStatus(
            $request,
            'categories.index',
            'Categoria actualizada correctamente.',
        );
    }

    public function destroy(Request $request, Category $category): RedirectResponse
    {
        $this->categoryService->delete($category);

        return $this->redirectWithStatus(
            $request,
            'categories.index',
            'Categoria eliminada correctamente.',
        );
    }

    public function toggleStatus(Request $request, Category $category): RedirectResponse
    {
        $this->authorize('update', $category);

        $this->categoryService->toggleStatus($category);

        return $this->redirectWithStatus(
            $request,
            'categories.index',
            $category->is_active
                ? 'Categoria desactivada correctamente.'
                : 'Categoria activada correctamente.',
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
