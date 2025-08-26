
"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { productFilters } from '@/lib/placeholder-data';
import type { Product } from '@/lib/types';
import { getProducts } from '@/services/productService';
import { Skeleton } from '@/components/ui/skeleton';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronsUpDown } from 'lucide-react';


function ProductsPageContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const categoryQuery = searchParams.get('category') || 'All';

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<[number]>([productFilters.priceRange.max]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsFromDb = await getProducts();
        setAllProducts(productsFromDb);
        setProducts(productsFromDb);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...allProducts];

    // Filter by category
    if (categoryQuery && categoryQuery !== 'All') {
        filtered = filtered.filter(p => p.category.toLowerCase() === categoryQuery.toLowerCase());
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Filter by price
    filtered = filtered.filter(p => p.price <= priceRange[0]);

    // Filter by color
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p => selectedColors.includes(p.color));
    }
    
    // Sort
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else {
       // Default to newest
       filtered.sort((a, b) => a.id.localeCompare(b.id));
    }

    setProducts(filtered);
  }, [priceRange, selectedColors, sortBy, allProducts, searchQuery, categoryQuery]);
  
  const handleColorChange = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };
  
  const resetFilters = () => {
    setPriceRange([productFilters.priceRange.max]);
    setSelectedColors([]);
    setSortBy('newest');
  };

  const FilterSidebar = () => (
     <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="price-range" className="font-semibold">Price Range</Label>
            <div className="flex justify-between items-center mt-2 text-sm">
              <span>₹{productFilters.priceRange.min}</span>
              <span>₹{priceRange[0]}</span>
            </div>
            <Slider
              id="price-range"
              min={productFilters.priceRange.min}
              max={productFilters.priceRange.max}
              step={10}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number])}
              className="mt-2"
            />
          </div>
          <div>
            <h4 className="font-semibold">Color</h4>
            <div className="mt-2 space-y-2">
              {productFilters.colors.slice(0, 6).map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`color-${color}`}
                    checked={selectedColors.includes(color)}
                    onCheckedChange={() => handleColorChange(color)}
                  />
                  <Label htmlFor={`color-${color}`} className="font-normal">{color}</Label>
                </div>
              ))}
            </div>
          </div>
          <Button onClick={resetFilters} variant="outline" className="w-full">Reset Filters</Button>
        </CardContent>
      </Card>
  );

  return (
    <div className="bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline">{categoryQuery}</h1>
            <p className="text-muted-foreground mt-2">Find your next favorite piece from our curated collection.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
             {/* Desktop Filters */}
             <div className="hidden lg:block">
              <FilterSidebar />
             </div>
             {/* Mobile/Tablet Collapsible Filters */}
             <div className="lg:hidden">
              <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span>Filters</span>
                    <ChevronsUpDown className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <FilterSidebar />
                </CollapsibleContent>
              </Collapsible>
             </div>
          </aside>
          
          {/* Product Grid */}
          <main className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">{loading ? 'Loading...' : `${products.length} products`}</p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i}>
                            <Skeleton className="h-64 w-full" />
                            <CardContent className="p-4 space-y-2">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </CardContent>
                            <CardFooter className="p-4">
                                <Skeleton className="h-10 w-full" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                    </div>
                    {products.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-xl font-semibold">No products found</p>
                        <p className="text-muted-foreground mt-2">Try adjusting your filters or search term.</p>
                    </div>
                    )}
                </>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
