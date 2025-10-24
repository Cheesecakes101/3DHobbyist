import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { CartItem, Product } from "@shared/types";

interface CartContextType {
  cartId: string;
  cartItems: CartItem[];
  isLoading: boolean;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [cartId, setCartId] = useState<string>(() => {
    const stored = localStorage.getItem("cartId");
    if (stored) return stored;
    
    const newCartId = `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("cartId", newCartId);
    return newCartId;
  });

  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading } = useQuery<CartItem[]>({
    queryKey: ["/api/cart", cartId],
    enabled: !!cartId,
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      return await apiRequest(`/api/cart/${cartId}`, "POST", { productId, quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", cartId] });
    },
    onError: (err: any) => {
      console.error("Add to cart failed:", err);
      toast({ title: "Could not add to cart", description: String(err), variant: "destructive" as any });
    },
  });

  const updateCartItemMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      return await apiRequest(`/api/cart/${cartId}/${productId}`, "PATCH", { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", cartId] });
    },
    onError: (err: any) => {
      console.error("Update cart item failed:", err);
      toast({ title: "Could not update cart", description: String(err), variant: "destructive" as any });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      return await apiRequest(`/api/cart/${cartId}/${productId}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", cartId] });
    },
    onError: (err: any) => {
      console.error("Remove from cart failed:", err);
      toast({ title: "Could not remove item", description: String(err), variant: "destructive" as any });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest(`/api/cart/${cartId}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", cartId] });
    },
    onError: (err: any) => {
      console.error("Clear cart failed:", err);
      toast({ title: "Could not clear cart", description: String(err), variant: "destructive" as any });
    },
  });

  const addToCart = async (productId: string, quantity: number) => {
    await addToCartMutation.mutateAsync({ productId: String(productId), quantity });
  };

  const updateCartItem = async (productId: string, quantity: number) => {
    await updateCartItemMutation.mutateAsync({ productId: String(productId), quantity });
  };

  const removeFromCart = async (productId: string) => {
    await removeFromCartMutation.mutateAsync(String(productId));
  };

  const clearCart = async () => {
    await clearCartMutation.mutateAsync();
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (product) {
        return total + parseFloat(product.price) * item.quantity;
      }
      return total;
    }, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartId,
        cartItems,
        isLoading,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
