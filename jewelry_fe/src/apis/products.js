import queryString from 'query-string';

import urls from "../constants/urls";
import axiosClient from "./axiosClient";

const productsApi = {
  getAll(params) {
    const transformedParams = queryString.stringify(params)
    return axiosClient.get(`${urls.PRODUCTS}?${transformedParams}`)
  },
  update(id, body) {
    return axiosClient.patch(`${urls.PRODUCTS}/${id}`, body)
  },
  delete(id) {
    return axiosClient.delete(`${urls.PRODUCTS}/${id}`)
  },
  getById(id) {
    return axiosClient.get(`${urls.PRODUCTS}/${id}`)
  },
  create(body) {
    return axiosClient.post(urls.PRODUCTS, body)
  },
};
export default productsApi;
