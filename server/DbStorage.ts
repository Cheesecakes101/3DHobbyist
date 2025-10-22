import { db } from "./db.js";
import { products, customPrintRequests } from "@shared/schema";
import { eq } from "drizzle-orm";
import {
  type Product,
  type InsertProduct,
  type CustomPrintRequest,
  type InsertCustomPrintRequest,
} from "@shared/schema";

export class DbStorage {
  // ✅ PRODUCTS
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const rows = await db.select().from(products).where(eq(products.id, Number(id)));
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
      .where(eq(products.id, Number(id)))
      .returning();
    return updated;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const deleted = await db.delete(products).where(eq(products.id, Number(id))).returning();
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
}
