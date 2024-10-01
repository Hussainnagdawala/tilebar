import Dictionary from "../dictionary";
import axios from "axios";
const { sizeEndpoints } = Dictionary;
const BASE_URL = process.env.REACT_APP_API_URL;

const sizesServices = {
  sizelisting: async (data, headers) => {
    return axios.post(BASE_URL + sizeEndpoints.sizelistAll(), data, { headers });
  },
  addSize: async (data) => {
    return axios.post(BASE_URL + sizeEndpoints.sizeAdd(), data);
  },
};
export default sizesServices;
