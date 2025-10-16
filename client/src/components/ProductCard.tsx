import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  isPopular?: boolean;
  onAddToCart?: (id: string) => void;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  category,
  isPopular,
  onAddToCart,
}: ProductCardProps) {
  return (
    <Card className="group overflow-hidden hover-elevate transition-all" data-testid={`card-product-${id}`}>
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            data-testid={`img-product-${id}`}
          />
          {isPopular && (
            <Badge className="absolute right-2 top-2" data-testid={`badge-popular-${id}`}>
              Popular
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 p-4">
        <div className="w-full">
          {category && (
            <p className="text-xs text-muted-foreground uppercase tracking-wide" data-testid={`text-category-${id}`}>
              {category}
            </p>
          )}
          <h3 className="font-semibold text-lg mt-1" data-testid={`text-name-${id}`}>{name}</h3>
          <p className="text-lg font-bold text-primary mt-1" data-testid={`text-price-${id}`}>
            ₹{price.toFixed(2)}
          </p>
        </div>
        <Button
          className="w-full"
          onClick={() => onAddToCart?.(id)}
          data-testid={`button-add-to-cart-${id}`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
