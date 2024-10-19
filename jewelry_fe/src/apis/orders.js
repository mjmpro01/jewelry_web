import urls from "../constants/urls";
import axiosClient from "./axiosClient";

const ordersApi = {
  getAll(params) {
    return axiosClient.get(urls.ORDERS, params)
  }
};

export default ordersApi;
