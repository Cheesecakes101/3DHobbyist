import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import SwipeableProductGallery from "@/components/SwipeableProductGallery";
import ShoppingCartDrawer from "@/components/ShoppingCartDrawer";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import phoneStand from "@assets/generated_images/Black_phone_stand_product_8204f3c9.png";
import planter from "@assets/generated_images/Teal_geometric_planter_pot_5bbfd8b1.png";
import keychains from "@assets/generated_images/Colorful_custom_keychains_set_f8212879.png";

export default function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]); // todo: remove mock functionality

  const featuredProducts = [
    {
      id: "1",
      name: "Geometric Phone Stand",
      price: 299,
      image: phoneStand,
      category: "Accessories",
      isPopular: true,
    },
    {
      id: "2",
      name: "Modern Planter Pot",
      price: 449,
      image: planter,
      category: "Home Decor",
      isPopular: false,
    },
    {
      id: "3",
      name: "Custom Keychains",
      price: 99,
      image: keychains,
      category: "Accessories",
      isPopular: true,
    },
  ];

  const handleAddToCart = (productId: string) => {
    const product = featuredProducts.find((p) => p.id === productId);
    if (!product) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    console.log("Added to cart:", productId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
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
              <SwipeableProductGallery
                products={featuredProducts}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      <ShoppingCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={(id, quantity) =>
          setCartItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
          )
        }
        onRemove={(id) =>
          setCartItems((prev) => prev.filter((item) => item.id !== id))
        }
      />
    </div>
  );
}
