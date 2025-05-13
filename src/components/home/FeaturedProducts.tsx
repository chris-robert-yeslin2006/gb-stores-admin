
import { useState } from 'react';
import { products } from '@/lib/data';
import ProductCard from '@/components/shared/ProductCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categories = ['all', 'shoes', 'clothing', 'gadgets'] as const;
type Category = typeof categories[number];

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  
  const filteredProducts = products.filter(product => 
    (activeCategory === 'all' || product.category === activeCategory) && product.featured
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Products</h2>
        <p className="text-gray-500 text-center max-w-2xl mx-auto mb-8">
          Explore our handpicked selection of premium products that combine quality, style, and innovation.
        </p>
        
        {/* Category filters */}
        <div className="flex justify-center mb-10">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className={cn(
                  "capitalize",
                  activeCategory === category && "bg-brand-secondary text-white hover:bg-brand-secondary/90"
                )}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
