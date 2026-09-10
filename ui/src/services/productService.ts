import apiClient from './apiClient';
import mockProducts from '../data/products';
import { Product } from '../types';

export const productService = {
  // Get all products with optional filters
  async getProducts(params?: { category?: string; keyword?: string; page?: number; pageSize?: number }): Promise<Product[]> {
    try {
      const response = await apiClient.get('/products', { params });
      if (response.data && response.data.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data;
      }
    } catch (error) {
      console.warn('Backend /api/products unavailable, using fallback/FakeStore API', error);
    }

    // Fallback to FakeStore API / mockProducts if backend query fails or is empty
    try {
      const res = await apiClient.get('/fakestore/products');
      if (res.data?.data && Array.isArray(res.data.data)) {
        return res.data.data.map((item: any) => ({
          _id: String(item.id),
          name: item.title,
          category: item.category,
          price: item.price,
          originalPrice: Math.round(item.price * 1.25 * 100) / 100,
          discount: 20,
          rating: item.rating ? item.rating.rate : 4.5,
          numReviews: item.rating ? item.rating.count : 30,
          stock: 20,
          isFeatured: true,
          isLatest: true,
          images: [item.image],
          description: item.description,
          features: ['High Quality', 'Authentic Item']
        }));
      }
    } catch (e) {}

    return mockProducts;
  },

  // Get product by ID
  async getProductById(id: string): Promise<Product | null> {
    try {
      const response = await apiClient.get(`/products/${id}`);
      if (response.data && response.data.data) {
        return response.data.data;
      }
    } catch (error) {
      console.warn(`Backend /api/products/${id} error, checking local/fakestore...`);
    }

    // Try local mock search
    const local = mockProducts.find(p => p._id === id);
    if (local) return local;

    // Try FakeStore API direct lookup
    try {
      const res = await apiClient.get(`/fakestore/products/${id}`);
      const item = res.data?.data || res.data;
      if (item && item.title) {
        return {
          _id: String(item.id),
          name: item.title,
          category: item.category,
          price: item.price,
          originalPrice: Math.round(item.price * 1.25 * 100) / 100,
          discountPercentage: 20,
          rating: item.rating ? item.rating.rate : 4.5,
          numReviews: item.rating ? item.rating.count : 30,
          inStock: true,
          stockCount: 20,
          isFeatured: true,
          image: item.image,
          images: [item.image],
          description: item.description
        };
      }
    } catch (e) {}

    return null;
  }
};

export default productService;
