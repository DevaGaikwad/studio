
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, RotateCw } from 'lucide-react';

export default function ShippingReturnsPage() {
  return (
    <div className="bg-secondary">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-bold font-headline">Shipping & Returns</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about our shipping policies and how to make a return.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-3xl">
                        <Truck className="h-8 w-8 text-primary"/>
                        Shipping Policy
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p><strong>Shipping Times:</strong> We strive to process and ship all orders within 1-2 business days. Delivery times vary based on your location:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Metro Cities:</strong> 3-5 business days</li>
                        <li><strong>Other Cities:</strong> 5-7 business days</li>
                        <li><strong>Remote Areas:</strong> 7-10 business days</li>
                    </ul>
                    <p><strong>Shipping Costs:</strong> We offer FREE shipping on all prepaid orders over ₹500. A flat rate of ₹50 is charged for all other orders, including Cash on Delivery.</p>
                    <p><strong>Tracking:</strong> Once your order is shipped, you will receive an email and SMS with your tracking details. You can track your package in real-time until it reaches your doorstep.</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-3xl">
                        <RotateCw className="h-8 w-8 text-primary"/>
                        Return & Exchange Policy
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p><strong>15-Day Easy Returns:</strong> We want you to love your purchase. If you're not completely satisfied, you can return or exchange eligible items within 15 days of delivery.</p>
                    <p><strong>Conditions for Return/Exchange:</strong></p>
                     <ul className="list-disc list-inside space-y-2">
                        <li>Items must be unused, unworn, and in their original condition.</li>
                        <li>All original tags and packaging must be intact.</li>
                        <li>Items marked as 'Final Sale' cannot be returned.</li>
                    </ul>
                    <p><strong>How to Initiate a Return:</strong></p>
                     <ol className="list-decimal list-inside space-y-2">
                        <li>Log in to your Bombay Cloths account and go to the "My Orders" section.</li>
                        <li>Select the order containing the item you wish to return.</li>
                        <li>Click on the 'Return/Exchange' button and follow the on-screen instructions.</li>
                    </ol>
                     <p><strong>Refunds:</strong> Once we receive and inspect the returned item, we will process your refund. For prepaid orders, the amount will be credited to your original payment source. For COD orders, the amount will be provided as store credit.</p>
                </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
