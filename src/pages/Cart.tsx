
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '@/lib/data';
import { useCart } from '@/lib/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, X, ShoppingCart } from 'lucide-react';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  // Get product details
  const cartItems = items.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      product
    };
  });
  
  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {isCartEmpty ? (
        <div className="flex flex-col items-center justify-center py-16">
          <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/store">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-3 px-2">Product</th>
                    <th className="text-left py-3 px-2">Price</th>
                    <th className="text-left py-3 px-2">Quantity</th>
                    <th className="text-left py-3 px-2">Total</th>
                    <th className="text-left py-3 px-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {cartItems.map((item, index) => (
                    item.product && (
                      <tr key={`${item.productId}-${item.color}-${item.size}-${index}`}>
                        {/* Product */}
                        <td className="py-4 px-2">
                          <div className="flex items-center">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-4">
                              <Link 
                                to={`/product/${item.productId}`}
                                className="font-medium text-gray-900 hover:text-brand-secondary"
                              >
                                {item.product.name}
                              </Link>
                              <div className="text-sm text-gray-500">
                                {item.color} {item.size && `/ ${item.size}`}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        {/* Price */}
                        <td className="py-4 px-2">
                          {formatter.format(item.product.price)}
                        </td>
                        
                        {/* Quantity */}
                        <td className="py-4 px-2">
                          <div className="flex items-center">
                            <Button 
                              variant="outline" 
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="mx-2 w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              disabled={item.quantity >= (item.product?.stock || 0)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                        
                        {/* Total */}
                        <td className="py-4 px-2 font-medium">
                          {formatter.format(item.product.price * item.quantity)}
                        </td>
                        
                        {/* Remove */}
                        <td className="py-4 px-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeFromCart(item.productId)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Cart Actions */}
            <div className="flex justify-between items-center mt-6">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Link to="/store">
                <Button variant="ghost">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{formatter.format(getCartTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatter.format(getCartTotal())}</span>
                </div>
              </div>
              
              <Link to="/checkout">
                <Button className="w-full mt-6 bg-brand-secondary hover:bg-brand-secondary/90 text-white">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
