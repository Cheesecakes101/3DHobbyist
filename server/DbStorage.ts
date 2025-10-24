import { db } from "./db.js";
import { products, customPrintRequests, orders, orderItems } from "@shared/schema";
import { eq } from "drizzle-orm";
import {
  type Product,
  type InsertProduct,
  type CustomPrintRequest,
  type InsertCustomPrintRequest,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem,
} from "@shared/schema";

export class DbStorage {
  // ✅ PRODUCTS
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const rows = await db.select().from(products).where(eq(products.id, id));
    return rows[0];
  }

  async createProduct(data: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(data).returning();
    return newProduct;
  }

  async updateProduct(id: string, data: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updated] = await db
      .update(products)
      .set(data)
      .where(eq(products.id, id))
      .returning();
    return updated;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const deleted = await db.delete(products).where(eq(products.id, id)).returning();
    return deleted.length > 0;
  }

  // ✅ CUSTOM PRINT REQUESTS
  async createCustomPrintRequest(data: InsertCustomPrintRequest): Promise<CustomPrintRequest> {
    console.log("🧾 Creating custom print in DB:", data);

    const [newRequest] = await db
      .insert(customPrintRequests)
      .values({
        name: data.name,
        email: data.email,
        phone: data.phone,
        fileName: data.fileName ?? null,
        fileUrl: data.fileUrl ?? null,
        hasFile: data.hasFile,
        material: data.material,
        quantity: data.quantity ? Number(data.quantity) : 1,
        size: data.size,
        color: data.color,
        projectDescription: data.projectDescription,
        status: "pending",
      })
      .returning();

    return newRequest;
  }

  async getAllCustomPrintRequests(): Promise<CustomPrintRequest[]> {
    return await db.select().from(customPrintRequests);
  }

  async getCustomPrintRequest(id: string): Promise<CustomPrintRequest | undefined> {
    const rows = await db.select().from(customPrintRequests).where(eq(customPrintRequests.id, id));
    return rows[0];
  }

  async updateCustomPrintRequestStatus(id: string, status: string): Promise<CustomPrintRequest | undefined> {
    const [updated] = await db
      .update(customPrintRequests)
      .set({ status })
      .where(eq(customPrintRequests.id, id))
      .returning();
    return updated;
  }

  // ✅ ORDERS
  async createOrder(data: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(data).returning();
    return newOrder;
  }

  async createOrderItem(data: InsertOrderItem): Promise<OrderItem> {
    const [newItem] = await db.insert(orderItems).values(data).returning();
    return newItem;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const rows = await db.select().from(orders).where(eq(orders.id, id));
    return rows[0];
  }

  async getAllOrders(): Promise<Order[]> {
    return await db.select().from(orders);
  }

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const [updated] = await db
      .update(orders)
      .set({ status })
      .where(eq(orders.id, id))
      .returning();
    return updated;
  }

  // Stub methods for cart (not implemented in DB yet - using in-memory)
  async getCart() { return []; }
  async addToCart() { return []; }
  async updateCartItem() { return []; }
  async removeFromCart() { return []; }
  async clearCart() { }
  async getUser() { return undefined; }
  async getUserByUsername() { return undefined; }
  async createUser() { throw new Error("Not implemented"); }
  async getProductsByCategory() { return []; }
  async updateProductStock() { return undefined; }
}
