import { RoutePaths } from "./RouterPaths";
import {
  Auth,
  Dashboard,
  // Profile,
  // Overview,
  // NotFound
} from "./RouterLazyImports";

const {
  loginPath,
  // categoryPath,
  dashboardPath,
  // adminPath,
  // patientPath,
  // acceptedPath,
  // redFlagPath,
  // rejectedPath,
  // userProfilePath,
  // overViewPath,
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
