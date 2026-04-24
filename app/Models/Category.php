<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'image_path',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    /**
     * @var list<string>
     */
    protected $appends = [
        'image_url',
    ];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
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

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
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
