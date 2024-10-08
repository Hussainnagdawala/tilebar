import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CustomInput } from "../../common";
import { useFormik } from "formik";
import * as yup from "yup";
import { Grade, Label } from "@material-ui/icons";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  ListItemButton,
  Box,
  Grid,
  List,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  OutlinedInput,
  TextField,
  IconButton,
} from "@mui/material";
import service from "../../api/services";
import { toast } from "react-toastify";
import CommonFilterComponent from "../../common/AddProductCustomFilter";
const Index = () => {
  const { id } = useParams();
  console.log("id", id);
  const [shopByUseData, setShopByUseData] = useState([]);
  const [shopByLookData, setShopByLookData] = useState([]);
  const [shopByFinishData, setShopByFinishData] = useState([]);
  const [sizesData, setSizesData] = useState([]);
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    unit: yup.string().required("Unit is required"),
    price: yup
      .string()
      .required("price is required")
      .matches(/^\d+$/, "Enter a valid number"),
    inventory: yup
      .string()
      .required("inventory is required")
      .matches(/^\d+$/, "Enter a valid number"),
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
  // function to get the listing of the size data
  const handleGetSizeData = async () => {
    try {
      const response = await service.sizePage.sizelisting({ limit: 100 });
      if (response.status === 200) {
        setSizesData(response?.data?.data?.list);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 2000 });
    }
  };
  // function to get the listing of the shop by Finish data
  const handleGetShopByFinishData = async () => {
    try {
      const response = await service.shopByFinishPage.listing({ limit: 100 });
      if (response.status === 200) {
        setShopByFinishData(response?.data?.data?.category);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 2000 });
    }
  };

  // function to get the listing of the shop by use data
  const handleGetShopByUseData = async () => {
    try {
      const response = await service.shopByUsePage.listing({ limit: 100 });
      if (response.status === 200) {
        setShopByUseData(response?.data?.data?.category);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 2000 });
    }
  };

  // function to get the listing of the shop by use data
  const handleGetShopByLookData = async () => {
    try {
      const response = await service.shopByLookPage.listing({ limit: 100 });
      if (response.status === 200) {
        setShopByLookData(response?.data?.data?.category);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 2000 });
    }
  };

  useEffect(() => {
    handleGetShopByUseData();
    handleGetShopByLookData();
    handleGetShopByFinishData();
    handleGetSizeData();
  }, []);

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
            <Grid item md={4}>
              <CustomInput
                name={"inventory"}
                value={formik.values.inventory}
                handleChange={formik.handleChange}
                label={"Inventory"}
                min={0}
                placeholder={"Enter inventory like sq"}
                type={"number"}
                error={formik.errors.inventory}
                helperText={
                  Boolean(formik.touched.inventory) && formik.errors.inventory
                }
              />
            </Grid>
            <Grid item md={4}>
              <CustomInput
                name={"price"}
                value={formik.values.price}
                handleChange={formik.handleChange}
                label={"Price"}
                min={0}
                placeholder={"Enter price"}
                type={"text"}
                error={formik.errors.price}
                helperText={
                  Boolean(formik.touched.price) && formik.errors.price
                }
              />
            </Grid>
            {/* <Grid item md={6}>
              <CustomInput handleChange={handleCustomFilter} />
              <Grid container>
                <Grid item xs={6}>
                  <Box>
                    <List
                      sx={{
                        height: "400px",
                        overflow: "scroll",
                      }}
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                      subheader={
                        <ListSubheader
                          component="div"
                          id="nested-list-subheader"
                        >
                          select Options from Below
                        </ListSubheader>
                      }
                    >
                      {searchFilterData.map((item) => {
                        const isItemPresent = selectedData.some(
                          (selected) => selected.title === item.title
                        );
                        return (
                          !isItemPresent && (
                            <ListItemButton
                              onClick={() => handleSelectedData(item)}
                            >
                              <ListItemText primary={item.title} />
                            </ListItemButton>
                          )
                        );
                      })}
                    </List>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <List
                      sx={{
                        height: "400px",
                        overflow: "scroll",
                      }}
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                      subheader={
                        <ListSubheader
                          component="div"
                          id="nested-list-subheader"
                        >
                          select Options from Below
                        </ListSubheader>
                      }
                    >
                      {selectedData.map((item) => {
                        return (
                          <ListItemButton disableRipple>
                          <ListItemIcon>
                              <SendIcon />
                            </ListItemIcon> 
                            <ListItemText primary={item.title} />
                            <IconButton
                              onClick={() => handleDeleteSectedData(item)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Box>
                </Grid>
              </Grid>
            </Grid> */}
            <Grid item md={6}>
              <CommonFilterComponent
                initialData={shopByUseData}
                initialSelectedData={[]}
                inputLabel="Select By Use"
                inputPlaceholder="search option"
                inputName="Select By Use"
                onSelectionChange={(selectedIds) => {
                  console.log("Selected IDs:", selectedIds);
                }}
                title="Select Options from Below"
              />
            </Grid>
            <Grid item md={6}>
              <CommonFilterComponent
                initialData={shopByLookData}
                initialSelectedData={[]}
                inputLabel="Select By Look"
                inputPlaceholder="search option"
                inputName="Select By Look"
                onSelectionChange={(selectedIds) => {
                  console.log("Selected IDs:", selectedIds);
                }}
                title="Select Options from Below"
              />
            </Grid>
            <Grid item md={6}>
              <CommonFilterComponent
                initialData={shopByFinishData}
                initialSelectedData={[]}
                inputLabel="Select By Finish"
                inputPlaceholder="search option"
                inputName="Select By Finish"
                onSelectionChange={(selectedIds) => {
                  console.log("Selected IDs:", selectedIds);
                }}
                title="Select Options from Below"
              />
            </Grid>
            <Grid item md={6}>
              <CommonFilterComponent
                initialData={sizesData}
                initialSelectedData={[]}
                inputLabel="Select By Size"
                inputPlaceholder="search option"
                inputName="Select By Size"
                onSelectionChange={(selectedIds) => {
                  console.log("Selected IDs:", selectedIds);
                }}
                title="Select Options from Below"
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default Index;
