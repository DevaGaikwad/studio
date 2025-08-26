import Link from 'next/link';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold font-headline">Bombay Cloths</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Your destination for modern and stylish clothing. Quality and comfort guaranteed.
            </p>
             <div className="flex space-x-4 mt-6">
                <Link href="#" aria-label="Facebook"><Facebook className="h-6 w-6 text-muted-foreground hover:text-foreground"/></Link>
                <Link href="#" aria-label="Twitter"><Twitter className="h-6 w-6 text-muted-foreground hover:text-foreground"/></Link>
                <Link href="#" aria-label="Instagram"><Instagram className="h-6 w-6 text-muted-foreground hover:text-foreground"/></Link>
                <Link href="#" aria-label="LinkedIn"><Linkedin className="h-6 w-6 text-muted-foreground hover:text-foreground"/></Link>
             </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold font-headline">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link href="/orders" className="text-muted-foreground hover:text-foreground transition-colors">My Orders</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
           <div>
            <h3 className="text-lg font-semibold font-headline">Customer Service</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link href="/shipping-returns" className="text-muted-foreground hover:text-foreground transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Bombay Cloths. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
