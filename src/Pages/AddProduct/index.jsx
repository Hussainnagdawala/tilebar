import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppModal, CustomButton, CustomInput } from "../../common";
import { useFormik } from "formik";
import * as yup from "yup";
import { CloseIcon } from "../../assets";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Grid,
  Button,
  TextField,
  IconButton,
  Autocomplete,
  Typography,
} from "@mui/material";
import service from "../../api/services";
import { colors } from "../../theme";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import { toast } from "react-toastify";
import CommonFilterComponent from "../../common/AddProductCustomFilter";
import { useEmpty } from "../../hooks";
import { globalConstant } from "../../constant";
import { addProductStyles, VisuallyHiddenInput } from "./styles";
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
  const [selectedDataObject, setSelectedDataObject] = useState({
    size: [],
    byLook: [],
    byUse: [],
    byFinish: [],
  });
  const [imageData, setImageData] = useState(globalConstant.InitialImageData);
  const [productImageData, setProductImageData] = useState([]);
  const { isValidArray } = useEmpty();

  // yup validation schema
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

  // formik instance
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
      if (!id) {
        handleAddProductDataApi(values);
      } else {
        handleUpdateProductDataApi(values);
      }
    },
  });

  // function to handle the add product
  const handleAddProductDataApi = async (values) => {
    const payload = {
      ...values,
      ...selectedIdOfSubCategory,
      categoryId: [selectedCategoryData._id],
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

  // function to handle the update product
  const handleUpdateProductDataApi = async (values) => {
    const payload = {
      ...values,
      ...selectedIdOfSubCategory,
      categoryId: [selectedCategoryData._id],
      images: productImageData,
      colors: selectedColor,
      productId: id,
    };
    try {
      const response = await service.productPage.updateProduct(payload);
      if (response?.data?.status) {
        toast.success(response?.data?.message, { autoClose: 2000 });
        formik.resetForm();
        navigate(RoutePaths.productPath);
      } else toast.error(response?.data?.message, { autoClose: 2000 });
    } catch (error) {
      toast.error("something went wrong in edit api", { autoClose: 2000 });
    }
  };

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

  const getSingleProductData = async (id) => {
    try {
      const response = await service.productPage.productDetail({
        productId: id,
      });
      const data = response?.data;
      if (data.status) {
        // Extract the product details from the response data.
        const EditData = data?.data;

        // Map the colors to a format suitable for form fields.
        const colors = EditData?.colors.map((item) => ({
          colorId: item?._id,
          label: item?.title,
          image: item?.image,
        }));

        // Extract IDs from various product attributes for editing purposes.
        const byLookId = EditData?.byLooks.map((item) => item?._id);
        const byUseId = EditData?.byUse.map((item) => item?._id);
        const size = EditData?.sizes.map((item) => item?._id);
        const byFinishId = EditData?.byFinish.map((item) => item?._id);

        // Prepare the category data by extracting the first category's details.
        const categoryData = {
          ...EditData?.categories[0],
          label: EditData?.categories[0]?.title,
          id: EditData?.categories[0]?._id,
        };

        // Populate form fields with the fetched product details.
        formik.setFieldValue("description", EditData?.description);
        formik.setFieldValue("name", EditData?.name);
        formik.setFieldValue("unit", EditData?.unit);
        formik.setFieldValue("inventory", EditData?.inventory);
        formik.setFieldValue("price", EditData?.price);

        // Set product image data for display.
        setProductImageData(EditData?.images);

        // Set the selected category data for the product.
        setSelectedCategoryData(categoryData);

        // Set the selected colors for the product.
        setSelectedColor(colors);

        // Update the selected data object to show selected data in shop bys slected options
        setSelectedDataObject({
          ...selectedDataObject,
          byLook: EditData.byLooks,
          byFinish: EditData.byFinish,
          size: EditData.sizes,
          byUse: EditData.byUse,
        });

        // Update the selected sub-category IDs to sync with the data seleted as this object directly goes in add/update api which only takes id .
        setSelectedIdOfSubCategory({
          byLook: byLookId,
          byFinish: byFinishId,
          byUse: byUseId,
          size: size,
        });
      } else {
        toast.error(data?.message, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 2000 });
    }
  };

  // this useEffect run and fetch data only when the user is editing the product to get the edited data
  useEffect(() => {
    if (id) {
      getSingleProductData(id);
    }
  }, [id]);

  // toggling the drawer open/close
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

  //  function to get the seleted color and open the modal to upload the image of that color
  const handleSelectedColor = (e, value) => {
    if (value && value?.label) {
      setAddColorImageModal({
        colorData: value,
        isModalOpen: true,
      });
    }
  };

  // function to handle the file/image upload for the color image by opening the dropdown
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

  // function to handle product file/or image upload
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

  // function to handle product delete selected image
  const handleProductDeleteImage = (imgUrl) => {
    if (!imgUrl) return;
    const filterOutDeletedImageData = productImageData.filter(
      (item) => item !== imgUrl
    );
    setProductImageData(filterOutDeletedImageData);
  };

  // common image upload api to get image url
  const handleImageUploadApi = async (formData) => {
    try {
      const res = await service.imageUploaderService.uploadImage(formData);
      return res;
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  // function to handle delete in selected color data
  const handleDeleteSelectedColorData = (deleteData) => {
    if (!deleteData) return;
    const filterSelectedColor = selectedColor.filter(
      (item) => item.colorId !== deleteData.colorId
    );
    setSelectedColor(filterSelectedColor);
  };

  // function to handlecategory selection
  const handleCategorySelectedData = (e, value) => {
    if (!value) return;

    setSelectedCategoryData(value);
  };

  // filtering the data to get only the option which are not selected
  const UniqueData = shopByColorData.filter(
    (item) => !selectedColor.some((subitem) => subitem.colorId === item._id)
  );

  return (
    <>
      <Box mb={5}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3} mb={5} justifyContent={"center"}>
            <Grid item xs={6} md={4}>
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
            <Grid item xs={6} md={4}>
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
            <Grid item xs={6} md={4}>
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
                value={selectedCategoryData}
                onChange={handleCategorySelectedData}
                sx={addProductStyles.autocompleteColorStyle}
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
            </Grid>
            <Grid item xs={6} md={3}>
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

            <Grid item xs={4} md={3}>
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
            <Grid item xs={4} md={3}>
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
            <Grid item xs={4} md={3}>
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
                sx={addProductStyles.autocompleteColorStyle}
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
                            ...addProductStyles.deleteButtonStyle,
                            top: "20px",
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
            <Grid item xs={6} md={6}>
              <CommonFilterComponent
                initialData={shopByUseData}
                initialSelectedData={selectedDataObject.byUse}
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
            <Grid item xs={6} md={6}>
              <CommonFilterComponent
                initialData={shopByLookData}
                initialSelectedData={selectedDataObject.byLook}
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
            <Grid item xs={6} md={6}>
              <CommonFilterComponent
                initialData={shopByFinishData}
                initialSelectedData={selectedDataObject.byFinish}
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
            <Grid item xs={6} md={6}>
              <CommonFilterComponent
                initialData={sizesData}
                initialSelectedData={selectedDataObject.size}
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
                      <Grid item xs={4} md={2} minHeight={"180px"}>
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
                              ...addProductStyles.deleteButtonStyle,
                              top: "5px",
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                    );
                  })}
                <Grid item xs={4} md={2}>
                  <Button
                    component="label"
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    sx={addProductStyles.uploadImageButton}
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
              buttonName={id ? "Update" : "Submit"}
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
            <Box sx={addProductStyles.modalHeadingStyle}>
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
                    sx={addProductStyles.uploadImageButton}
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
