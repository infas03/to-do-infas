import axios from "axios";

import { useAuth } from "@/context/authContext";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async (config) => {
  const { token } = useAuth();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const { logout } = useAuth();

      logout();
    }

    return Promise.reject(error);
  },
);

export default api;
