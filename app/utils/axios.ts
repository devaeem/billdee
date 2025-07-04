import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v2",
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const session = await getSession();
      console.log("Current session:", session);

      if (session?.accessToken) {
        config.headers["Authorization"] = `Bearer ${session.accessToken}`;
      }
    } catch (error) {
      console.error("Error getting session:", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Implement response handling here

    return response;
  },
  (error) => {
    // Implement error handling here
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.log("Unauthorized request");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
