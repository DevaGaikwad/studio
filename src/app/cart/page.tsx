"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function CartPage() {
  const { cartItems, updateQuantity, updateSize, removeItem } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 50.00 : 0;
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
                    <div key={item.cartItemId}>
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
                          <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                           <Select value={item.selectedSize} onValueChange={(newSize) => updateSize(item.cartItemId, newSize)}>
                                <SelectTrigger className="w-[120px] mt-2 h-8 text-xs">
                                <SelectValue placeholder="Select a size" />
                                </SelectTrigger>
                                <SelectContent>
                                {item.sizes.map(size => (
                                    <SelectItem key={size} value={size}>{size}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input readOnly value={item.quantity} className="h-8 w-12 text-center" />
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="font-semibold w-20 text-right">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.cartItemId)}>
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
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{shipping.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
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
