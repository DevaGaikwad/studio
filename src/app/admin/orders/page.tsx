

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getAllOrders } from '@/services/orderService';
import type { Order } from '@/lib/types';
import { format } from 'date-fns';
import { unstable_noStore as noStore } from 'next/cache';


async function getOrdersData(): Promise<Order[]> {
    noStore();
    try {
        const allOrders = await getAllOrders();
        return allOrders;
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return [];
    }
}

export default async function AdminOrdersPage() {
  const orders = await getOrdersData();

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
             {orders.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">No orders found.</TableCell>
                </TableRow>
             )}
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                     <Link href={`/admin/orders/${order.id}`} className="text-primary hover:underline">
                        {order.id.slice(0, 8)}...
                    </Link>
                  </TableCell>
                  <TableCell>{order.shippingAddress.name}</TableCell>
                  <TableCell>{format(new Date(order.date), 'PPP')}</TableCell>
                  <TableCell>
                    <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
