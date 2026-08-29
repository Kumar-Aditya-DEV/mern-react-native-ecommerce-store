import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthContextType } from '../types';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  userToken: null,
  isLoading: true,
  isAdmin: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  updateUser: async () => {},
  switchRole: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadStoredAuthData();
  }, []);

  const loadStoredAuthData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      const storedUser = await AsyncStorage.getItem('userData');

      if (storedToken && storedUser) {
        setUserToken(storedToken);
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
        setUserToken(null);
      }
    } catch (e) {
      console.error('Failed to load auth state', e);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData: User, token: string) => {
    try {
      setUser(userData);
      setUserToken(token);
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (e) {
      console.error('Failed to save login info', e);
    }
  };

  const register = async (userData: User, token: string) => {
    await login(userData, token);
  };

  const logout = async () => {
    try {
      setUser(null);
      setUserToken(null);
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
    } catch (e) {
      console.error('Failed to clear auth storage', e);
    }
  };

  const updateUser = async (updatedData: Partial<User>) => {
    if (!user) return;
    const newUserData = { ...user, ...updatedData };
    setUser(newUserData);
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(newUserData));
    } catch (e) {
      console.error('Failed to update user storage', e);
    }
  };

  const switchRole = () => {
    if (!user) return;
    const newRole: 'user' | 'admin' = user.role === 'admin' ? 'user' : 'admin';
    updateUser({ role: newRole });
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        userToken,
        isLoading,
        isAdmin,
        login,
        register,
        logout,
        updateUser,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
