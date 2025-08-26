
"use client";

import React, { useState, useEffect } from 'react';
import ProductForm from '../../ProductForm';
import { getProductById } from '@/services/productService';
import type { Product } from '@/lib/types';
import { notFound } from 'next/navigation';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Failed to fetch product for editing:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (!product) {
    return notFound();
  }

  return <ProductForm initialData={product} />;
}
