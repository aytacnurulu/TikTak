import axios, { type AxiosInstance } from "axios";

interface ApiClientConfig {
  baseURL: string;
  getToken?: () => string | null;
  getLanguage?: () => string;
}

let tokenGetter: () => string | null = () => null;
let languageGetter: () => string = () => "az";

export const apiClient: AxiosInstance = axios.create();

export const configureApiClient = ({
  baseURL,
  getToken,
  getLanguage,
}: ApiClientConfig) => {
  apiClient.defaults.baseURL = baseURL;
  if (getToken) tokenGetter = getToken;
  if (getLanguage) languageGetter = getLanguage;
};

apiClient.interceptors.request.use((config) => {
  const token = tokenGetter();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Accept-Language"] = languageGetter();
  return config;
});
