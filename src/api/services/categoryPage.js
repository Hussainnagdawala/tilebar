import Dictionary from "../dictionary";
import axios from "axios";
const { CategoryEndpoints } = Dictionary;
const BASE_URL = process.env.REACT_APP_API_URL;

const categoryServices = {
  listing: async (data) => {
    return axios.post(BASE_URL + CategoryEndpoints.listAll(), data);
  },
  addCategory: async (data) => {
    return axios.post(BASE_URL + CategoryEndpoints.addCategory(), data);
  },
  removeCategory: async (data) => {
    return axios.post(BASE_URL + CategoryEndpoints.removeCategory(), data);
  },
  updateCategory: async (data) => {
    return axios.post(BASE_URL + CategoryEndpoints.updateCategory(), data);
  },
};
export default categoryServices;
