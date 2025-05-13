
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '@/lib/data';
import { Product } from '@/types';
import ProductCard from '@/components/shared/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest';

const Store = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort products
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, priceRange, sortBy]);
  
  // Update URL when category changes
  useEffect(() => {
    if (selectedCategory && selectedCategory !== 'all') {
      searchParams.set('category', selectedCategory);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  }, [selectedCategory, searchParams, setSearchParams]);
  
  // Initialize from URL params
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">
            {selectedCategory ? 
              (selectedCategory === 'all' ? 'All Products' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`) : 
              'All Products'
            }
          </h1>
          <p className="text-gray-500 mt-2">
            Browse our collection of premium products
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Sort - Desktop */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="relative w-full md:w-auto mb-4 md:mb-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full md:w-80"
            />
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
            {/* Mobile filter button */}
            <Button 
              variant="outline" 
              className="flex items-center justify-between md:hidden"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              Filters
              {mobileFiltersOpen ? (
                <ChevronUp className="h-4 w-4 ml-2" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-2" />
              )}
            </Button>
            
            {/* Sort dropdown */}
            <div className="w-full md:w-auto">
              <Select 
                value={sortBy}
                onValueChange={(value) => setSortBy(value as SortOption)}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 mr-8 flex-shrink-0">
            <div className="bg-white rounded-lg border p-4">
              <h3 className="font-medium mb-4">Filters</h3>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Category</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox 
                      id="all-category"
                      checked={selectedCategory === 'all' || !selectedCategory}
                      onCheckedChange={() => setSelectedCategory('all')}
                    />
                    <Label htmlFor="all-category" className="ml-2">All</Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox 
                      id="shoes-category"
                      checked={selectedCategory === 'shoes'}
                      onCheckedChange={() => setSelectedCategory('shoes')}
                    />
                    <Label htmlFor="shoes-category" className="ml-2">Shoes</Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox 
                      id="clothing-category"
                      checked={selectedCategory === 'clothing'}
                      onCheckedChange={() => setSelectedCategory('clothing')}
                    />
                    <Label htmlFor="clothing-category" className="ml-2">Clothing</Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox 
                      id="gadgets-category"
                      checked={selectedCategory === 'gadgets'}
                      onCheckedChange={() => setSelectedCategory('gadgets')}
                    />
                    <Label htmlFor="gadgets-category" className="ml-2">Gadgets</Label>
                  </div>
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <h4 className="text-sm font-medium mb-2">Price Range</h4>
                <div className="px-2">
                  <Slider
                    min={0}
                    max={200}
                    step={5}
                    value={[priceRange[0], priceRange[1]]}
                    onValueChange={(value) => setPriceRange([value[0], value[1]])}
                    className="mt-6"
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm">${priceRange[0]}</span>
                  <span className="text-sm">${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Filters - Mobile */}
          <div 
            className={cn(
              "md:hidden w-full mb-6 transition-all duration-300",
              mobileFiltersOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
            )}
          >
            <div className="bg-white rounded-lg border p-4">
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Category</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox 
                      id="all-category-mobile"
                      checked={selectedCategory === 'all' || !selectedCategory}
                      onCheckedChange={() => setSelectedCategory('all')}
                    />
                    <Label htmlFor="all-category-mobile" className="ml-2">All</Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox 
                      id="shoes-category-mobile"
                      checked={selectedCategory === 'shoes'}
                      onCheckedChange={() => setSelectedCategory('shoes')}
                    />
                    <Label htmlFor="shoes-category-mobile" className="ml-2">Shoes</Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox 
                      id="clothing-category-mobile"
                      checked={selectedCategory === 'clothing'}
                      onCheckedChange={() => setSelectedCategory('clothing')}
                    />
                    <Label htmlFor="clothing-category-mobile" className="ml-2">Clothing</Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox 
                      id="gadgets-category-mobile"
                      checked={selectedCategory === 'gadgets'}
                      onCheckedChange={() => setSelectedCategory('gadgets')}
                    />
                    <Label htmlFor="gadgets-category-mobile" className="ml-2">Gadgets</Label>
                  </div>
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <h4 className="text-sm font-medium mb-2">Price Range</h4>
                <div className="px-2">
                  <Slider
                    min={0}
                    max={200}
                    step={5}
                    value={[priceRange[0], priceRange[1]]}
                    onValueChange={(value) => setPriceRange([value[0], value[1]])}
                    className="mt-6"
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm">${priceRange[0]}</span>
                  <span className="text-sm">${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <X className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">No Products Found</h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setPriceRange([0, 200]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
