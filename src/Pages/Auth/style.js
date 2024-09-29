import { LoginBackgroundImage } from "../../assets";

export const styles = {
  backgroundImageContainer: {
    backgroundImage: `url(${LoginBackgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    zIndex: -1,
    minHeight: "100dvh",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  forgotPassword: {
    textDecoration: "underline",
    fontSize: { xs: "12px", md: ".75rem" },
    cursor: "pointer",
  },
  // loginContainer: {
  //   fontWeight: "bold",
  //   position: "relative",
  //   zIndex: 0,
  //   padding: { xs: 4, md: 7 },
  //   borderRadius: "1rem",
  //   background: "rgba(255, 255, 255, 0.50)",
  //   boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
  //   backdropFilter: "blur(10px)",
  //   WebkitBackdropFilter: "blur(5px)",
  //   border: "1px solid rgba(255, 255, 255, 0.25)",
  //   // "&::before": {
  //   //   content: '""',
  //   //   // minHeight: "580px",
  //   //   position: "absolute",
  //   //   top: 0,
  //   //   left: 0,
  //   //   right: 0,
  //   //   bottom: 0,
  //   //   zIndex: -1,
  //   //   borderRadius: "1rem",
  //   //   background: "rgba(255, 255, 255, 0.50)",
  //   //   boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
  //   //   backdropFilter: "blur(5px)",
  //   //   WebkitBackdropFilter: "blur(5px)",
  //   //   border: "1px solid rgba(255, 255, 255, 0.25)",
  //   // },
  // },

  logoBox: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },

  loginHeading: {
    color: "#393939",
    py: 1,
    fontWeight: 600,
    textAlign: "center",
  },
};
