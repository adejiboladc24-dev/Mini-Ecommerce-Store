import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('luxestore_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signup = (userData) => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('luxestore_users') || '[]');
    
    // Check if email already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // In production, this should be hashed
      phone: userData.phone || '',
      createdAt: new Date().toISOString(),
    };

    // Save to users list
    users.push(newUser);
    localStorage.setItem('luxestore_users', JSON.stringify(users));

    // Set as current user (without password)
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    
    setUser(userWithoutPassword);
    localStorage.setItem('luxestore_user', JSON.stringify(userWithoutPassword));

    return userWithoutPassword;
  };

  const login = (email, password) => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('luxestore_users') || '[]');
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Set as current user (without password)
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    
    setUser(userWithoutPassword);
    localStorage.setItem('luxestore_user', JSON.stringify(userWithoutPassword));

    return userWithoutPassword;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('luxestore_user');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('luxestore_user', JSON.stringify(updatedUser));

    // Update in users list
    const users = JSON.parse(localStorage.getItem('luxestore_users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      localStorage.setItem('luxestore_users', JSON.stringify(users));
    }
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
