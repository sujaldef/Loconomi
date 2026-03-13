import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { authAPI } from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    userType: null,
  });

  // Load auth from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const userType = localStorage.getItem('userType');

    if (token && user) {
      try {
        setAuth({
          user: JSON.parse(user),
          isAuthenticated: true,
          loading: false,
          error: null,
          userType: userType || 'user',
        });
      } catch (error) {
        console.error('Failed to parse stored user data');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userType');
      }
    }
  }, []);

  const userSignup = useCallback(async (name, email, password) => {
    setAuth((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await authAPI.userSignup(name, email, password);

      if (response.status === 'success') {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userType', 'user');

        setAuth({
          user,
          isAuthenticated: true,
          loading: false,
          error: null,
          userType: 'user',
        });

        return { success: true, message: 'Signup successful' };
      }
    } catch (error) {
      const errorMessage = error.message || 'Signup failed';
      setAuth((prev) => ({ ...prev, loading: false, error: errorMessage }));
      return { success: false, message: errorMessage };
    }
  }, []);

  const userLogin = useCallback(async (email, password) => {
    setAuth((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await authAPI.userLogin(email, password);

      if (response.status === 'success') {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userType', 'user');

        setAuth({
          user,
          isAuthenticated: true,
          loading: false,
          error: null,
          userType: 'user',
        });

        return { success: true, message: 'Login successful' };
      }
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      setAuth((prev) => ({ ...prev, loading: false, error: errorMessage }));
      return { success: false, message: errorMessage };
    }
  }, []);

  const providerSignup = useCallback(
    async (name, email, password, role, wage, phone) => {
      setAuth((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const response = await authAPI.providerSignup(
          name,
          email,
          password,
          role,
          wage,
          phone,
        );

        if (response.status === 'success') {
          const { token, provider } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(provider));
          localStorage.setItem('userType', 'provider');

          setAuth({
            user: provider,
            isAuthenticated: true,
            loading: false,
            error: null,
            userType: 'provider',
          });

          return { success: true, message: 'Provider signup successful' };
        }
      } catch (error) {
        const errorMessage = error.message || 'Provider signup failed';
        setAuth((prev) => ({ ...prev, loading: false, error: errorMessage }));
        return { success: false, message: errorMessage };
      }
    },
    [],
  );

  const providerLogin = useCallback(async (email, password) => {
    setAuth((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await authAPI.providerLogin(email, password);

      if (response.status === 'success') {
        const { token, provider } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(provider));
        localStorage.setItem('userType', 'provider');

        setAuth({
          user: provider,
          isAuthenticated: true,
          loading: false,
          error: null,
          userType: 'provider',
        });

        return { success: true, message: 'Login successful' };
      }
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      setAuth((prev) => ({ ...prev, loading: false, error: errorMessage }));
      return { success: false, message: errorMessage };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    setAuth({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      userType: null,
    });
  }, []);

  const clearError = useCallback(() => {
    setAuth((prev) => ({ ...prev, error: null }));
  }, []);

  const value = {
    ...auth,
    userSignup,
    userLogin,
    providerSignup,
    providerLogin,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
