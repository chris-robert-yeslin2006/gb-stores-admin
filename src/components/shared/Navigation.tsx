
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/lib/contexts/CartContext";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const { getCartItemCount } = useCart();
  const { user, isAdmin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItemCount = getCartItemCount();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-white shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="logo-circle">GB</div>
            <span className={cn(
              "font-semibold text-xl transition-colors",
              isScrolled ? "text-brand-primary" : "text-brand-primary"
            )}>
              stores
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className={cn(
                      "px-4 py-2 text-sm font-medium",
                      isScrolled ? "text-gray-800" : "text-gray-800"
                    )}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(
                    isScrolled ? "text-gray-800" : "text-gray-800"
                  )}>
                    Store
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3">
                      <li>
                        <Link 
                          to="/store?category=shoes" 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Shoes</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Browse our collection of premium shoes
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/store?category=clothing" 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Clothing</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Check out our latest fashion items
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/store?category=gadgets" 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Gadgets</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Discover cool tech and accessories
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/contact">
                    <NavigationMenuLink className={cn(
                      "px-4 py-2 text-sm font-medium",
                      isScrolled ? "text-gray-800" : "text-gray-800"
                    )}>
                      Contact Us
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {isAdmin && (
              <Link to="/admin">
                <Button variant="ghost" className="text-sm">
                  Admin Panel
                </Button>
              </Link>
            )}
            
            {!user && (
              <Link to="/login">
                <Button variant="outline" className="text-sm">
                  Login
                </Button>
              </Link>
            )}
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-brand-secondary"
                    variant="secondary"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="py-4 px-6 space-y-3">
            <Link 
              to="/" 
              className="block py-2 font-medium" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/store" 
              className="block py-2 font-medium" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Store
            </Link>
            <Link 
              to="/store?category=shoes" 
              className="block py-2 pl-4 text-sm" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Shoes
            </Link>
            <Link 
              to="/store?category=clothing" 
              className="block py-2 pl-4 text-sm" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Clothing
            </Link>
            <Link 
              to="/store?category=gadgets" 
              className="block py-2 pl-4 text-sm" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Gadgets
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 font-medium" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
