"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import type { Order } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import { getOrders } from '@/services/orderService';
import { Skeleton } from '@/components/ui/skeleton';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/orders');
    } else if (user) {
       const fetchOrders = async () => {
         try {
           setLoading(true);
           const userOrders = await getOrders(user.uid);
           setOrders(userOrders);
         } catch (error) {
           console.error("Failed to fetch orders:", error);
         } finally {
           setLoading(false);
         }
       };
       fetchOrders();
    }
  }, [user, authLoading, router]);


  if (authLoading || loading) {
    return (
      <div className="bg-secondary min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
           <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline">My Orders</h1>
            <p className="text-muted-foreground mt-2">View your order history and track current orders.</p>
           </div>
           <Card>
             <CardContent className="p-6 space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
             </CardContent>
           </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline">My Orders</h1>
          <p className="text-muted-foreground mt-2">View your order history and track current orders.</p>
        </div>
        
        {orders.length > 0 ? (
          <Card>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full" defaultValue={orders[0].id}>
                {orders.map((order) => (
                  <AccordionItem key={order.id} value={order.id}>
                    <AccordionTrigger className="p-6 hover:no-underline">
                      <div className="flex justify-between items-center w-full">
                        <div className="text-left">
                          <p className="font-semibold">Order ID: {order.id.slice(0,8)}...</p>
                          <p className="text-sm text-muted-foreground">
                            Date: {format(new Date(order.date), 'PPP')}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className={order.status === 'Delivered' ? "bg-green-600 text-white" : ""}>
                            {order.status}
                          </Badge>
                          <p className="font-semibold mt-1">₹{order.total.toFixed(2)}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-6 pt-0">
                      <Separator className="mb-4" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Items</h4>
                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div key={item.cartItemId} className="flex items-center gap-4">
                                <Image
                                  src={item.imageUrl}
                                  alt={item.name}
                                  width={64}
                                  height={64}
                                  className="rounded-md object-cover"
                                  data-ai-hint={item.aiHint}
                                />
                                <div>
                                  <p className="font-medium">{item.name} ({item.selectedSize})</p>
                                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                                <p className="ml-auto font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Shipping Address</h4>
                          <div className="text-sm text-muted-foreground">
                            <p className="font-medium text-foreground">{order.shippingAddress.name}</p>
                            <p>{order.shippingAddress.addressLine1}</p>
                            {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                          </div>
                           <h4 className="font-semibold mb-2 mt-4">Payment</h4>
                           <p className="text-sm text-muted-foreground">Paid via {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online'}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mt-6">No orders yet</h2>
            <p className="mt-2 text-muted-foreground">You haven't placed any orders with us. Let's change that!</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
