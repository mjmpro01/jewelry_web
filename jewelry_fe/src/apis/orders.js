import queryString from 'query-string';

import urls from "../constants/urls";
import { createAxiosInstance } from "./axiosClient";
import variables from '../constants/variables';

const axiosClientUser = createAxiosInstance(variables.USER_ACCESS_TOKEN, variables.USER_REFRESH_TOKEN)
const axiosClientAdmin = createAxiosInstance(variables.ADMIN_ACCESS_TOKEN, variables.ADMIN_REFRESH_TOKEN)

const ordersApi = {
  getAll(params, isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    const transformedParams = queryString.stringify(params)
    return axiosClient.get(`${urls.ORDERS}?${transformedParams}`)
  },
  update(id, body, isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    return axiosClient.patch(`${urls.ORDERS}/${id}`, body)
  },
  delete(id, isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    return axiosClient.delete(`${urls.ORDERS}/${id}`)
  },
  getById(id, isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    return axiosClient.get(`${urls.ORDERS}/${id}`)
  },
  create(body, isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    return axiosClient.post(urls.ORDERS, body)
  },
  getMyOrders(params, isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    const transformedParams = queryString.stringify(params)
    return axiosClient.get(`${urls.MY_ORDERS}?${transformedParams}`)
  },
};
export default ordersApi;
