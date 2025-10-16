import { useState } from "react";
import ShoppingCartDrawer from "../ShoppingCartDrawer";
import { ThemeProvider } from "../ThemeProvider";
import { Button } from "@/components/ui/button";
import productImage from "@assets/generated_images/Black_phone_stand_product_8204f3c9.png";

export default function ShoppingCartDrawerExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([
    {
      id: "1",
      name: "Geometric Phone Stand",
      price: 299,
      quantity: 2,
      image: productImage,
    },
  ]);

  return (
    <ThemeProvider>
      <div className="p-4">
        <Button onClick={() => setIsOpen(true)}>Open Cart</Button>
        <ShoppingCartDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          items={items}
          onUpdateQuantity={(id, qty) =>
            setItems((prev) =>
              prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
            )
          }
          onRemove={(id) => setItems((prev) => prev.filter((item) => item.id !== id))}
        />
      </div>
    </ThemeProvider>
  );
}
