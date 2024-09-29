import { globalConstant } from "../../constant";

import { appStyles, colors } from "../../theme";

const drawerWidth = "260px";

export const headerStyles = {
  appBarBackground: (routepath) => {
    const fullWidthHeader = globalConstant.USER !== routepath;
    return {
      ...appStyles.backgroundColorWhite,
      ...appStyles.noBoxShadow,
      ...appStyles.borderbottom,
      ...appStyles.borderColorSecondary,
      background: "#635d4f",
      color: "#fff",
      width: {
        xs: "100%",
        md: fullWidthHeader ? `calc(100% - ${drawerWidth})` : "100%",
      },
      ml: { xs: 0, md: `${fullWidthHeader ? drawerWidth : 0}` },
    };
  },
  smallScreenLogoBoxStyles: {
    display: { xs: "none", md: "block" },
    cursor: "pointer",
  },
  headerToolbarStyles: {
    justifyContent: "space-between",
    "&": {
      py: 3,
      px: 5,
    },
  },
  headerTitle: {
    flexGrow: 1,
    textAlign: { xs: "center", md: "start" },
    fontSize: { xs: "18px", md: "22px" },
    display: "block",
    ...appStyles.textColorBlack,
  },
  hamburgerButton: {
    pr: 2,
    display: { md: "none" },
  },
  profileTitle: {
    ...appStyles.textColorBlack,
    color: "#fff",
    display: { xs: "none", md: "block" },
    fontSize: { xs: ".75rem", md: "initial" },
    lineHeight: { xs: "normal", md: "initial" },
  },
  profileSubhead: {
    display: { xs: "none", md: "block" },
    fontWeight: 500,
    color: colors.darkGray.main,
    color: "#fff",
    fontSize: { xs: ".75rem", md: "initial" },
    lineHeight: { xs: "normal", md: "initial" },
  },
  profileDialog: {
    "& .MuiPopover-paper": {
      boxShadow: "0 4px 15px 0 rgba(34, 34, 34, 0.15) !important",
      "& ul": {
        py: 2,
        px: { xs: 3, md: 0 },
      },
      "& li": {
        px: { xs: 0, md: 4 },
        minHeight: { xs: "auto", md: "initial" },
      },
    },
  },

  headerCollapsibleDrawer: {
    display: { xs: "block", md: "none" },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: drawerWidth,
    },
  },
};
