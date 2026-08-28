export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phone?: string;
  avatar?: string;
  token?: string;
}

export interface Review {
  _id: string;
  user: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  category: string;
  image: string;
  images?: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  numReviews: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  brand?: string;
  specs?: Record<string, string>;
  reviews?: Review[];
}

export interface Category {
  _id: string;
  name: string;
  icon: string;
  image?: string;
  itemCount?: number;
}

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  _id: string;
  product: Product;
}

export interface Address {
  _id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface OrderItem {
  _id: string;
  product: Product;
  quantity: number;
  price: number;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: 'Cash on Delivery' | 'Credit Card' | 'Debit Card' | 'UPI';
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  totalAmount: number;
  shippingFee: number;
  taxAmount: number;
  discountAmount?: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  userToken: string | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (userData: User, token: string) => Promise<void>;
  register: (userData: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updatedData: Partial<User>) => Promise<void>;
  switchRole: () => void;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

export interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
}
