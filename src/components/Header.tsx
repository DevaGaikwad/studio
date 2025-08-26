
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShoppingCart, User, Search, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/lib/placeholder-data';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from './ui/separator';

export function Header() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const currentCategory = searchParams.get('category') || 'All';

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      router.push('/products');
    } else {
      router.push(`/products?q=${encodeURIComponent(searchQuery)}`);
    }
     if (isSheetOpen) setIsSheetOpen(false);
  };
  
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      const params = new URLSearchParams(window.location.search);
      if (value.trim() === '') {
         params.delete('q');
      } else {
         params.set('q', value);
      }
      // Check if on products page before pushing route
      if (window.location.pathname.startsWith('/products')) {
        router.push(`/products?${params.toString()}`, { scroll: false });
      }
  }

  const handleCategoryClick = (categoryName: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set('category', categoryName);
    router.push(`/products?${params.toString()}`);
    if (isSheetOpen) setIsSheetOpen(false);
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
  
  const userActions = (
    <>
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
            <DropdownMenuItem asChild>
              <Link href="/orders" className="flex items-center w-full cursor-pointer">
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>My Orders</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login" passHref>
          <Button>Login</Button>
        </Link>
      )}
    </>
  );

  const mobileUserActions = (
    <div className="mt-auto">
        <Separator className="my-4" />
        {user ? (
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                        <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{user.displayName}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                </div>
                 <Link href="/orders" passHref>
                   <Button variant="outline" className="w-full justify-start" onClick={() => setIsSheetOpen(false)}>
                        <ShoppingCart className="mr-2 h-4 w-4" /> My Orders
                    </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start" onClick={() => { logout(); setIsSheetOpen(false); }}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
            </div>
        ) : (
             <Link href="/login" passHref>
                <Button variant="default" className="w-full" onClick={() => setIsSheetOpen(false)}>
                    <User className="mr-2 h-4 w-4" /> Login
                </Button>
            </Link>
        )}
    </div>
  );

  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Open menu</span>
                      </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0 flex flex-col">
                    <SheetHeader className="p-6 pb-0">
                       <SheetTitle className="sr-only">Menu</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col p-6 h-full">
                        <Link href="/" onClick={() => setIsSheetOpen(false)} className="text-2xl font-bold font-headline text-primary-foreground mb-4">
                          Bombay Cloths
                        </Link>
                        <form onSubmit={handleSearch} className="relative mb-4">
                          <Input
                            type="search"
                            placeholder="Search products..."
                            className="pr-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </form>
                        <nav className="flex flex-col gap-4">
                          {categories.map((category) => (
                            <button
                              key={category.id}
                              onClick={() => handleCategoryClick(category.name)}
                              className={cn(
                                  "text-lg text-left transition-colors",
                                  currentCategory === category.name ? "text-blue-600 font-semibold" : "text-foreground/80 hover:text-foreground"
                              )}
                              >
                              {category.name}
                            </button>
                          ))}
                        </nav>
                        {mobileUserActions}
                    </div>
                  </SheetContent>
              </Sheet>
            </div>
             {/* Logo */}
            <Link href="/" className="text-2xl font-bold font-headline text-primary-foreground">
              Bombay Cloths
            </Link>
          </div>
         
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className={cn(
                    "transition-colors",
                    currentCategory === category.name ? "text-blue-600 font-semibold" : "text-foreground/80 hover:text-foreground"
                )}
              >
                {category.name}
              </button>
            ))}
          </nav>
          
          {/* Actions */}
           <div className="flex items-center gap-2">
            <div className="hidden md:block">
                <form onSubmit={handleSearch} className="relative">
                <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-48 pr-10"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </form>
            </div>
            
            <div className="md:hidden">
              {userActions}
            </div>
            
            <Link href="/cart" passHref>
                <Button variant="ghost" size="icon" aria-label="Open cart" className="relative">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full p-0 text-xs">{cartCount}</Badge>
                )}
                </Button>
            </Link>

            <div className="hidden md:flex">
                {userActions}
            </div>
           </div>
        </div>
      </div>
    </header>
  );
}
