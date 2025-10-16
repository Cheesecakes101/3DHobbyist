import SwipeableProductGallery from "../SwipeableProductGallery";
import { ThemeProvider } from "../ThemeProvider";
import phoneStand from "@assets/generated_images/Black_phone_stand_product_8204f3c9.png";
import planter from "@assets/generated_images/Teal_geometric_planter_pot_5bbfd8b1.png";
import keychains from "@assets/generated_images/Colorful_custom_keychains_set_f8212879.png";

export default function SwipeableProductGalleryExample() {
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

  return (
    <ThemeProvider>
      <div className="p-8">
        <h2 className="font-display text-2xl font-bold mb-6">Swipeable Gallery</h2>
        <p className="text-muted-foreground mb-8">Swipe left/right on mobile or use arrow buttons</p>
        <SwipeableProductGallery
          products={products}
          onAddToCart={(id) => console.log("Added to cart:", id)}
        />
      </div>
    </ThemeProvider>
  );
}
