"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from "@/hooks/use-toast";
import type { Address, Order } from '@/lib/types';

export default function CheckoutPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { user, loading } = useAuth();
  const { cartItems, clearCart } = useCart();
  
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | undefined>(undefined);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const [newAddress, setNewAddress] = useState({
      name: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zip: '',
      country: 'USA'
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  useEffect(() => {
    // In a real app, fetch addresses from a database
    // For now, we'll start with an empty list
    setShowNewAddressForm(addresses.length === 0);
    if(addresses.length > 0 && !selectedAddressId) {
        setSelectedAddressId(addresses[0].id);
    }
  }, [addresses.length, selectedAddressId]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 5.00;
  const taxes = subtotal * 0.08;
  const total = subtotal + shipping + taxes;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewAddress(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveAddress = () => {
    if(Object.values(newAddress).some(field => field.trim() === '')) {
        toast({ variant: "destructive", title: "Error", description: "Please fill all address fields." });
        return;
    }
    const newAddr: Address = { ...newAddress, id: `addr_${Date.now()}` };
    setAddresses(prev => [...prev, newAddr]);
    setSelectedAddressId(newAddr.id);
    setShowNewAddressForm(false);
    setNewAddress({ name: '', addressLine1: '', addressLine2: '', city: '', state: '', zip: '', country: 'USA' });
    toast({ title: "Address saved!" });
  };

  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
        toast({ variant: "destructive", title: "Error", description: "Please select a shipping address." });
        return;
    }

    const shippingAddress = addresses.find(a => a.id === selectedAddressId);
    if (!shippingAddress) {
        toast({ variant: "destructive", title: "Error", description: "Selected address not found." });
        return;
    }

    const newOrder: Order = {
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString(),
        status: 'Processing',
        total: total,
        items: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
    };
    
    // Save order to localStorage to be displayed on orders page
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([newOrder, ...existingOrders]));

    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. Redirecting to your orders...",
    });
    
    clearCart();
    
    setTimeout(() => {
        router.push('/orders');
    }, 2000);
  };
  
  if (loading || !user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

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
                  {!showNewAddressForm && addresses.length > 0 && (
                    <RadioGroup value={selectedAddressId} onValueChange={setSelectedAddressId}>
                      {addresses.map((address) => (
                        <Label key={address.id} htmlFor={address.id} className="flex items-start space-x-4 p-4 border rounded-md has-[:checked]:bg-accent has-[:checked]:border-primary cursor-pointer">
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
                            <Input id="name" placeholder="John Doe" value={newAddress.name} onChange={handleInputChange} />
                        </div>
                        <div className="sm:col-span-2">
                            <Label htmlFor="addressLine1">Address Line 1</Label>
                            <Input id="addressLine1" placeholder="123 Market St" value={newAddress.addressLine1} onChange={handleInputChange} />
                        </div>
                         <div className="sm:col-span-2">
                            <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                            <Input id="addressLine2" placeholder="Apt 4B" value={newAddress.addressLine2} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="Metropolis" value={newAddress.city} onChange={handleInputChange} />
                        </div>
                         <div>
                            <Label htmlFor="state">State</Label>
                            <Input id="state" placeholder="NY" value={newAddress.state} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="zip">ZIP Code</Label>
                            <Input id="zip" placeholder="10001" value={newAddress.zip} onChange={handleInputChange} />
                        </div>
                         <div>
                            <Label htmlFor="country">Country</Label>
                            <Input id="country" placeholder="USA" value={newAddress.country} onChange={handleInputChange} />
                        </div>
                        <div className="sm:col-span-2 flex justify-end gap-2">
                           {addresses.length > 0 && <Button variant="outline" onClick={() => setShowNewAddressForm(false)}>Cancel</Button> }
                            <Button onClick={handleSaveAddress}>Save Address</Button>
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
                   <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <Label htmlFor="card" className="flex items-start space-x-4 p-4 border rounded-md has-[:checked]:bg-accent has-[:checked]:border-primary cursor-pointer">
                            <RadioGroupItem value="card" id="card" />
                            <div className="w-full">
                            <p className="font-semibold">Card / Razorpay</p>
                            <div className="mt-4 grid gap-4">
                                <div>
                                    <Label htmlFor="card-number">Card Number</Label>
                                    <Input id="card-number" placeholder="**** **** **** 1234" disabled={paymentMethod !== 'card'}/>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="expiry">Expiry</Label>
                                        <Input id="expiry" placeholder="MM/YY" disabled={paymentMethod !== 'card'} />
                                    </div>
                                    <div>
                                        <Label htmlFor="cvc">CVC</Label>
                                        <Input id="cvc" placeholder="123" disabled={paymentMethod !== 'card'} />
                                    </div>
                                </div>
                            </div>
                            </div>
                        </Label>
                         <Label htmlFor="cod" className="flex items-start space-x-4 p-4 border rounded-md has-[:checked]:bg-accent has-[:checked]:border-primary cursor-pointer">
                            <RadioGroupItem value="cod" id="cod" />
                            <div>
                                <p className="font-semibold">Cash on Delivery (COD)</p>
                                <p className="text-sm text-muted-foreground mt-2">Pay with cash upon delivery of your order.</p>
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
              <CardContent>
                 <div className="space-y-2 text-sm">
                  {cartItems.map(item => (
                    <div key={item.cartItemId} className="flex justify-between">
                      <span className="text-muted-foreground">{item.name} (x{item.quantity}, {item.selectedSize})</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4"/>
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
                <Separator className="my-4"/>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                 <Button size="lg" className="w-full" variant="destructive" onClick={handlePlaceOrder} disabled={cartItems.length === 0 || loading}>
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
