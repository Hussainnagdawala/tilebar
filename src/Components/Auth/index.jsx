// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useLocalStorage } from "../../hooks";
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const { add } = useLocalStorage();
//   const handleLogin = (e) => {
//     e.preventDefault();

//     const validEmail = "admin@gmail.com";
//     const validPassword = "123";

//     if (email === validEmail && password === validPassword) {
//       toast.success("Login successful!", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//       add("admin_token", "token");

//       setTimeout(() => {
//         navigate("/category");
//       }, 1300);
//     } else {
//       // Show error message
//       toast.error("Invalid credentials", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//     }

//     setEmail("");
//     setPassword("");
//   };

//   return (
//     <div>
//       <form className="login" onSubmit={handleLogin}>
//         <h2>Welcome</h2>
//         <p>Please log in</p>
//         <input
//           type="email"
//           placeholder="User Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit" className="py-2 px-2 rounded-3 w-100">
//           Log In
//         </button>
//       </form>

//       {/* Toast Container for displaying messages */}
//       {/* <ToastContainer /> */}
//     </div>
//   );
// };

// export default Login;

import { Box, Container, Grid } from "@mui/material";
// import { ProvideDigital } from "@assets";
// import LoginForm from "./components/LoginForm";
// import ForgotPasswordForm from "./components/ForgotPasswordForm";
// import ConfirmPasswordForm from "./components/ConfirmPasswordForm";
// import OrganisationSetPasswordForm from "./components/OrganisationSetPasswordForm";
import { styles } from "./style";
import { useLocalStorage } from "../../hooks";
// import { LoginFooter } from "@containers";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import { toast } from "react-toastify";
// import { RenderAuthInterface } from "@schemas";

const Index = () => {
  const { activeTab } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { add } = useLocalStorage();
  const handleLogin = (e) => {
    e.preventDefault();

    const validEmail = "admin@gmail.com";
    const validPassword = "123";

    if (email === validEmail && password === validPassword) {
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 3000,
      });
      add("admin_token", "token");

      setTimeout(() => {
        navigate("/category");
      }, 1300);
    } else {
      // Show error message
      toast.error("Invalid credentials", {
        position: "top-center",
        autoClose: 3000,
      });
    }

    setEmail("");
    setPassword("");
  };
  // const RENDER_AUTH_FORM = {
  //   login: <LoginForm />,
  //   "forget-password": <ForgotPasswordForm />,
  //   "reset-password": <ConfirmPasswordForm />,
  //   "organisation-set-password": <OrganisationSetPasswordForm />,
  // };

  return (
    <Box>
      <Box>
        {/* <Container sx={styles.loginSpace}> */}
        <Grid container>
          <Grid item xs={0} md={7}>
            <Box sx={styles.backgroundImageContainer}></Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              p: 2,
            }}
          >
            <Box sx={styles.loginContainer}>
              {/* {activeTab && RENDER_AUTH_FORM[activeTab]} */}
              <form className="login" onSubmit={handleLogin}>
                <h2>Welcome</h2>
                <p>Please log in</p>
                <input
                  type="email"
                  placeholder="User Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className="py-2 px-2 rounded-3 w-100">
                  Log In
                </button>
              </form>
              <Box sx={styles.logoBox}>{/* <ProvideDigital /> */}</Box>
            </Box>
          </Grid>
        </Grid>
        {/* </Container> */}
        {/* <LoginFooter /> */}
      </Box>
    </Box>
  );
};

export default Index;
