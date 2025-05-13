
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrder } from '@/lib/contexts/OrderContext';
import { Order, OrderStatus } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  ChevronLeft,
  Package, 
  Truck,
  CheckCircle,
  X,
  Phone,
  MapPin,
  User
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const AdminOrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getOrder, updateOrderStatus } = useOrder();
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('processing');
  
  useEffect(() => {
    if (id) {
      const foundOrder = getOrder(id);
      if (foundOrder) {
        setOrder(foundOrder);
        setCurrentStatus(foundOrder.status);
      }
    }
  }, [id, getOrder]);
  
  const handleStatusChange = (status: OrderStatus) => {
    if (id) {
      const success = updateOrderStatus(id, status);
      if (success) {
        setCurrentStatus(status);
        toast.success(`Order status updated to ${status.replace('_', ' ')}`);
      } else {
        toast.error('Failed to update order status');
      }
    }
  };
  
  if (!order) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <p className="mb-8">The order you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/admin/orders')}>
          Back to Orders
        </Button>
      </div>
    );
  }
  
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
  
  // Get status icon
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'processing':
        return <Package className="h-5 w-5" />;
      case 'out_for_delivery':
        return <Truck className="h-5 w-5" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5" />;
      case 'canceled':
        return <X className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  return (
    <div>
      {/* Back Button */}
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center text-gray-500"
        onClick={() => navigate('/admin/orders')}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Orders
      </Button>
      
      {/* Order Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Order #{order.id}</h1>
          <p className="text-gray-500">
            Placed on {formatDate(order.orderDate)}
          </p>
        </div>
        
        {/* Status Update */}
        <div className="flex items-center mt-4 md:mt-0">
          <Select
            value={currentStatus}
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
          >
            <SelectTrigger className="w-[200px]">
              <div className="flex items-center">
                {getStatusIcon(currentStatus)}
                <span className="ml-2 capitalize">
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
        </div>
      </div>
      
      {/* Order Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Information */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Customer Information</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <User className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium">{order.customerName}</h3>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium">Phone Number</h3>
                <p className="text-gray-600">{order.customerPhone}</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium">Shipping Address</h3>
                <p className="text-gray-600">{order.customerAddress}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Items and Summary */}
        <div className="bg-white border rounded-lg overflow-hidden lg:col-span-2">
          <h2 className="text-lg font-medium p-6 border-b">Order Items</h2>
          <div className="divide-y">
            {order.items.map((item, index) => (
              <div key={index} className="p-4 flex items-center">
                <div className="flex-1">
                  <h3 className="font-medium">{item.productName}</h3>
                  <div className="text-sm text-gray-500">
                    {item.color} {item.size && `/ Size: ${item.size}`}
                  </div>
                  <div className="text-sm">
                    {formatter.format(item.price)} × {item.quantity}
                  </div>
                </div>
                <div className="font-medium">
                  {formatter.format(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="bg-gray-50 p-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span>{formatter.format(order.total)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-lg font-medium">
              <span>Total</span>
              <span>{formatter.format(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
