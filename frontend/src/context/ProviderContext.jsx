import React, { createContext, useContext, useState, useCallback } from 'react';
import { providerAPI } from '../api/client';

const ProviderContext = createContext();

export const ProviderProvider = ({ children }) => {
  const [providers, setProviders] = useState({
    data: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 20,
      total: 0,
      pages: 0,
    },
  });

  const fetchProviders = useCallback(
    async (page = 1, limit = 20, filters = {}) => {
      setProviders((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const response = await providerAPI.getAll(page, limit, filters);

        if (response.status === 'success') {
          setProviders({
            data: response.data,
            loading: false,
            error: null,
            pagination: response.pagination || {
              page,
              limit,
              total: 0,
              pages: 0,
            },
          });
          return { success: true };
        }
      } catch (error) {
        const errorMessage = error.message || 'Failed to fetch providers';
        setProviders((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        return { success: false, message: errorMessage };
      }
    },
    [],
  );

  const fetchProvidersByRole = useCallback(
    async (role, page = 1, limit = 20) => {
      setProviders((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const response = await providerAPI.getByRole(role, page, limit);

        if (response.status === 'success') {
          setProviders({
            data: response.data,
            loading: false,
            error: null,
            pagination: response.pagination || {
              page,
              limit,
              total: 0,
              pages: 0,
            },
          });
          return { success: true };
        }
      } catch (error) {
        const errorMessage = error.message || 'Failed to fetch providers';
        setProviders((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        return { success: false, message: errorMessage };
      }
    },
    [],
  );

  const clearError = useCallback(() => {
    setProviders((prev) => ({ ...prev, error: null }));
  }, []);

  const value = {
    ...providers,
    fetchProviders,
    fetchProvidersByRole,
    clearError,
  };

  return (
    <ProviderContext.Provider value={value}>
      {children}
    </ProviderContext.Provider>
  );
};

export const useProviders = () => {
  const context = useContext(ProviderContext);
  if (!context) {
    throw new Error('useProviders must be used within a ProviderProvider');
  }
  return context;
};
