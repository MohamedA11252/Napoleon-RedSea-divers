import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { adminApi } from './api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [authError, setAuthError] = useState(null);

  /**
   * Ask the server whether the current HTTP-only session cookie is a valid
   * admin session. No credentials are stored client-side.
   */
  const checkUserAuth = useCallback(async () => {
    setIsLoadingAuth(true);
    try {
      const { isAdmin: adminStatus } = await adminApi.session();
      setIsAdmin(adminStatus);
      setIsAuthenticated(adminStatus);
      setUser(adminStatus ? { id: 'admin', full_name: 'Administrator', isAdmin: true } : null);
      setAuthError(null);
    } catch {
      setIsAdmin(false);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoadingAuth(false);
      setAuthChecked(true);
    }
  }, []);

  // Verify session on first render
  useEffect(() => {
    checkUserAuth();
  }, [checkUserAuth]);

  /**
   * Send username + password to the server for validation.
   * On success the server sets an HTTP-only session cookie.
   * Credentials are never stored in the browser.
   */
  const loginWithEmailPassword = async (username, password) => {
    if (!username?.trim() || !password?.trim()) {
      throw new Error('Username and password are required.');
    }
    await adminApi.login(username.trim(), password); // throws on bad credentials
    setIsAdmin(true);
    setIsAuthenticated(true);
    setUser({ id: 'admin', full_name: 'Administrator', isAdmin: true });
    setAuthError(null);
  };

  // Provider sign-in is not applicable for admin login
  const loginWithProvider = async () => {
    throw new Error('Provider sign-in is not available for admin login.');
  };

  const logout = async (shouldRedirect = true) => {
    try {
      await adminApi.logout();
    } catch {
      // ignore — clear state regardless
    }
    setIsAdmin(false);
    setIsAuthenticated(false);
    setUser(null);
    setAuthChecked(true);
    if (shouldRedirect) {
      window.location.href = '/login';
    }
  };

  const navigateToLogin = () => {
    window.location.href = '/login';
  };

  const checkAppState = async () => {
    setAuthError(null);
    await checkUserAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        isLoadingAuth,
        isLoadingPublicSettings: false,
        authError,
        appPublicSettings: null,
        authChecked,
        logout,
        navigateToLogin,
        checkUserAuth,
        checkAppState,
        loginWithEmailPassword,
        loginWithProvider,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
