
import { db } from '@/lib/firebase';
import type { Order, OrderFromDB } from '@/lib/types';
import { collection, collectionGroup, addDoc, getDocs, getDoc, serverTimestamp, query, orderBy, doc, updateDoc, where } from 'firebase/firestore';

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
    const ordersQuery = query(collectionGroup(db, 'orders'));
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
    // Manual sort on the client-side as a fallback
    return ordersList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

async function findOrderDocRef(orderId: string) {
    // This is not efficient, but it works without knowing the user ID.
    // A better approach in a large-scale app would be a root-level `orders` collection.
    const ordersQuery = query(collectionGroup(db, 'orders'));
    const querySnapshot = await getDocs(ordersQuery);
    for (const doc of querySnapshot.docs) {
        if(doc.id === orderId) {
            return doc.ref;
        }
    }
    return null;
}


export async function getOrderById(orderId: string): Promise<Order | null> {
    const orderDocRef = await findOrderDocRef(orderId);
    if (!orderDocRef) return null;

    const orderSnap = await getDoc(orderDocRef);
     if (orderSnap.exists()) {
        const data = orderSnap.data() as OrderFromDB;
        return { ...data, id: orderSnap.id, date: data.date.toDate().toISOString() };
    }
    return null;
}

export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    const orderDocRef = await findOrderDocRef(orderId);
     if (orderDocRef) {
        await updateDoc(orderDocRef, { status });
    } else {
        throw new Error("Order not found");
    }
}
