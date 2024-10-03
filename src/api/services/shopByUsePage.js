import Dictionary from "../dictionary";
import axios from "axios";
const { ShopByUseEndpoints } = Dictionary;
const BASE_URL = process.env.REACT_APP_API_URL;

const shopByUseServices = {
  listing: async (data) => {
    return axios.post(BASE_URL + ShopByUseEndpoints.listAll(), data);
  },
  addShopUse: async (data) => {
    return axios.post(BASE_URL + ShopByUseEndpoints.addShopByUse(), data);
  },
  removeShopUse: async (data) => {
    return axios.post(BASE_URL + ShopByUseEndpoints.removeShopByUse(), data);
  },
  updateShopUse: async (data) => {
    return axios.post(BASE_URL + ShopByUseEndpoints.updateShopByUse(), data);
  },
};
export default shopByUseServices;
