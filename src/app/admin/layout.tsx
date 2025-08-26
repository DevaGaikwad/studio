
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, ShoppingCart, Users, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/users', label: 'Users', icon: Users },
];

// For now, we'll use a simple array of admin UIDs. 
// In a real-world scenario, this should be a role-based system in your database.
const ADMIN_UIDS = ['Dm57qveYZhTC6BrRB6V0XlnfVwG3', 'F2G3H4I5J6k7l8m9n0o1p2Q3Z4xY6a7b8c9d0E1'];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/admin');
    }
  }, [user, loading, router]);


  if (loading || !user) {
    return <div className="flex items-center justify-center min-h-screen">Loading admin dashboard...</div>;
  }
  
  if (!ADMIN_UIDS.includes(user.uid)) {
     return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-3xl font-bold">Unauthorized</h1>
        <p className="mt-2 text-muted-foreground">You do not have permission to view this page.</p>
        <p className="text-sm text-muted-foreground mt-4">Your UID: {user.uid}</p>
         <Link href="/" className="mt-4 text-sm text-primary hover:underline">
            Go back to the homepage
          </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-card border-r flex-shrink-0">
        <div className="p-6">
          <Link href="/admin">
            <h1 className="text-2xl font-bold font-headline">Admin Panel</h1>
          </Link>
        </div>
        <nav className="flex flex-col p-4">
          {adminNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname === item.href && 'bg-accent text-primary'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-secondary">
        {children}
      </main>
    </div>
  );
}
