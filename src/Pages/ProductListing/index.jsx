import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import {
  AppModal,
  AppPagination,
  CustomButton,
  CustomInput,
  CustomTable,
} from "../../common";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import service from "../../api/services";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { toast } from "react-toastify";
import { useEmpty } from "../../hooks";
import { CloseIcon } from "../../assets";
import { colors } from "../../theme";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import { useFormik } from "formik";
import * as yup from "yup";
import { globalConstant } from "../../constant";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../routes/RouterPaths";

const Index = () => {
  const [productModalType, setProductModalType] = useState(
    globalConstant.InitialModalStateData
  );
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState({
    isDeleteModalOpen: false,
    deleteId: "",
  });
  const [queryParams, setQueryParams] = useState({
    page: 1,
    search: "",
    limit: 10,
  });
  const [productData, setProductData] = useState({});
  const [imageData, setImageData] = useState(globalConstant.InitialImageData);
  const { isValidArray } = useEmpty();
  // table data columns
  const shopByColorcolumns = [
    { name: "#", selector: (row) => row?.index_number ?? 0 },
    {
      name: "Name",
      selector: (row) => row?.name || "",
    },
    {
      name: "Description",
      selector: (row) => row?.description || "",
    },
    {
      name: "Inventory",
      selector: (row) => row?.inventory || "",
    },
    {
      name: "Price",
      selector: (row) => `$${row?.price}` || "",
    },
    {
      name: "Image",
      selector: (row) =>
        (
          <img
            src={row?.images[0]}
            alt={"shop-by-use-image"}
            width={"100px"}
            style={{ maxHeight: "180px", objectFit: "contain" }}
          />
        ) || "",
    },
    { name: "Action", selector: (row) => row?.action ?? "" },
  ];

  // file button input style
  // const VisuallyHiddenInput = styled("input")({
  //   clip: "rect(0 0 0 0)",
  //   clipPath: "inset(50%)",
  //   height: 1,
  //   overflow: "hidden",
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   whiteSpace: "nowrap",
  //   width: 1,
  // });

  // formik configuration
  // const formik = useFormik({
  //   initialValues: {
  //     title: "",
  //     description: "",
  //     image: "",
  //     id: "",
  //   },
  //   validationSchema: yup.object({
  //     title: yup.string().required("title is required"),
  //     description: yup.string().required("description is required"),
  //   }),
  //   onSubmit: (values) => {
  //     if (productModalType.isEdit) {
  //       // handleUpdateproductData(values);
  //     } else {
  //       // handleAddByShopColor(values);
  //     }
  //   },
  // });

  // function to Add shop by use data
  // const handleAddByShopColor = async (values) => {
  //   const transformAddData = {
  //     title: values.title,
  //     description: values.description,
  //     image: imageData.imgUrl,
  //     name: values.name,
  //   };
  //   try {
  //     const response = await service.shopByColorServices.addShopColor(
  //       transformAddData
  //     );
  //     const data = response?.data;
  //     if (data?.status) {
  //       toast.success(data?.message, { autoClose: 2000 });
  //       handleToggleModal();
  //       formik.resetForm();
  //       handleGetProductData();
  //     } else {
  //       toast.error(data?.message, { autoClose: 2000 });
  //     }
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message, { autoClose: 2000 });
  //   }
  // };

  const handleRedirect = () => {
    navigate(RoutePaths.addProductPath);
    // if (productModalType.isModalOpen) {
    //   setProductModalType((prev) => ({
    //     isEdit: false,
    //     isModalOpen: false,
    //   }));
    //   // formik.resetForm();
    //   setImageData({
    //     imgUrl: "",
    //     previewUrl: "",
    //   });
    // } else {
    //   setProductModalType((prev) => ({
    //     ...prev,
    //     isModalOpen: !prev.isModalOpen,
    //   }));
    // }
  };

  // function to get the listing of the shop by use data
  const handleGetProductData = async (queryParams) => {
    try {
      const response = await service.productPage.listing(queryParams);
      if (response.status === 200) {
        setProductData(response?.data?.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 2000 });
    }
  };

  // useEffect to call the api for the first time during first render
  useEffect(() => {
    handleGetProductData(queryParams);
  }, [queryParams]);

  // function to handle Edit of single shop by use data
  // const handleEditproductData = (data) => {
  //   if (data) {
  //     formik.setFieldValue("title", data.title);
  //     formik.setFieldValue("name", data.name);
  //     formik.setFieldValue("description", data.description);
  //     formik.setFieldValue("id", data._id);
  //     setProductModalType({
  //       isEdit: true,
  //       isModalOpen: true,
  //     });
  //     setImageData({
  //       imgUrl: data.image,
  //       previewUrl: data.image,
  //     });
  //   }
  // };

  // function to handle update of single shop by use data
  // const handleUpdateproductData = async (values) => {
  //   const transformAddData = {
  //     title: values.title,
  //     colorId: values.id,
  //     description: values.description,
  //     image: imageData.imgUrl,
  //   };
  //   try {
  //     const response = await service.shopByColorServices.updateShopColor(
  //       transformAddData
  //     );
  //     const data = response?.data;
  //     if (data?.status) {
  //       toast.success(data?.message, { autoClose: 2000 });
  //       handleToggleModal();
  //       formik.resetForm();
  //       handleGetProductData();
  //     } else {
  //       toast.error(data?.message, { autoClose: 2000 });
  //     }
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message, { autoClose: 2000 });
  //   }
  // };

  // function to handle delete data
  const handleDeleteproductData = async (id) => {
    const deletedDataId = {
      colorId: id,
    };
    try {
      const response = await service.shopByColorServices.removeShopColor(
        deletedDataId
      );
      const data = response?.data;
      if (data?.status) {
        toast.success(data?.message, { autoClose: 2000 });
        handleGetProductData();
        setOpenDeleteModal({ isDeleteModalOpen: false, deleteId: "" });
      } else {
        toast.error(data?.message, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 2000 });
    }
  };

  // function to handle image upload verification=
  // const handleFileUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const blobUrl = URL.createObjectURL(file);
  //     setImageData((prev) => ({
  //       ...prev,
  //       previewUrl: blobUrl,
  //     }));
  //     const formData = new FormData();
  //     formData.append("image", file);
  //     try {
  //       const res = await service.imageUploaderService.uploadImage(formData);
  //       if (res.data && res.data.url) {
  //         setImageData((prev) => ({
  //           ...prev,
  //           imgUrl: res.data.url,
  //         }));
  //       } else {
  //         toast.error("Image upload response does not contain URL.");
  //       }
  //     } catch (error) {
  //       toast.error("Failed to upload image");
  //     }
  //   }
  // };

  const handleDelete = (values) => {
    setOpenDeleteModal((prev) => ({
      deleteId: values._id,
      isDeleteModalOpen: true,
    }));
  };

  const handleCancelDelete = () => {
    setOpenDeleteModal({
      deleteId: "",
      isDeleteModalOpen: false,
    });
  };

  // pagination handler function
  const totalPages = useMemo(() => {
    return Math.ceil(productData?.total / 10);
  }, [productData?.total]);
  const handleOnPageChange = (_event, value) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      page: value,
    }));
  };
  const handleLimitChange = (limit) => {
    setQueryParams((prev) => ({
      ...prev,
      limit: limit,
    }));
  };
  return (
    <>
      <Grid container mb={3} sx={{ justifyContent: "space-between" }}>
        <Grid item lg={6}>
          {/* <CustomInput /> */}
        </Grid>
        <Grid item lg={2}>
          <CustomButton
            type={"button"}
            startIcon={<AddIcon />}
            onClick={handleRedirect}
            variant={"contained"}
            buttonName={"Add Product"}
          />
        </Grid>
      </Grid>
      <Box>
        <CustomTable
          isLoading={!productData || !productData?.list}
          columns={shopByColorcolumns}
          data={
            isValidArray(productData?.list) &&
            productData?.list.map((item, index) => ({
              ...item,
              index_number: index + 1,
              action: (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",

                    gap: 3,
                  }}
                >
                  <IconButton
                    aria-label="Edit"
                    color="success"
                    // onClick={() => handleEditproductData(item)}
                    sx={{
                      borderRadius: "10px",
                      border: `1px solid`,
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(item)}
                    color="error"
                    sx={{
                      borderRadius: "10px",
                      border: `1px solid ${colors.error.main}`,
                      color: "#d60000",
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="primary"
                    color="primary"
                    sx={{
                      borderRadius: "10px",
                      border: `1px solid ${colors.primary.main}`,
                    }}
                  >
                    <RemoveRedEyeIcon />
                  </IconButton>
                </Box>
              ),
            }))
          }
        />
        <AppPagination
          totalPages={totalPages}
          totalCount={productData?.total}
          limit={queryParams.limit}
          currentPage={queryParams.page}
          handleLimitChange={handleLimitChange}
          handlePageChange={handleOnPageChange}
        />
      </Box>
      {/* {productModalType.isModalOpen && (
        <AppModal
          open={productModalType.isModalOpen}
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
                <Typography variant="title">
                  {productModalType.isEdit
                    ? "Edit Shop By Color Details"
                    : "Add Shop By Color"}
                </Typography>

                <IconButton onClick={handleToggleModal}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
             <Box p={5} component={"form"} onSubmit={formik.handleSubmit}> 
              <CustomInput
                name={"title"}
                label={"Title"}
                handleChange={formik.handleChange}
                placeholder={"enter your title"}
                value={formik.values.title}
                type={"text"}
                error={formik.errors.title}
                helperText={
                  Boolean(formik.touched.title) && formik.errors.title
                }
              />
              <CustomInput
                name={"description"}
                label={"Description"}
                handleChange={formik.handleChange}
                placeholder={"enter description"}
                value={formik.values.description}
                multiline={true}
                rows={4}
                type={"text"}
                error={formik.errors.description}
                helperText={
                  Boolean(formik.touched.description) &&
                  formik.errors.description
                }
              />
              <Box mb={5}>
                <Typography
                  variant="label"
                  sx={{ textTransform: "capitalize", mb: 3 }}
                >
                  Image
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
                        // onChange={handleFileUpload}
                      />
                    </Button>
                  </Grid>
                  <Grid item xs={5.5} sx={{ objectFit: "contain" }}>
                    {imageData?.previewUrl && (
                      <img
                        src={imageData?.previewUrl}
                        width={"100%"}
                        style={{ objectFit: "contain" }}
                        height={"100%"}
                      />
                    )}
                  </Grid>
                </Grid>
              </Box>
              {productModalType.isEdit ? (
                <CustomButton
                  variant={"contained"}
                  type="submit"
                  buttonName={"Update"}
                />
              ) : (
                <CustomButton
                  variant={"contained"}
                  type="submit"
                  buttonName={"Submit"}
                />
              )}
            </Box>
          </Box>
        </AppModal>
      )} */}

      {openDeleteModal.isDeleteModalOpen && (
        <AppModal
          open={openDeleteModal.isDeleteModalOpen}
          maxWidth={"sm"}
          handleCloseOpen={handleCancelDelete}
        >
          <>
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
                <Typography variant="title">
                  Are you sure you want to delete this item?
                </Typography>

                <IconButton onClick={handleCancelDelete}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
            <Box px={5} pb={4}>
              <Stack>
                <Typography variant="body2" sx={{ color: "#7a7a7a" }} py={4}>
                  Once deleted, it will be permanently removed from the system
                  and cannot be recovered. Please confirm your action.
                </Typography>
              </Stack>
              <Stack direction={"row"} gap={3}>
                <CustomButton
                  variant="contained"
                  buttonName="Confirm"
                  onClick={() =>
                    handleDeleteproductData(openDeleteModal.deleteId)
                  }
                />

                <CustomButton
                  variant="outlined"
                  buttonName="Cancel"
                  color="error"
                  onClick={handleCancelDelete}
                ></CustomButton>
              </Stack>
            </Box>
          </>
        </AppModal>
      )}
    </>
  );
};

export default Index;
