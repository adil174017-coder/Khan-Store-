export type CategoryId = 'all' | 'smartphones' | 'laptops' | 'audio' | 'smartwatches' | 'accessories' | 'gaming';

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
  description: string;
  itemCount: number;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  price: number;
  oldPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  image: string;
  galleryImages: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  stock: number;
  isFlashDeal?: boolean;
  flashEndsInHours?: number;
  isFeatured?: boolean;
  badge?: string;
  colors?: string[];
  storageOptions?: string[];
  reviews?: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export interface Address {
  fullName: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  addressType: 'home' | 'office';
}

export type OrderStatus =
  | 'Order Placed'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export interface OrderTimelineStep {
  status: OrderStatus;
  date: string;
  description: string;
  completed: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  shippingAddress: Address;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  paymentStatus: 'Paid' | 'Pending';
  status: OrderStatus;
  trackingNumber: string;
  courierName: string;
  estimatedDelivery: string;
  timeline: OrderTimelineStep[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  joinedDate: string;
  ordersCount: number;
  totalSpent: number;
  defaultAddress?: Address;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  fixedDiscount?: number;
  minSpend: number;
  description: string;
}

export interface StoreSettings {
  storeName: string;
  contactEmail: string;
  contactPhone: string;
  supportAddress: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  expressShippingFee: number;
  taxPercent: number;
  announcementText: string;
  currencySymbol: string;
}

export type NavigationPage =
  | 'home'
  | 'products'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'my-orders'
  | 'track-order'
  | 'wishlist'
  | 'account'
  | 'admin'
  | 'about'
  | 'contact'
  | 'help'
  | 'sell-with-us'
  | 'privacy'
  | 'terms';
