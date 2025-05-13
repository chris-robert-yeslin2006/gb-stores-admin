
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrder } from '@/lib/contexts/OrderContext';
import { Order } from '@/types';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Clock } from 'lucide-react';

const OrderConfirmation = () => {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600">
            Thank you for your order. We've received your order and will begin processing it soon.
          </p>
        </div>
        
        {/* Order Details */}
        <div className="bg-white border rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">Order #{order.id}</h2>
            <span className="text-sm text-gray-500">
              Placed on {formatDate(order.orderDate)}
            </span>
          </div>
          
          {/* Order Status */}
          <div className="flex items-center bg-gray-50 p-4 rounded-md mb-6">
            <Clock className="h-5 w-5 text-brand-secondary mr-3" />
            <div>
              <span className="font-medium">Status: </span>
              <span className="capitalize">{order.status.replace('_', ' ')}</span>
              <p className="text-sm text-gray-500 mt-1">
                We'll update you when your order ships.
              </p>
            </div>
          </div>
          
          {/* Order Items */}
          <div className="border rounded-md overflow-hidden mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Qty
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {item.productName}
                        </div>
                        <div className="ml-2 text-xs text-gray-500">
                          {item.color} {item.size && `/ ${item.size}`}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{item.quantity}</div>
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
          <div className="flex justify-end">
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
        
        {/* Shipping Information */}
        <div className="bg-white border rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Package className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-medium">Shipping Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Shipping To</h4>
              <p className="font-medium">{order.customerName}</p>
              <p className="text-gray-600 mt-1">{order.customerAddress}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Contact Information</h4>
              <p className="text-gray-600">Phone: {order.customerPhone}</p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-between">
          <Link to={`/order/${order.id}`}>
            <Button variant="outline">View Order Details</Button>
          </Link>
          <Link to="/store">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
