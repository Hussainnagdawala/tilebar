import { RoutePaths } from "../routes/RouterPaths";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import StyleIcon from "@mui/icons-material/Style";
import WindowRoundedIcon from "@mui/icons-material/WindowRounded";
import LooksIcon from "@mui/icons-material/Looks";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import { SettingIcon, HelpCenterIcon } from "../assets";

export const globalConstant = {
  BASE_URL: process.env.REACT_APP_API_URL,

  HEADER_ACTIVE_TITLE: [
    {
      title: "Dashboard",
      path: RoutePaths.dashboardPath,
    },
    {
      title: "Add Slider",
      path: RoutePaths.sliderPath,
    },
    {
      title: "Add Tag",
      path: RoutePaths.adminPath,
    },
    {
      title: "Shop By Use",
      path: RoutePaths.shopByUsePath,
    },
    {
      title: "Shop By Look",
      path: RoutePaths.shopByLookPath,
    },
    {
      title: "Shop By Finish",
      path: RoutePaths.shopByFinishPath,
    },
    {
      title: "Sizes",
      path: RoutePaths.sizesPath,
    },
    {
      title: "Profile",
      path: "user",
    },
  ],
  MENU_LIST: [
    {
      title: "Dashboard",
      icon: BarChartRoundedIcon,
      path: RoutePaths.dashboardPath,
    },
    // {
    //   title: "Referral",
    //   icon: ReferralIcon,
    //   isReferral: true,
    //   children: [
    //     {
    //       title: "Accepted",
    //       icon: AcceptedIcon,
    //       path: RoutePaths.acceptedPath,
    //     },
    //     { title: "RedFlag", icon: RedFlagIcon, path: RoutePaths.redFlagPath },
    //     {
    //       title: "Rejected",
    //       icon: RejectedIcon,
    //       path: RoutePaths.rejectedPath,
    //     },
    //   ],
    // },
    {
      title: "Add Slider",
      icon: WebStoriesIcon,
      path: RoutePaths.sliderPath,
    },
    {
      title: "Add Tag",
      icon: StyleIcon,
      path: RoutePaths.adminPath,
    },
    {
      title: "Shop By Use",
      icon: WindowRoundedIcon,
      path: RoutePaths.shopByUsePath,
    },
    {
      title: "Shop By Look",
      icon: LooksIcon,
      path: RoutePaths.shopByLookPath,
    },
    {
      title: "Shop By Finish",
      icon: LooksIcon,
      path: RoutePaths.shopByFinishPath,
    },
  ],
  UTILITY_MENU_LIST: [
    {
      title: "Setting",
      icon: SettingIcon,
      path: RoutePaths.settingsPath,
      isReferral: false,
    },
    {
      title: "Help Center",
      icon: HelpCenterIcon,
      path: RoutePaths.helpCenterPath,
      isReferral: false,
    },
  ],
  IS_AUTH_SCREEN: "auth",
  // REFERRAL_STATUS: [
  //   { label: "Submitted", value: 1 },
  //   { label: "Accepted", value: 2 },
  //   { label: "Incomplete", value: 3 },
  //   { label: "Rejected", value: 4 },
  // ],
  TABLE_LIMIT: [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ],
  // REFERRAL_CHILDRENS_PATH: [
  //   RoutePaths.redFlagPath,
  //   RoutePaths.acceptedPath,
  //   RoutePaths.rejectedPath,
  // ],
  // ACCEPTED_TABS_DATA: [
  //   { name: "Active Referrals", value: 0, status: 3 },
  //   { name: "Closed Referrals", value: 1, status: 2 },
  // ],
  // PROFILE_LIST_ITEM: [
  //   { name: "My Profile", icon: ProfileIcon, pathname: "profile" },
  //   { name: "Reset Password", icon: ResetIcon, pathname: "resetpassword" },
  //   { name: "Privacy Policy", icon: PrivacyIcon, pathname: "privacypolicy" },
  //   { name: "Logout", icon: LogoutIcon },
  // ],
  LOGOUT: "Logout",
  PROFILE: "profile",
  CHANGE_EMAIL: "changeEmail",
  VERIFY_EMAIL: "verifyEmail",
  USER: "user",
  Auth: "auth",
  RESETPASSWORD: "resetpassword",
  PRIVACYPOLICY: "privacypolicy",
  CUSTOM_DATE_DATE: [
    { name: "1 Month", value: "1" },
    { name: "3 Month", value: "3" },
    { name: "6 Month", value: "6" },
    { name: "Custom", value: "custom" },
  ],
  DEFAULT_PROFILE_TAB: "My Profile",
  RESET_PASSWORD_TAB: "Reset Password",
  PRIVACY_POLICY_TAB: "Privacy Policy",
  FilterTitleServices: "Services",
  FilterTitleSortDate: "Sort Date",
  InitialFaqData: [{ question: "", answer: "" }],
  InitialImageData: { imgUrl: "", previewUrl: "" },
  InitialModalStateData: { isEdit: false, isModalOpen: false },
};
