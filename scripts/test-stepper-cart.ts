import assert from "node:assert";

// Mock CartItem
interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

class CartManager {
  cartItems: CartItem[] = [];

  addToCart(item: { id: string; title: string; price: number; image?: string; size?: string; color?: string; quantity?: number }) {
    const delta = item.quantity !== undefined ? item.quantity : 1;
    const existing = this.cartItems.find((i) => i.id === item.id);
    if (existing) {
      const nextQty = existing.quantity + delta;
      if (nextQty <= 0) {
        this.cartItems = this.cartItems.filter((i) => i.id !== item.id);
      } else {
        existing.quantity = nextQty;
      }
      return;
    }
    if (delta <= 0) return;
    this.cartItems.push({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image || "",
      size: item.size || "Standard",
      color: item.color || "Classic",
      quantity: delta
    });
  }

  updateCartQuantity(id: string, delta: number) {
    const existing = this.cartItems.find((i) => i.id === id);
    if (!existing) return;
    const nextQty = existing.quantity + delta;
    if (nextQty <= 0) {
      this.cartItems = this.cartItems.filter((i) => i.id !== id);
    } else {
      existing.quantity = nextQty;
    }
  }

  removeFromCart(id: string) {
    this.cartItems = this.cartItems.filter((i) => i.id !== id);
  }

  getButtonDisplay(productId: string): { mode: "add_to_bag" | "stepper"; text: string; quantity: number } {
    const item = this.cartItems.find((i) => i.id === productId);
    const qty = item ? item.quantity : 0;
    if (qty > 0) {
      return { mode: "stepper", text: `- ${qty} +`, quantity: qty };
    }
    return { mode: "add_to_bag", text: "ADD TO BAG", quantity: 0 };
  }
}

console.log("=================== RUNNING STEPPER CART TESTS ===================");
const manager = new CartManager();
const testProduct = { id: "prod-1", title: "Double-Breasted Cashmere Peacoat", price: 50400 };

// 1. Initial State
let btn = manager.getButtonDisplay(testProduct.id);
console.log("1. Initial state:", btn);
assert.strictEqual(btn.mode, "add_to_bag");
assert.strictEqual(btn.text, "ADD TO BAG");
assert.strictEqual(btn.quantity, 0);
console.log("   ✅ Initial state correctly displays ADD TO BAG");

// 2. Click once -> Add to Bag
manager.addToCart(testProduct);
btn = manager.getButtonDisplay(testProduct.id);
console.log("2. After first click:", btn);
assert.strictEqual(btn.mode, "stepper");
assert.strictEqual(btn.text, "- 1 +");
assert.strictEqual(btn.quantity, 1);
console.log("   ✅ Button text changed to - 1 +");

// 3. Click '+' -> Increment quantity to 2
manager.updateCartQuantity(testProduct.id, 1);
btn = manager.getButtonDisplay(testProduct.id);
console.log("3. After clicking '+':", btn);
assert.strictEqual(btn.mode, "stepper");
assert.strictEqual(btn.text, "- 2 +");
assert.strictEqual(btn.quantity, 2);
console.log("   ✅ Clicking '+' increments to - 2 +");

// 4. Click '+' again -> Increment quantity to 3
manager.updateCartQuantity(testProduct.id, 1);
btn = manager.getButtonDisplay(testProduct.id);
console.log("4. After clicking '+' again:", btn);
assert.strictEqual(btn.text, "- 3 +");
assert.strictEqual(btn.quantity, 3);
console.log("   ✅ Clicking '+' increments to - 3 +");

// 5. Click '-' -> Decrement quantity back to 2
manager.updateCartQuantity(testProduct.id, -1);
btn = manager.getButtonDisplay(testProduct.id);
console.log("5. After clicking '-':", btn);
assert.strictEqual(btn.text, "- 2 +");
assert.strictEqual(btn.quantity, 2);
console.log("   ✅ Clicking '-' decrements to - 2 +");

// 6. Click '-' -> Decrement quantity back to 1
manager.updateCartQuantity(testProduct.id, -1);
btn = manager.getButtonDisplay(testProduct.id);
console.log("6. After clicking '-' again:", btn);
assert.strictEqual(btn.text, "- 1 +");
assert.strictEqual(btn.quantity, 1);
console.log("   ✅ Clicking '-' decrements back to - 1 +");

// 7. Click '-' when quantity is 1 -> Removes from cart and reverts to ADD TO BAG
manager.removeFromCart(testProduct.id);
btn = manager.getButtonDisplay(testProduct.id);
console.log("7. After clicking '-' at quantity 1:", btn);
assert.strictEqual(btn.mode, "add_to_bag");
assert.strictEqual(btn.text, "ADD TO BAG");
assert.strictEqual(btn.quantity, 0);
assert.strictEqual(manager.cartItems.length, 0);
console.log("   ✅ Clicking '-' at 1 removes item from bag and reverts button to ADD TO BAG");

console.log("=================== ALL STEPPER LOGIC TESTS PASSED (7/7) ===================");
