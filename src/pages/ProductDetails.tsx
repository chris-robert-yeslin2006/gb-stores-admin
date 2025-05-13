
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '@/lib/data';
import { Product, ProductColor } from '@/types';
import { useCart } from '@/lib/contexts/CartContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ShoppingCart, Heart, Minus, Plus, Check } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Find product
  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedColor(foundProduct.colors[0]);
        setSelectedSize(foundProduct.sizes ? foundProduct.sizes[0] : null);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/store">
          <Button>Back to Store</Button>
        </Link>
      </div>
    );
  }
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  const handleAddToCart = () => {
    if (selectedColor) {
      addToCart(product, quantity, selectedColor.name, selectedSize || undefined);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-brand-secondary">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/store" className="hover:text-brand-secondary">Store</Link>
        <span className="mx-2">/</span>
        <Link 
          to={`/store?category=${product.category}`} 
          className="hover:text-brand-secondary capitalize"
        >
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="truncate">{product.name}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="bg-gray-50 rounded-lg overflow-hidden aspect-square">
            <img 
              src={product.images[activeImageIndex]} 
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Thumbnail Images */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={cn(
                  "flex-shrink-0 w-20 h-20 border rounded-md overflow-hidden",
                  activeImageIndex === index ? "border-brand-secondary" : "border-gray-200"
                )}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-2xl font-bold text-brand-primary mb-4">
            {formatter.format(product.price)}
          </div>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Color: {selectedColor?.name}</h3>
            <RadioGroup 
              value={selectedColor?.name || ''} 
              onValueChange={(value) => {
                const color = product.colors.find(c => c.name === value);
                if (color) setSelectedColor(color);
              }}
              className="flex space-x-2"
            >
              {product.colors.map((color) => (
                <div key={color.name} className="flex items-center">
                  <RadioGroupItem 
                    value={color.name} 
                    id={`color-${color.name}`} 
                    className="sr-only"
                  />
                  <Label 
                    htmlFor={`color-${color.name}`}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border-2",
                      selectedColor?.name === color.name ? "border-brand-secondary" : "border-transparent"
                    )}
                  >
                    <div 
                      className="w-6 h-6 rounded-full" 
                      style={{ backgroundColor: color.code }}
                    >
                      {selectedColor?.name === color.name && (
                        <Check className={cn(
                          "w-5 h-5", 
                          color.name.toLowerCase() === 'white' ? "text-black" : "text-white"
                        )} />
                      )}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          {/* Size Selection */}
          {product.sizes && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Size</h3>
              <Select 
                value={selectedSize || ''}
                onValueChange={setSelectedSize}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map(size => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {/* Quantity Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Quantity</h3>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-4 mb-6">
            <Button 
              className="bg-brand-secondary hover:bg-brand-secondary/90 text-white flex-1"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Stock Status */}
          <div className="text-sm">
            {product.stock > 0 ? (
              <div className="text-green-600 flex items-center">
                <Check className="mr-1 h-4 w-4" />
                In Stock ({product.stock} available)
              </div>
            ) : (
              <div className="text-red-500">Out of Stock</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
