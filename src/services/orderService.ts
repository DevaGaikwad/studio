import { db } from '@/lib/firebase';
import type { Order, OrderFromDB } from '@/lib/types';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';

export async function addOrder(orderData: Omit<Order, 'id' | 'date'>): Promise<string> {
    const ordersCollectionRef = collection(db, 'users', orderData.userId, 'orders');
    const docRef = await addDoc(ordersCollectionRef, {
        ...orderData,
        date: serverTimestamp(),
    });
    return docRef.id;
}

export async function getOrders(userId: string): Promise<Order[]> {
    const ordersCollectionRef = collection(db, 'users', userId, 'orders');
    const q = query(ordersCollectionRef, orderBy('date', 'desc'));
    const orderSnapshot = await getDocs(q);
    const ordersList = orderSnapshot.docs.map(doc => {
        const data = doc.data() as OrderFromDB;
        // Convert Firestore Timestamp to ISO string
        const order: Order = {
            ...data,
            id: doc.id,
            date: data.date.toDate().toISOString(),
        };
        return order;
    });
    return ordersList;
}