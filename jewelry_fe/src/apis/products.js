import queryString from "query-string";

import urls from "../constants/urls";
import { createAxiosInstance } from "./axiosClient";
import variables from "../constants/variables";

const axiosClientUser = createAxiosInstance(
  variables.USER_ACCESS_TOKEN,
  variables.USER_REFRESH_TOKEN
);
const axiosClientAdmin = createAxiosInstance(
  variables.ADMIN_ACCESS_TOKEN,
  variables.ADMIN_REFRESH_TOKEN
);

const productsApi = {
  getAll(params, isAdmin = false, query = "") {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    const transformedParams = queryString.stringify(params);
    return axiosClient.get(`${urls.PRODUCTS}?${transformedParams}${query}`);
  },
  update(id, body, isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    return axiosClient.patch(`${urls.PRODUCTS}/${id}`, body);
  },
  delete(id, isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    return axiosClient.delete(`${urls.PRODUCTS}/${id}`);
  },
  getById(id, isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    return axiosClient.get(`${urls.PRODUCTS}/${id}`);
  },
  create(body, isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    return axiosClient.post(urls.PRODUCTS, body);
  },
  getBySlug(slug, isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    return axiosClient.get(`${urls.PRODUCTS}/slug/${slug}`);
  },
  getLatest(isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    const transformedParams = queryString.stringify({
      orderBy: "createdAt",
      order: "DESC",
      pageSize: 10,
      page: 1,
    });
    return axiosClient.get(`${urls.PRODUCTS}?${transformedParams}`);
  },
  getTopPurchase(isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    const transformedParams = queryString.stringify({
      orderBy: "totalPurchases",
      order: "DESC",
      pageSize: 10,
      page: 1,
    });
    return axiosClient.get(`${urls.PRODUCTS}?${transformedParams}`);
  },
};
export default productsApi;
