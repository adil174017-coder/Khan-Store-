import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  UserProfile,
  StoreSettings,
  CategoryId,
  NavigationPage,
  OrderStatus,
  Address,
} from '../types';
import { Storage } from '../utils/storage';
import { CATEGORIES, INITIAL_CUSTOMERS } from '../data/initialData';
import { generateOrderId, generateTrackingNumber } from '../utils/formatters';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  products: Product[];
  categories: typeof CATEGORIES;
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  currentUser: UserProfile | null;
  customers: UserProfile[];
  settings: StoreSettings;
  theme: 'dark' | 'light';
  deliveryLocation: { city: string; pincode: string };
  activePage: NavigationPage;
  selectedProductId: string | null;
  selectedOrderId: string | null;
  searchQuery: string;
  selectedCategory: CategoryId;
  quickViewProduct: Product | null;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup' | 'forgot';
  isCartDrawerOpen: boolean;
  isLocationModalOpen: boolean;
  toasts: Toast[];

  // Actions
  navigateTo: (page: NavigationPage, paramId?: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: CategoryId) => void;
  addToCart: (
    product: Product,
    quantity?: number,
    selectedColor?: string,
    selectedStorage?: string
  ) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  placeOrder: (
    address: Address,
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod',
    discountAmount: number,
    shippingFee: number
  ) => Order;
  trackOrder: (orderId: string) => void;
  loginUser: (email: string, role?: 'customer' | 'admin') => boolean;
  signupUser: (name: string, email: string, phone: string) => void;
  logoutUser: () => void;
  setDeliveryLocation: (location: { city: string; pincode: string }) => void;
  toggleTheme: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  openAuthModal: (mode?: 'login' | 'signup' | 'forgot') => void;
  closeAuthModal: () => void;
  setCartDrawerOpen: (open: boolean) => void;
  setLocationModalOpen: (open: boolean) => void;

  // Admin Actions
  adminAddProduct: (product: Product) => void;
  adminUpdateProduct: (product: Product) => void;
  adminDeleteProduct: (productId: string) => void;
  adminUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  adminUpdateSettings: (settings: StoreSettings) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => Storage.getProducts());
  const [cart, setCart] = useState<CartItem[]>(() => Storage.getCart());
  const [wishlist, setWishlist] = useState<string[]>(() => Storage.getWishlist());
  const [orders, setOrders] = useState<Order[]>(() => Storage.getOrders());
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => Storage.getCurrentUser());
  const [customers, setCustomers] = useState<UserProfile[]>(() => Storage.getCustomers());
  const [settings, setSettings] = useState<StoreSettings>(() => Storage.getSettings());
  const [theme, setTheme] = useState<'dark' | 'light'>(() => Storage.getTheme());
  const [deliveryLocation, setDeliveryLocState] = useState<{ city: string; pincode: string }>(() =>
    Storage.getDeliveryLocation()
  );

  // UI state
  const [activePage, setActivePage] = useState<NavigationPage>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Theme synchronization with body class
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
      document.body.className = 'bg-slate-50 text-slate-900 antialiased font-sans selection:bg-amber-500 selection:text-black';
    } else {
      document.documentElement.classList.remove('light-mode');
      document.body.className = 'bg-[#0b0f17] text-slate-100 antialiased font-sans selection:bg-amber-500 selection:text-black';
    }
    Storage.saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateTo = (page: NavigationPage, paramId?: string) => {
    if (page === 'product-detail' && paramId) {
      setSelectedProductId(paramId);
    }
    if (page === 'track-order' && paramId) {
      setSelectedOrderId(paramId);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedColor?: string,
    selectedStorage?: string
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedStorage === selectedStorage
      );

      let updated: CartItem[];
      if (existingIndex > -1) {
        updated = [...prev];
        updated[existingIndex].quantity += quantity;
      } else {
        updated = [
          ...prev,
          {
            product,
            quantity,
            selectedColor: selectedColor || (product.colors && product.colors[0]),
            selectedStorage: selectedStorage || (product.storageOptions && product.storageOptions[0]),
          },
        ];
      }
      Storage.saveCart(updated);
      return updated;
    });

    showToast(`Added "${product.name.slice(0, 28)}..." to cart!`, 'success');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart((prev) => {
      let updated: CartItem[];
      if (quantity <= 0) {
        updated = prev.filter((item) => item.product.id !== productId);
      } else {
        updated = prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        );
      }
      Storage.saveCart(updated);
      return updated;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.product.id !== productId);
      Storage.saveCart(updated);
      return updated;
    });
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
    Storage.saveCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      let updated: string[];
      if (prev.includes(productId)) {
        updated = prev.filter((id) => id !== productId);
        showToast('Removed from wishlist', 'info');
      } else {
        updated = [...prev, productId];
        showToast('Saved to wishlist!', 'success');
      }
      Storage.saveWishlist(updated);
      return updated;
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const placeOrder = (
    address: Address,
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod',
    discountAmount: number,
    shippingFee: number
  ): Order => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

    const now = new Date();
    const orderId = generateOrderId();
    const trackingNo = generateTrackingNumber();

    const newOrder: Order = {
      id: orderId,
      date: now.toISOString(),
      items: [...cart],
      shippingAddress: address,
      subtotal,
      discount: discountAmount,
      deliveryFee: shippingFee,
      tax: 0,
      total: finalTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
      status: 'Order Placed',
      trackingNumber: trackingNo,
      courierName: 'Blue Dart Express Air Priority',
      estimatedDelivery: 'Within 2-3 business days',
      timeline: [
        {
          status: 'Order Placed',
          date: now.toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          description: `Order successfully placed via ${paymentMethod.toUpperCase()}`,
          completed: true,
        },
        {
          status: 'Confirmed',
          date: 'Expected in 1 hour',
          description: 'Automated warehouse inventory reservation',
          completed: false,
        },
        {
          status: 'Processing',
          date: 'Expected today',
          description: 'Anti-static sealed packaging and optical inspection',
          completed: false,
        },
        {
          status: 'Shipped',
          date: 'Expected tomorrow',
          description: `Will dispatch with air bill ${trackingNo}`,
          completed: false,
        },
        {
          status: 'Out for Delivery',
          date: 'Expected in 2 days',
          description: 'Final mile courier dispatch',
          completed: false,
        },
        {
          status: 'Delivered',
          date: 'Expected in 3 days',
          description: 'OTP verified doorstep delivery',
          completed: false,
        },
      ],
    };

    const updatedOrders = Storage.addOrder(newOrder);
    setOrders(updatedOrders);
    clearCart();

    // Update user order count
    if (currentUser) {
      const updatedUser: UserProfile = {
        ...currentUser,
        ordersCount: (currentUser.ordersCount || 0) + 1,
        totalSpent: (currentUser.totalSpent || 0) + finalTotal,
      };
      setCurrentUser(updatedUser);
      Storage.saveCurrentUser(updatedUser);
    }

    return newOrder;
  };

  const trackOrder = (orderId: string) => {
    setSelectedOrderId(orderId.trim());
    setActivePage('track-order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loginUser = (email: string, role: 'customer' | 'admin' = 'customer'): boolean => {
    const existing = customers.find((c) => c.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentUser(existing);
      Storage.saveCurrentUser(existing);
      showToast(`Welcome back, ${existing.name}!`, 'success');
      return true;
    }

    // Default fallback customer or admin
    if (role === 'admin' || email.includes('admin')) {
      const admin = INITIAL_CUSTOMERS[0];
      setCurrentUser(admin);
      Storage.saveCurrentUser(admin);
      showToast('Logged in as Store Administrator', 'success');
      return true;
    }

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email,
      phone: '+91 98000 12345',
      role: 'customer',
      joinedDate: new Date().toISOString().slice(0, 10),
      ordersCount: 0,
      totalSpent: 0,
    };
    const updatedCustomers = [...customers, newUser];
    setCustomers(updatedCustomers);
    Storage.saveCustomers(updatedCustomers);
    setCurrentUser(newUser);
    Storage.saveCurrentUser(newUser);
    showToast(`Welcome to KHAN Store, ${newUser.name}!`, 'success');
    return true;
  };

  const signupUser = (name: string, email: string, phone: string) => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      role: 'customer',
      joinedDate: new Date().toISOString().slice(0, 10),
      ordersCount: 0,
      totalSpent: 0,
    };
    const updated = [...customers, newUser];
    setCustomers(updated);
    Storage.saveCustomers(updated);
    setCurrentUser(newUser);
    Storage.saveCurrentUser(newUser);
    showToast(`Account created successfully! Welcome, ${name}.`, 'success');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    Storage.saveCurrentUser(null);
    showToast('Logged out successfully', 'info');
    if (activePage === 'admin' || activePage === 'account') {
      setActivePage('home');
    }
  };

  const setDeliveryLocation = (loc: { city: string; pincode: string }) => {
    setDeliveryLocState(loc);
    Storage.saveDeliveryLocation(loc);
    showToast(`Delivery location set to ${loc.city} (${loc.pincode})`, 'success');
  };

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const openAuthModal = (mode: 'login' | 'signup' | 'forgot' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };
  const closeAuthModal = () => setIsAuthModalOpen(false);

  // Admin handlers
  const adminAddProduct = (product: Product) => {
    const updated = Storage.addProduct(product);
    setProducts(updated);
    showToast(`Product "${product.name}" added to catalog!`, 'success');
  };

  const adminUpdateProduct = (product: Product) => {
    const updated = Storage.updateProduct(product);
    setProducts(updated);
    showToast(`Product updated successfully`, 'success');
  };

  const adminDeleteProduct = (productId: string) => {
    const updated = Storage.deleteProduct(productId);
    setProducts(updated);
    showToast(`Product removed from catalog`, 'info');
  };

  const adminUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updated = Storage.updateOrderStatus(orderId, status);
    setOrders(updated);
    showToast(`Order #${orderId} marked as ${status}`, 'success');
  };

  const adminUpdateSettings = (newSettings: StoreSettings) => {
    setSettings(newSettings);
    Storage.saveSettings(newSettings);
    showToast('Store configurations saved successfully', 'success');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories: CATEGORIES,
        cart,
        wishlist,
        orders,
        currentUser,
        customers,
        settings,
        theme,
        deliveryLocation,
        activePage,
        selectedProductId,
        selectedOrderId,
        searchQuery,
        selectedCategory,
        quickViewProduct,
        isAuthModalOpen,
        authModalMode,
        isCartDrawerOpen,
        isLocationModalOpen,
        toasts,
        navigateTo,
        setSearchQuery,
        setSelectedCategory,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        placeOrder,
        trackOrder,
        loginUser,
        signupUser,
        logoutUser,
        setDeliveryLocation,
        toggleTheme,
        showToast,
        removeToast,
        openQuickView,
        closeQuickView,
        openAuthModal,
        closeAuthModal,
        setCartDrawerOpen: setIsCartDrawerOpen,
        setLocationModalOpen: setIsLocationModalOpen,
        adminAddProduct,
        adminUpdateProduct,
        adminDeleteProduct,
        adminUpdateOrderStatus,
        adminUpdateSettings,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
