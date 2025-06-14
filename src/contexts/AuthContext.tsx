import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'admin';
  avatar?: string;
  isApproved?: boolean;
  canSell?: boolean;
  businessName?: string;
  businessType?: string;
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: string) => Promise<{ success: boolean; message?: string }>;
  register: (userData: any) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('farmcart_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, role?: string): Promise<{ success: boolean; message?: string }> => {
    // Mock login with different user types
    let mockUser: User;
    
    // Admin login requires special access code
    if (role === 'admin') {
      if (password !== 'admin123secure') {
        return {
          success: false,
          message: 'Invalid admin credentials. Access denied.'
        };
      }
      mockUser = {
        id: 'admin-1',
        name: 'System Administrator',
        email: email,
        role: 'admin',
        isApproved: true,
        canSell: false
      };
    } else if (role === 'seller' || email.includes('seller')) {
      mockUser = {
        id: 'seller-1',
        name: 'John Farmer',
        email: email,
        role: 'seller',
        isApproved: true,
        canSell: true,
        businessName: 'Green Valley Farm',
        businessType: 'farm',
        phone: '+91 98765 43210',
        address: 'Punjab, India'
      };
    } else {
      mockUser = {
        id: 'buyer-1',
        name: 'Jane Customer',
        email: email,
        role: 'buyer',
        isApproved: true,
        canSell: false,
        phone: '+91 98765 43210',
        address: 'Mumbai, India'
      };
    }

    // Check if seller is approved
    if (mockUser.role === 'seller' && !mockUser.isApproved) {
      return {
        success: false,
        message: 'Your seller account is pending approval. Please wait for admin verification.'
      };
    }
    
    setUser(mockUser);
    localStorage.setItem('farmcart_user', JSON.stringify(mockUser));
    return { success: true };
  };

  const register = async (userData: any): Promise<{ success: boolean; message?: string }> => {
    // Mock registration
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role || 'buyer',
      isApproved: userData.role === 'seller' ? false : true,
      canSell: userData.role === 'seller' ? false : false,
      businessName: userData.businessName,
      businessType: userData.businessType,
      phone: userData.phone,
      address: userData.address
    };

    if (newUser.role === 'seller') {
      return {
        success: true,
        message: 'Registration successful! Your seller account is pending admin approval. You will be notified once approved.'
      };
    }
    
    setUser(newUser);
    localStorage.setItem('farmcart_user', JSON.stringify(newUser));
    return { success: true };
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('farmcart_user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('farmcart_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateUser,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};