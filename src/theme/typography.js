export const typography = (font) => ({
  h4: {
    fontSize: "35px",
    lineHeight: "50px",
    fontWeight: 700,
    fontFamily: font,
  },
  h5: {
    fontSize: "clamp(19px, 2vw, 28px)",
    fontWeight: 700,
    fontFamily: font,
  },
  h6: {
    fontSize: "22px",
    lineHeight: "20px",
    fontWeight: 600,
    fontFamily: font,
  },
  subhead: {
    fontSize: "15px",
    lineHeight: "22.4px",
    fontWeight: 700,
    fontFamily: font,
  },
  body1: {
    fontSize: "clamp(13px, 1.5vw, 16px)",
    fontWeight: 500,
    fontFamily: font,
  },
  title: {
    fontSize: "20px",
    lineHeight: "normal",
    fontWeight: 600,
    fontFamily: font,
  },
  label: {
    fontSize: "16px",
    lineHeight: "28px",
    fontWeight: 600,
    fontFamily: font,
  },
});
