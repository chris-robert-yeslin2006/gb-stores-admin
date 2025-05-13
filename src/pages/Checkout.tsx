
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/lib/contexts/CartContext';
import { useOrder } from '@/lib/contexts/OrderContext';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getCartTotal } = useCart();
  const { createOrder } = useOrder();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      email: '',
      notes: '',
    },
  });
  
  // Get product details for cart items
  const cartItems = items.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      product
    };
  });
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Create order
      const orderId = createOrder(
        data.name,
        data.phone,
        data.address
      );
      
      if (orderId) {
        // Navigate to order confirmation page
        navigate(`/order-confirmation/${orderId}`);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
    
    setIsSubmitting(false);
  };

  // Redirect to cart if empty
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Customer Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-medium mb-6">Customer Information</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your phone number" 
                          type="tel"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your email address" 
                          type="email"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Address</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter your full address" 
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Notes */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Special instructions for delivery" 
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-brand-secondary hover:bg-brand-secondary/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            
            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                item.product && (
                  <div key={index} className="flex">
                    <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border mr-4">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{item.product.name}</h3>
                      <p className="text-xs text-gray-500">
                        {item.color} {item.size && `/ ${item.size}`}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm">Qty: {item.quantity}</span>
                        <span className="text-sm font-medium">
                          {formatter.format(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
            
            {/* Price Calculations */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatter.format(getCartTotal())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>{formatter.format(getCartTotal())}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
