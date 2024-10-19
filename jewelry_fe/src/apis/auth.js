import urls from "../constants/urls";
import axiosClient from "./axiosClient";

const authApi = {
  login(params) {
    return axiosClient.post(urls.LOGIN, params)
  },
  refreshToken(refreshToken) {
    return axiosClient.post(urls.REFRESH_TOKEN, { refreshToken })
  }
};
export default authApi;
