import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalStorage } from "../../../hooks";
import { toast } from "react-toastify";
import { Box, Typography } from "@mui/material";
import { colors } from "../../../theme";
import { CustomInput } from "../../../common/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { CustomButton } from "../../../common/CustomButton";

const LoginForm = () => {
  const navigate = useNavigate();
  const { add } = useLocalStorage();
  const loginValidation = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required")
      .matches(/(?=.*[0-9])/, "Password must contain a number."),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      console.log("values", values);
      handleLogin(values);
    },
  });
  const handleLogin = async (values) => {
    // const validEmail = "admin@gmail.com";
    // const validPassword = "123";
    // if (email === validEmail && password === validPassword) {
    //   toast.success("Login successful!", {
    //     position: "top-center",
    //     autoClose: 3000,
    //   });
    //   add("admin_token", "token");

    //   setTimeout(() => {
    //     navigate("/category");
    //   }, 1300);
    // } else {
    //   // Show error message
    //   toast.error("Invalid credentials", {
    //     position: "top-center",
    //     autoClose: 3000,
    //   });
    // }

    // setEmail("");
    // setPassword("");
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <Typography
          variant="h4"
          textAlign={"center"}
          mt={5}
          sx={{
            color: colors.primary.main2,
            fontWeight: 700,
          }}
        >
          Admin Portal
        </Typography>
        <Typography
          variant="subtitle1"
          textAlign={"center"}
          sx={{
            fontWeight: 500,
            color: colors.primary.main2,
          }}
        >
          Sign into your account
        </Typography>
        <CustomInput
          label="email"
          name="email"
          placeholder="Enter Email"
          value={formik.values.email}
          screen={"login"}
          type="text"
          handleChange={formik.handleChange}
          error={formik.errors.email}
          helperText={Boolean(formik.touched.email) && formik.errors.email}
        />
        <CustomInput
          label="Password"
          name="password"
          placeholder="Enter password"
          value={formik.values.password}
          screen={"login"}
          type="password"
          handleChange={formik.handleChange}
          error={formik.errors.password}
          helperText={
            Boolean(formik.touched.password) && formik.errors.password
          }
        />
        <CustomButton buttonName={"Login"} variant={"contained"} />
        {/* <button type="submit" className="py-2 px-2 rounded-3 w-100">
          Log In
        </button> */}
      </Box>
    </form>
  );
};

export default LoginForm;
