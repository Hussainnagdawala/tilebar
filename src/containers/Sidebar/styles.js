import { colors } from "../../theme";
const drawerWidth = "260px";

export const sidebarStyles = {
  drawerStyles: {
    display: { xs: "none", md: "block" },
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      // background : '#f7f4ed',
      // background: "#635d4f",
      background: colors.primary.main,
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
};
