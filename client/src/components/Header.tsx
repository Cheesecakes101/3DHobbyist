import { ShoppingCart } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

export default function Header({ cartItemCount = 0, onCartClick }: HeaderProps) {
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/store", label: "Store" },
    { href: "/custom-print", label: "Custom Print" },
    { href: "/about", label: "About" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground hover-elevate rounded-md px-2 py-1" data-testid="link-home">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            3D
          </div>
          <span>Hobbyist</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
              data-testid={`link-${link.label.toLowerCase().replace(" ", "-")}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onCartClick}
            data-testid="button-cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 h-5 min-w-5 items-center justify-center rounded-full p-0 text-xs"
                data-testid="badge-cart-count"
              >
                {cartItemCount}
              </Badge>
            )}
          </Button>
          <Button asChild data-testid="button-get-quote">
            <Link href="/custom-print">Get Quote</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
