import Dictionary from "../dictionary";
import axios from "axios";
const { ProductEndpoints } = Dictionary;
const BASE_URL = process.env.REACT_APP_API_URL;

const productServices = {
  listing: async (data) => {
    return axios.post(BASE_URL + ProductEndpoints.listAll(), data);
  },
  addProduct: async (data) => {
    return axios.post(BASE_URL + ProductEndpoints.addProduct(), data);
  },
  removeProduct: async (data) => {
    return axios.post(BASE_URL + ProductEndpoints.removeProduct(), data);
  },
  updateProduct: async (data) => {
    return axios.post(BASE_URL + ProductEndpoints.updateProduct(), data);
  },
  productDetail: async (data) => {
    return axios.post(BASE_URL + ProductEndpoints.productDetail(), data);
  },
};
export default productServices;
