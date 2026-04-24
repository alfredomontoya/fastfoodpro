export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    from: number | null;
    last_page: number;
    links: PaginationLink[];
    per_page: number;
    to: number | null;
    total: number;
}

export interface Category {
    id: number;
    name: string;
    description?: string | null;
    is_active?: boolean;
    image_url: string | null;
    products_count?: number;
    active_products_count?: number;
    created_at?: string;
    updated_at?: string;
}

export interface Product {
    id: number;
    category_id: number;
    name: string;
    description: string | null;
    price: string;
    stock?: number;
    is_active?: boolean;
    image_url: string | null;
    category: Pick<Category, 'id' | 'name'>;
    created_at?: string;
    updated_at?: string;
}

export interface CatalogFilters {
    search?: string | null;
    category_id?: number | null;
}

export interface CategoryFormData {
    name: string;
    description: string;
    is_active: boolean;
    image: File | null;
    remove_image: boolean;
    redirect_to: string;
}

export interface ProductFormData {
    category_id: number | '';
    name: string;
    description: string;
    price: string;
    stock: number | '';
    is_active: boolean;
    image: File | null;
    remove_image: boolean;
    redirect_to: string;
}
