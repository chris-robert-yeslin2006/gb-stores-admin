
import { useState } from 'react';
import { OrderStatus } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Package, 
  Truck,
  CheckCircle,
  X
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface OrderStatusSelectorProps {
  initialStatus: OrderStatus;
  orderId: string;
  onStatusChange: (id: string, status: OrderStatus) => boolean;
}

const OrderStatusSelector = ({ 
  initialStatus, 
  orderId, 
  onStatusChange 
}: OrderStatusSelectorProps) => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(initialStatus);
  
  const handleStatusChange = (status: OrderStatus) => {
    if (orderId) {
      const success = onStatusChange(orderId, status);
      if (success) {
        setCurrentStatus(status);
        toast.success(`Order status updated to ${status.replace('_', ' ')}`);
      } else {
        toast.error('Failed to update order status');
      }
    }
  };

  // Get status icon
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'processing':
        return <Package className="h-4 w-4 mr-2" />;
      case 'out_for_delivery':
        return <Truck className="h-4 w-4 mr-2" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 mr-2" />;
      case 'canceled':
        return <X className="h-4 w-4 mr-2" />;
      default:
        return <Package className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <Select
      value={currentStatus}
      onValueChange={(value) => handleStatusChange(value as OrderStatus)}
    >
      <SelectTrigger className="w-[200px]">
        <div className="flex items-center">
          {getStatusIcon(currentStatus)}
          <span className="capitalize">
            {currentStatus.replace('_', ' ')}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="processing">
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-2" />
            Processing
          </div>
        </SelectItem>
        <SelectItem value="out_for_delivery">
          <div className="flex items-center">
            <Truck className="h-4 w-4 mr-2" />
            Out for Delivery
          </div>
        </SelectItem>
        <SelectItem value="delivered">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Delivered
          </div>
        </SelectItem>
        <SelectItem value="canceled">
          <div className="flex items-center">
            <X className="h-4 w-4 mr-2" />
            Canceled
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default OrderStatusSelector;
