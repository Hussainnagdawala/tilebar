import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

const Index = () => {
  const [sizeModalType, setSizeModalType] = useState({
    isModalOpen: false,
    isEdit: false,
  });
  const [sizesData, setSizesData] = useState({});

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
    };
    try {
      const response = await service.sizePage.addSize(transformValue);
      if (response.status === 200) {
        toast.success("Size Added successfully", {
          autoClose: 2000,
        });
        handleToggleModal();
        handleGetSizeData();
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

  useEffect(() => {
    handleGetSizeData();
  }, []);

  // toggle modalBox
  const handleToggleModal = () => {
    setSizeModalType((prev) => ({
      ...prev,
      isModalOpen: !sizeModalType.isModalOpen,
    }));
    formik.resetForm();
  };

  // edit size data handler
  const handleEditData = (data) => {
    const { title, size, _id } = data;
    const getSize = size.split("*");
    const [size1, size2] = getSize;
    formik.setFieldValue("title", title);
    formik.setFieldValue("size1", size1);
    formik.setFieldValue("size2", size2);
    formik.setFieldValue("sizeId", _id);

    setSizeModalType((prev) => ({
      ...prev,
      isModalOpen: true,
      isEdit: true,
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
                    onClick={() => handleDeleteData(item)}
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

        {/* <AppPagination
          currentPage={sizesData?.currentPage}
          totalCount={sizesData?.total}
          totalPages={5}
        /> */}
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
    </>
  );
};

export default Index;
