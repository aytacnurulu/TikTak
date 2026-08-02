import { create } from "zustand";
import { getCampaigns } from "../../features/campaigns/api/campaigns.service";
import { getCategories } from "../../features/categories/api/categories.service";
import { getProducts } from "../../features/products/api/products.service";
import { getUsers } from "../../features/users/api/users.service";
import { getOrders } from "../../features/orders/api/orders.service";
import type {
  AdminUser,
  Campaign,
  Category,
  Order,
  Product,
  ProductListQuery,
  OrderListResponse,
} from "../types/admin.types";

interface AdminStoreState {
  campaigns: Campaign[];
  categories: Category[];
  products: Product[];
  users: AdminUser[];
  orders: Order[];
  ordersPagination: OrderListResponse["pagination"] | null;
  isLoadingCampaigns: boolean;
  isLoadingCategories: boolean;
  isLoadingProducts: boolean;
  isLoadingUsers: boolean;
  isLoadingOrders: boolean;
  campaignsError: string | null;
  categoriesError: string | null;
  productsError: string | null;
  usersError: string | null;
  ordersError: string | null;
  loadCampaigns: () => Promise<void>;
  loadCategories: () => Promise<void>;
  loadProducts: () => Promise<void>;
  loadUsers: () => Promise<void>;
  loadOrders: (query?: ProductListQuery) => Promise<void>;
}

export const useAdminStore = create<AdminStoreState>((set) => ({
  campaigns: [],
  categories: [],
  products: [],
  users: [],
  orders: [],
  ordersPagination: null,
  isLoadingCampaigns: false,
  isLoadingCategories: false,
  isLoadingProducts: false,
  isLoadingUsers: false,
  isLoadingOrders: false,
  campaignsError: null,
  categoriesError: null,
  productsError: null,
  usersError: null,
  ordersError: null,

  loadCampaigns: async () => {
    set({ isLoadingCampaigns: true, campaignsError: null });
    try {
      const response = await getCampaigns();
      set({ campaigns: response.data });
    } catch (error) {
      set({ campaignsError: "Kampaniyalar yüklənmədi" });
    } finally {
      set({ isLoadingCampaigns: false });
    }
  },

  loadCategories: async () => {
    set({ isLoadingCategories: true, categoriesError: null });
    try {
      const response = await getCategories();
      set({ categories: response.data });
    } catch (error) {
      set({ categoriesError: "Kateqoriyalar yüklənmədi" });
    } finally {
      set({ isLoadingCategories: false });
    }
  },

  loadProducts: async () => {
    set({ isLoadingProducts: true, productsError: null });
    try {
      const response = await getProducts({ page: 1, limit: 100 });
      set({ products: response.data });
    } catch (error) {
      set({ productsError: "Məhsullar yüklənmədi" });
    } finally {
      set({ isLoadingProducts: false });
    }
  },

  loadUsers: async () => {
    set({ isLoadingUsers: true, usersError: null });
    try {
      const response = await getUsers();
      set({ users: response.data });
    } catch (error) {
      set({ usersError: "İstifadəçilər yüklənmədi" });
    } finally {
      set({ isLoadingUsers: false });
    }
  },

  loadOrders: async (query = { page: 1, limit: 100 }) => {
    set({ isLoadingOrders: true, ordersError: null });
    try {
      const response = await getOrders(query);
      set({ orders: response.data, ordersPagination: response.pagination });
    } catch (error) {
      set({ ordersError: "Sifarişlər yüklənmədi" });
    } finally {
      set({ isLoadingOrders: false });
    }
  },
}));
