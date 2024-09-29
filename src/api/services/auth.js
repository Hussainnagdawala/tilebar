import { globalConstant } from "../../constant";
import Dictionary from "../dictionary";
import axios from "axios";
const { auth } = Dictionary;
// const { BASE_URL } = globalConstant;
const BASE_URL = process.env.REACT_APP_API_URL;

const authServices = {
  login: async (data, headers) => {
    return axios.post(BASE_URL + auth.login(), data, { headers });
  },
  //   changePassword: async (data, headers) => {
  //     return axios.put(BASE_URL + auth.changePassword(), data, {
  //       headers: headers,
  //     });
  //   },
  //   viewProfile: async () => {
  //     return axios.get(BASE_URL + auth.getProfile());
  //   },
  //   forgotPassword: async (data) => {
  //     return axios.post(BASE_URL + auth.ForgotPassword(), data);
  //   },
  //   resetPassword: async (data) => {
  //     return axios.put(BASE_URL + auth.resetPassword(), data);
  //   },
  //   signUp: async (data, headers) => {
  //     return axios.post(BASE_URL + auth.signUp(), data, { headers });
  //   },
};
export default authServices;
