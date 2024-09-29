//here all lazy import will come
import { lazy } from "react";

const MemberLayout = lazy(() => import("../../layout copy/MemberLayout"));
const VisitorLayout = lazy(() => import("../../layout copy/VisitorLayout"));
const Auth = lazy(() => import("../../Components/Auth"));
const Category = lazy(() => import("../../Components/Dashboard/Dashboard"));
const Dashboard = lazy(() => import("../../Components/Dashboard/Dashboard"));
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
  Category,
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
