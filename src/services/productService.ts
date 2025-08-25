import { products } from '@/lib/placeholder-data';
import type { Product } from '@/lib/types';

// NOTE: This service uses placeholder data for prototyping in Firebase Studio.
// For a production app, you would connect this to a database like Cloud Firestore.

export async function getProducts(): Promise<Product[]> {
  // Simulate async operation
  return Promise.resolve(products);
}

export async function getProductById(id: string): Promise<Product | null> {
    const product = products.find(p => p.id === id) || null;
    // Simulate async operation
    return Promise.resolve(product);
}
