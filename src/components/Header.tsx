"use client"

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/lib/placeholder-data';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold font-headline text-primary-foreground">
            Bombay Cloths
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {categories.map((category) => (
              <Link key={category.id} href="/products" className="text-foreground/80 hover:text-foreground transition-colors">
                {category.name}
              </Link>
            ))}
          </nav>
          
          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Input type="search" placeholder="Search..." className="w-48 pr-10" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <Link href="/cart">
              <Button variant="ghost" size="icon" aria-label="Open cart">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">{cartCount}</Badge>
                )}
              </Button>
            </Link>
            
            {user ? (
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                      <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/orders" className="flex items-center w-full">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      <span>My Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
          
          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col p-6 gap-6">
                  <Link href="/" className="text-2xl font-bold font-headline text-primary-foreground mb-4">
                    Bombay Cloths
                  </Link>
                  <div className="relative mb-4">
                    <Input type="search" placeholder="Search..." className="pr-10" />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                  {categories.map((category) => (
                    <Link key={category.id} href="/products" className="text-lg text-foreground/80 hover:text-foreground transition-colors">
                      {category.name}
                    </Link>
                  ))}
                  <div className="mt-auto flex flex-col gap-4">
                     <Link href="/cart">
                        <Button variant="outline" className="w-full justify-start gap-2">
                           <ShoppingCart className="h-5 w-5" />
                           Cart
                           {cartCount > 0 && (
                             <Badge variant="destructive" className="ml-auto">{cartCount}</Badge>
                           )}
                        </Button>
                     </Link>
                     {user ? (
                        <>
                           <Link href="/orders">
                               <Button variant="outline" className="w-full justify-start gap-2">
                                  <ShoppingCart className="h-5 w-5" />
                                  My Orders
                               </Button>
                           </Link>
                           <Button onClick={logout} className="w-full justify-start gap-2">
                                <LogOut className="h-5 w-5" />
                                Logout
                           </Button>
                        </>
                     ) : (
                        <Link href="/login">
                          <Button className="w-full">Login</Button>
                        </Link>
                     )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
