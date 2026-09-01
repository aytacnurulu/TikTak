import { Spin } from "antd";

interface PageLoaderProps {
  /** Bütün ekranı tutan fallback (məs. login route-u üçün). */
  fullScreen?: boolean;
}

export default function PageLoader({ fullScreen = false }: PageLoaderProps) {
  return (
    <div
      className={
        fullScreen
          ? "min-h-screen w-full flex items-center justify-center bg-[#F6F5FB]"
          : "h-full w-full flex items-center justify-center py-20"
      }
    >
      <Spin size="large" />
    </div>
  );
}
