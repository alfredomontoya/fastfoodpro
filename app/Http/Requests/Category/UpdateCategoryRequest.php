<?php

namespace App\Http\Requests\Category;

class UpdateCategoryRequest extends StoreCategoryRequest
{
    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            ...parent::rules(),
            'remove_image' => ['nullable', 'boolean'],
        ];
    }
}
