import urls from "../constants/urls";
import axiosClient from "./axiosClient";

const uploadApi = {
  post(body) {
    return axiosClient.post(urls.UPLOAD, body)
  }
};

export default uploadApi;
