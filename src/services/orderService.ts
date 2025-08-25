import type { Order } from '@/lib/types';

// NOTE: This service uses browser localStorage for prototyping in Firebase Studio.
// For a production app, you would connect this to a database like Cloud Firestore.

const getOrdersKey = (userId: string) => `orders_${userId}`;

export async function addOrder(orderData: Omit<Order, 'id' | 'date'>): Promise<string> {
    const orders = await getOrders(orderData.userId);
    const newOrder: Order = {
        ...orderData,
        id: `order_${Date.now()}`,
        date: new Date().toISOString(),
    };
    const updatedOrders = [newOrder, ...orders]; // Add new order to the top
    localStorage.setItem(getOrdersKey(orderData.userId), JSON.stringify(updatedOrders));
    return Promise.resolve(newOrder.id);
}

export async function getOrders(userId: string): Promise<Order[]> {
    if (typeof window === 'undefined') return Promise.resolve([]);
    const ordersJson = localStorage.getItem(getOrdersKey(userId));
    const orders = ordersJson ? JSON.parse(ordersJson) : [];
    // Ensure dates are sorted correctly
    orders.sort((a: Order, b: Order) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return Promise.resolve(orders);
}
