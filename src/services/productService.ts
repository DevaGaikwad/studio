import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import type { Product } from '@/lib/types';

const PRODUCTS_COLLECTION = 'products';

// NOTE: In a real app, you'd want to add error handling and possibly caching.
// You would also seed the database with the product data. For this prototype,
// it's assumed the 'products' collection is already populated in Firestore.
// The document ID for each product in Firestore should match the 'id' field in the data.

export async function getProducts(): Promise<Product[]> {
  const productsCollection = collection(db, PRODUCTS_COLLECTION);
  const productSnapshot = await getDocs(productsCollection);
  const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  return productList;
}

export async function getProductById(id: string): Promise<Product | null> {
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
        return { id: productSnap.id, ...productSnap.data() } as Product;
    } else {
        console.warn(`Product with id ${id} not found.`);
        return null;
    }
}
