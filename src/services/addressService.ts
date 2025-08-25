import type { Address } from '@/lib/types';

// NOTE: This service uses browser localStorage for prototyping in Firebase Studio.
// For a production app, you would connect this to a database like Cloud Firestore.

const getAddressesKey = (userId: string) => `addresses_${userId}`;

export async function addAddress(userId: string, addressData: Omit<Address, 'id'>): Promise<string> {
    const addresses = await getAddresses(userId);
    const newAddress: Address = {
        ...addressData,
        id: `addr_${Date.now()}`
    };
    const updatedAddresses = [...addresses, newAddress];
    localStorage.setItem(getAddressesKey(userId), JSON.stringify(updatedAddresses));
    return Promise.resolve(newAddress.id);
}

export async function getAddresses(userId: string): Promise<Address[]> {
    if (typeof window === 'undefined') return Promise.resolve([]);
    const addressesJson = localStorage.getItem(getAddressesKey(userId));
    const addresses = addressesJson ? JSON.parse(addressesJson) : [];
    return Promise.resolve(addresses);
}
