"use client";

import React, { useState, use } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { products as allProducts, productFilters } from '@/lib/placeholder-data';
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

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { addToCart } = useCart();
  const { id } = use(params);
  const product = allProducts.find((p) => p.id === id);
  
  const [selectedImage, setSelectedImage] = useState(product?.images[0] || 'https://placehold.co/600x600.png');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.color || '');

  if (!product) {
    notFound();
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
            
            <Button size="lg" className="w-full mb-4" variant="destructive" onClick={handleAddToCart}>Add to Cart</Button>

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
