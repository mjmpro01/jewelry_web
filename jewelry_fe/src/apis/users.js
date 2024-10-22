import queryString from 'query-string';

import urls from "../constants/urls";
import { createAxiosInstance } from "./axiosClient";
import variables from '../constants/variables';

const axiosClientUser = createAxiosInstance(variables.USER_ACCESS_TOKEN, variables.USER_REFRESH_TOKEN)
const axiosClientAdmin = createAxiosInstance(variables.ADMIN_ACCESS_TOKEN, variables.ADMIN_REFRESH_TOKEN)

const usersApi = {
  getAll(params, isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    const transformedParams = queryString.stringify(params)
    return axiosClient.get(`${urls.USERS}?${transformedParams}`)
  },
  update(id, body, isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    return axiosClient.patch(`${urls.USERS}/${id}`, body)
  },
  delete(id, isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    return axiosClient.delete(`${urls.USERS}/${id}`)
  },
  getById(id, isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    return axiosClient.get(`${urls.USERS}/${id}`)
  },
  create(body, isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    return axiosClient.post(urls.USERS, body)
  },
};
export default usersApi;
