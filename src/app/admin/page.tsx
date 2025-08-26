

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllOrders } from "@/services/orderService";
import { getAllUsers } from "@/services/userService";
import { getProducts } from "@/services/productService";
import { DollarSign, Package, Users, ShoppingCart, Terminal } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


function ServiceAccountNotice({ userCount }: { userCount: number }) {
    if (process.env.NODE_ENV === 'production' || userCount > 0) return null;

    return (
        <Alert className="mb-6">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Developer Notice</AlertTitle>
            <AlertDescription>
               The "Users" count is zero because a Firebase `serviceAccountKey.json` was not found in the project root. This is required for local development to fetch user data.
            </AlertDescription>
        </Alert>
    )
}

async function getStats() {
    noStore();
    try {
        const usersPromise = getAllUsers();

        const [orders, users, products] = await Promise.all([
            getAllOrders(),
            usersPromise,
            getProducts()
        ]);

        const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

        return {
            totalRevenue,
            totalOrders: orders.length,
            totalUsers: users.length,
            totalProducts: products.length,
        }
    } catch (error) {
        console.error("Failed to fetch admin stats:", error);
        // Attempt to fetch other stats even if one fails
         const [orders, products] = await Promise.all([
            getAllOrders().catch(() => []),
            getProducts().catch(() => [])
        ]);
         const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
        return {
            totalRevenue,
            totalOrders: orders.length,
            totalUsers: 0,
            totalProducts: products.length,
        }
    }
}


export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
       <ServiceAccountNotice userCount={stats.totalUsers} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalRevenue.toFixed(2)}</div>
             <p className="text-xs text-muted-foreground">
              From all orders
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
             <p className="text-xs text-muted-foreground">
              Total orders placed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              Total products in store
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Total registered users
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
