"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize);
    }
  }

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 flex flex-col">
      <Link href={`/products/${product.id}`}>
        <CardHeader className="p-0">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-auto aspect-square object-cover"
            data-ai-hint={product.aiHint}
          />
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-base font-semibold leading-tight">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </CardTitle>
        <CardDescription className="mt-2 text-lg font-bold">
          ${product.price.toFixed(2)}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start gap-4">
          <div className="w-full">
            <Label htmlFor={`size-select-${product.id}`} className="sr-only">Size</Label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger id={`size-select-${product.id}`} className="w-full">
                    <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                {product.sizes.map(size => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                ))}
                </SelectContent>
            </Select>
          </div>
          <Button variant="destructive" className="w-full" onClick={handleAddToCart}>
              Add to Cart
          </Button>
      </CardFooter>
    </Card>
  );
}
