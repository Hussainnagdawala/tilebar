import Dictionary from "../dictionary";
import axios from "axios";
const { ShopByFinishEndpoints } = Dictionary;
const BASE_URL = process.env.REACT_APP_API_URL;

const shopByFinishServices = {
  listing: async (data) => {
    return axios.post(BASE_URL + ShopByFinishEndpoints.listAll(), data);
  },
  addShopFinish: async (data) => {
    return axios.post(BASE_URL + ShopByFinishEndpoints.addShopByFinish(), data);
  },
  removeShopFinish: async (data) => {
    return axios.post(
      BASE_URL + ShopByFinishEndpoints.removeShopByFinish(),
      data
    );
  },
  updateShopFinish: async (data) => {
    return axios.post(
      BASE_URL + ShopByFinishEndpoints.updateShopByFinish(),
      data
    );
  },
};
export default shopByFinishServices;
