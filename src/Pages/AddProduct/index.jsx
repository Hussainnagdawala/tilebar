import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppModal, CustomButton, CustomInput } from "../../common";
import { useFormik } from "formik";
import * as yup from "yup";
import { CloseIcon } from "../../assets";
import { Grade, Label } from "@material-ui/icons";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Grid,
  Button,
  TextField,
  IconButton,
  Autocomplete,
  Typography,
  styled,
} from "@mui/material";
import service from "../../api/services";
import { colors } from "../../theme";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import { toast } from "react-toastify";
import CommonFilterComponent from "../../common/AddProductCustomFilter";
import { useEmpty } from "../../hooks";
import { globalConstant } from "../../constant";
import { RoutePaths } from "../../routes/RouterPaths";
const Index = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [addColorImageModal, setAddColorImageModal] = useState({
    isModalOpen: false,
    colorData: {},
  });
  const [shopByUseData, setShopByUseData] = useState([]);
  const [shopByLookData, setShopByLookData] = useState([]);
  const [shopByFinishData, setShopByFinishData] = useState([]);
  const [sizesData, setSizesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategoryData, setSelectedCategoryData] = useState([]);
  const [shopByColorData, setShopByColorData] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedIdOfSubCategory, setSelectedIdOfSubCategory] = useState({
    size: [],
    byLook: [],
    byUse: [],
    byFinish: [],
  });
  const [imageData, setImageData] = useState(globalConstant.InitialImageData);
  const [productImageData, setProductImageData] = useState([]);
  const { isValidArray } = useEmpty();
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
      handleAddProductDataApi(values);
    },
  });
  const handleAddProductDataApi = async (values) => {
    const payload = {
      ...values,
      ...selectedIdOfSubCategory,
      categoryId: [selectedCategoryData],
      images: productImageData,
      colors: selectedColor,
    };
    try {
      const response = await service.productPage.addProduct(payload);
      if (response?.data?.status) {
        toast.success(response?.data?.message, { autoClose: 2000 });
        formik.resetForm();
        navigate(RoutePaths.productPath);
      } else toast.error(response?.data?.message, { autoClose: 2000 });
    } catch (error) {
      toast.error("something went wrong", { autoClose: 2000 });
    }
  };
  // file button input style
  const VisuallyHiddenInput = styled("input")({
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

  // function to get the listing of the shop by color data
  const handleGetShopByColorData = async () => {
    try {
      const response = await service.shopByColorServices.listing({
        limit: 100,
      });
      if (response.status === 200) {
        setShopByColorData(response?.data?.data?.category);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 2000 });
    }
  };

  // function to get the listing of the shop by use data
  const handleGetCategoryData = async () => {
    try {
      const response = await service.categoryPage.listing({
        limit: 100,
      });
      if (response.status === 200) {
        setCategoryData(response?.data?.data?.category);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 2000 });
    }
  };

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
    handleGetShopByColorData();
    handleGetCategoryData();
  }, []);

  const handleToggleModal = () => {
    if (addColorImageModal.isModalOpen) {
      setAddColorImageModal((prev) => ({
        colorData: {},
        isModalOpen: false,
      }));
    } else {
      setAddColorImageModal((prev) => ({
        ...prev,
        isModalOpen: true,
      }));
    }
  };

  const handleSelectedColor = (e, value) => {
    if (value && value?.label) {
      setAddColorImageModal({
        colorData: value,
        isModalOpen: true,
      });
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setImageData((prev) => ({
        ...prev,
        previewUrl: blobUrl,
      }));
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await handleImageUploadApi(formData);
        if (res.data && res.data.url) {
          setSelectedColor((prev) => [
            ...prev,
            {
              colorId: addColorImageModal.colorData._id,
              label: addColorImageModal.colorData.title,
              image: res.data.url,
            },
          ]);
          setImageData((prev) => ({
            previewUrl: "",
            imgUrl: "",
          }));
          setAddColorImageModal({
            isModalOpen: false,
            colorData: {},
          });
        } else {
          toast.error("Image upload response does not contain URL.");
        }
      } catch (error) {
        toast.error("Failed to upload image");
      }
    }
  };

  const handleProductFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await handleImageUploadApi(formData);
        if (res.data && res.data.url) {
          setProductImageData((prev) => [...prev, res.data.url]);
        } else {
          toast.error("Image upload response does not contain URL.");
        }
      } catch (error) {
        toast.error("Failed to upload image");
      }
    }
  };

  const handleProductDeleteImage = (imgUrl) => {
    if (!imgUrl) return;
    const filterOutDeletedImageData = productImageData.filter(
      (item) => item !== imgUrl
    );
    setProductImageData(filterOutDeletedImageData);
  };

  const handleImageUploadApi = async (formData) => {
    try {
      const res = await service.imageUploaderService.uploadImage(formData);
      return res;
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const handleDeleteSelectedColorData = (deleteData) => {
    if (!deleteData) return;
    const filterSelectedColor = selectedColor.filter(
      (item) => item.colorId !== deleteData.colorId
    );
    setSelectedColor(filterSelectedColor);
  };

  const handleCategorySelectedData = (e, value) => {
    if (!value) return;
    // const isValuePresent = selectedCategoryData.some(
    //   (subitem) => subitem === item._id
    // );
    // if (isValuePresent) {
    setSelectedCategoryData(value._id);
    // }
  };

  // const uniqueCategoryOptions = categoryData.filter(
  //   (item) => !selectedCategoryData.some((subitem) => subitem === item._id)
  // );

  const UniqueData = shopByColorData.filter(
    (item) => !selectedColor.some((subitem) => subitem.colorId === item._id)
  );
  return (
    <>
      <Box mb={5}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3} mb={5} justifyContent={"center"}>
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
                name={"description"}
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
              <Box mb={1.3}>
                <Typography
                  variant="label"
                  sx={{ textTransform: "capitalize" }}
                >
                  Select by category
                </Typography>
              </Box>
              <Autocomplete
                disablePortal
                onChange={handleCategorySelectedData}
                sx={{
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
                }}
                options={
                  isValidArray(categoryData)
                    ? categoryData.map((item) => {
                        return { label: item.title, ...item };
                      })
                    : [{ label: "no option available", value: "" }]
                }
                renderInput={(params) => (
                  <TextField {...params} placeholder="select category" />
                )}
              ></Autocomplete>
              {/* <CustomInput
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
              /> */}
            </Grid>
            <Grid item md={3}>
              <CustomInput
                name={"unit"}
                value={formik.values.unit}
                handleChange={formik.handleChange}
                label={"Unit"}
                placeholder={"Enter unit like sq"}
                type={"text"}
                error={formik.errors.unit}
                helperText={Boolean(formik.touched.unit) && formik.errors.unit}
              />
            </Grid>

            <Grid item md={3}>
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
            <Grid item md={3}>
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
            <Grid item md={3}>
              <Box mb={1.3}>
                <Typography
                  variant="label"
                  sx={{ textTransform: "capitalize" }}
                >
                  Select by colors
                </Typography>
              </Box>
              <Autocomplete
                disablePortal
                sx={{
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
                }}
                onChange={handleSelectedColor}
                options={
                  isValidArray(UniqueData)
                    ? UniqueData.map((item) => {
                        return { label: item.title, ...item };
                      })
                    : [{ label: "no option available", value: "" }]
                }
                renderInput={(params) => (
                  <TextField {...params} placeholder="select the colors" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                {isValidArray(selectedColor) &&
                  selectedColor.map((item, index) => {
                    return (
                      <Grid
                        item
                        xs={2}
                        sx={{
                          borderRadius: "10px",
                          overflow: " hidden",
                          position: "relative",
                        }}
                      >
                        <img
                          src={item?.image}
                          alt={item?.label}
                          style={{
                            width: "100%",
                            borderRadius: "10px",
                            objectFit: "cover",
                            objectPosition: "50% 50%",
                          }}
                        />
                        <Typography textAlign={"center"}>
                          {item?.label}
                        </Typography>
                        <IconButton
                          onClick={() => handleDeleteSelectedColorData(item)}
                          color="primary"
                          sx={{
                            background: colors.white.main,
                            position: "absolute",
                            right: "10px",
                            top: "10px",
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
            <Grid item md={6}>
              <CommonFilterComponent
                initialData={shopByUseData}
                initialSelectedData={[]}
                inputLabel="Select By Use"
                inputPlaceholder="search option"
                inputName="Select By Use"
                onSelectionChange={(selectedIds) => {
                  setSelectedIdOfSubCategory((prev) => ({
                    ...prev,
                    byUse: selectedIds,
                  }));
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
                  setSelectedIdOfSubCategory((prev) => ({
                    ...prev,
                    byLook: selectedIds,
                  }));
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
                  setSelectedIdOfSubCategory((prev) => ({
                    ...prev,
                    byFinish: selectedIds,
                  }));
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
                  setSelectedIdOfSubCategory((prev) => ({
                    ...prev,
                    size: selectedIds,
                  }));
                }}
                title="Select Options from Below"
              />
            </Grid>
            <Grid item xs={12}>
              <Box mb={1.3}>
                <Typography
                  variant="label"
                  sx={{ textTransform: "capitalize" }}
                >
                  Upload Product Images
                </Typography>
              </Box>
              <Grid container spacing={3}>
                {isValidArray(productImageData) &&
                  productImageData.map((imgUrl) => {
                    return (
                      <Grid item xs={2} sx={{}}>
                        <Box
                          sx={{
                            background: `url(${imgUrl})`,
                            width: "100%",
                            height: "100%",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            position: "relative",
                          }}
                        >
                          <IconButton
                            onClick={() => handleProductDeleteImage(imgUrl)}
                            color="primary"
                            sx={{
                              background: colors.white.main,
                              position: "absolute",
                              right: "10px",
                              top: 0,
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                    );
                  })}
                <Grid item xs={2}>
                  <Button
                    component="label"
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    sx={{
                      width: "100%",
                      p: 6,
                      borderRadius: "10px",
                      border: `2px dashed ${colors.darkGray.main}`,
                      "&:hover": {
                        border: `2px dashed ${colors.darkGray.main}`,
                      },
                    }}
                  >
                    <Box textAlign={"center"}>
                      <UploadRoundedIcon
                        sx={{
                          fontSize: "60px",
                          mb: 2,
                        }}
                      />
                      <Typography
                        variant="h6"
                        textTransform={"capitalize"}
                        sx={{
                          fontSize: "18px",
                          mb: 1,
                        }}
                      >
                        Click to Upload
                      </Typography>
                      <Typography
                        variant="body2"
                        textTransform={"capitalize"}
                        sx={{
                          color: colors.darkGray.main,
                        }}
                      >
                        supported formats JPG, PNG ,JPEG
                      </Typography>
                    </Box>
                    <VisuallyHiddenInput
                      type="file"
                      accept=".jpg , .png , .jpeg"
                      onChange={handleProductFileUpload}
                    />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box textAlign={"center"} width={"100%"}>
            <CustomButton
              type="submit"
              variant="contained"
              buttonName="Submit"
              sx={{ width: "70% !important" }}
            />
          </Box>
        </form>
      </Box>
      {addColorImageModal.isModalOpen && (
        <AppModal
          open={addColorImageModal.isModalOpen}
          maxWidth={"sm"}
          handleCloseOpen={handleToggleModal}
        >
          <Box>
            <Box
              sx={{
                background: colors.white.main,
                zIndex: 99,
                px: 5,
                py: 3,
                position: "sticky",
                top: 0,
                borderBottom: `2px solid ${colors.bottedBorder.main}`,
                borderBottomStyle: "dashed",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="title">Select the image</Typography>

                <IconButton onClick={handleToggleModal}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
            <Box mb={5} px={5} py={3}>
              <Typography
                variant="subtitle1"
                sx={{ textTransform: "capitalize", mb: 4 }}
              >
                Upload the Image of the Product for the Selected Color
              </Typography>
              <Grid container gap={3} alignItems={"center"}>
                <Grid item xs={5.5}>
                  <Button
                    component="label"
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    sx={{
                      width: "100%",
                      p: 10,
                      borderRadius: "10px",
                      border: `2px dashed ${colors.darkGray.main}`,
                      "&:hover": {
                        border: `2px dashed ${colors.darkGray.main}`,
                      },
                    }}
                  >
                    <Box textAlign={"center"}>
                      <UploadRoundedIcon
                        sx={{
                          fontSize: "60px",
                          mb: 2,
                        }}
                      />
                      <Typography
                        variant="h6"
                        textTransform={"capitalize"}
                        sx={{
                          fontSize: "20px",
                          mb: 1,
                        }}
                      >
                        {imageData?.previewUrl
                          ? "Choose another"
                          : " Click to Upload"}
                      </Typography>
                      <Typography
                        variant="body2"
                        textTransform={"capitalize"}
                        sx={{
                          color: colors.darkGray.main,
                        }}
                      >
                        supported formats JPG, PNG ,JPEG
                      </Typography>
                    </Box>
                    <VisuallyHiddenInput
                      type="file"
                      accept=".jpg , .png , .jpeg"
                      onChange={handleFileUpload}
                    />
                  </Button>
                </Grid>
                <Grid item xs={5.5} sx={{ objectFit: "contain" }}>
                  {imageData?.previewUrl && (
                    <img
                      src={imageData?.previewUrl}
                      alt="preview"
                      width={"100%"}
                      style={{ objectFit: "contain" }}
                      height={"200px"}
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </AppModal>
      )}
    </>
  );
};

export default Index;
