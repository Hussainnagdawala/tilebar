import { colors } from "../../theme";

export const styles = {
  footerContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primary.main,
    padding: { xs: 2, md: "8px 40px" },
    flexDirection: { xs: "column", sm: "row" },
  },

  footerLinksContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: { xs: "8px", sm: "0" },
  },

  footerLink: {
    color: colors.appBarBackground.main,
    marginRight: "8px",
    textDecoration: "none",
  },

  footerSeparator: {
    color: colors.appBarBackground.main,
    marginRight: "8px",
  },

  footerRightsContainer: {
    display: "flex",
    justifyContent: { xs: "center", sm: "flex-end" },
    width: { xs: "100%", sm: "auto" },
  },

  footerRights: {
    color: colors.appBarBackground.main,
    textAlign: { xs: "center", sm: "right" },
  },
};
