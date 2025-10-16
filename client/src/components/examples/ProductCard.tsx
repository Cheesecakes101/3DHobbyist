import ProductCard from "../ProductCard";
import { ThemeProvider } from "../ThemeProvider";
import productImage from "@assets/generated_images/Black_phone_stand_product_8204f3c9.png";

export default function ProductCardExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-sm">
        <ProductCard
          id="1"
          name="Geometric Phone Stand"
          price={299}
          image={productImage}
          category="Accessories"
          isPopular={true}
          onAddToCart={(id) => console.log("Added to cart:", id)}
        />
      </div>
    </ThemeProvider>
  );
}
