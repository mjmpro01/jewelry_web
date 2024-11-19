import urls from "../constants/urls";
import variables from "../constants/variables";
import { createAxiosInstance } from "./axiosClient";

const axiosClientUser = createAxiosInstance(
  variables.USER_ACCESS_TOKEN,
  variables.USER_REFRESH_TOKEN
);
const axiosClientAdmin = createAxiosInstance(
  variables.ADMIN_ACCESS_TOKEN,
  variables.ADMIN_REFRESH_TOKEN
);

const paymentsApi = {
  createPayment(orderCode, isAdmin = false) {
    const axiosClient = isAdmin ? axiosClientAdmin : axiosClientUser;
    const body = {
      order_code: orderCode,
    };
    return axiosClient.post(urls.CREATE_PAYMENT, body);
  },
};

export default paymentsApi;
