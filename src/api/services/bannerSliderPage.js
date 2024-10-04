import Dictionary from "../dictionary";
import axios from "axios";
const { BannerSliderEndPoints } = Dictionary;
const BASE_URL = process.env.REACT_APP_API_URL;

const bannerSliderServices = {
  listing: async (data) => {
    return axios.post(BASE_URL + BannerSliderEndPoints.bannerList(), data);
  },
  addBannerSlider: async (data) => {
    return axios.post(BASE_URL + BannerSliderEndPoints.addBanner(), data);
  },
  removeBannerSlider: async (data) => {
    return axios.post(BASE_URL + BannerSliderEndPoints.removeBanner(), data);
  },
};
export default bannerSliderServices;
