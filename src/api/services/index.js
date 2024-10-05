import authService from "./auth";
import contactPage from "./contactPage";
import sizePage from "./sizePage";
import shopByUsePage from "./shopByUsePage";
import shopByLookPage from "./shopByLookPage";
import shopByColorPage from "./shopByColorPage";
import bannerSliderPage from "./bannerSliderPage";
import imageUploaderService from "./imageUploader";

const service = {
  auth: authService,
  contactPage: contactPage,
  sizePage: sizePage,
  shopByUsePage: shopByUsePage,
  shopByLookPage: shopByLookPage,
  bannerSliderPage: bannerSliderPage,
  imageUploaderService: imageUploaderService,
  shopByColorServices: shopByColorPage,
};
export default service;
