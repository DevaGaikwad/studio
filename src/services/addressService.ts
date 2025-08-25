import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import type { Address } from '@/lib/types';

// Stores addresses in a subcollection under the user's document
// /users/{userId}/addresses/{addressId}

export async function addAddress(userId: string, addressData: Omit<Address, 'id'>): Promise<string> {
    const addressesCollection = collection(db, 'users', userId, 'addresses');
    const docRef = await addDoc(addressesCollection, addressData);
    return docRef.id;
}

export async function getAddresses(userId: string): Promise<Address[]> {
    const addressesCollection = collection(db, 'users', userId, 'addresses');
    const addressSnapshot = await getDocs(addressesCollection);
    const addressList = addressSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Address));
    return addressList;
}
