// src/features/auth/pages/LoginPage.tsx
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import AppButton from "../../../shared/components/AppButton";
import { AppInput, AppPassword } from "../../../shared/components/AppInput";
import { useAuthStore } from "../../../shared/store/useAuthStore";
import type { AdminLoginRequest } from "../../../shared/types/admin.types";
import { useAdminLogin } from "../hooks/useAuth"
import adminSVG from "../../../assets/images/AdminLogin.svg";

const initialValues: AdminLoginRequest = {
  phone: "",
  password: "",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const { mutateAsync } = useAdminLogin();

  const { values, handleChange, handleBlur, handleSubmit, isSubmitting } =
    useFormik<AdminLoginRequest>({
      initialValues,
      onSubmit: async (values, { setFieldError, setSubmitting }) => {
        try {
          const res = await mutateAsync(values);

          setAuth({
            accessToken: res.data.tokens.access_token,
            refreshToken: res.data.tokens.refresh_token,
            profile: res.data.profile,
          });

          navigate("/orders", { replace: true });
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error("Login xətası:", error.response?.data);
          }
          setFieldError("password", "Telefon və ya parol yanlışdır");
        } finally {
          setSubmitting(false);
        }
      },
    });

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Sol panel - branding */}
      <div className="hidden md:flex flex-col items-center justify-center relative border-r border-gray-100 px-10">
        <span className="absolute top-8 left-8 text-lg font-bold text-gray-800">
          TIK TAK ADMİN
        </span>

        <div className="relative flex flex-col items-center">
          <div className="absolute inset-0 m-auto w-64 h-64 bg-purple-50 rounded-full blur-3xl -z-10" />
          <img src={adminSVG} alt="Admin Control Panel" className="w-72 mb-6" />
          <p className="text-gray-400 text-sm">Admin Control Panel</p>
        </div>
      </div>

      {/* Sağ panel - form */}
      <div className="flex items-center justify-center px-6">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <h2 className="text-center text-gray-700 font-medium pb-4 mb-6 border-b border-gray-100">
            Admin Panel
          </h2>

          <AppInput
            label="Telefon"
            name="phone"
            placeholder="telefon"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <AppPassword
            label="Parol"
            name="password"
            placeholder="parol"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <AppButton
            htmlType="submit"
            block
            loading={isSubmitting}
            className="mt-2"
          >
            Daxil ol
          </AppButton>
        </form>
      </div>
    </div>
  );
}
