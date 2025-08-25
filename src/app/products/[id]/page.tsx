"use client";

import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { productFilters } from '@/lib/placeholder-data';
import { Star, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { getProductById } from '@/services/productService';
import type { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { addToCart } = useCart();
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await getProductById(id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setSelectedImage(fetchedProduct.images[0] || 'https://placehold.co/600x600.png');
          setSelectedSize(fetchedProduct.sizes[0] || '');
          setSelectedColor(fetchedProduct.color || '');
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
       <div className="bg-secondary">
        <Header />
         <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
               <div>
                  <Skeleton className="aspect-square w-full rounded-lg" />
                  <div className="grid grid-cols-5 gap-2 mt-4">
                     {[...Array(4)].map((_, i) => <Skeleton key={i} className="aspect-square w-full rounded-md" />)}
                  </div>
               </div>
               <div className="space-y-6">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-10 w-1/2" />
                  <Separator />
                  <div className="space-y-4">
                     <Skeleton className="h-6 w-1/4" />
                     <Skeleton className="h-10 w-1/2" />
                  </div>
                   <Skeleton className="h-12 w-full" />
               </div>
            </div>
         </div>
        <Footer />
       </div>
    );
  }
  
  if (!product) {
    // This will be handled by the notFound() in useEffect, but as a fallback
    return notFound();
  }

  const handleAddToCart = () => {
    if (selectedSize) {
        addToCart(product, selectedSize);
    }
  }

  return (
    <div className="bg-secondary">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Product Images */}
          <div className="grid grid-cols-1 gap-4">
            <div className="aspect-square rounded-lg overflow-hidden border">
              <Image
                src={selectedImage}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square rounded-md overflow-hidden border-2 ${selectedImage === image ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold font-headline mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                ))}
              </div>
              <span className="text-muted-foreground text-sm">{product.rating} ({product.reviews} reviews)</span>
            </div>
            <p className="text-3xl font-bold mb-6">${product.price.toFixed(2)}</p>

            <div className="space-y-6">
                {/* Color Selector */}
                <div>
                    <Label className="text-sm font-semibold">Color: {selectedColor}</Label>
                    <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex gap-2 mt-2">
                        {productFilters.colors.slice(0, 5).map(color => (
                            <RadioGroupItem
                                key={color}
                                value={color}
                                id={`color-${color}`}
                                className="sr-only"
                            />
                        ))}
                    </RadioGroup>
                </div>
            </div>

            <Separator className="my-8" />
            
            <div className="mb-6">
                <Label className="text-sm font-semibold" htmlFor="size-select">Size</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger id="size-select" className="w-[180px] mt-2">
                    <SelectValue placeholder="Select a size" />
                    </SelectTrigger>
                    <SelectContent>
                    {product.sizes.map(size => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
            </div>
            
            <Button size="lg" className="w-full mb-4" variant="destructive" onClick={handleAddToCart} disabled={!selectedSize}>Add to Cart</Button>

            <Card className="mt-6">
              <CardContent className="p-4 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <p>Free shipping on orders over $50</p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
                <h3 className="font-semibold text-xl mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
