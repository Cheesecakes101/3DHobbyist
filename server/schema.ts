import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

// 🧩 Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// 🧩 Products table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: text("price").notNull(),
  image: text("image"),
  category: text("category"),
  stock: integer("stock").default(0),
});

// 🧩 Custom Print Requests table
export const customPrintRequests = pgTable("custom_print_requests", {
  id: serial("id").primaryKey(),

  // From your form
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),

  // Upload info
  fileName: text("file_name"),       // e.g. "gym payment.png"
  fileUrl: text("file_url"),         // future use (for cloud upload)
  hasFile: text("has_file"),         // "yes" / "no"

  // Project details
  material: text("material"),
  quantity: integer("quantity").default(1),
  size: text("size"),
  color: text("color"),
  projectDescription: text("project_description").notNull(),

  // Request status
  status: text("status").default("pending"),

  // Metadata
  createdAt: timestamp("created_at").defaultNow(),
});

// ✅ TypeScript types
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

export type CustomPrintRequest = typeof customPrintRequests.$inferSelect;
export type InsertCustomPrintRequest = typeof customPrintRequests.$inferInsert;
