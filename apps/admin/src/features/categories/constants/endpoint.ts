export const CATEGORY_ENDPOINTS = {
  LIST: "/api/tiktak/admin/categories",
  CREATE: "/api/tiktak/admin/category",
  UPDATE: (id: number | string) => `/api/tiktak/admin/categories/${id}`,
  DELETE: (id: number | string) => `/api/tiktak/admin/categories/${id}`,
} as const;
