import queryString from "query-string";

import urls from "../constants/urls";
import { createAxiosInstance } from "./axiosClient";
import variables from "../constants/variables";

const axiosClientUser = createAxiosInstance(variables.USER_ACCESS_TOKEN, variables.USER_REFRESH_TOKEN)
const axiosClientAdmin = createAxiosInstance(variables.ADMIN_ACCESS_TOKEN, variables.ADMIN_REFRESH_TOKEN)

const categoriesApi = {
  getAll(params, isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    const transformedParams = queryString.stringify(params)
    return axiosClient.get(`${urls.CATEGORIES}?${transformedParams}`)
  },
  update(id, body, isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    return axiosClient.patch(`${urls.CATEGORIES}/${id}`, body)
  },
  delete(id, isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    return axiosClient.delete(`${urls.CATEGORIES}/${id}`)
  },
  create(body, isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    return axiosClient.post(urls.CATEGORIES, body)
  },
  getById(id, isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    return axiosClient.get(`${urls.CATEGORIES}/${Number(id)}`)
  }
};
export default categoriesApi;
