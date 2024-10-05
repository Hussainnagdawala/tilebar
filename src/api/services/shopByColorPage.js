import Dictionary from "../dictionary";
import axios from "axios";
const { ShopByColorEndpoints } = Dictionary;
const BASE_URL = process.env.REACT_APP_API_URL;

const shopByColorServices = {
  listing: async (data) => {
    return axios.post(BASE_URL + ShopByColorEndpoints.listAll(), data);
  },
  addShopColor: async (data) => {
    return axios.post(BASE_URL + ShopByColorEndpoints.addShopByColor(), data);
  },
  removeShopColor: async (data) => {
    return axios.post(
      BASE_URL + ShopByColorEndpoints.removeShopByColor(),
      data
    );
  },
  updateShopColor: async (data) => {
    return axios.post(
      BASE_URL + ShopByColorEndpoints.updateShopByColor(),
      data
    );
  },
};
export default shopByColorServices;
