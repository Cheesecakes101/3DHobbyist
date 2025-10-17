import { 
  type User, 
  type InsertUser,
  type Product,
  type InsertProduct,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem,
  type CustomPrintRequest,
  type InsertCustomPrintRequest,
  type CartItem,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  updateProductStock(id: string, stock: number): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;

  // Cart methods (using cartId as session identifier)
  getCart(cartId: string): Promise<CartItem[]>;
  addToCart(cartId: string, item: CartItem): Promise<CartItem[]>;
  updateCartItem(cartId: string, productId: string, quantity: number): Promise<CartItem[]>;
  removeFromCart(cartId: string, productId: string): Promise<CartItem[]>;
  clearCart(cartId: string): Promise<void>;

  // Order methods
  createOrder(order: InsertOrder): Promise<Order>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  getOrder(id: string): Promise<Order | undefined>;
  getOrderItems(orderId: string): Promise<OrderItem[]>;

  // Custom print request methods
  createCustomPrintRequest(request: InsertCustomPrintRequest): Promise<CustomPrintRequest>;
  getAllCustomPrintRequests(): Promise<CustomPrintRequest[]>;
  getCustomPrintRequest(id: string): Promise<CustomPrintRequest | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private carts: Map<string, CartItem[]>;
  private orders: Map<string, Order>;
  private orderItems: Map<string, OrderItem>;
  private customPrintRequests: Map<string, CustomPrintRequest>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.carts = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.customPrintRequests = new Map();
    
    this.seedProducts();
  }

  private seedProducts() {
    const seedData: Product[] = [
      {
        id: "1",
        name: "Geometric Phone Stand",
        description: "A sleek and modern phone stand with geometric design, perfect for any desk setup.",
        price: "299",
        image: "/attached_assets/generated_images/Black_phone_stand_product_8204f3c9.png",
        category: "Accessories",
        stock: 25,
      },
      {
        id: "2",
        name: "Modern Planter Pot",
        description: "Stylish planter pot with a contemporary design, ideal for small plants and succulents.",
        price: "449",
        image: "/attached_assets/generated_images/Teal_geometric_planter_pot_5bbfd8b1.png",
        category: "Home Decor",
        stock: 15,
      },
      {
        id: "3",
        name: "Custom Keychains",
        description: "Personalized 3D printed keychains in vibrant colors, great as gifts or accessories.",
        price: "99",
        image: "/attached_assets/generated_images/Colorful_custom_keychains_set_f8212879.png",
        category: "Accessories",
        stock: 50,
      },
      {
        id: "4",
        name: "Product Collection",
        description: "A curated bundle of our most popular 3D printed items at a special price.",
        price: "999",
        image: "/attached_assets/generated_images/3D_printed_products_collection_d14ef8b3.png",
        category: "Bundles",
        stock: 10,
      },
      {
        id: "5",
        name: "Premium Phone Stand",
        description: "High-quality phone stand with premium finish and adjustable angle for optimal viewing.",
        price: "499",
        image: "/attached_assets/generated_images/Black_phone_stand_product_8204f3c9.png",
        category: "Accessories",
        stock: 20,
      },
      {
        id: "6",
        name: "Designer Planter",
        description: "Elegant designer planter with unique patterns, perfect for modern home decor.",
        price: "599",
        image: "/attached_assets/generated_images/Teal_geometric_planter_pot_5bbfd8b1.png",
        category: "Home Decor",
        stock: 12,
      },
    ];

    seedData.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category,
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id,
      stock: insertProduct.stock ?? 0,
    };
    this.products.set(id, product);
    return product;
  }

  async updateProductStock(id: string, stock: number): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updatedProduct = { ...product, stock };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async updateProduct(id: string, productData: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updatedProduct = { 
      ...product, 
      ...productData,
      id,
    };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  // Cart methods
  async getCart(cartId: string): Promise<CartItem[]> {
    return this.carts.get(cartId) || [];
  }

  async addToCart(cartId: string, item: CartItem): Promise<CartItem[]> {
    const cart = this.carts.get(cartId) || [];
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.productId === item.productId
    );

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += item.quantity;
    } else {
      cart.push(item);
    }

    this.carts.set(cartId, cart);
    return cart;
  }

  async updateCartItem(cartId: string, productId: string, quantity: number): Promise<CartItem[]> {
    const cart = this.carts.get(cartId) || [];
    const itemIndex = cart.findIndex((item) => item.productId === productId);

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        cart.splice(itemIndex, 1);
      } else {
        cart[itemIndex].quantity = quantity;
      }
    }

    this.carts.set(cartId, cart);
    return cart;
  }

  async removeFromCart(cartId: string, productId: string): Promise<CartItem[]> {
    const cart = this.carts.get(cartId) || [];
    const filteredCart = cart.filter((item) => item.productId !== productId);
    this.carts.set(cartId, filteredCart);
    return filteredCart;
  }

  async clearCart(cartId: string): Promise<void> {
    this.carts.delete(cartId);
  }

  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = { 
      ...insertOrder, 
      id,
      status: insertOrder.status ?? "pending",
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = randomUUID();
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(
      (item) => item.orderId === orderId,
    );
  }

  // Custom print request methods
  async createCustomPrintRequest(insertRequest: InsertCustomPrintRequest): Promise<CustomPrintRequest> {
    const id = randomUUID();
    const request: CustomPrintRequest = { 
      ...insertRequest, 
      id,
      status: insertRequest.status ?? "pending",
      createdAt: new Date(),
    };
    this.customPrintRequests.set(id, request);
    return request;
  }

  async getAllCustomPrintRequests(): Promise<CustomPrintRequest[]> {
    return Array.from(this.customPrintRequests.values());
  }

  async getCustomPrintRequest(id: string): Promise<CustomPrintRequest | undefined> {
    return this.customPrintRequests.get(id);
  }
}

export const storage = new MemStorage();
