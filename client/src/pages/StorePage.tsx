import { useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ShoppingCartDrawer from "@/components/ShoppingCartDrawer";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

import phoneStand from "@assets/generated_images/Black_phone_stand_product_8204f3c9.png";
import planter from "@assets/generated_images/Teal_geometric_planter_pot_5bbfd8b1.png";
import keychains from "@assets/generated_images/Colorful_custom_keychains_set_f8212879.png";
import collection from "@assets/generated_images/3D_printed_products_collection_d14ef8b3.png";

export default function StorePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]); // todo: remove mock functionality

  const products = [
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
    {
      id: "4",
      name: "Product Collection",
      price: 999,
      image: collection,
      category: "Bundles",
      isPopular: false,
    },
    {
      id: "5",
      name: "Premium Phone Stand",
      price: 499,
      image: phoneStand,
      category: "Accessories",
      isPopular: true,
    },
    {
      id: "6",
      name: "Designer Planter",
      price: 599,
      image: planter,
      category: "Home Decor",
      isPopular: false,
    },
  ];

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
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
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl font-bold tracking-tight" data-testid="text-store-title">
            Our Store
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse our collection of 3D printed products
          </p>

          <div className="mt-8 flex flex-col gap-6 lg:flex-row">
            <aside className="lg:w-64 space-y-6">
              <div>
                <Label htmlFor="search">Search</Label>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search products..."
                    className="pl-9"
                    data-testid="input-search"
                  />
                </div>
              </div>

              <div>
                <Label>Category</Label>
                <Select>
                  <SelectTrigger className="mt-2" data-testid="select-category">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="home-decor">Home Decor</SelectItem>
                    <SelectItem value="bundles">Bundles</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Sort By</Label>
                <Select>
                  <SelectTrigger className="mt-2" data-testid="select-sort">
                    <SelectValue placeholder="Featured" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </aside>

            <div className="flex-1">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
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
