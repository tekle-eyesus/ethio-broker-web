import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true, // Send cookies with each request
  headers: {
    "Content-Type": "application/json",
  },
});

// Response Interceptor: Handle 401 (Token Expiry)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // In a full implementation, we would hit the /refresh-token endpoint here
      // For MVP, we might redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
