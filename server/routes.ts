import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertOrderSchema, 
  insertOrderItemSchema,
  insertCustomPrintRequestSchema,
  insertProductSchema,
  cartItemSchema,
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      
      if (category) {
        const products = await storage.getProductsByCategory(category);
        return res.json(products);
      }
      
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.patch("/api/products/:id", async (req, res) => {
    try {
      const validatedData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(req.params.id, validatedData);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteProduct(req.params.id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // Cart routes
  app.get("/api/cart/:cartId", async (req, res) => {
    try {
      const cart = await storage.getCart(req.params.cartId);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart/:cartId", async (req, res) => {
    try {
      const validatedData = cartItemSchema.parse(req.body);
      const cart = await storage.addToCart(req.params.cartId, validatedData);
      res.json(cart);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  app.patch("/api/cart/:cartId/:productId", async (req, res) => {
    try {
      const { quantity } = req.body;
      
      if (typeof quantity !== "number" || quantity < 0) {
        return res.status(400).json({ message: "Invalid quantity" });
      }
      
      const cart = await storage.updateCartItem(
        req.params.cartId,
        req.params.productId,
        quantity
      );
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:cartId/:productId", async (req, res) => {
    try {
      const cart = await storage.removeFromCart(
        req.params.cartId,
        req.params.productId
      );
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: "Failed to remove item from cart" });
    }
  });

  app.delete("/api/cart/:cartId", async (req, res) => {
    try {
      await storage.clearCart(req.params.cartId);
      res.json({ message: "Cart cleared" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Order routes
  app.post("/api/orders", async (req, res) => {
    try {
      const { order, items } = req.body;
      
      const validatedOrder = insertOrderSchema.parse(order);
      const createdOrder = await storage.createOrder(validatedOrder);
      
      if (items && Array.isArray(items)) {
        for (const item of items) {
          const validatedItem = insertOrderItemSchema.parse({
            ...item,
            orderId: createdOrder.id,
          });
          await storage.createOrderItem(validatedItem);
        }
      }
      
      const orderItems = await storage.getOrderItems(createdOrder.id);
      
      res.status(201).json({ order: createdOrder, items: orderItems });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      const items = await storage.getOrderItems(order.id);
      res.json({ order, items });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  // Custom print request routes
  app.post("/api/custom-print-requests", async (req, res) => {
    try {
      const validatedData = insertCustomPrintRequestSchema.parse(req.body);
      const request = await storage.createCustomPrintRequest(validatedData);
      res.status(201).json(request);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create custom print request" });
    }
  });

  app.get("/api/custom-print-requests", async (req, res) => {
    try {
      const requests = await storage.getAllCustomPrintRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch custom print requests" });
    }
  });

  app.get("/api/custom-print-requests/:id", async (req, res) => {
    try {
      const request = await storage.getCustomPrintRequest(req.params.id);
      
      if (!request) {
        return res.status(404).json({ message: "Custom print request not found" });
      }
      
      res.json(request);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch custom print request" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
