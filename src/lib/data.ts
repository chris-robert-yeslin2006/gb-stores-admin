
import { Product, Order } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Nike Air Jordan 1 Retro High',
    price: 189.99,
    description: 'The Air Jordan 1 Retro High offers a clean, classic look with premium materials and Air-Sole cushioning for lasting comfort and style.',
    category: 'shoes',
    images: [
      '/images/products/nike-air-jordan-1-blue.jpg',
      '/images/products/nike-air-jordan-1-blue-side.jpg',
      '/images/products/nike-air-jordan-1-blue-back.jpg',
    ],
    colors: [
      { name: 'Blue', code: '#1E40AF' },
      { name: 'Red', code: '#DC2626' },
      { name: 'Black', code: '#1F2937' }
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    stock: 45,
    featured: true
  },
  {
    id: '2',
    name: 'Adidas Samba Classic',
    price: 129.99,
    description: 'The Adidas Samba is a classic design featuring a leather upper, suede toe overlay, and gum rubber outsole.',
    category: 'shoes',
    images: [
      '/images/products/adidas-samba.jpg',
      '/images/products/adidas-samba-side.jpg',
      '/images/products/adidas-samba-back.jpg',
    ],
    colors: [
      { name: 'White', code: '#FFFFFF' },
      { name: 'Black', code: '#1F2937' },
      { name: 'Brown', code: '#7C2D12' }
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    stock: 32,
    featured: true
  },
  {
    id: '3',
    name: 'Puma Unisex Sneakers',
    price: 119.99,
    description: 'Versatile Puma sneakers designed for both style and comfort, perfect for everyday wear.',
    category: 'shoes',
    images: [
      '/images/products/puma-unisex.jpg',
      '/images/products/puma-unisex-side.jpg',
      '/images/products/puma-unisex-back.jpg',
    ],
    colors: [
      { name: 'White', code: '#FFFFFF' },
      { name: 'Brown', code: '#7C2D12' },
      { name: 'Green', code: '#166534' }
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    stock: 25,
    featured: true
  },
  {
    id: '4',
    name: 'Retro Chunky Sole Sneakers',
    price: 149.99,
    description: 'Trendy chunky sole sneakers with a retro 90s-inspired design, offering both style and comfort.',
    category: 'shoes',
    images: [
      '/images/products/retro-sneakers.jpg',
      '/images/products/retro-sneakers-side.jpg',
      '/images/products/retro-sneakers-back.jpg',
    ],
    colors: [
      { name: 'White', code: '#FFFFFF' },
      { name: 'Black', code: '#1F2937' },
      { name: 'Red', code: '#DC2626' },
      { name: 'Blue', code: '#1E40AF' }
    ],
    sizes: ['7', '8', '9', '10', '11'],
    stock: 18,
    featured: true
  },
  {
    id: '5',
    name: 'Converse Chuck Taylor High Top',
    price: 79.99,
    description: 'The iconic Chuck Taylor All Star high top sneaker with classic canvas upper and diamond pattern outsole.',
    category: 'shoes',
    images: [
      '/images/products/converse-high-top.jpg',
      '/images/products/converse-high-top-side.jpg',
      '/images/products/converse-high-top-back.jpg',
    ],
    colors: [
      { name: 'Brown', code: '#7C2D12' },
      { name: 'Black', code: '#1F2937' },
      { name: 'Red', code: '#DC2626' }
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    stock: 50,
    featured: false
  },
  {
    id: '6',
    name: 'Wireless Bluetooth Earbuds',
    price: 99.99,
    description: 'Premium wireless earbuds with active noise cancellation, touch controls, and long battery life.',
    category: 'gadgets',
    images: [
      '/images/products/wireless-earbuds.jpg',
      '/images/products/wireless-earbuds-case.jpg',
    ],
    colors: [
      { name: 'Black', code: '#1F2937' },
      { name: 'White', code: '#FFFFFF' },
      { name: 'Green', code: '#166534' }
    ],
    stock: 60,
    featured: true
  },
  {
    id: '7',
    name: 'Smart Fitness Tracker',
    price: 149.99,
    description: 'Advanced fitness tracker with heart rate monitoring, sleep tracking, and smartphone notifications.',
    category: 'gadgets',
    images: [
      '/images/products/fitness-tracker.jpg',
      '/images/products/fitness-tracker-app.jpg',
    ],
    colors: [
      { name: 'Black', code: '#1F2937' },
      { name: 'Blue', code: '#1E40AF' },
      { name: 'Pink', code: '#DB2777' }
    ],
    stock: 40,
    featured: false
  },
  {
    id: '8',
    name: 'Oversized Graphic T-Shirt',
    price: 39.99,
    description: 'Comfortable cotton oversized t-shirt with bold graphic print, perfect for casual styling.',
    category: 'clothing',
    images: [
      '/images/products/graphic-tshirt.jpg',
      '/images/products/graphic-tshirt-back.jpg',
    ],
    colors: [
      { name: 'White', code: '#FFFFFF' },
      { name: 'Black', code: '#1F2937' },
      { name: 'Grey', code: '#6B7280' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 75,
    featured: true
  },
  {
    id: '9',
    name: 'Slim Fit Denim Jeans',
    price: 79.99,
    description: 'Classic slim fit jeans made from premium stretch denim for maximum comfort and style.',
    category: 'clothing',
    images: [
      '/images/products/slim-jeans.jpg',
      '/images/products/slim-jeans-back.jpg',
    ],
    colors: [
      { name: 'Blue', code: '#1E40AF' },
      { name: 'Black', code: '#1F2937' },
      { name: 'Grey', code: '#6B7280' }
    ],
    sizes: ['28', '30', '32', '34', '36', '38'],
    stock: 55,
    featured: false
  }
];

export const orders: Order[] = [
  {
    id: 'ORD-2023-0001',
    items: [
      {
        productId: '1',
        productName: 'Nike Air Jordan 1 Retro High',
        quantity: 1,
        price: 189.99,
        color: 'Blue',
        size: '10'
      }
    ],
    total: 189.99,
    status: 'processing',
    customerName: 'John Doe',
    customerPhone: '555-123-4567',
    customerAddress: '123 Main St, Anytown, USA',
    orderDate: '2023-05-10T14:30:00Z'
  },
  {
    id: 'ORD-2023-0002',
    items: [
      {
        productId: '5',
        productName: 'Converse Chuck Taylor High Top',
        quantity: 1,
        price: 79.99,
        color: 'Black',
        size: '8'
      },
      {
        productId: '8',
        productName: 'Oversized Graphic T-Shirt',
        quantity: 2,
        price: 39.99,
        color: 'White',
        size: 'L'
      }
    ],
    total: 159.97,
    status: 'out_for_delivery',
    customerName: 'Jane Smith',
    customerPhone: '555-987-6543',
    customerAddress: '456 Oak Ave, Somewhere, USA',
    orderDate: '2023-05-12T10:15:00Z'
  },
  {
    id: 'ORD-2023-0003',
    items: [
      {
        productId: '6',
        productName: 'Wireless Bluetooth Earbuds',
        quantity: 1,
        price: 99.99,
        color: 'Black'
      }
    ],
    total: 99.99,
    status: 'delivered',
    customerName: 'Robert Johnson',
    customerPhone: '555-555-1212',
    customerAddress: '789 Elm St, Elsewhere, USA',
    orderDate: '2023-05-01T16:45:00Z'
  }
];
