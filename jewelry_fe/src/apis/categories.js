import urls from "../constants/urls";
import axiosClient from "./axiosClient";

const categoriesApi = {
  getAll(params) {
    return axiosClient.get(urls.CATEGORIES, params)
  },
  update(id, body) {
    return axiosClient.patch(`${urls.CATEGORIES}/${id}`, body)
  },
  delete(id) {
    return axiosClient.delete(`${urls.CATEGORIES}/${id}`)
  },
  create(body) {
    return axiosClient.post(urls.CATEGORIES, body)
  },
  getById(id) {
    return axiosClient.get(`${urls.CATEGORIES}/${id}`)
  }
};
export default categoriesApi;
