import { Box, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CustomInput } from "../../common";
import { useFormik } from "formik";
import * as yup from "yup";
import { Grade } from "@material-ui/icons";

const Index = () => {
  const { id } = useParams();
  console.log("id", id);
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    unit: yup.string().required("Unit is required"),
    price: yup.string().required("price is required"),
    inventory: yup.string().required("inventory is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      unit: "",
      price: "",
      inventory: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  useEffect(() => {}, []);
  return (
    <>
      <Box>
        <form>
          <Grid container spacing={3}>
            <Grid item md={4}>
              <CustomInput
                name={"name"}
                value={formik.values.name}
                handleChange={formik.handleChange}
                label={"Name"}
                placeholder={"Enter your name"}
                type={"text"}
                error={formik.errors.name}
                helperText={Boolean(formik.touched.name) && formik.errors.name}
              />
            </Grid>
            <Grid item md={4}>
              <CustomInput
                name={"Description"}
                value={formik.values.description}
                handleChange={formik.handleChange}
                label={"Description"}
                placeholder={"Enter your description"}
                type={"text"}
                error={formik.errors.description}
                helperText={
                  Boolean(formik.touched.description) &&
                  formik.errors.description
                }
              />
            </Grid>
            <Grid item md={4}>
              <CustomInput
                name={"Unit"}
                value={formik.values.unit}
                handleChange={formik.handleChange}
                label={"Unit"}
                placeholder={"Enter unit like sq"}
                type={"text"}
                error={formik.errors.unit}
                helperText={Boolean(formik.touched.unit) && formik.errors.unit}
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default Index;
