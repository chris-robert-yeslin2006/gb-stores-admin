
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import HeroSlider from '@/components/home/HeroSlider';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import FeaturedProducts from '@/components/home/FeaturedProducts';

const Index = () => {
  return (
    <div>
      {/* Hero Section with Slider */}
      <HeroSlider />
      
      {/* Fashion & Gadgets Highlight */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 btn-shine inline-block">
            Fashion & Gadgets
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium mb-4">
            Original Quality and Affordable
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Exclusive collections for fashion enthusiasts and tech lovers. Discover premium quality products at competitive prices.
          </p>
          <Link to="/store">
            <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-6 text-lg">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Category Showcase */}
      <CategoryShowcase />
      
      {/* Featured Products */}
      <FeaturedProducts />
      
      {/* Call to Action */}
      <section className="py-16 bg-brand-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Connect with us on WhatsApp to get exclusive deals, early access to new products, and special discounts.
          </p>
          <a 
            href="https://chat.whatsapp.com/your-group-link" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-md bg-green-600 hover:bg-green-700 text-white transition-colors text-lg"
          >
            Join WhatsApp Group
          </a>
        </div>
      </section>
    </div>
  );
};

export default Index;
