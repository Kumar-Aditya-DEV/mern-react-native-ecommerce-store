import { Product } from '../types';

const mockProducts: Product[] = [
  {
    _id: 'prod-1',
    name: 'Wireless Noise-Canceling Headphones',
    description: 'Immersive sound quality with industry-leading Active Noise Cancellation (ANC), 30-hour battery life, and comfortable over-ear design.',
    price: 199.99,
    originalPrice: 249.99,
    discountPercentage: 20,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop',
    ],
    inStock: true,
    stockCount: 15,
    rating: 4.8,
    numReviews: 124,
    isFeatured: true,
    isTrending: true,
    brand: 'AudioPhonic',
    specs: {
      'Battery Life': '30 Hours',
      'Connectivity': 'Bluetooth 5.2',
      'Weight': '250g',
      'Warranty': '1 Year'
    },
    reviews: [
      {
        _id: 'rev-1',
        user: 'u-1',
        userName: 'Alex Johnson',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop',
        rating: 5,
        comment: 'Amazing sound quality and battery life! Worth every penny.',
        createdAt: '2026-08-15'
      },
      {
        _id: 'rev-2',
        user: 'u-2',
        userName: 'Sarah Jenkins',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop',
        rating: 4.5,
        comment: 'Super comfortable for long listening sessions.',
        createdAt: '2026-08-10'
      }
    ]
  },
  {
    _id: 'prod-2',
    name: 'Minimalist Smart Watch Series V',
    description: 'Track your health, fitness, and notifications with an AMOLED Retina display, heart rate sensor, and waterproof casing.',
    price: 149.50,
    originalPrice: 179.99,
    discountPercentage: 17,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop',
    inStock: true,
    stockCount: 8,
    rating: 4.6,
    numReviews: 89,
    isFeatured: true,
    isBestSeller: true,
    brand: 'TechTime'
  },
  {
    _id: 'prod-3',
    name: 'Classic Leather Crossbody Bag',
    description: 'Handcrafted genuine leather crossbody bag with multiple compartments, adjustable strap, and durable brass hardware.',
    price: 89.00,
    originalPrice: 119.00,
    discountPercentage: 25,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop',
    inStock: true,
    stockCount: 22,
    rating: 4.7,
    numReviews: 45,
    isFeatured: true,
    brand: 'UrbanCraft'
  },
  {
    _id: 'prod-4',
    name: 'Ergonomic Wooden Desk Lamp',
    description: 'Warm LED lighting with dimmable controls, flexible wooden arm, and minimalist Scandinavian design.',
    price: 49.99,
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop',
    inStock: true,
    stockCount: 12,
    rating: 4.5,
    numReviews: 32,
    brand: 'NordicLight'
  },
  {
    _id: 'prod-5',
    name: 'Ultra-Lightweight Running Shoes',
    description: 'Breathable mesh upper with responsive foam cushioning for maximum performance and comfort during long runs.',
    price: 110.00,
    originalPrice: 135.00,
    discountPercentage: 18,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop',
    inStock: true,
    stockCount: 30,
    rating: 4.9,
    numReviews: 210,
    isFeatured: true,
    isTrending: true,
    brand: 'Strider'
  }
];

export default mockProducts;
