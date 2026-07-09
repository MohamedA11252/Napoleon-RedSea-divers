import React, { createContext, useState, useContext, useEffect } from 'react';

const AUTH_STORAGE_KEY = 'napoleon_auth_user';

const AuthContext = createContext(null);

function readStoredUser() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings, setAppPublicSettings] = useState(null);

  useEffect(() => {
    const storedUser = readStoredUser();
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
    setIsLoadingAuth(false);
    setAuthChecked(true);
  }, []);

  // Derived admin flag — only true when the stored user was authenticated as admin
  const isAdmin = user?.isAdmin === true;

  const loginWithEmailPassword = async (username, password) => {
    if (!username?.trim() || !password?.trim()) {
      throw new Error('Username and password are required');
    }

    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      throw new Error('Admin credentials are not configured. Please contact the site owner.');
    }

    if (username.trim() !== adminUsername || password !== adminPassword) {
      throw new Error('Invalid username or password');
    }

    const nextUser = {
      id: 'admin',
      username: adminUsername,
      full_name: 'Administrator',
      isAdmin: true,
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    setIsAuthenticated(true);
    setAuthError(null);
    setAuthChecked(true);
    return nextUser;
  };

  // Provider sign-in is not used for admin — kept for interface compatibility
  const loginWithProvider = async () => {
    throw new Error('Provider sign-in is not available for admin login');
  };

  const checkUserAuth = async () => {
    setIsLoadingAuth(true);
    const storedUser = readStoredUser();
    setUser(storedUser);
    setIsAuthenticated(!!storedUser);
    setIsLoadingAuth(false);
    setAuthChecked(true);
  };

  const checkAppState = async () => {
    setIsLoadingPublicSettings(false);
    setAuthError(null);
    await checkUserAuth();
  };

  const logout = (shouldRedirect = true) => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
    setIsAuthenticated(false);
    setAuthChecked(true);

    if (shouldRedirect) {
      window.location.href = '/login';
    }
  };

  const navigateToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        appPublicSettings,
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
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
