import axios from "axios";
import { message } from "antd";
import { jwtDecode } from "jwt-decode"; // Use default export, no need for curly braces

import variables from "../constants/variables";
import urls from "../constants/urls";
import { paths } from "../constants/paths";

export const createAxiosInstance = (tokenKey, refreshTokenKey) => {
  const axiosInstance = axios.create({
    baseURL: `${urls.BASE_URL}/api/v1`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  })

  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await axios.post(`${urls.BASE_URL}/api/v1/${urls.REFRESH_TOKEN}`, { refreshToken });
      const { accessToken, refreshToken: newRefreshToken } = response.data.data;

      // Update tokens in localStorage
      localStorage.setItem(tokenKey, accessToken);
      localStorage.setItem(refreshTokenKey, newRefreshToken);

      return accessToken; // Return new access token
    } catch (error) {
      console.error("Error refreshing token", error);
      return null;
    }
  };

  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem(tokenKey);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { config: originalRequest, response } = error;

      if (response?.status === 401 && !originalRequest?._retry) {
        const isLoginRequest = originalRequest.url.includes(urls.LOGIN);

        if (!isLoginRequest) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getItem(refreshTokenKey);

          if (!refreshToken) return Promise.reject(error)

          if (isTokenExpired(refreshToken)) {
            handleSessionExpired();
            return Promise.reject(new Error("Session expired"));
          }

          const newAccessToken = await refreshAccessToken(refreshToken);
          try {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          } catch (error) {
            handleSessionExpired();
            return Promise.reject(error);
          }
        } else {
          // Nếu là yêu cầu đăng nhập, chỉ thông báo lỗi mà không redirect
          message.error("Thông tin đăng nhập không chính xác. Vui lòng thử lại.");
          return Promise.reject(error);
        }
      }
      handleErrorResponse(response);
      return Promise.reject(error);
    }
  )

  return axiosInstance
}

// Utility to check if token is expired
export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Time in seconds
    return decoded.exp < currentTime;
  } catch (error) {
    console.log("🚀 ~ file: axiosClient.js:26 ~ isTokenExpired ~ error:", error)
    return true; // If token is invalid or can't be decoded, treat as expired
  }
};

// Handle session expiration (clear tokens and redirect)
const handleSessionExpired = () => {
  localStorage.removeItem(variables.USER_ACCESS_TOKEN);
  localStorage.removeItem(variables.USER_REFRESH_TOKEN);
  window.location.href = `${paths.HOME}`;
  message.info("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
};

// Handle other error responses
const handleErrorResponse = (response) => {
  if (!response) return;

  switch (response.status) {
    case 400:
      message.error(response?.data?.error?.details?.message?.[0] || "Yêu cầu không hợp lệ.");
      break;
    case 500:
      message.error(response?.data?.error?.message || "Có lỗi xảy ra. Không thể thực hiện hành động.");
      break;
    default:
      message.error("Có lỗi xảy ra.");
  }
};
