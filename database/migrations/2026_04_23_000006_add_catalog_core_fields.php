<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->text('description')->nullable()->after('name');
            $table->boolean('is_active')->default(true)->after('image_path');
            $table->index('is_active');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->unsignedInteger('stock')->default(0)->after('price');
            $table->boolean('is_active')->default(true)->after('image_path');
            $table->index('is_active');
            $table->index('stock');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex(['is_active']);
            $table->dropIndex(['stock']);
            $table->dropColumn(['stock', 'is_active']);
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->dropIndex(['is_active']);
            $table->dropColumn(['description', 'is_active']);
        });
    }
};
