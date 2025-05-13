
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOrder } from '@/lib/contexts/OrderContext';
import { Order } from '@/types';
import OrderDetailsHeader from '@/components/admin/orders/OrderDetailsHeader';
import CustomerInfoCard from '@/components/admin/orders/CustomerInfoCard';
import OrderItemsList from '@/components/admin/orders/OrderItemsList';
import OrderSummary from '@/components/admin/orders/OrderSummary';

const AdminOrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrder, updateOrderStatus } = useOrder();
  const [order, setOrder] = useState<Order | undefined>(undefined);
  
  useEffect(() => {
    if (id) {
      const foundOrder = getOrder(id);
      if (foundOrder) {
        setOrder(foundOrder);
      }
    }
  }, [id, getOrder]);
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  
  if (!order) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <p className="mb-8">The order you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div>
      <OrderDetailsHeader 
        orderId={order.id} 
        orderDate={order.orderDate}
        status={order.status}
        updateOrderStatus={updateOrderStatus}
        formatDate={formatDate}
      />
      
      {/* Order Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Information */}
        <CustomerInfoCard 
          customerName={order.customerName}
          customerPhone={order.customerPhone}
          customerAddress={order.customerAddress}
        />
        
        {/* Order Items and Summary */}
        <div className="bg-white border rounded-lg overflow-hidden lg:col-span-2">
          <h2 className="text-lg font-medium p-6 border-b">Order Items</h2>
          <OrderItemsList items={order.items} formatter={formatter} />
          
          {/* Order Summary */}
          <OrderSummary total={order.total} formatter={formatter} />
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
