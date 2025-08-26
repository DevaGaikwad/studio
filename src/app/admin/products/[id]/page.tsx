
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getProductById } from '@/services/productService';
import { unstable_noStore as noStore } from 'next/cache';
import { Pencil } from 'lucide-react';


async function getProductData(id: string) {
    noStore();
    try {
        const product = await getProductById(id);
        if (!product) {
            notFound();
        }
        return product;
    } catch (error) {
        console.error("Failed to fetch product:", error);
        notFound();
    }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = await getProductData(id);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Details</h1>
        <Link href={`/admin/products/edit/${id}`}>
          <Button>
            <Pencil className="mr-2 h-4 w-4" /> Edit Product
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>Product ID: {product.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{product.description}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
               {product.images.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                         <Image
                            src={img}
                            alt={`${product.name} image ${index + 1}`}
                            fill
                            style={{objectFit: 'cover'}}
                            className="transition-transform hover:scale-105"
                        />
                    </div>
               ))}
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Product Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Price</span>
                        <span className="font-semibold">₹{product.price.toFixed(2)}</span>
                     </div>
                     <Separator />
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Category</span>
                        <Badge variant="outline">{product.category}</Badge>
                     </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Color</span>
                        <span>{product.color}</span>
                     </div>
                     <Separator />
                     <div>
                        <h4 className="font-medium text-muted-foreground mb-2">Available Sizes</h4>
                        <div className="flex flex-wrap gap-2">
                            {product.sizes.map(size => (
                                <Badge key={size} variant="secondary">{size}</Badge>
                            ))}
                        </div>
                     </div>
                     <Separator />
                     <div>
                        <h4 className="font-medium text-muted-foreground mb-2">AI Hint</h4>
                        <p className="text-sm">{product.aiHint}</p>
                     </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
