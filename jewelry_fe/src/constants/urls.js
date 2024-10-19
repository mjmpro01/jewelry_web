const BASE_URL = import.meta.env.VITE_API_PORT || 3000

const urls = {
  BASE_URL,
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  ORDERS: 'orders',
  UPLOAD: 'upload',
  LOGIN: 'auth/login',
  REFRESH_TOKEN: 'auth/refresh-token'
}

export default urls