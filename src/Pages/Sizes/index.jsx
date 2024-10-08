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
import { useFormik } from "formik";
import * as yup from "yup";
import { colors } from "../../theme";
import { CloseIcon } from "../../assets";
import service from "../../api/services";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { globalConstant } from "../../constant";
import CustomCategoryAutocomplete from "../../common/CustomCategoryAutocomplete";

const Index = () => {
  const [sizeModalType, setSizeModalType] = useState({
    isModalOpen: false,
    isEdit: false,
  });
  const [sizesData, setSizesData] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState({
    isDeleteModalOpen: false,
    deleteId: "",
  });
  const [queryParams, setQueryParams] = useState(
    globalConstant.InitialQueryParamData
  );
  const [imageData, setImageData] = useState(globalConstant.InitialImageData);
  const [categoryData, setCategoryData] = useState({});
  const [selectedCategoryData, setSelectedCategoryData] = useState({});
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

  // columns heading
  const Sizecolumns = [
    { name: "#", selector: (row) => row?.index_number ?? 0 },
    {
      name: "Title",
      selector: (row) => row?.title || "",
    },
    {
      name: "Size",
      selector: (row) => `${row?.size}` || "",
    },
    {
      name: "Category",
      selector: (row) => row?.categoryId?.title || "",
    },
    {
      name: "Image",

      selector: (row) =>
        (
          <img
            src={row?.image}
            alt={"shop-by-use-image"}
            width={"150px"}
            style={{ maxHeight: "80px", objectFit: "contain" }}
          />
        ) || "",
    },
    { name: "Action", selector: (row) => row?.action ?? "", center: true },
  ];

  // formik instance
  const formik = useFormik({
    initialValues: {
      title: "",
      size1: "",
      size2: "",
      sizeId: "",
    },
    validationSchema: yup.object({
      title: yup.string().required("Title is required"),
      size1: yup.string().required("size is required"),
      size2: yup.string().required("size is required"),
    }),
    onSubmit: (values) => {
      if (sizeModalType.isEdit) {
        handleUpdateSize(values);
      } else {
        handleAddSize(values);
      }
    },
  });

  // get size api handler
  const handleGetSizeData = async () => {
    try {
      const response = await service.sizePage.sizelisting();
      if (response.status === 200) {
        setSizesData(response?.data?.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 2000 });
    }
  };

  // add size api handler
  const handleAddSize = async (values) => {
    const transformValue = {
      title: values.title,
      size: `${values.size1}*${values.size2}`,
      image: imageData.imgUrl,
      categoryId: selectedCategoryData?._id,
    };
    try {
      const response = await service.sizePage.addSize(transformValue);
      if (response.status === 200) {
        toast.success("Size Added successfully", {
          autoClose: 2000,
        });
        handleToggleModal();
        handleGetSizeData();
        setImageData(globalConstant.InitialImageData);
        formik.resetForm();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 2000 });
    }
  };

  // update size api handler
  const handleUpdateSize = async (values) => {
    const transformValue = {
      title: values.title,
      size: `${values.size1}*${values.size2}`,
      sizeId: values.sizeId,
      image: imageData.imgUrl,
      categoryId: selectedCategoryData?._id,
    };
    try {
      const response = await service.sizePage.updateSize(transformValue);
      if (response.status === 200) {
        toast.success(response?.data?.message, {
          autoClose: 2000,
        });
        setSizeModalType({
          isModalOpen: false,
          isEdit: false,
        });
        setImageData(globalConstant.InitialImageData);
        formik.resetForm();
        handleGetSizeData();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 2000 });
    }
  };

  // delete size api handler
  const handleDeleteData = async (data) => {
    const deletedId = {
      sizeId: data._id,
    };
    try {
      const response = await service.sizePage.deleteSize(deletedId);
      if (response.status === 200) {
        toast.success(response?.data?.message, {
          autoClose: 2000,
        });
        handleGetSizeData();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 2000 });
    }
  };

  // function to get the categoryData
  const handleGetCategoryData = async () => {
    const queryParams = {
      limit: 1000,
    };
    try {
      const response = await service.categoryPage.listing(queryParams);
      if (response.status === 200) {
        setCategoryData(response?.data?.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 2000 });
    }
  };

  // handleCategoryChange
  const handleCategoryChange = (event, value) => {
    if (!value) return;
    setSelectedCategoryData(value);
  };

  // useEffect to call the api for the categoryData for the first time
  useEffect(() => {
    handleGetCategoryData();
  }, []);

  useEffect(() => {
    handleGetSizeData();
  }, [queryParams]);

  // toggle modalBox
  const handleToggleModal = () => {
    if (sizeModalType.isModalOpen) {
      setImageData(globalConstant.InitialImageData);
      formik.resetForm();
      setSelectedCategoryData({});
      setSizeModalType(globalConstant.InitialModalStateData);
    } else {
      setSizeModalType((prev) => ({
        ...prev,
        isModalOpen: !sizeModalType.isModalOpen,
      }));
    }
  };

  // edit size data handler
  const handleEditData = (data) => {
    const { title, size, _id, image } = data;
    const getSize = size.split("*");
    const [size1, size2] = getSize;
    formik.setFieldValue("title", title);
    formik.setFieldValue("size1", size1);
    formik.setFieldValue("size2", size2);
    formik.setFieldValue("sizeId", _id);
    setSelectedCategoryData(data?.categoryId);
    setImageData({
      imgUrl: image,
      previewUrl: image,
    });
    setSizeModalType((prev) => ({
      ...prev,
      isModalOpen: true,
      isEdit: true,
    }));
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
        const res = await service.imageUploaderService.uploadImage(formData);
        if (res.data && res.data.url) {
          setImageData((prev) => ({
            ...prev,
            imgUrl: res.data.url,
          }));
        } else {
          toast.error("Image upload response does not contain URL.");
        }
      } catch (error) {
        toast.error("Failed to upload image");
      }
    }
  };

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
    return Math.ceil(sizesData?.total / 10);
  }, [sizesData?.total]);

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
      <Grid container sx={{ justifyContent: "space-between", mb: 3 }}>
        <Grid item lg={6}>
          {/* <CustomInput /> */}
        </Grid>
        <Grid item lg={1.5}>
          <CustomButton
            startIcon={<AddIcon />}
            type={"button"}
            onClick={() =>
              setSizeModalType((prev) => ({
                isEdit: false,
                isModalOpen: true,
              }))
            }
            variant={"contained"}
            buttonName={"Add Size"}
          />
        </Grid>
      </Grid>
      <Box>
        <CustomTable
          isLoading={!sizesData || !sizesData.list}
          columns={Sizecolumns}
          data={
            sizesData &&
            sizesData.list &&
            sizesData?.list.map((item, index) => ({
              ...item,
              index_number: index + 1,
              action: (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",

                    gap: 3,
                  }}
                >
                  <IconButton
                    aria-label="Edit"
                    color="success"
                    onClick={() => handleEditData(item)}
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
                </Box>
              ),
            }))
          }
        />

        <AppPagination
          totalPages={totalPages}
          totalCount={sizesData?.total}
          limit={queryParams.limit}
          currentPage={queryParams.page}
          handleLimitChange={handleLimitChange}
          handlePageChange={handleOnPageChange}
        />
      </Box>
      {sizeModalType.isModalOpen && (
        <AppModal
          open={sizeModalType.isModalOpen}
          handleCloseOpen={handleToggleModal}
          maxWidth={"sm"}
        >
          <Box>
            <Box
              sx={{
                px: 5,
                py: 3,
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
                  {sizeModalType.isEdit ? "Edit Size Details" : "Add New Size"}
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
              <Stack
                direction={"row"}
                gap={5}
                width={"100%"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <CustomInput
                  name={"size1"}
                  label={"Size 1"}
                  handleChange={formik.handleChange}
                  placeholder={"enter your size"}
                  value={formik.values.size1}
                  type={"number"}
                  error={formik.errors.size1}
                  helperText={
                    Boolean(formik.touched.size1) && formik.errors.size1
                  }
                />
                <Typography variant="h6"> - </Typography>
                <CustomInput
                  name={"size2"}
                  label={"Size 2"}
                  handleChange={formik.handleChange}
                  placeholder={"enter your size"}
                  value={formik.values.size2}
                  type={"number"}
                  error={formik.errors.size2}
                  helperText={
                    Boolean(formik.touched.size2) && formik.errors.size2
                  }
                />
              </Stack>
              <Box mb={4}>
                <Typography
                  variant="label"
                  sx={{ textTransform: "capitalize", mb: 3 }}
                >
                  Category
                </Typography>
                <CustomCategoryAutocomplete
                  value={selectedCategoryData}
                  handleChange={handleCategoryChange}
                  optionListData={categoryData?.category}
                />
              </Box>
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
                        onChange={handleFileUpload}
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
              {sizeModalType.isEdit ? (
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
      )}

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
                  onClick={() => handleDeleteData(openDeleteModal.deleteId)}
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
