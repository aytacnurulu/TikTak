import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "@/features/auth/components/ProtectedRoute.tsx";
import AdminLayout from "@/shared/components/AdminLayout/AdminLayout";
import PageLoader from "@/shared/components/PageLoader";
import { lazyWithRetry } from "@/shared/lib/lazyWithRetry";

const LoginPage = lazyWithRetry(
  () => import("@/features/auth/pages/LoginPage"),
  "LoginPage",
);
const CampaignsPage = lazyWithRetry(
  () => import("@/features/campaigns/pages/CampaignsPage"),
  "CampaignsPage",
);
const CategoriesPage = lazyWithRetry(
  () => import("@/features/categories/pages/CategoriesPage"),
  "CategoriesPage",
);
const OrdersPage = lazyWithRetry(
  () => import("@/features/orders/pages/OrdersPage"),
  "OrdersPage",
);
const ProductsPage = lazyWithRetry(
  () => import("@/features/products/pages/ProductsPage"),
  "ProductsPage",
);
const UsersPage = lazyWithRetry(
  () => import("@/features/users/pages/UsersPage"),
  "UsersPage",
);

export default function App() {
  return (
    <Suspense fallback={<PageLoader fullScreen />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Navigate to="/orders" replace />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
