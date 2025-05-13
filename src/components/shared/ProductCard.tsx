
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <Link to={`/product/${product.id}`}>
      <Card className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg group", 
        className
      )}>
        <div className="aspect-square relative overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {product.featured && (
            <div className="absolute top-2 left-2 bg-brand-secondary text-white text-xs px-2 py-1 rounded-full">
              Featured
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-medium text-gray-900 line-clamp-1">{product.name}</h3>
          
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-gray-900">
              {formatter.format(product.price)}
            </span>
            
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 3).map((color, index) => (
                <div 
                  key={index}
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.code }}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
