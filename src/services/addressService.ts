import { db } from '@/lib/firebase';
import type { Address } from '@/lib/types';
import { collection, addDoc, getDocs, doc } from 'firebase/firestore';

export async function addAddress(userId: string, addressData: Omit<Address, 'id'>): Promise<string> {
    const addressesCollection = collection(db, 'users', userId, 'addresses');
    const docRef = await addDoc(addressesCollection, addressData);
    return docRef.id;
}

export async function getAddresses(userId: string): Promise<Address[]> {
    const addressesCollection = collection(db, 'users', userId, 'addresses');
    const addressSnapshot = await getDocs(addressesCollection);
    const addressesList = addressSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Address));
    return addressesList;
}