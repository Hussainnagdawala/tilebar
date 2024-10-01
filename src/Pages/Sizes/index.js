import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AppModal, CustomButton, CustomInput, CustomTable } from "../../common";
import { useFormik } from "formik";
import * as yup from "yup";
import { colors } from "../../theme";
import { CloseIcon } from "../../assets";
import service from "../../api/services";
import { toast } from "react-toastify";

const Index = () => {
  const [sizeModalType, setSizeModalType] = useState({
    isModalOpen: false,
    isEdit: false,
  });
  const [sizesData, setSizesData] = useState({});
  const formik = useFormik({
    initialValues: {
      title: "",
      size1: "",
      size2: "",
    },
    validationSchema: yup.object({
      title: yup.string().required("Title is required"),
      size1: yup.string().required("size is required"),
      size2: yup.string().required("size is required"),
    }),
    onSubmit: (values) => {
      handleAddSize(values);
    },
  });

  const handleAddSize = async (values) => {
    const transformValue = {
      title: values.title,
      size: `${values.size1} *${values.size2}`,
    };
    try {
      const response = await service.sizePage.addSize(transformValue);
      if (response.status === 200) {
        toast.success("Size Added successfully", {
          autoClose: 2000,
        });
        handleToggleModal();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 2000 });
    }
  };

  const handleGetSizeData = async () => {
    try {
      const response = await service.sizePage.sizelisting();
      if (response.status === 200) {
        setSizesData(response?.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 2000 });
    }
  };

  useEffect(() => {
    handleGetSizeData();
  }, []);
  const acceptedcolumns = [
    { name: "#", selector: (row) => row?.index_number ?? 0 },
    {
      name: "Referral ID",
      selector: (row) => row?.referral_unique_id || "",
    },
    {
      name: "Patient Full Name",
      selector: (row) => `${row?.first_name} ${row?.last_name}` || "",
    },
    {
      name: "NHS Number",
      selector: (row) => row?.nhs_no || "",
    },
    { name: "Email", selector: (row) => row?.email || "" },
    { name: "Service", selector: (row) => row?.pathway_id?.name ?? "N/A" },
    { name: "Outcome", selector: (row) => row?.outcome || "" },
    { name: "Action", selector: (row) => row?.action ?? "" },
  ];
  const handleToggleModal = () => {
    setSizeModalType((prev) => ({
      ...prev,
      isModalOpen: !sizeModalType.isModalOpen,
    }));
  };
  return (
    <>
      <Grid container sx={{ justifyContent: "space-between" }}>
        <Grid item lg={6}>
          <CustomInput />
        </Grid>
        <Grid item lg={2}>
          <CustomButton
            type={"button"}
            onClick={handleToggleModal}
            variant={"contained"}
            buttonName={"Add Size"}
          />
        </Grid>
      </Grid>
      <Box>
        <CustomTable
          // isLoading={isReferralLoading}
          columns={acceptedcolumns}
          // data={referralData?.data.map((item, index) => ({
          //   ...item,
          //   index_number: index + 1,
          //   outcome: (
          //     <Box>
          //       {/* <TableStatus
          //         status={item?.outcome === "1" ? 4 : Number(item?.outcome)}
          //         label={renderOutComeLabelName(item?.outcome)}
          //       /> */}
          //     </Box>
          //   ),
          //   action: (
          //     <Box>
          //       {
          //         // <CustomDropDownMenu
          //         //   anchorEl={anchorEls[index]}
          //         //   open={Boolean(anchorEls[index])}
          //         //   onClose={() => handleClose(index)}
          //         //   handleClick={(event) =>
          //         //     handleClick(event, index)
          //         //   }
          //         //   data={item}
          //         //   menuItem={renderMenuItem}
          //         // />
          //       }
          //     </Box>
          //   ),
          // }))}
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
              <CustomButton
                variant={"contained"}
                type="submit"
                buttonName={"Submit"}
              />
            </Box>
          </Box>
        </AppModal>
      )}
    </>
  );
};

export default Index;
