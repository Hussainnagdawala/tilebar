import { colors } from "../../theme";

export const sliderStyles = {
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
  imageListStyle: {
    "& .MuiImageListItem-standard": {
      borderRadius: "10px",
      overflow: "hidden",
    },
  },
  imageStyle: {
    height: "300px",
    objectFit: "cover",
    objectPosition: "50% 50%",
  },
  imageListTopBarStyle: {
    p: 3,
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%," +
      "rgba(0,0,0,0.3) 30%, rgba(0,0,0,0) 100%)",
  },
  iconButtonStyle: {
    background: "rgba(255,255,255,0.9)",
    "&:hover": {
      background: "rgba(255,255,255,0.7)",
    },
  },
  imageUploadButtonStyle: {
    width: "100%",
    p: 10,
    borderRadius: "10px",
    border: `2px dashed ${colors.darkGray.main}`,
    "&:hover": {
      border: `2px dashed ${colors.darkGray.main}`,
    },
  },
  changeImageButtonStyle: {
    borderRadius: "10px",
    width: "100%",
    textTransform: "capitalize",
    minHeight: "45px",
    marginTop: "clamp(.75rem,2vw, 1rem)",
  },
};
