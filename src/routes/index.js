import { RoutePaths } from "./RouterPaths";
import {
  Auth,
  Dashboard,
  ShopByUse,
  Sizes,
  ShopByLook,
  AddSliders,
  ShopByFinish,
  ShopByColor,
  Category,
  // NotFound
} from "./RouterLazyImports";

const {
  loginPath,
  sizesPath,
  dashboardPath,
  shopByUsePath,
  categoryPath,
  shopByLookPath,
  sliderPath,
  shopByFinishPath,
  shopByColorPath,
} = RoutePaths;

const publicRoutes = [
  {
    path: loginPath,
    component: Auth,
  },
];

const privateRoutes = [
  {
    path: categoryPath,
    component: Category,
  },
  {
    path: dashboardPath,
    component: Dashboard,
  },
  {
    path: shopByUsePath,
    component: ShopByUse,
  },
  {
    path: sizesPath,
    component: Sizes,
  },
  {
    path: shopByLookPath,
    component: ShopByLook,
  },
  {
    path: sliderPath,
    component: AddSliders,
  },
  {
    path: shopByFinishPath,
    component: ShopByFinish,
  },
  {
    path: shopByColorPath,
    component: ShopByColor,
  },

  // {
  //   path: '*',
  //   component: NotFound,
  // },
];

export { publicRoutes, privateRoutes };
