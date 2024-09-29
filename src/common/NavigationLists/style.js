import { appStyles, colors } from "../../theme";
const drawerWidth = "260px";

export const styles = {
  drawerStyles: {
    display: { xs: "none", md: "block" },
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
      border: 0,
      boxShadow: "0 5px 10px 0 rgba(34, 34, 34, 0.15)",
    },
  },
  toolbarStyles: {
    "&": {
      justifyContent: "center",
      minHeight: "100px",
    },
  },
  listItem: {
    color: colors.tertiary.main,
    pl: 2,
    "&:hover": {
      backgroundColor: "transparent",
    },
    "& :focus": {
      ...appStyles.backgroundColorSecondary,
    },
  },
  listItemText: {},
  onHoverBackgroundTransparent: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
};
