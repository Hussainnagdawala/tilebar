import { styled } from "@mui/material";
import { colors } from "../../theme";

export const addProductStyles = {
  deleteButtonStyle: {
    background: colors.white.main,
    position: "absolute",
    right: "10px",
    "&:hover": {
      background: colors.white.main,
    },
  },
  uploadImageButton: {
    width: "100%",
    p: 6,
    borderRadius: "10px",
    border: `2px dashed ${colors.darkGray.main}`,
    "&:hover": {
      border: `2px dashed ${colors.darkGray.main}`,
    },
  },
  modalHeadingStyle: {
    background: colors.white.main,
    zIndex: 99,
    px: 5,
    py: 3,
    position: "sticky",
    top: 0,
    borderBottom: `2px solid ${colors.bottedBorder.main}`,
    borderBottomStyle: "dashed",
  },
  autocompleteColorStyle: {
    "& fieldset": {
      borderRadius: "10px",
      borderColor: colors.primary.main,
    },
    "& input": {
      fontSize: "14px",
      "&::placeholder": {
        color: `rgba(0,0,0,0.5)`,
        opacity: 1,
      },
    },
  },
};

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
