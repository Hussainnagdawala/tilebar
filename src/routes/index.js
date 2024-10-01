import { RoutePaths } from "./RouterPaths";
import {
  Auth,
  Dashboard,
  ShopByUse,
  Sizes,
  // Profile,
  // Overview,
  // NotFound
} from "./RouterLazyImports";

const {
  loginPath,
  // categoryPath,
  sizesPath,
  dashboardPath,
  shopByUsePath,
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
  // {
  //   path: acceptedPath,
  //   component: Accepted,
  // },
  // {
  //   path: redFlagPath,
  //   component: RedFlag,
  // },
  // {
  //   path: rejectedPath,
  //   component: Rejected,
  // },
  // {
  //   path: userProfilePath,
  //   component: Profile,
  // },
  // {
  //   path: overViewPath,
  //   component: Overview,
  // },
  // {
  //   path: '*',
  //   component: NotFound,
  // },
];

export { publicRoutes, privateRoutes };
