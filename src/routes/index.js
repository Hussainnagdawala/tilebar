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
  AddProduct,
  Product,
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
  productPath,
  addProductPath,
  editProductPath,
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
  {
    path: productPath,
    component: Product,
  },
  {
    path: addProductPath,
    component: AddProduct,
  },
  {
    path: editProductPath,
    component: AddProduct,
  },

  // {
  //   path: '*',
  //   component: NotFound,
  // },
];

export { publicRoutes, privateRoutes };
