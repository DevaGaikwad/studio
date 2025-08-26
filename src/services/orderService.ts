
import { db } from '@/lib/firebase';
import type { Order, OrderFromDB } from '@/lib/types';
import { collection, collectionGroup, addDoc, getDocs, getDoc, serverTimestamp, query, orderBy, doc, updateDoc } from 'firebase/firestore';

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
        const order: Order = {
            ...data,
            id: doc.id,
            date: data.date.toDate().toISOString(),
        };
        return order;
    });
    return ordersList;
}

// For Admin
export async function getAllOrders(): Promise<Order[]> {
    const ordersQuery = query(collectionGroup(db, 'orders'), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(ordersQuery);
    const ordersList = querySnapshot.docs.map(doc => {
        const data = doc.data() as OrderFromDB;
        const order: Order = {
            ...data,
            id: doc.id,
            date: data.date.toDate().toISOString(),
        };
        return order;
    });
    return ordersList;
}

export async function getOrderById(orderId: string): Promise<Order | null> {
    // This requires a more complex query since we don't know the user ID
    const ordersQuery = query(collectionGroup(db, 'orders'));
    const querySnapshot = await getDocs(ordersQuery);
    
    for (const doc of querySnapshot.docs) {
        if(doc.id === orderId) {
            const data = doc.data() as OrderFromDB;
            return { ...data, id: doc.id, date: data.date.toDate().toISOString() };
        }
    }
    return null;
}

export async function updateOrderStatus(userId: string, orderId: string, status: Order['status']): Promise<void> {
    const orderDocRef = doc(db, 'users', userId, 'orders', orderId);
    await updateDoc(orderDocRef, { status });
}
