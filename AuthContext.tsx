import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as api from './api';
import { User } from './types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const currentUser = await api.getMe();
          setUser(currentUser);
        } catch (error) {
          console.error("Session check failed", error);
          localStorage.removeItem('authToken');
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    checkLoggedIn();
  }, []);

  const login = async (email: string, password: string) => {
    const { token } = await api.login(email, password);
    localStorage.setItem('authToken', token);
    const currentUser = await api.getMe();
    setUser(currentUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };
  
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
