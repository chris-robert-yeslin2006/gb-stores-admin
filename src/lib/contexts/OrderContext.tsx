
import React, { createContext, useContext, useState } from 'react';
import { Order, OrderItem, OrderStatus } from '@/types';
import { orders as initialOrders } from '../data';
import { useCart } from './CartContext';
import { products } from '../data';
import { toast } from '@/components/ui/sonner';

interface OrderContextType {
  orders: Order[];
  createOrder: (customerName: string, customerPhone: string, customerAddress: string) => string;
  getOrder: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: OrderStatus) => boolean;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const { items, clearCart, getCartTotal } = useCart();

  // Create a new order
  const createOrder = (customerName: string, customerPhone: string, customerAddress: string): string => {
    if (items.length === 0) return '';
    
    // Create order items from cart items
    const orderItems: OrderItem[] = items.map(cartItem => {
      const product = products.find(p => p.id === cartItem.productId);
      if (!product) throw new Error(`Product not found: ${cartItem.productId}`);
      
      return {
        productId: product.id,
        productName: product.name,
        quantity: cartItem.quantity,
        price: product.price,
        color: cartItem.color,
        size: cartItem.size
      };
    });
    
    // Generate order ID
    const orderId = `ORD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(4, '0')}`;
    
    // Create new order
    const newOrder: Order = {
      id: orderId,
      items: orderItems,
      total: getCartTotal(),
      status: 'processing',
      customerName,
      customerPhone,
      customerAddress,
      orderDate: new Date().toISOString()
    };
    
    setOrders(current => [...current, newOrder]);
    clearCart();
    toast.success('Order placed successfully!');
    
    return orderId;
  };

  // Get an order by ID
  const getOrder = (id: string) => {
    return orders.find(order => order.id === id);
  };

  // Update order status
  const updateOrderStatus = (id: string, status: OrderStatus): boolean => {
    const orderIndex = orders.findIndex(order => order.id === id);
    if (orderIndex === -1) return false;
    
    setOrders(current => 
      current.map((order, index) => 
        index === orderIndex ? { ...order, status } : order
      )
    );
    
    toast.success(`Order status updated to ${status.replace('_', ' ')}`);
    return true;
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrder,
        updateOrderStatus
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
