// Definimos el tipo para los datos de cada categoría
export interface Category {
    code: string;
    name: string;
    image: string;
}

// Definimos el tipo para la respuesta de la API
export interface CategoriesResponse {
    [key: string]: Category;
}

export interface CategoriesHook {
    categories: CategoriesResponse | null
    loading: boolean
    error: string | null
}

export interface KardexProduct {
    code: string
    name: string
    stock: number
    category: string
}

export interface KardexResponse {
    currentPage: number
    totalItems: number
    totalPages: number
    data: KardexProduct[]
}
