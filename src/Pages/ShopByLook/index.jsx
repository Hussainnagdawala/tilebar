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
import { toast } from "react-toastify";
import { useEmpty } from "../../hooks";
import { CloseIcon } from "../../assets";
import { colors } from "../../theme";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const Index = () => {
  const [shopByLookModalType, setShopByLookModalType] = useState({
    isModalOpen: false,
    isEdit: false,
  });
  const [openDeleteModal, setOpenDeleteModal] = useState({
    isDeleteModalOpen: false,
    deleteId: "",
  });
  const [queryParams, setQueryParams] = useState({
    page: 1,
    search: "",
    limit: 10,
  });
  const [shopByLookData, setShopByLookData] = useState({});
  const [imageData, setImageData] = useState({
    imgUrl: "",
    previewUrl: "",
  });
  const { isValidArray } = useEmpty();
  const [faq, setFaq] = useState([{ question: "", answer: "" }]);

  // table data columns
  const shopByUsecolumns = [
    { name: "#", selector: (row) => row?.index_number ?? 0 },
    {
      name: "Name",
      selector: (row) => row?.name || "",
    },
    {
      name: "Title",
      selector: (row) =>
        (
          <Typography
            variant="body2"
            fontSize={12}
            textTransform={"capitalize"}
          >
            {row?.title}
          </Typography>
        ) || "",
    },
    {
      name: "Description",
      //   minWidth: 250,
      selector: (row) =>
        (
          <Typography variant="body2" fontSize={12}>
            {row?.description}
          </Typography>
        ) || "",
    },
    {
      name: "FAQ's",
      minWidth: 250,
      selector: (row) => row?.faq || "",
    },
    {
      name: "image",

      selector: (row) =>
        (
          <img
            src={row?.image}
            alt={"shop-by-use-image"}
            width={"150px"}
            style={{ maxHeight: "220px", objectFit: "contain" }}
          />
        ) || "",
    },
    { name: "Action", selector: (row) => row?.action ?? "" },
  ];

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

  // formik configuration
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
      name: "",
      id: "",
    },
    validationSchema: yup.object({
      title: yup.string().required("title is required"),
      name: yup.string().required("name is required"),
      description: yup.string().required("description is required"),
    }),
    onSubmit: (values) => {
      if (shopByLookModalType.isEdit) {
        handleUpdateShopByLookData(values);
      } else {
        handleAddByShopUse(values);
      }
    },
  });

  // function to Add shop by use data
  const handleAddByShopUse = async (values) => {
    const transformAddData = {
      title: values.title,
      description: values.description,
      image: imageData.imgUrl,
      name: values.name,
      faq: faq,
    };
    try {
      const response = await service.shopByLookPage.addShopLook(
        transformAddData
      );
      const data = response?.data;
      if (data?.status) {
        toast.success(data?.message, { autoClose: 2000 });
        handleToggleModal();
        formik.resetForm();
        handleGetShopByLookData();
      } else {
        toast.error(data?.message, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 2000 });
    }
  };

  const handleToggleModal = () => {
    setShopByLookModalType((prev) => ({
      ...prev,
      isModalOpen: !prev.isModalOpen,
    }));
  };

  // function to get the listing of the shop by use data
  const handleGetShopByLookData = async (queryParams) => {
    try {
      const response = await service.shopByLookPage.listing(queryParams);
      if (response.status === 200) {
        setShopByLookData(response?.data?.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 2000 });
    }
  };

  // useEffect to call the api for the first time during first render
  useEffect(() => {
    handleGetShopByLookData(queryParams);
  }, [queryParams]);

  // function to handle change in faq
  const handleFaqChange = (e, type, index) => {
    const value = e.target.value;
    if (type === "question") {
      const newFaq = [...faq];
      newFaq[index] = {
        ...newFaq[index],
        question: value,
      };
      setFaq(newFaq);
    } else {
      const newFaq = [...faq];
      newFaq[index] = {
        ...newFaq[index],
        answer: value,
      };
      setFaq(newFaq);
    }
  };

  // function to add the faq
  const handleAddFaq = () => {
    setFaq((prev) => [...prev, { question: "", answer: "" }]);
  };

  // function to delete the faq
  const handleDeleteFaq = (faqIndex) => {
    const newFaqData = faq.filter((_, idx) => idx !== faqIndex);
    setFaq(newFaqData);
  };

  // function to handle Edit of single shop by use data
  const handleEditShopByLookData = (data) => {
    if (data) {
      formik.setFieldValue("title", data.title);
      formik.setFieldValue("name", data.name);
      formik.setFieldValue("description", data.description);
      formik.setFieldValue("id", data._id);
      setShopByLookModalType({
        isEdit: true,
        isModalOpen: true,
      });
      setFaq(data.faq);
      setImageData({
        imgUrl: data.image,
        previewUrl: data.image,
      });
    }
  };

  // function to handle update of single shop by use data
  const handleUpdateShopByLookData = async (values) => {
    const transformAddData = {
      title: values.title,
      shopByUseId: values.id,
      description: values.description,
      image: imageData.imgUrl,
      name: values.name,
      faq: faq,
    };
    try {
      const response = await service.shopByLookPage.updateShopLook(
        transformAddData
      );
      const data = response?.data;
      if (data?.status) {
        toast.success(data?.message, { autoClose: 2000 });
        handleToggleModal();
        formik.resetForm();
        handleGetShopByLookData();
      } else {
        toast.error(data?.message, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 2000 });
    }
  };

  // function to handle delete data
  const handleDeleteShopByLookData = async (id) => {
    const deletedDataId = {
      shopByUseId: id,
    };
    try {
      const response = await service.shopByLookPage.removeShopLook(
        deletedDataId
      );
      const data = response?.data;
      if (data?.status) {
        toast.success(data?.message, { autoClose: 2000 });
        handleGetShopByLookData();
        setOpenDeleteModal({ isDeleteModalOpen: false, deleteId: "" });
      } else {
        toast.error(data?.message, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 2000 });
    }
  };

  // function to handle image upload verification=
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
        const res = await axios.post(
          "https://api.betterbeout.com/api/v1/image/uploader",
          formData
        );

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

  const totalPages = useMemo(() => {
    return Math.round(shopByLookData?.total / 10);
  }, [shopByLookData?.total]);

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
            onClick={handleToggleModal}
            variant={"contained"}
            buttonName={"Add Shop By Look"}
          />
        </Grid>
      </Grid>
      <Box>
        <CustomTable
          isLoading={!shopByLookData || !shopByLookData?.category}
          columns={shopByUsecolumns}
          data={
            isValidArray(shopByLookData?.category) &&
            shopByLookData?.category.map((item, index) => ({
              ...item,
              index_number: index + 1,
              faq: (
                <Box>
                  {isValidArray(item?.faq) &&
                    item?.faq.map((faqItem, idx) => {
                      return (
                        <React.Fragment key={idx}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: ".9rem",
                            }}
                          >
                            Question : {faqItem?.question}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontSize: ".8rem",
                            }}
                          >
                            Answer : {faqItem?.answer}
                          </Typography>
                        </React.Fragment>
                      );
                    })}
                </Box>
              ),
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
                    onClick={() => handleEditShopByLookData(item)}
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
          totalCount={shopByLookData?.total}
          limit={queryParams.limit}
          currentPage={queryParams.page}
          handleLimitChange={handleLimitChange}
          handlePageChange={handleOnPageChange}
        />
      </Box>
      {shopByLookModalType.isModalOpen && (
        <AppModal
          open={shopByLookModalType.isModalOpen}
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
                  {shopByLookModalType.isEdit
                    ? "Edit Shop By Look Details"
                    : "Add Shop By Look"}
                </Typography>

                <IconButton onClick={handleToggleModal}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
            <Box p={5} component={"form"} onSubmit={formik.handleSubmit}>
              <CustomInput
                name={"name"}
                label={"Name"}
                handleChange={formik.handleChange}
                placeholder={"enter name of your category"}
                value={formik.values.name}
                type={"text"}
                error={formik.errors.name}
                helperText={Boolean(formik.touched.name) && formik.errors.name}
              />
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
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant="h6" mb={4}>
                  Enter The FAQ's{" "}
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleAddFaq}
                  sx={{ textTransform: "capitalize" }}
                >
                  Add FAQ's
                </Button>
              </Stack>
              {isValidArray(faq) &&
                faq.map((data, idx) => {
                  return (
                    <Stack direction={"row"} gap={3} alignItems={"center"}>
                      <CustomInput
                        name={"question"}
                        label={"Question"}
                        handleChange={(e) =>
                          handleFaqChange(e, "question", idx)
                        }
                        placeholder={"Enter question"}
                        value={data.question}
                        type={"text"}
                      />
                      <CustomInput
                        name={"answer"}
                        label={"Answer"}
                        handleChange={(e) => handleFaqChange(e, "answer", idx)}
                        placeholder={"Enter answer"}
                        value={data.answer}
                        type={"text"}
                      />
                      {faq.length >= 2 && (
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteFaq(idx)}
                          sx={{
                            mt: 4,
                            color: colors.primary.main,
                            borderRadius: "10px",
                            border: "1px solid",
                            minHeight: "45px",
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Stack>
                  );
                })}

              {shopByLookModalType.isEdit ? (
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
                  onClick={() =>
                    handleDeleteShopByLookData(openDeleteModal.deleteId)
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
