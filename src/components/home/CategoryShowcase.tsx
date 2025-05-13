
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CategoryItemProps {
  title: string;
  description: string;
  image: string;
  link: string;
  className?: string;
}

const CategoryItem = ({ title, description, image, link, className }: CategoryItemProps) => {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-xl group cursor-pointer",
        className
      )}
    >
      {/* Image with gradient overlay */}
      <div className="aspect-[3/4] md:aspect-auto md:h-full">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-black/20 z-10" />
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
        <h3 className="text-white text-2xl font-bold mb-2">{title}</h3>
        <p className="text-white/90 mb-4 max-w-xs">{description}</p>
        <Link to={link}>
          <Button className="bg-brand-secondary hover:bg-brand-secondary/90 text-white">
            View Collection
          </Button>
        </Link>
      </div>
    </div>
  );
};

const CategoryShowcase = () => {
  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Shop By Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CategoryItem 
          title="Shoes" 
          description="Step into style with our premium footwear collection."
          image="/images/categories/shoes-category.jpg"
          link="/store?category=shoes"
        />
        <CategoryItem 
          title="Clothing" 
          description="Express yourself with our trendy fashion pieces." 
          image="/images/categories/clothing-category.jpg" 
          link="/store?category=clothing" 
        />
        <CategoryItem 
          title="Gadgets" 
          description="Elevate your tech game with our cutting-edge gadgets."
          image="/images/categories/gadgets-category.jpg"
          link="/store?category=gadgets"
        />
      </div>
    </section>
  );
};

export default CategoryShowcase;
