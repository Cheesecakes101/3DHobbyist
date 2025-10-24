import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import SwipeableProductGallery from "@/components/SwipeableProductGallery";
import ShoppingCartDrawer from "@/components/ShoppingCartDrawer";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@shared/types";

export default function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart, getCartItemCount } = useCart();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featuredProducts = products.slice(0, 3);

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId, 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        cartItemCount={getCartItemCount()}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main className="flex-1">
        <Hero />
        <ServicesSection />
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold tracking-tight" data-testid="text-featured-title">
                  Featured Products
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Check out our popular 3D printed items
                </p>
              </div>
              <Button variant="outline" asChild data-testid="button-view-all">
                <Link href="/store">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-8">
              {isLoading ? (
                <div className="text-center text-muted-foreground">Loading products...</div>
              ) : (
                <SwipeableProductGallery
                  products={featuredProducts.map(p => ({
                    id: p.id,
                    name: p.name,
                    price: parseFloat(p.price),
                    image: p.image,
                    category: p.category,
                    isPopular: p.category === "Accessories",
                  }))}
                  onAddToCart={handleAddToCart}
                />
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      <ShoppingCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}
