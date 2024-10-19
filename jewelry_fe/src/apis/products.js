import urls from "../constants/urls";
import axiosClient from "./axiosClient";

const productsApi = {
  getAll(params) {
    return axiosClient.get(urls.PRODUCTS, params)
  }
};
export default productsApi;
