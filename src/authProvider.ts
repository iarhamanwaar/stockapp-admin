import type { AuthProvider } from "@refinedev/core";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "admin@stockapp.com";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    // Hardcoded credentials check
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const mockToken = "mock-admin-token-12345";
      const mockUser = {
        id: 1,
        email: ADMIN_EMAIL,
        name: "Admin User",
        role: "admin"
      };

      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      return {
        success: true,
        redirectTo: "/",
      };
    } else {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid credentials. Use admin@stockapp.com / admin123",
        },
      };
    }
  },

  check: async () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }

    // For hardcoded auth, just check if token exists
    if (token === "mock-admin-token-12345") {
      return {
        authenticated: true,
      };
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }
  },

  logout: async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    return {
      success: true,
      redirectTo: "/login",
    };
  },

  onError: async (error) => {
    if (error?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      return {
        logout: true,
        redirectTo: "/login",
      };
    }

    return {};
  },

  getIdentity: async () => {
    const user = localStorage.getItem("user");
    
    if (user) {
      return JSON.parse(user);
    }
    
    return null;
  },
};