import {
  Product,
  CartItem,
  Order,
  UserProfile,
  StoreSettings,
  OrderStatus,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_SETTINGS,
} from '../data/initialData';

const KEYS = {
  PRODUCTS: 'khan_store_products_v2',
  ORDERS: 'khan_store_orders_v2',
  CUSTOMERS: 'khan_store_customers_v2',
  CURRENT_USER: 'khan_store_current_user_v2',
  CART: 'khan_store_cart_v2',
  WISHLIST: 'khan_store_wishlist_v2',
  SETTINGS: 'khan_store_settings_v2',
  DELIVERY_LOCATION: 'khan_store_delivery_loc_v2',
  THEME: 'khan_store_theme_v2',
};

// Safe localStorage wrapper
function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch (e) {
    console.warn(`Failed to parse ${key} from localStorage`, e);
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Failed to store ${key} in localStorage`, e);
  }
}

export const Storage = {
  // PRODUCTS
  getProducts(): Product[] {
    const saved = getItem<Product[]>(KEYS.PRODUCTS, []);
    if (!saved || saved.length === 0) {
      setItem(KEYS.PRODUCTS, INITIAL_PRODUCTS);
      return INITIAL_PRODUCTS;
    }
    return saved;
  },

  saveProducts(products: Product[]): void {
    setItem(KEYS.PRODUCTS, products);
  },

  addProduct(newProduct: Product): Product[] {
    const products = this.getProducts();
    const updated = [newProduct, ...products];
    this.saveProducts(updated);
    return updated;
  },

  updateProduct(updatedProduct: Product): Product[] {
    const products = this.getProducts();
    const updated = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    this.saveProducts(updated);
    return updated;
  },

  deleteProduct(productId: string): Product[] {
    const products = this.getProducts();
    const updated = products.filter((p) => p.id !== productId);
    this.saveProducts(updated);
    return updated;
  },

  // ORDERS
  getOrders(): Order[] {
    const saved = getItem<Order[]>(KEYS.ORDERS, []);
    if (!saved || saved.length === 0) {
      setItem(KEYS.ORDERS, INITIAL_ORDERS);
      return INITIAL_ORDERS;
    }
    return saved;
  },

  saveOrders(orders: Order[]): void {
    setItem(KEYS.ORDERS, orders);
  },

  addOrder(order: Order): Order[] {
    const orders = this.getOrders();
    const updated = [order, ...orders];
    this.saveOrders(updated);
    return updated;
  },

  updateOrderStatus(orderId: string, newStatus: OrderStatus): Order[] {
    const orders = this.getOrders();
    const updated = orders.map((order) => {
      if (order.id !== orderId) return order;
      const statusMap: Record<OrderStatus, string> = {
        'Order Placed': 'Order received and logged in system',
        'Confirmed': 'Order verified and inventory reserved',
        'Processing': 'Packed and passed automated QA checks',
        'Shipped': 'Dispatched via express logistics air freight',
        'Out for Delivery': 'With courier partner for doorstep delivery',
        'Delivered': 'Order delivered to verified recipient',
        'Cancelled': 'Order cancelled and refund initiated',
      };

      const updatedTimeline = order.timeline.map((step) => {
        if (step.status === newStatus) {
          return {
            ...step,
            completed: true,
            date: new Date().toLocaleString('en-IN', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
            description: statusMap[newStatus],
          };
        }
        return step;
      });

      return {
        ...order,
        status: newStatus,
        timeline: updatedTimeline,
      };
    });
    this.saveOrders(updated);
    return updated;
  },

  // CART
  getCart(): CartItem[] {
    return getItem<CartItem[]>(KEYS.CART, []);
  },

  saveCart(cart: CartItem[]): void {
    setItem(KEYS.CART, cart);
  },

  // WISHLIST
  getWishlist(): string[] {
    return getItem<string[]>(KEYS.WISHLIST, [
      INITIAL_PRODUCTS[0]?.id || 'prod-iphone15pro',
      INITIAL_PRODUCTS[2]?.id || 'prod-sonyxm5',
    ]);
  },

  saveWishlist(productIds: string[]): void {
    setItem(KEYS.WISHLIST, productIds);
  },

  // CUSTOMERS
  getCustomers(): UserProfile[] {
    const saved = getItem<UserProfile[]>(KEYS.CUSTOMERS, []);
    if (!saved || saved.length === 0) {
      setItem(KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
      return INITIAL_CUSTOMERS;
    }
    return saved;
  },

  saveCustomers(customers: UserProfile[]): void {
    setItem(KEYS.CUSTOMERS, customers);
  },

  // CURRENT USER
  getCurrentUser(): UserProfile | null {
    return getItem<UserProfile | null>(KEYS.CURRENT_USER, INITIAL_CUSTOMERS[1]); // default logged in as customer Aakash
  },

  saveCurrentUser(user: UserProfile | null): void {
    setItem(KEYS.CURRENT_USER, user);
  },

  // SETTINGS
  getSettings(): StoreSettings {
    const saved = getItem<StoreSettings>(KEYS.SETTINGS, INITIAL_SETTINGS);
    return { ...INITIAL_SETTINGS, ...saved };
  },

  saveSettings(settings: StoreSettings): void {
    setItem(KEYS.SETTINGS, settings);
  },

  // DELIVERY LOCATION
  getDeliveryLocation(): { city: string; pincode: string } {
    return getItem(KEYS.DELIVERY_LOCATION, {
      city: 'Mumbai',
      pincode: '400001',
    });
  },

  saveDeliveryLocation(loc: { city: string; pincode: string }): void {
    setItem(KEYS.DELIVERY_LOCATION, loc);
  },

  // THEME
  getTheme(): 'dark' | 'light' {
    return getItem<'dark' | 'light'>(KEYS.THEME, 'dark');
  },

  saveTheme(theme: 'dark' | 'light'): void {
    setItem(KEYS.THEME, theme);
  },
};
