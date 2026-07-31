// src/constants/routes.constants.ts

export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
    VERIFY_OTP: "/verify-otp",
  },

  CLIENT: {
    HOME: "/",
    PRODUCTS: "/products",
    PRODUCT_DETAIL: (id: number | string = ":id") => `/products/${id}`,
    BASKET: "/basket",
    CHECKOUT: "/checkout",
    ORDERS: "/orders",
    FAVORITES: "/favorites",
    PROFILE: "/profile",
  },

  ADMIN: {
    DASHBOARD: "/admin",
    USERS: "/admin/users",
    PRODUCTS: "/admin/products",
    CATEGORIES: "/admin/categories",
    CAMPAIGNS: "/admin/campaigns",
    ORDERS: "/admin/orders",
  },
};
