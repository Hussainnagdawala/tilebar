import { RoutePaths } from "./RouterPaths";
import {
  Auth,
  Dashboard,
  ShopByUse,
  Sizes,
  ShopByLook,
  AddSliders,
  ShopByFinish,
  // NotFound
} from "./RouterLazyImports";

const {
  loginPath,
  sizesPath,
  dashboardPath,
  shopByUsePath,
  shopByLookPath,
  sliderPath,
  shopByFinishPath,
} = RoutePaths;

const publicRoutes = [
  {
    path: loginPath,
    component: Auth,
  },
];

const privateRoutes = [
  // {
  //   path: categoryPath,
  //   component: Category,
  // },
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
  // {
  //   path: '*',
  //   component: NotFound,
  // },
];

export { publicRoutes, privateRoutes };
