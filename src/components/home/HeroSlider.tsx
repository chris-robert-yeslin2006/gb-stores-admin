
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

// Demo slides data
const slides: Slide[] = [
  {
    id: 1,
    image: '/images/slider/nike-slider.jpg',
    title: 'Nike Collection',
    subtitle: 'Just Do It',
    description: 'High quality Nike shoes in all sizes',
  },
  {
    id: 2,
    image: '/images/slider/imported-slider.jpg',
    title: 'Imported Shoes',
    subtitle: 'Premium Selection',
    description: 'High quality imported shoes in all sizes',
  },
  {
    id: 3,
    image: '/images/slider/converse-slider.jpg',
    title: 'Converse',
    subtitle: 'Classic Style',
    description: 'High quality Converse shoes in all sizes',
  },
  {
    id: 4,
    image: '/images/slider/puma-slider.jpg',
    title: 'Puma',
    subtitle: 'Forever Faster',
    description: 'High quality Puma shoes in all sizes',
  },
  {
    id: 5,
    image: '/images/slider/adidas-slider.jpg',
    title: 'Adidas',
    subtitle: 'Impossible Is Nothing',
    description: 'High quality Adidas shoes in all sizes',
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);

  const goToNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              currentSlide === index ? "opacity-100" : "opacity-0"
            )}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
            
            {/* Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            
            {/* Content */}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-xl text-white">
                  <h2 className="text-5xl font-bold mb-2">{slide.title}</h2>
                  <h3 className="text-2xl font-medium mb-4">{slide.subtitle}</h3>
                  <p className="text-lg mb-6">{slide.description}</p>
                  <Link to="/store">
                    <Button className="bg-brand-secondary hover:bg-brand-secondary/90 text-white">
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all"
      >
        <ArrowLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all"
      >
        <ArrowRight className="h-6 w-6 text-white" />
      </button>

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentSlide === index
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/80"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
