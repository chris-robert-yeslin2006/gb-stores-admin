
import { useOrder } from '@/lib/contexts/OrderContext';
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Package, 
  Truck,
  CheckCircle, 
  ShoppingBag, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { OrderStatus } from '@/types';

const Dashboard = () => {
  const { orders } = useOrder();
  
  // Analytics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  
  const ordersByStatus: Record<OrderStatus, number> = {
    processing: orders.filter(order => order.status === 'processing').length,
    out_for_delivery: orders.filter(order => order.status === 'out_for_delivery').length,
    delivered: orders.filter(order => order.status === 'delivered').length,
    canceled: orders.filter(order => order.status === 'canceled').length,
  };
  
  // Chart data for orders by status
  const chartData = [
    { name: 'Processing', value: ordersByStatus.processing },
    { name: 'Out for Delivery', value: ordersByStatus.out_for_delivery },
    { name: 'Delivered', value: ordersByStatus.delivered },
    { name: 'Canceled', value: ordersByStatus.canceled },
  ];
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-500">Welcome to your admin dashboard</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalOrders}</div>
          </CardContent>
          <CardFooter className="pt-0">
            <Link to="/admin/orders" className="text-sm text-brand-secondary flex items-center">
              View all orders
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatter.format(totalRevenue)}</div>
          </CardContent>
          <CardFooter className="pt-0">
            <span className="text-sm text-gray-500">
              Across {totalOrders} orders
            </span>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{ordersByStatus.processing}</div>
          </CardContent>
          <CardFooter className="pt-0">
            <span className="text-sm text-blue-500 flex items-center">
              <Package className="mr-1 h-4 w-4" />
              Pending orders
            </span>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Out for Delivery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{ordersByStatus.out_for_delivery}</div>
          </CardContent>
          <CardFooter className="pt-0">
            <span className="text-sm text-yellow-500 flex items-center">
              <Truck className="mr-1 h-4 w-4" />
              In transit
            </span>
          </CardFooter>
        </Card>
      </div>
      
      {/* Order Status Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Orders by Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#ff9900" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Link to="/admin/orders">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                    Customer
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                    Date
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">
                    Amount
                  </th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3 px-2">
                      <span className="text-sm font-medium">{order.id}</span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-sm">{order.customerName}</span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-sm text-gray-500">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center">
                        {order.status === 'processing' && (
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-600 font-medium">
                            Processing
                          </span>
                        )}
                        {order.status === 'out_for_delivery' && (
                          <span className="px-2 py-1 text-xs rounded-full bg-yellow-50 text-yellow-600 font-medium">
                            Out for Delivery
                          </span>
                        )}
                        {order.status === 'delivered' && (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-50 text-green-600 font-medium">
                            Delivered
                          </span>
                        )}
                        {order.status === 'canceled' && (
                          <span className="px-2 py-1 text-xs rounded-full bg-red-50 text-red-600 font-medium">
                            Canceled
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span className="text-sm font-medium">
                        {formatter.format(order.total)}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <Link to={`/admin/orders/${order.id}`}>
                        <Button variant="ghost" size="sm">View</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
