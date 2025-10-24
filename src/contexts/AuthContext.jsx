import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Verificar si hay usuario autenticado al cargar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authAPI.getMe();
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Escuchar evento de token expirado desde el interceptor de axios
  useEffect(() => {
    const handleAuthExpired = (event) => {
      const message = event.detail?.message || 'Tu sesión ha expirado';
      
      // Limpiar usuario
      setUser(null);
      
      // Redirigir a login con mensaje
      navigate('/admin/login', { 
        replace: true,
        state: { 
          sessionExpired: true,
          message: 'Tu sesión ha expirado. Por favor, iniciá sesión nuevamente.'
        }
      });
    };

    window.addEventListener('auth:expired', handleAuthExpired);
    
    return () => {
      window.removeEventListener('auth:expired', handleAuthExpired);
    };
  }, [navigate]);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      // El backend setea la cookie HttpOnly; usamos el usuario devuelto
      const { user } = response.data;
      setUser(user);
      return { success: true, user };
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Error al iniciar sesión'
      };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch {}
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
