export const tableHeadCellStyles = {
  height: "40px",
  fontWeight: 600,
  whiteSpace: "nowrap",
  fontSize: "14px",
  backgroundColor: "white" /* Solid white background */,
  position: "sticky",
  borderBottom: "3px solid #159283",
  top: 0,
  zIndex: 1,
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(21, 146, 131, 0.05)" /* Semi-transparent overlay */,
    zIndex: -1,
  },
};

export const tableCellStyles = {
  fontSize: 14,
  borderBottom: "2px solid #fff",
  padding: 3,
};
