export interface Category {
    id: number
    products: Product[]
    name: string
    created_at: string
    updated_ad: string
}

export interface CategoryResponse {
    categorys: Category[]
    limit: number;
    page: number;
    total: number;
    total_page: number;
}

export interface Product {
    id: number;
    category: Category
    name: string;
    description: string;
    price: number;
    stock: number;
    discount: number;
    image_url: string;
    created_at: string;
    updated_at: string;
}

export interface ProductsResponse {
    limit: number;
    page: number;
    categorys: Category[];
    products: Product[];
    total: number;
    total_page: number;
}

export interface Order {
    id: number;
    user_id: number
    total_amount: number
    status: string
    address: string
    province: string
    district: string
    sub_district: string
    postcode: string
    created_at: string;
    updated_at: string;
}

export interface OrdersResponse {
    limit: number;
    page: number;
    orders: Order[];
    total: number;
    total_page: number;
}

export interface OrderItem {
    id: number
    order_id: number
    product_id: number
    product: Product
    quantity: number
    price: number
    created_at: string;
    updated_at: string;
}

export interface OrdersItemResponse {
    order: Order;
    order_items: OrderItem[]
    limit: number;
    page: number;
    total: number;
    total_page: number;
}

export interface CartItems {
    cart_item_id: number;
    product_id: number
    name: string;
    price: number;
    quantity: number
    total: number
}

export interface CartResponse {
    limit: number;
    page: number;
    cart_items: CartItems[];
    total_amount: number
    total: number;
    total_page: number;
}

export interface User {
    id: number
    username: string
    email: string
    password: string
    role: string
    addresses: Address[]
    created_at: string;
    updated_at: string;
}

export interface Address {
    id: number
    user_id: number
    user: User
    address: string
    province: string
    district: string
    sub_district: string
    postcode: string
    created_at: string
    updated_at: string
}