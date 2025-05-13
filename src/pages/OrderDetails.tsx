
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrder } from '@/lib/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  Package, 
  Clock, 
  CheckCircle, 
  Truck,
  ArrowRight,
  X
} from 'lucide-react';
import { Order, OrderStatus } from '@/types';
import { cn } from '@/lib/utils';

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrder } = useOrder();
  const [order, setOrder] = useState<Order | undefined>(undefined);
  
  useEffect(() => {
    if (id) {
      const foundOrder = getOrder(id);
      setOrder(foundOrder);
    }
  }, [id, getOrder]);
  
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <p className="mb-8">The order you're looking for doesn't exist.</p>
        <Link to="/store">
          <Button>Continue Shopping</Button>
        </Link>
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
        return <Clock className="h-5 w-5" />;
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
  
  // Get status color
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'processing':
        return 'text-blue-600 bg-blue-50';
      case 'out_for_delivery':
        return 'text-yellow-600 bg-yellow-50';
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'canceled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
        
        {/* Order Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Order #{order.id}</h1>
            <p className="text-gray-500">
              Placed on {formatDate(order.orderDate)}
            </p>
          </div>
          
          <div className={cn(
            "px-3 py-1 rounded-full flex items-center mt-2 md:mt-0",
            getStatusColor(order.status)
          )}>
            {getStatusIcon(order.status)}
            <span className="ml-2 font-medium capitalize">
              {order.status.replace('_', ' ')}
            </span>
          </div>
        </div>
        
        {/* Progress Tracker */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 z-0"></div>
            <div className="flex justify-between relative z-10">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  order.status === 'processing' || order.status === 'out_for_delivery' || order.status === 'delivered' 
                    ? "bg-brand-secondary text-white" 
                    : "bg-gray-200 text-gray-500"
                )}>
                  1
                </div>
                <span className="mt-2 text-xs text-center">Processing</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  order.status === 'out_for_delivery' || order.status === 'delivered' 
                    ? "bg-brand-secondary text-white" 
                    : "bg-gray-200 text-gray-500"
                )}>
                  2
                </div>
                <span className="mt-2 text-xs text-center">Out for Delivery</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  order.status === 'delivered' 
                    ? "bg-brand-secondary text-white" 
                    : "bg-gray-200 text-gray-500"
                )}>
                  3
                </div>
                <span className="mt-2 text-xs text-center">Delivered</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Details */}
        <div className="bg-white border rounded-lg overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium mb-4">Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Shipping Address</h3>
                <p className="font-medium">{order.customerName}</p>
                <p className="text-gray-600">{order.customerAddress}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Contact Information</h3>
                <p className="text-gray-600">Phone: {order.customerPhone}</p>
              </div>
            </div>
          </div>
          
          {/* Order Items */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Color/Size
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Qty
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {item.productName}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {item.color} {item.size && `/ ${item.size}`}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="text-sm text-gray-900">{item.quantity}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-sm text-gray-500">
                        {formatter.format(item.price)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-sm font-medium">
                        {formatter.format(item.price * item.quantity)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Order Summary */}
          <div className="p-6 bg-gray-50 flex justify-end">
            <div className="w-full max-w-xs">
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatter.format(order.total)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between py-2 border-t font-medium">
                <span>Total</span>
                <span>{formatter.format(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full">Back to Home</Button>
          </Link>
          <Link to="/store" className="w-full sm:w-auto">
            <Button className="w-full">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
