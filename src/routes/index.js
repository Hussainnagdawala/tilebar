import { RoutePaths } from "./RouterPaths";
import {
  Auth,
  Dashboard,
  ShopByUse,
  Sizes,
  ShopByLook,
  AddSliders,
  ShopByColor,
  // NotFound
} from "./RouterLazyImports";

const {
  loginPath,
  sizesPath,
  dashboardPath,
  shopByUsePath,
  shopByLookPath,
  sliderPath,
  shopByColorPath,
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
    path: shopByColorPath,
    component: ShopByColor,
  },
  // {
  //   path: '*',
  //   component: NotFound,
  // },
];

export { publicRoutes, privateRoutes };
