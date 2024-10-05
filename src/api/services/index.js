import authService from "./auth";
import contactPage from "./contactPage";
import sizePage from "./sizePage";
import shopByUsePage from "./shopByUsePage";
import shopByLookPage from "./shopByLookPage";
import shopByFinishPage from "./shopByFinishPage";
import bannerSliderPage from "./bannerSliderPage";
import imageUploaderService from "./imageUploader";

const service = {
  auth: authService,
  contactPage: contactPage,
  sizePage: sizePage,
  shopByUsePage: shopByUsePage,
  shopByLookPage: shopByLookPage,
  shopByFinishPage: shopByFinishPage,
  bannerSliderPage: bannerSliderPage,
  imageUploaderService: imageUploaderService,
};
export default service;
