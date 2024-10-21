import queryString from 'query-string';

import urls from "../constants/urls";
import axiosClient from "./axiosClient";

const ordersApi = {
  getAll(params) {
    const transformedParams = queryString.stringify(params)
    return axiosClient.get(`${urls.ORDERS}?${transformedParams}`)
  },
  update(id, body) {
    return axiosClient.patch(`${urls.ORDERS}/${id}`, body)
  },
  delete(id) {
    return axiosClient.delete(`${urls.ORDERS}/${id}`)
  },
  getById(id) {
    return axiosClient.get(`${urls.ORDERS}/${id}`)
  },
  create(body) {
    return axiosClient.post(urls.ORDERS, body)
  },
};
export default ordersApi;
