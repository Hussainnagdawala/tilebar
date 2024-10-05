//here all lazy import will come
import { lazy } from "react";

const MemberLayout = lazy(() => import("../../Layout/MemberLayout"));
const VisitorLayout = lazy(() => import("../../Layout/VisitorLayout"));
const Auth = lazy(() => import("../../Pages/Auth"));
const Dashboard = lazy(() => import("../../Pages/Dashboard/Dashboard"));
const ShopByUse = lazy(() => import("../../Pages/ShopByUse"));
const ShopByFinish = lazy(() => import("../../Pages/ShopByFinish"));
const ShopByLook = lazy(() => import("../../Pages/ShopByLook"));
const ShopByColor = lazy(() => import("../../Pages/ShopByColor"));
const Sizes = lazy(() => import("../../Pages/Sizes"));
const AddSliders = lazy(() => import("../../Pages/AddSliders"));
// const NotFound = lazy(() => import("../../components/common/PageNotFound"));

export {
  MemberLayout,
  VisitorLayout,
  ShopByUse,
  Auth,
  ShopByLook,
  Sizes,
  Dashboard,
  AddSliders,
  ShopByFinish,
  ShopByColor,
  // NotFound,
};
