import { axiosInstance } from "./axios";
import { API } from "@/shared/constants/api.constant";

interface UploadResponse {
  message: string;
  data: { url: string };
  result: boolean;
}

// Backend şəkil URL-i kimi yalnız həqiqi URL qəbul edir (base64 data URI yox).
// Ona görə faylı əvvəlcə /api/tiktak/upload endpointinə göndərib,
// qaytarılan `data.url` dəyərini `img_url` sahəsində istifadə edirik.
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post<UploadResponse>(
    API.UPLOAD,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return response.data.data.url;
}
