// Client-safe types exported from schema
// This file contains only TypeScript types and Zod schemas without Drizzle dependencies

import { z } from "zod";

// User types
export type User = {
  id: string;
  username: string;
  password: string;
};

export type InsertUser = {
  username: string;
  password: string;
};

// Product types
export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  stock: number;
};

export const insertProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string(),
  image: z.string(),
  category: z.string(),
  stock: z.number(),
});

export type InsertProduct = z.infer<typeof insertProductSchema>;

// Order types
export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  total: string;
  status: string;
  createdAt: Date;
};

export type InsertOrder = Omit<Order, "id" | "createdAt">;

// Order Item types
export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productPrice: string;
  quantity: number;
};

export type InsertOrderItem = Omit<OrderItem, "id">;

// Custom Print Request types
export type CustomPrintRequest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectDescription: string;
  fileUrl: string | null;
  status: string;
  createdAt: Date;
};

export const insertCustomPrintRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  projectDescription: z.string().min(10, "Please provide more details about your project"),
  fileUrl: z.string().nullable().optional(),
});

export type InsertCustomPrintRequest = z.infer<typeof insertCustomPrintRequestSchema>;

// Cart Item types
export type CartItem = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product?: Product;
};

export type InsertCartItem = Omit<CartItem, "id">;
