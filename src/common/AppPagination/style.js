import { colors } from "../../theme";

export const style = {
  textStyle: {
    fontSize: "14px",
    lineHeight: "17px",
    weight: 600,
  },

  selectStyle: {
    border: `1px solid ${colors?.primary.main}`,
    minWidth: 60,
    marginRight: 2,
    height: "2rem",
    borderRadius: "1rem",
  },

  leftContainer: {
    display: "flex",
    gap: 1,
    alignItems: "center",
  },

  rightContainer: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: { xs: "space-between", md: "end" },
    gap: { xs: 0, sm: 8 },
    borderTop: `1px solid ${colors.inputText.main}`,
    pt: { xs: 2, sm: 3, md: 3 },
    position: "fixed",
    width: { xs: "calc(100dvw - 32px)", md: "calc(100dvw - 300px)" },
    bottom: 0,
    backgroundColor: colors.appBarBackground.main,
    pb: { xs: 2, sm: "24px", md: "24px" },
  },
  select: {
    borderRadius: "50px",
    "& .MuiSelect-select": {
      padding: 0,
      px: 3.1,
      py: 2.1,
    },
  },
  menuItem: {
    fontSize: "14px",
  },
  typography: {
    fontSize: "14px", // Adjust as needed
    color: colors.text.primary, // Adjust as needed
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      "&.Mui-selected": {
        backgroundColor: colors.primary.main,
        borderColor: colors.primary.main,
        color: "#fff",
      },
      "&:not(.Mui-selected)": {
        color: colors.text.tertiary,
        borderColor: colors.text.tertiary,
      },
    },
    "& .MuiPaginationItem-previousNext": {
      borderColor: colors.primary.main,
      color: colors.primary.main,
      "&:hover": {
        borderColor: colors.primary.main,
        color: colors.primary.main,
      },
    },
  },
};
export default style;
