"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { userAddresses } from '@/lib/placeholder-data';
import { useCart } from '@/context/CartContext';
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const [selectedAddress, setSelectedAddress] = useState(userAddresses.find(a => a.isDefault)?.id || userAddresses[0]?.id);
  const [showNewAddressForm, setShowNewAddressForm] = useState(userAddresses.length === 0);
  
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 5.00;
  const taxes = subtotal * 0.08;
  const total = subtotal + shipping + taxes;

  const handlePlaceOrder = () => {
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. You will be redirected to your orders page.",
    });
    clearCart();
    setTimeout(() => {
        router.push('/orders');
    }, 2000);
  };

  return (
    <div className="bg-secondary">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline">Checkout</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                  {!showNewAddressForm && (
                    <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                      {userAddresses.map((address) => (
                        <Label key={address.id} htmlFor={address.id} className="flex items-start space-x-4 p-4 border rounded-md has-[:checked]:bg-accent has-[:checked]:border-primary">
                          <RadioGroupItem value={address.id} id={address.id} />
                          <div>
                            <p className="font-semibold">{address.name}</p>
                            <p className="text-sm text-muted-foreground">{address.addressLine1}, {address.addressLine2}</p>
                            <p className="text-sm text-muted-foreground">{address.city}, {address.state} {address.zip}</p>
                          </div>
                        </Label>
                      ))}
                    </RadioGroup>
                  )}
                  {showNewAddressForm && (
                     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="John Doe" />
                        </div>
                        <div className="sm:col-span-2">
                            <Label htmlFor="address">Address Line</Label>
                            <Input id="address" placeholder="123 Market St" />
                        </div>
                        <div>
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="Metropolis" />
                        </div>
                         <div>
                            <Label htmlFor="state">State</Label>
                            <Input id="state" placeholder="NY" />
                        </div>
                        <div>
                            <Label htmlFor="zip">ZIP Code</Label>
                            <Input id="zip" placeholder="10001" />
                        </div>
                         <div>
                            <Label htmlFor="country">Country</Label>
                            <Input id="country" placeholder="USA" />
                        </div>
                        <div className="sm:col-span-2 flex justify-end">
                            <Button variant="outline" onClick={() => setShowNewAddressForm(false)}>Cancel</Button>
                            <Button className="ml-2">Save Address</Button>
                        </div>
                     </div>
                  )}
                  {!showNewAddressForm && (
                     <Button variant="outline" className="mt-4" onClick={() => setShowNewAddressForm(true)}>Add New Address</Button>
                  )}
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>All transactions are secure and encrypted.</CardDescription>
                </CardHeader>
                <CardContent>
                   <RadioGroup defaultValue="card">
                      <Label htmlFor="card" className="flex items-start space-x-4 p-4 border rounded-md has-[:checked]:bg-accent has-[:checked]:border-primary">
                        <RadioGroupItem value="card" id="card" />
                        <div className="w-full">
                          <p className="font-semibold">Credit/Debit Card</p>
                          <div className="mt-4 grid gap-4">
                            <div>
                                <Label htmlFor="card-number">Card Number</Label>
                                <Input id="card-number" placeholder="**** **** **** 1234" />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="expiry">Expiry</Label>
                                    <Input id="expiry" placeholder="MM/YY" />
                                </div>
                                <div>
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input id="cvc" placeholder="123" />
                                </div>
                            </div>
                          </div>
                        </div>
                      </Label>
                   </RadioGroup>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  {cartItems.map(item => (
                    <div key={item.cartItemId} className="flex justify-between">
                      <span className="text-muted-foreground">{item.name} (x{item.quantity}, {item.selectedSize})</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Taxes</span>
                        <span>${taxes.toFixed(2)}</span>
                    </div>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                 <Button size="lg" className="w-full" variant="destructive" onClick={handlePlaceOrder} disabled={cartItems.length === 0}>
                    Place Order
                  </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
