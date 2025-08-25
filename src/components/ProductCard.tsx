"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast"

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  aiHint: string;
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast()

  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
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
      <CardContent className="p-4">
        <CardTitle className="text-base font-semibold leading-tight">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </CardTitle>
        <CardDescription className="mt-2 text-lg font-bold">
          ${product.price.toFixed(2)}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="destructive" className="w-full" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
