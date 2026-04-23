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
    image_url: string | null;
    products_count?: number;
    created_at?: string;
}

export interface Product {
    id: number;
    category_id: number;
    name: string;
    description: string | null;
    price: string;
    image_url: string | null;
    category: Pick<Category, 'id' | 'name'>;
}

export interface CatalogFilters {
    search?: string | null;
    category_id?: number | null;
}

export interface CategoryFormData {
    name: string;
    image: File | null;
    remove_image: boolean;
}

export interface ProductFormData {
    category_id: number | '';
    name: string;
    description: string;
    price: string;
    image: File | null;
    remove_image: boolean;
}
