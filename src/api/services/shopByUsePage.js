import Dictionary from "../dictionary";
import axios from "axios";
const { ShopByUseEndpoints } = Dictionary;
const BASE_URL = process.env.REACT_APP_API_URL;

const shopByUseServices = {
  listing: async (data, headers) => {
    return axios.post(BASE_URL + ShopByUseEndpoints.listAll(), data, { headers });
  },
};
export default shopByUseServices;
