import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { pastOrders } from '@/lib/placeholder-data';
import { format } from 'date-fns';

export default function OrdersPage() {
  return (
    <div className="bg-secondary min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline">My Orders</h1>
          <p className="text-muted-foreground mt-2">View your order history and track current orders.</p>
        </div>
        
        {pastOrders.length > 0 ? (
          <Card>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {pastOrders.map((order) => (
                  <AccordionItem key={order.id} value={order.id}>
                    <AccordionTrigger className="p-6 hover:no-underline">
                      <div className="flex justify-between items-center w-full">
                        <div className="text-left">
                          <p className="font-semibold">Order ID: {order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            Date: {format(new Date(order.date), 'PPP')}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className={order.status === 'Delivered' ? "bg-green-600 text-white" : ""}>
                            {order.status}
                          </Badge>
                          <p className="font-semibold mt-1">${order.total.toFixed(2)}</p>
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
                              <div key={item.id} className="flex items-center gap-4">
                                <Image
                                  src={item.imageUrl}
                                  alt={item.name}
                                  width={64}
                                  height={64}
                                  className="rounded-md object-cover"
                                  data-ai-hint={item.aiHint}
                                />
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                                <p className="ml-auto font-medium">${item.price.toFixed(2)}</p>
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
            <h2 className="text-2xl font-semibold">No orders yet</h2>
            <p className="mt-2 text-muted-foreground">You haven't placed any orders with us. Let's change that!</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

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
