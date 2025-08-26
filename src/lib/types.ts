
import { CartItem } from "@/context/CartContext";
import { Timestamp } from "firebase/firestore";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  color: string;
  sizes: string[];
  imageUrl: string;
  images: string[];
  description: string;
  aiHint: string;
};

export type Address = {
    id: string;
    name: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
};

export type Order = {
    id: string;
    userId: string;
    date: string; // Should be ISO string
    status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    total: number;
    items: CartItem[];
    shippingAddress: Address;
    paymentMethod: string;
};

// This is the type for data coming from Firestore
export type OrderFromDB = Omit<Order, 'date'> & {
  date: Timestamp;
};
