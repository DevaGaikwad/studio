import { CartItem } from "@/context/CartContext";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  color: string;
  sizes: string[];
  imageUrl: string;
  images: string[];
  rating: number;
  reviews: number;
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
    date: string;
    status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    total: number;
    items: CartItem[];
    shippingAddress: Address;
    paymentMethod: string;
};
