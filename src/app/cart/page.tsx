"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cartItems as initialCartItems } from '@/lib/placeholder-data';
import { Minus, Plus, Trash2 } from 'lucide-react';
import type { Product } from '@/lib/types';

interface CartItem extends Product {
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      setCartItems(cartItems.filter(item => item.id !== productId));
    } else {
      setCartItems(
        cartItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };
  
  const removeItem = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-secondary">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline">Shopping Cart</h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6 space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <div className="flex items-center gap-4">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="rounded-md object-cover"
                          data-ai-hint={item.aiHint}
                        />
                        <div className="flex-grow">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input readOnly value={item.quantity} className="h-8 w-12 text-center" />
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="font-semibold w-20 text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id)}>
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                      <Separator className="mt-6"/>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/checkout" className="w-full">
                    <Button size="lg" className="w-full" variant="destructive">
                      Proceed to Checkout
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground" />
            <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/products">
              <Button className="mt-6">Start Shopping</Button>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

// Add a dummy Product type to lib/types.ts or similar to avoid TS errors
declare module '@/lib/types' {
  interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    color: string;
    imageUrl: string;
    rating: number;
    reviews: number;
    description: string;
    aiHint: string;
  }
}
