import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import type { Order, OrderFromDB } from '@/lib/types';

// Stores orders in a subcollection under the user's document
// /users/{userId}/orders/{orderId}

export async function addOrder(orderData: Omit<Order, 'id' | 'date'>): Promise<string> {
    const ordersCollection = collection(db, 'users', orderData.userId, 'orders');
    const docRef = await addDoc(ordersCollection, {
        ...orderData,
        date: serverTimestamp() // Use server timestamp for reliability
    });
    return docRef.id;
}

export async function getOrders(userId: string): Promise<Order[]> {
    const ordersCollection = collection(db, 'users', userId, 'orders');
    // Order by date, most recent first
    const q = query(ordersCollection, orderBy('date', 'desc'));
    const orderSnapshot = await getDocs(q);

    const orderList = orderSnapshot.docs.map(doc => {
        const data = doc.data() as OrderFromDB;
        // Convert Firestore Timestamp to ISO string for consistency
        const order: Order = {
            ...data,
            id: doc.id,
            date: data.date.toDate().toISOString(),
        };
        return order;
    });

    return orderList;
}
