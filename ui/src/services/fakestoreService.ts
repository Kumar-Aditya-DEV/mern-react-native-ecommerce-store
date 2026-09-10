import apiClient from './apiClient';

export interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface FakeStoreCartItem {
  productId: number;
  quantity: number;
}

export interface FakeStoreCart {
  id: number;
  userId: number;
  date: string;
  products: FakeStoreCartItem[];
}

export interface FakeStoreUser {
  id: number;
  email: string;
  username: string;
  phone: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
}

export const fakestoreService = {
  // Fetch FakeStore Products
  async getProducts(): Promise<FakeStoreProduct[]> {
    try {
      const response = await apiClient.get('/fakestore/products');
      return response.data?.data || response.data;
    } catch (error) {
      // Fallback direct fetch if backend offline
      const directRes = await fetch('https://fakestoreapi.com/products');
      return await directRes.json();
    }
  },

  // Fetch single FakeStore Product
  async getProductById(id: number | string): Promise<FakeStoreProduct> {
    try {
      const response = await apiClient.get(`/fakestore/products/${id}`);
      return response.data?.data || response.data;
    } catch (error) {
      const directRes = await fetch(`https://fakestoreapi.com/products/${id}`);
      return await directRes.json();
    }
  },

  // Fetch FakeStore Carts
  async getCarts(): Promise<FakeStoreCart[]> {
    try {
      const response = await apiClient.get('/fakestore/carts');
      return response.data?.data || response.data;
    } catch (error) {
      const directRes = await fetch('https://fakestoreapi.com/carts');
      return await directRes.json();
    }
  },

  // Fetch FakeStore Users
  async getUsers(): Promise<FakeStoreUser[]> {
    try {
      const response = await apiClient.get('/fakestore/users');
      return response.data?.data || response.data;
    } catch (error) {
      const directRes = await fetch('https://fakestoreapi.com/users');
      return await directRes.json();
    }
  },

  // Trigger sync of FakeStore API items into backend database
  async syncWithBackend(): Promise<any> {
    const response = await apiClient.post('/fakestore/sync');
    return response.data;
  }
};

export default fakestoreService;
