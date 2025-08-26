
import { db } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

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

export async function addProduct(productData: Omit<Product, 'id'>): Promise<string> {
    const productsCollection = collection(db, 'products');
    const docRef = await addDoc(productsCollection, productData);
    return docRef.id;
}

export async function updateProduct(id: string, productData: Partial<Omit<Product, 'id'>>): Promise<void> {
    const productDocRef = doc(db, 'products', id);
    await updateDoc(productDocRef, productData);
}

export async function deleteProduct(id: string): Promise<void> {
    const productDocRef = doc(db, 'products', id);
    await deleteDoc(productDocRef);
}
