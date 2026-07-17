import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import CampaignsPage from "../features/campaigns/pages/CampaignsPage";
import CategoriesPage from "../features/categories/pages/CategoriesPage";
import Dashboard from "../features/dashboard/pages/Dashboard";
import OrdersPage from "../features/orders/pages/OrdersPage";
import ProductsPage from "../features/products/pages/ProductsPage";
import UsersPage from "../features/users/pages/UsersPage";
import ProtectedRoute from "../features/auth/components/ProtectedRoute.tsx";
import AdminLayout from "../shared/components/AdminLayout/AdminLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Route>
    </Routes>
  );
}