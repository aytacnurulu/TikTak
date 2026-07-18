// src/constants/api.constants.ts

export const API = {
  ADMIN: {
    AUTH: {
      LOGIN: "/api/tiktak/auth/admin/login",
    },
    PROFILE: {
      GET: "/api/tiktak/admin/profile",
    },
    CATEGORY: {
      CREATE: "/api/tiktak/admin/category",
      LIST: "/api/tiktak/admin/categories",
      UPDATE: (id: number) => `/api/tiktak/admin/categories/${id}`,
      DELETE: (id: number) => `/api/tiktak/admin/categories/${id}`,
    },
    PRODUCT: {
      CREATE: "/api/tiktak/admin/product",
      LIST: "/api/tiktak/admin/products",
      UPDATE: (id: number) => `/api/tiktak/admin/products/${id}`,
      DELETE: (id: number) => `/api/tiktak/admin/products/${id}`,
    },
    CAMPAIGN: {
      CREATE: "/api/tiktak/admin/campaign",
      LIST: "/api/tiktak/admin/campaigns",
      UPDATE: (id: number) => `/api/tiktak/admin/campaigns/${id}`,
      DELETE: (id: number) => `/api/tiktak/admin/campaigns/${id}`,
    },
    USERS: {
      LIST: "/api/tiktak/admin/users",
    },
    ORDERS: {
      LIST: "/api/tiktak/orders/admin",
      STATS: "/api/tiktak/orders/admin/stats",
      UPDATE_STATUS: (id: number) => `/api/tiktak/orders/admin/${id}/status`,
    },
  },

  CLIENT: {
    AUTH: {
      LOGIN: "/api/tiktak/auth/login",
      SIGNUP: "/api/tiktak/auth/signup",
      VERIFY_OTP: "/api/tiktak/auth/refresh",
    },
    PRODUCT: {
      LIST: "/api/tiktak/products",
      DETAIL: (id: number) => `/api/tiktak/products/${id}`,
      FAVORITE_TOGGLE: (id: number) => `/api/tiktak/products/${id}/favorite`,
      FAVORITES_LIST: "/api/tiktak/products/favorites",
    },
    CATEGORY: {
      LIST: "/api/tiktak/categories",
    },
    BASKET: {
      LIST: "/api/tiktak/basket",
      ADD: (productId: number) => `/api/tiktak/basket/${productId}/add`,
      REMOVE: (productId: number) => `/api/tiktak/basket/${productId}/remove`,
      REMOVE_ALL: (productId: number) =>
        `/api/tiktak/basket/${productId}/remove-all`,
      CLEAR: "/api/tiktak/basket/clear",
    },
    ORDERS: {
      CREATE: "/api/tiktak/orders/user",
      LIST: "/api/tiktak/orders/user",
    },
  },

  UPLOAD: "/api/tiktak/upload",
};
