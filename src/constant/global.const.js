import { RoutePaths } from "../routes/RouterPaths";
import {
  OverviewIcon,
  PatientIcon,
  ReferralIcon,
  RedFlagIcon,
  RejectedIcon,
  AcceptedIcon,
  AdminIcon,
  SettingIcon,
  HelpCenterIcon,
  ProfileIcon,
  PrivacyIcon,
  LogoutIcon,
  ResetIcon,
} from "../assets";

export const globalConstant = {
  HEADER_ACTIVE_TITLE: [
    {
      title: "Overview",
      path: RoutePaths.overViewPath,
      isReferral: false,
    },
    {
      title: "Referral",
      isReferral: true,
    },
    {
      title: "Patients",
      path: RoutePaths.patientPath,
      isReferral: false,
    },
    {
      title: "Admin",
      path: RoutePaths.adminPath,
      isReferral: false,
    },
    {
      title: "Setting",
      path: RoutePaths.settingsPath,
      isReferral: false,
    },
    {
      title: "Help Center",
      path: RoutePaths.helpCenterPath,
      isReferral: false,
    },
    {
      title: "Profile",
      path: "user",
      isReferral: false,
    },
  ],
  MENU_LIST: [
    {
      title: "Overview",
      icon: OverviewIcon,
      path: RoutePaths.overViewPath,
      isReferral: false,
    },
    {
      title: "Referral",
      icon: ReferralIcon,
      isReferral: true,
      children: [
        {
          title: "Accepted",
          icon: AcceptedIcon,
          path: RoutePaths.acceptedPath,
        },
        { title: "RedFlag", icon: RedFlagIcon, path: RoutePaths.redFlagPath },
        {
          title: "Rejected",
          icon: RejectedIcon,
          path: RoutePaths.rejectedPath,
        },
      ],
    },
    {
      title: "Patients",
      icon: PatientIcon,
      path: RoutePaths.patientPath,
      isReferral: false,
    },
    {
      title: "Admin",
      icon: AdminIcon,
      path: RoutePaths.adminPath,
      isReferral: false,
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
  REFERRAL_STATUS: [
    { label: "Submitted", value: 1 },
    { label: "Accepted", value: 2 },
    { label: "Incomplete", value: 3 },
    { label: "Rejected", value: 4 },
  ],
  TABLE_LIMIT: [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ],
  REFERRAL_CHILDRENS_PATH: [
    RoutePaths.redFlagPath,
    RoutePaths.acceptedPath,
    RoutePaths.rejectedPath,
  ],
  ACCEPTED_TABS_DATA: [
    { name: "Active Referrals", value: 0, status: 3 },
    { name: "Closed Referrals", value: 1, status: 2 },
  ],
  PROFILE_LIST_ITEM: [
    { name: "My Profile", icon: ProfileIcon, pathname: "profile" },
    { name: "Reset Password", icon: ResetIcon, pathname: "resetpassword" },
    { name: "Privacy Policy", icon: PrivacyIcon, pathname: "privacypolicy" },
    { name: "Logout", icon: LogoutIcon },
  ],
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
};
