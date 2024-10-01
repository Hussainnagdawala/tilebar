//here all lazy import will come
import { lazy } from "react";

const MemberLayout = lazy(() => import("../../Layout/MemberLayout"));
const VisitorLayout = lazy(() => import("../../Layout/VisitorLayout"));
const Auth = lazy(() => import("../../Pages/Auth"));
// const Category = lazy(() => import("../../Pages/Dashboard/Dashboard"));
const Dashboard = lazy(() => import("../../Pages/Dashboard/Dashboard"));
// const Accepted = lazy(() => import("../../pages/Accepted"));
// const RedFlag = lazy(() => import("../../pages/RedFlag"));
// const Rejected = lazy(() => import("../../pages/Rejected"));
// const Profile = lazy(() => import("../../pages/Profile"));
// const Overview = lazy(() => import("../../pages/Overview"));
// const NotFound = lazy(() => import("../../components/common/PageNotFound"));

export {
  MemberLayout,
  VisitorLayout,
  Auth,
  // Category,
  Dashboard,
  // Admin,
  // Patients,
  // Accepted,
  // RedFlag,
  // Rejected,
  // Profile,
  // Overview,
  // NotFound,
};
