<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'category_id',
        'name',
        'description',
        'price',
        'image_path',
    ];

    /**
     * @var list<string>
     */
    protected $appends = [
        'image_url',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function scopeSearch($query, ?string $search)
    {
        return $query->when($search, function ($builder, $value) {
            $builder->where(function ($nested) use ($value) {
                $nested
                    ->where('name', 'like', '%'.$value.'%')
                    ->orWhere('description', 'like', '%'.$value.'%');
            });
        });
    }

    public function scopeFilterByCategory($query, ?int $categoryId)
    {
        return $query->when($categoryId, function ($builder, $value) {
            $builder->where('category_id', $value);
        });
    }

    protected function imageUrl(): Attribute
    {
        return Attribute::get(
            fn () => $this->image_path
                ? Storage::disk('public')->url($this->image_path)
                : null,
        );
    }
}
