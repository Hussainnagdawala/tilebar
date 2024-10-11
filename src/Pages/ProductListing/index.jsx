import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
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
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import service from "../../api/services";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { toast } from "react-toastify";
import { useDebounce, useEmpty } from "../../hooks";
import { CloseIcon } from "../../assets";
import { colors } from "../../theme";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../routes/RouterPaths";

const Index = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const debounceValue = useDebounce(searchValue, 500);
  console.log("debounceValue", debounceValue);
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
      name: "Published",
      selector: (row) => row?.status || "",
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

  const handleRedirect = () => {
    navigate(RoutePaths.addProductPath);
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
    const newQueryParams = {
      ...queryParams,
      search: debounceValue,
    };
    handleGetProductData(newQueryParams);
  }, [queryParams, debounceValue]);

  // function to handle delete data
  const handleDeleteproductData = async (id) => {
    const deletedDataId = {
      productId: id,
    };
    try {
      const response = await service.productPage.removeProduct(deletedDataId);
      const data = response?.data;
      if (data?.status) {
        handleGetProductData();
        toast.success(data?.message, { autoClose: 2000 });
        setOpenDeleteModal({ isDeleteModalOpen: false, deleteId: "" });
      } else {
        toast.error(data?.message, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, { autoClose: 2000 });
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
        <Grid item lg={4}>
          <CustomInput
            startAdornment={<SearchRoundedIcon />}
            value={searchValue}
            name={"searchProduct"}
            placeholder="search product"
            handleChange={(e) => setSearchValue(e.target.value)}
          />
        </Grid>
        <Grid item lg={2}>
          <CustomButton
            type={"button"}
            sx={{
              m: 0,
            }}
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
                    onClick={() => navigate(`/product/edit/${item?._id}`)}
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
                  {/* <IconButton
                    aria-label="primary"
                    color="primary"
                    sx={{
                      borderRadius: "10px",
                      border: `1px solid ${colors.primary.main}`,
                    }}
                  >
                    <RemoveRedEyeIcon />
                  </IconButton> */}
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
