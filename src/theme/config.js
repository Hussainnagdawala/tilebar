import { colors } from "./colors";
import { typography } from "./typography";

const font = "Montserrat, sans-serif";
export const theme = () => ({
  palette: colors,
  typography: { fontFamily: font, ...typography(font) },
  spacing: 4,
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: `transparent`,
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: `${colors.secondary.main}`,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: `${colors.secondary.main}`,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
          "&:focus": {
            boxShadow: "none",
          },
          "&:active": {
            boxShadow: "none",
          },
        },
      },
    },
  },
});
