
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'shoes' | 'clothing' | 'gadgets';
  images: string[];
  colors: ProductColor[];
  sizes?: string[];
  stock: number;
  featured?: boolean;
}

export interface ProductColor {
  name: string;
  code: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  color: string;
  size?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'processing' | 'out_for_delivery' | 'delivered' | 'canceled';
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  orderDate: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  color: string;
  size?: string;
}

export type OrderStatus = 'processing' | 'out_for_delivery' | 'delivered' | 'canceled';

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'customer';
}
