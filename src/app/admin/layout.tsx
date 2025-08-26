
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
const ADMIN_UIDS = ['2Q3Z4xY6a7b8c9d0E1F2G3H4I5J6k7l8m9n0o1p'];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && (!user || !ADMIN_UIDS.includes(user.uid))) {
      router.push('/login'); // Or a dedicated "unauthorized" page
    }
  }, [user, loading, router]);


  if (loading || !user || !ADMIN_UIDS.includes(user.uid)) {
    return <div className="flex items-center justify-center min-h-screen">Loading admin dashboard...</div>;
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
