import { db } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export async function getProducts(): Promise<Product[]> {
  const productsCollection = collection(db, 'products');
  const productsSnapshot = await getDocs(productsCollection);
  const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  return productsList;
}

export async function getProductById(id: string): Promise<Product | null> {
    const productDocRef = doc(db, 'products', id);
    const productSnap = await getDoc(productDocRef);

    if (productSnap.exists()) {
        return { id: productSnap.id, ...productSnap.data() } as Product;
    } else {
        return null;
    }
}