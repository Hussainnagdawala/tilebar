import Dictionary from "../dictionary";
import axios from "axios";
const { ShopByLookEndpoints } = Dictionary;
const BASE_URL = process.env.REACT_APP_API_URL;

const shopByLookServices = {
  listing: async (data) => {
    return axios.post(BASE_URL + ShopByLookEndpoints.listAll(), data);
  },
  addShopLook: async (data) => {
    return axios.post(BASE_URL + ShopByLookEndpoints.addShopByLook(), data);
  },
  removeShopLook: async (data) => {
    return axios.post(BASE_URL + ShopByLookEndpoints.removeShopByLook(), data);
  },
  updateShopLook: async (data) => {
    return axios.post(BASE_URL + ShopByLookEndpoints.updateShopByLook(), data);
  },
};
export default shopByLookServices;
