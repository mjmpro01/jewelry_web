const BASE_URL = import.meta.env.VITE_API_PORT || 3000;

const urls = {
  BASE_URL,
  PRODUCTS: "products",
  CATEGORIES: "categories",
  ORDERS: "orders",
  MY_ORDERS: "orders/orders/me",
  UPLOAD: "upload",
  LOGIN: "auth/login",
  REGISTER: "auth/register",
  REFRESH_TOKEN: "auth/refresh-token",
  USERS: "users",
  ME: "users/me",
  BLOGS: "blogs",
};

export default urls;
