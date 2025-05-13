
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { OrderStatus } from '@/types';
import OrderStatusSelector from './OrderStatusSelector';

interface OrderDetailsHeaderProps {
  orderId: string;
  orderDate: string;
  status: OrderStatus;
  updateOrderStatus: (id: string, status: OrderStatus) => boolean;
  formatDate: (dateString: string) => string;
}

const OrderDetailsHeader = ({ 
  orderId, 
  orderDate, 
  status,
  updateOrderStatus,
  formatDate
}: OrderDetailsHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <>
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center text-gray-500"
        onClick={() => navigate('/admin/orders')}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Orders
      </Button>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Order #{orderId}</h1>
          <p className="text-gray-500">
            Placed on {formatDate(orderDate)}
          </p>
        </div>
        
        <div className="flex items-center mt-4 md:mt-0">
          <OrderStatusSelector
            initialStatus={status}
            orderId={orderId}
            onStatusChange={updateOrderStatus}
          />
        </div>
      </div>
    </>
  );
};

export default OrderDetailsHeader;
