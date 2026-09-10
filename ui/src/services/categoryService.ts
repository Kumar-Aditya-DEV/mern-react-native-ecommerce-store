import apiClient from './apiClient';
import mockCategories from '../data/categories';
import { Category } from '../types';

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    try {
      const response = await apiClient.get('/categories');
      if (response.data && response.data.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data.map((cat: any) => ({
          _id: cat._id || cat.id,
          name: cat.name,
          icon: cat.icon || 'grid-outline',
          image: cat.image || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&auto=format&fit=crop',
          itemCount: cat.itemCount || 10
        }));
      }
    } catch (error) {
      console.warn('Backend /api/categories unavailable, using mock categories');
    }
    return mockCategories;
  }
};

export default categoryService;
