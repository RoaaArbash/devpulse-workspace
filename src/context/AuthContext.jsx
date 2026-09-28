import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEFAULT_USER = {
  name: 'Roaa Arbash',
  email: 'roaa@example.com',
  password: '123456',
  role: 'Frontend Developer',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roaa',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('devpulse_user');
    const savedUsersList = localStorage.getItem('devpulse_users_db');

    let parsedUsers = [DEFAULT_USER];
    if (savedUsersList) {
      try {
        parsedUsers = JSON.parse(savedUsersList);
      } catch (e) {
        parsedUsers = [DEFAULT_USER];
      }
    } else {
      localStorage.setItem('devpulse_users_db', JSON.stringify([DEFAULT_USER]));
    }
    setUsersList(parsedUsers);

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('devpulse_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = usersList.find(
          (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
        );

        if (foundUser) {
          const { password, ...userData } = foundUser;
          setUser(userData);
          localStorage.setItem('devpulse_user', JSON.stringify(userData));
          setLoading(false);
          resolve(userData);
        } else {
          setLoading(false);
          reject(new Error('Invalid email or password. Please check your credentials or register a new account.'));
        }
      }, 600);
    });
  };

  const register = async (name, email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exists = usersList.some(
          (u) => u.email.toLowerCase() === email.trim().toLowerCase()
        );

        if (exists) {
          setLoading(false);
          reject(new Error('An account with this email already exists.'));
          return;
        }

        const newUser = {
          name,
          email,
          password,
          role: 'Frontend Developer',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
        };

        const updatedUsersList = [...usersList, newUser];
        setUsersList(updatedUsersList);
        localStorage.setItem('devpulse_users_db', JSON.stringify(updatedUsersList));

        const { password: _, ...userData } = newUser;
        setUser(userData);
        localStorage.setItem('devpulse_user', JSON.stringify(userData));

        setLoading(false);
        resolve(userData);
      }, 600);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('devpulse_user');
  };

  const updateUserProfile = (updatedData) => {
    setUser((prev) => {
      const newUser = { ...prev, ...updatedData };
      localStorage.setItem('devpulse_user', JSON.stringify(newUser));
      return newUser;
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};