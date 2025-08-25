"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { getProducts } from '@/services/productService';
import type { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';


export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        // Get top 8 rated products for trending
        const sorted = [...products].sort((a, b) => b.rating - a.rating);
        setTrendingProducts(sorted.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch trending products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="bg-background">
      <Header />
      <main>
        {/* Hero Carousel Section */}
        <section className="w-full">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              <CarouselItem>
                <div className="relative h-[400px] md:h-[600px] w-full">
                  <Image
                    src="https://placehold.co/1600x600.png"
                    alt="Hero Banner 1"
                    fill
                    style={{objectFit:"cover"}}
                    data-ai-hint="fashion sale banner"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white p-4">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">New Winter Collection</h1>
                    <p className="mt-4 text-lg md:text-xl max-w-2xl drop-shadow-md">Stay warm and stylish with our latest arrivals. Unmatched quality and comfort.</p>
                    <Button variant="destructive" size="lg" className="mt-8">Shop Now</Button>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative h-[400px] md:h-[600px] w-full">
                  <Image
                    src="https://placehold.co/1600x600.png"
                    alt="Hero Banner 2"
                    fill
                    style={{objectFit:"cover"}}
                    data-ai-hint="clothing collection model"
                  />
                   <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white p-4">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">Up to 40% Off</h1>
                    <p className="mt-4 text-lg md:text-xl max-w-2xl drop-shadow-md">On selected styles. Don't miss out on the biggest sale of the season!</p>
                    <Button variant="destructive" size="lg" className="mt-8">Explore Deals</Button>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/20 hover:bg-black/40 border-none" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/20 hover:bg-black/40 border-none" />
          </Carousel>
        </section>

        {/* Discount Info Section */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-headline font-semibold text-secondary-foreground">Exclusive Member Discounts</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">Sign up today and get 20% off your first order, plus access to members-only products and sales.</p>
            <Button variant="outline" className="mt-6">Become a Member</Button>
          </div>
        </section>
        
        {/* Top Offers Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center mb-8">Top Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                <CardContent className="p-0">
                  <Image src="https://placehold.co/600x400.png" alt="Offer 1" width={600} height={400} className="w-full h-auto" data-ai-hint="casual shirts"/>
                </CardContent>
                <CardFooter className="p-4 bg-card/80 backdrop-blur-sm">
                  <div>
                    <CardTitle className="text-xl font-semibold">Casual Wear Bundles</CardTitle>
                    <p className="text-muted-foreground mt-1">Buy 2, Get 1 Free</p>
                  </div>
                </CardFooter>
              </Card>
               <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                <CardContent className="p-0">
                  <Image src="https://placehold.co/600x400.png" alt="Offer 2" width={600} height={400} className="w-full h-auto" data-ai-hint="formal trousers"/>
                </CardContent>
                <CardFooter className="p-4 bg-card/80 backdrop-blur-sm">
                   <div>
                    <CardTitle className="text-xl font-semibold">Formal Trousers</CardTitle>
                    <p className="text-muted-foreground mt-1">Flat 30% Off</p>
                  </div>
                </CardFooter>
              </Card>
               <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                <CardContent className="p-0">
                  <Image src="https://placehold.co/600x400.png" alt="Offer 3" width={600} height={400} className="w-full h-auto" data-ai-hint="ethnic wear"/>
                </CardContent>
                <CardFooter className="p-4 bg-card/80 backdrop-blur-sm">
                   <div>
                    <CardTitle className="text-xl font-semibold">Ethnic Collection</CardTitle>
                    <p className="text-muted-foreground mt-1">Starting at $49</p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Trending Products Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center mb-8">Trending Products</h2>
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {[...Array(8)].map((_, i) => (
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {trendingProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
