import { useAdminStore } from './useAdminStore';
import { getCampaigns } from '@/features/campaigns/api/campaigns.service';
import { getCategories } from '@/features/categories/api/categories.service';
import { getProducts } from '@/features/products/api/products.service';
import { getUsers } from '@/features/users/api/users.service';
import { getOrders } from '@/features/orders/api/orders.service';

jest.mock('../../features/campaigns/api/campaigns.service');
jest.mock('../../features/categories/api/categories.service');
jest.mock('../../features/products/api/products.service');
jest.mock('../../features/users/api/users.service');
jest.mock('../../features/orders/api/orders.service');

describe('useAdminStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAdminStore.setState({
      campaigns: [], categories: [], products: [], users: [], orders: [],
      ordersPagination: null,
      isLoadingCampaigns: false, isLoadingCategories: false,
      isLoadingProducts: false, isLoadingUsers: false, isLoadingOrders: false,
      campaignsError: null, categoriesError: null, productsError: null,
      usersError: null, ordersError: null,
    });
  });

  it('loads campaigns successfully', async () => {
    (getCampaigns as jest.Mock).mockResolvedValue({ data: [{ id: 1 }] });
    await useAdminStore.getState().loadCampaigns();
    const state = useAdminStore.getState();
    expect(state.campaigns).toEqual([{ id: 1 }]);
    expect(state.isLoadingCampaigns).toBe(false);
    expect(state.campaignsError).toBeNull();
  });

  it('sets error when loadCampaigns fails', async () => {
    (getCampaigns as jest.Mock).mockRejectedValue(new Error('fail'));
    await useAdminStore.getState().loadCampaigns();
    const state = useAdminStore.getState();
    expect(state.campaignsError).toBe('Kampaniyalar yüklənmədi');
    expect(state.isLoadingCampaigns).toBe(false);
  });

  it('loads categories successfully', async () => {
    (getCategories as jest.Mock).mockResolvedValue({ data: [{ id: 1 }] });
    await useAdminStore.getState().loadCategories();
    const state = useAdminStore.getState();
    expect(state.categories).toEqual([{ id: 1 }]);
    expect(state.categoriesError).toBeNull();
  });

  it('sets error when loadCategories fails', async () => {
    (getCategories as jest.Mock).mockRejectedValue(new Error('fail'));
    await useAdminStore.getState().loadCategories();
    expect(useAdminStore.getState().categoriesError).toBe('Kateqoriyalar yüklənmədi');
  });

  it('loads products successfully', async () => {
    (getProducts as jest.Mock).mockResolvedValue({ data: [{ id: 1 }] });
    await useAdminStore.getState().loadProducts();
    const state = useAdminStore.getState();
    expect(state.products).toEqual([{ id: 1 }]);
    expect(getProducts).toHaveBeenCalledWith({ page: 1, limit: 100 });
  });

  it('sets error when loadProducts fails', async () => {
    (getProducts as jest.Mock).mockRejectedValue(new Error('fail'));
    await useAdminStore.getState().loadProducts();
    expect(useAdminStore.getState().productsError).toBe('Məhsullar yüklənmədi');
  });

  it('loads users successfully', async () => {
    (getUsers as jest.Mock).mockResolvedValue({ data: [{ id: 1 }] });
    await useAdminStore.getState().loadUsers();
    expect(useAdminStore.getState().users).toEqual([{ id: 1 }]);
  });

  it('sets error when loadUsers fails', async () => {
    (getUsers as jest.Mock).mockRejectedValue(new Error('fail'));
    await useAdminStore.getState().loadUsers();
    expect(useAdminStore.getState().usersError).toBe('İstifadəçilər yüklənmədi');
  });

  it('loads orders successfully with default query', async () => {
    (getOrders as jest.Mock).mockResolvedValue({ data: [{ id: 1 }], pagination: { total: 1 } });
    await useAdminStore.getState().loadOrders();
    const state = useAdminStore.getState();
    expect(state.orders).toEqual([{ id: 1 }]);
    expect(state.ordersPagination).toEqual({ total: 1 });
    expect(getOrders).toHaveBeenCalledWith({ page: 1, limit: 100 });
  });

  it('sets error when loadOrders fails', async () => {
    (getOrders as jest.Mock).mockRejectedValue(new Error('fail'));
    await useAdminStore.getState().loadOrders();
    expect(useAdminStore.getState().ordersError).toBe('Sifarişlər yüklənmədi');
  });
});