import type { AuthProvider } from "@refinedev/core";
import { AUTH_SIGNIN_PAGE } from "@auth/constants/local.urls";
import { axiosInstance } from "./_service/axious";
import {
  BASE_URL,
  REFRESH_KEY,
  TOKEN_KEY,
  USER_ACCESS,
  USER_DETAIL,
} from "@common/options";

export const authProvider: AuthProvider = {
  login: async ({ username, email, password }) => {
    try {
      const response = await axiosInstance.post(BASE_URL + "/auth/login", {
        username: email,
        password,
      });
      if (response.status === 201) {
        const userDetails = response.data.userDetails;
        localStorage.setItem(TOKEN_KEY, response.data.accessToken);
        localStorage.setItem(REFRESH_KEY, response.data.refreshToken);
        localStorage.setItem(
          USER_ACCESS,
          JSON.stringify(userDetails.permissions ?? [])
        );
        delete userDetails.permissions;
        localStorage.setItem(
          USER_DETAIL,
          JSON.stringify(response.data.userDetails)
        );
        localStorage.setItem("LOGIN_FLAG", "LOGIN_FLAG");
        window.location.href = "/";
        return {
          success: true,
          redirectTo: "/",
        };
      }
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        error: {
          message: error.message,
          name: "Login Error",
        },
      };
    }

    return {
      success: false,
      error: {
        message: "Invalid credentials",
        name: "Login Error",
      },
    };
  },
  register: async ({ email, password }) => {
    try {
      await authProvider.login({ email, password });
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: "Register failed",
          name: "Invalid email or password",
        },
      };
    }
  },
  updatePassword: async (params) => {
    return {
      success: true,
    };
  },
  forgotPassword: async () => {
    return {
      success: true,
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_DETAIL);
    localStorage.removeItem(USER_ACCESS);
    window.location.href = AUTH_SIGNIN_PAGE;
    return {
      success: true,
      redirectTo: AUTH_SIGNIN_PAGE,
    };
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      error: {
        message: "Check failed",
        name: "Token not found",
      },
      logout: true,
      redirectTo: AUTH_SIGNIN_PAGE,
    };
  },
  getPermissions: async () => {
    const permissions = localStorage.getItem(USER_ACCESS);
    if (permissions) {
      return {
        permissions: JSON.parse(localStorage.getItem(USER_ACCESS) ?? "[]"),
      };
    }
    return {
      permissions: [],
    };
  },
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      const user = JSON.parse(localStorage.getItem(USER_DETAIL) ?? "");
      return {
        id: user?.id,
        name: user?.username,
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
};
