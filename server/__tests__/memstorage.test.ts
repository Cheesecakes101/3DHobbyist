import test from 'node:test';
import assert from 'node:assert/strict';
import { MemStorage } from '../storage.js';

test('MemStorage product lifecycle', async () => {
  const storage = new MemStorage();
  const product = await storage.createProduct({
    name: 'Test Product',
    description: 'Test Desc',
    price: '9.99' as any,
    image: '/img.png',
    category: 'Test',
    stock: 3,
  } as any);

  assert.ok(product.id, 'product gets an id');
  const fetched = await storage.getProduct(product.id);
  assert.equal(fetched?.name, 'Test Product');

  const updated = await storage.updateProduct(product.id, { stock: 5 });
  assert.equal(updated?.stock, 5);

  const deleted = await storage.deleteProduct(product.id);
  assert.equal(deleted, true);
  const missing = await storage.getProduct(product.id);
  assert.equal(missing, undefined);
});

test('MemStorage cart operations', async () => {
  const storage = new MemStorage();
  const cartId = 'cart-1';

  let cart = await storage.addToCart(cartId, { productId: 'p1', quantity: 2 });
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 2);

  cart = await storage.updateCartItem(cartId, 'p1', 5);
  assert.equal(cart[0].quantity, 5);

  cart = await storage.removeFromCart(cartId, 'p1');
  assert.equal(cart.length, 0);
});

