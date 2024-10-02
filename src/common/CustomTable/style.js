import { colors } from "../../theme";

export const tableHeadCellStyles = {
  height: "40px",
  fontWeight: 600,
  whiteSpace: "nowrap",
  fontSize: "14px",
  backgroundColor: "white" /* Solid white background */,
  position: "sticky",
  borderBottom: `3px solid ${colors.primary.main}`,
  top: 0,
  zIndex: 1,
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.secondary.light,
    zIndex: -1,
  },
};

export const tableCellStyles = {
  fontSize: 14,
  borderBottom: `2px solid rgba(0,0,0,0.1)`,
  padding: 3,
};
