import type {
  Product,
  ProductListQuery,
  ProductListResponse,
  ProductCreateRequest,
  ProductUpdateRequest,
  ProductResponse,
} from "../../../shared/types/admin.types";
import { axiosInstance } from "../../../shared/lib/axios";
import { API } from "../../../shared/constants/api.constant";

function normalizeProductListResponse(payload: any): ProductListResponse {
  const source = payload?.data ?? payload;
  const list = Array.isArray(source)
    ? source
    : Array.isArray(source?.products)
      ? source.products
      : Array.isArray(source?.items)
        ? source.items
        : [];

  const paginationSource = payload?.pagination ?? source?.pagination ?? {};

  return {
    message: payload?.message ?? "",
    data: list as Product[],
    pagination: {
      next: paginationSource?.next ?? null,
      prev: paginationSource?.prev ?? null,
      current: paginationSource?.current ?? 1,
      total: paginationSource?.total ?? list.length,
      totalPages: paginationSource?.totalPages ?? 1,
    },
    result: payload?.result ?? true,
  };
}

function normalizeProductResponse(payload: any): ProductResponse {
  const source = payload?.data ?? payload;

  return {
    message: payload?.message ?? "",
    data: source as Product,
    result: payload?.result ?? true,
  };
}

export async function getProducts(
  query: ProductListQuery,
): Promise<ProductListResponse> {
  const { data } = await axiosInstance.get<any>(API.ADMIN.PRODUCT.LIST, {
    params: query,
  });
  return normalizeProductListResponse(data);
}

export async function createProduct(
  payload: ProductCreateRequest,
): Promise<ProductResponse> {
  const { data } = await axiosInstance.post<any>(
    API.ADMIN.PRODUCT.CREATE,
    payload,
  );
  return normalizeProductResponse(data);
}

export async function updateProduct(
  id: number,
  payload: ProductUpdateRequest,
): Promise<ProductResponse> {
  const { data } = await axiosInstance.put<any>(
    API.ADMIN.PRODUCT.UPDATE(id),
    payload,
  );
  return normalizeProductResponse(data);
}

export async function deleteProduct(id: number): Promise<void> {
  await axiosInstance.delete(API.ADMIN.PRODUCT.DELETE(id));
}
