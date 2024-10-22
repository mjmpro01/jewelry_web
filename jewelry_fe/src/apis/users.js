import queryString from 'query-string';

import urls from "../constants/urls";
import axiosClient from "./axiosClient";

const usersApi = {
  getAll(params) {
    const transformedParams = queryString.stringify(params)
    return axiosClient.get(`${urls.USERS}?${transformedParams}`)
  },
  update(id, body) {
    return axiosClient.patch(`${urls.USERS}/${id}`, body)
  },
  delete(id) {
    return axiosClient.delete(`${urls.USERS}/${id}`)
  },
  getById(id) {
    return axiosClient.get(`${urls.USERS}/${id}`)
  },
  create(body) {
    return axiosClient.post(urls.USERS, body)
  },
};
export default usersApi;
