<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CatalogVisualController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return auth()->check()
        ? redirect()->route('dashboard')
        : redirect()->route('login');
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/catalog', [CatalogVisualController::class, 'index'])->name('catalog.visual');

    Route::patch('/categories/{category}/toggle-status', [CategoryController::class, 'toggleStatus'])
        ->name('categories.toggle-status');
    Route::resource('categories', CategoryController::class)->except('show');

    Route::patch('/products/{product}/toggle-status', [ProductController::class, 'toggleStatus'])
        ->name('products.toggle-status');
    Route::resource('products', ProductController::class)->except('show');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
