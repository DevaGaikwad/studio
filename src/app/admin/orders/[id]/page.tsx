
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { getOrderById, updateOrderStatus } from '@/services/orderService';
import type { Order } from '@/lib/types';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<Order['status']>('Processing');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const fetchedOrder = await getOrderById(id);
        if (fetchedOrder) {
          setOrder(fetchedOrder);
          setStatus(fetchedOrder.status);
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleStatusUpdate = async () => {
      if(!order) return;
      setIsUpdating(true);
      try {
          await updateOrderStatus(order.id, status);
          setOrder(prev => prev ? {...prev, status: status} : null);
          toast({ title: "Status Updated", description: `Order status changed to ${status}.`});
          router.refresh(); // Refresh to show changes if any other part of the page depends on server data
      } catch(error) {
          toast({ variant: "destructive", title: "Update Failed", description: "Could not update the order status." });
      } finally {
          setIsUpdating(false);
      }
  }

  if (loading) return (
       <div className="space-y-6">
        <Skeleton className="h-8 w-1/4" />
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
                 <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/3" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                    </CardContent>
                 </Card>
                 <Card>
                    <CardHeader>
                         <Skeleton className="h-6 w-1/3" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                 </Card>
            </div>
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <Skeleton className="h-4 w-full" />
                         <Skeleton className="h-4 w-full" />
                         <Skeleton className="h-4 w-full" />
                    </CardContent>
                     <CardFooter className="flex-col items-start gap-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </CardFooter>
                </Card>
            </div>
        </div>
       </div>
  );
  if (!order) return notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-4">
                    {order.items.map(item => (
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
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Customer & Shipping</CardTitle>
                </CardHeader>
                <CardContent className="text-sm p-6">
                    <p className="font-semibold">{order.shippingAddress.name}</p>
                    <p className="text-muted-foreground">{order.shippingAddress.addressLine1}</p>
                    {order.shippingAddress.addressLine2 && <p className="text-muted-foreground">{order.shippingAddress.addressLine2}</p>}
                    <p className="text-muted-foreground">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                     <div className="flex justify-between">
                        <span>Order ID</span>
                        <span className="font-mono text-sm">{order.id.slice(0, 8)}...</span>
                     </div>
                     <div className="flex justify-between">
                        <span>Date</span>
                        <span>{format(new Date(order.date), 'PPP')}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span>Status</span>
                        <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>{order.status}</Badge>
                     </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span>₹{order.total.toFixed(2)}</span>
                      </div>
                </CardContent>
                <CardFooter className="flex-col items-start gap-4 p-6">
                    <Label htmlFor="status" className="font-semibold">Update Status</Label>
                    <Select value={status} onValueChange={(value) => setStatus(value as Order['status'])}>
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Change status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Processing">Processing</SelectItem>
                            <SelectItem value="Shipped">Shipped</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={handleStatusUpdate} disabled={isUpdating || status === order.status} className="w-full">
                        {isUpdating ? 'Updating...' : 'Update Status'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
