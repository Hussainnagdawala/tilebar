import {
  Box,
  Button,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
  styled,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { AppModal, CustomButton } from "../../common";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import { colors } from "../../theme";
import { sliderStyles } from "./styles";
import { CloseIcon } from "../../assets";
import service from "../../api/services";
import axios from "axios";
import { toast } from "react-toastify";
import { useEmpty } from "../../hooks";
const Index = () => {
  const [sliderModalType, setSliderModalType] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bannerData, setBannerData] = useState([]);
  const [error, setError] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState({
    isDeleteModalOpen: false,
    imageId: "",
  });
  const { isValidArray } = useEmpty();
  const [selectedimageData, setSelectedImageData] = useState({
    imgUrl: "",
    previewUrl: "",
  });
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

  const handleToggleModal = () => {
    if (sliderModalType) {
      setSelectedImageData({
        previewUrl: "",
        imgUrl: "",
      });
      setSliderModalType(!sliderModalType);
    }
    setSliderModalType(!sliderModalType);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setError(false);
      const blobUrl = URL.createObjectURL(file);
      setSelectedImageData({
        previewUrl: blobUrl,
        imgUrl: file,
      });
      e.target.value = "";
    }
  };

  const handleRemoveFile = () => {
    setSelectedImageData({
      previewUrl: "",
      imgUrl: "",
    });
  };

  const getBannerSliderData = async () => {
    try {
      const response = await service.bannerSliderPage.listing();
      const data = response?.data;
      if (data?.status) {
        setBannerData(data?.data);
      } else {
        toast.error(data?.message, { autoClose: 2000 });
      }
    } catch (error) {}
  };

  useEffect(() => {
    getBannerSliderData();
  }, []);

  const handleSubmitForm = async () => {
    if (!selectedimageData.imgUrl) {
      return setError(true);
    }
    setError(false);
    const formData = new FormData();
    formData.append("image", selectedimageData.imgUrl);
    try {
      const res = await service.imageUploaderService.uploadImage(formData);
      if (res.data && res.data.url) {
        const response = await service.bannerSliderPage.addBannerSlider({
          image: res.data.url,
        });
        const finalData = response?.data;
        if (finalData?.status) {
          toast.success(finalData?.message);
          getBannerSliderData();
          setSelectedImageData({
            previewUrl: "",
            imgUrl: "",
          });
          handleToggleModal();
          setError(false);
        }
      }
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const handleDeleteData = (imageId) => {
    setDeleteModalData({
      imageId: imageId,
      isDeleteModalOpen: true,
    });
  };

  const handleCancelDelete = () => {
    setDeleteModalData({
      imageId: "",
      isDeleteModalOpen: false,
    });
  };

  const handleDeleteBannerSliderImage = async (imageId) => {
    try {
      const response = await service.bannerSliderPage.removeBannerSlider({
        bannerId: imageId,
      });
      const data = response?.data;
      if (data?.status) {
        toast.success(data?.message, { autoClose: 2000 });
        handleCancelDelete();
        getBannerSliderData();
      } else {
        toast.error(data?.message, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error("something went wrong", { autoClose: 2000 });
    }
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
              setSliderModalType((prev) => ({
                isEdit: false,
                isModalOpen: true,
              }))
            }
            variant={"contained"}
            buttonName={"Add Slider"}
          />
        </Grid>
      </Grid>
      <ImageList
        sx={{
          "& .MuiImageListItem-standard": {
            borderRadius: "10px",
            overflow: "hidden",
          },
        }}
        cols={2}
        gap={20}
      >
        {isValidArray(bannerData) &&
          bannerData.map((item) => (
            <ImageListItem
              key={item._id}
              sx={{
                borderRadius: "15px",
              }}
            >
              <img
                srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.image}?&w=248&h=164&fit=contain&auto=format`}
                alt={item._id}
                loading="lazy"
                onLoad={() => setLoading(false)}
                style={{
                  display: loading ? "none" : "block",
                  height: "300px",
                  objectFit: "cover",
                  objectPosition: "50% 50%",
                }}
              />
              <ImageListItemBar
                sx={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, " +
                    "rgba(0,0,0,0.3) 30%, rgba(0,0,0,0) 100%)",
                  p: 3,
                }}
                position="top"
                actionIcon={
                  <IconButton
                    onClick={() => handleDeleteData(item?._id)}
                    color="primary"
                    sx={{
                      background: "rgba(255,255,255,0.9)",
                      "&:hover": {
                        background: "rgba(255,255,255,0.7)",
                      },
                    }}
                    aria-label={`star ${item.title}`}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                actionPosition="right"
              />
            </ImageListItem>
          ))}
      </ImageList>
      {sliderModalType && (
        <AppModal
          open={sliderModalType}
          handleCloseOpen={handleToggleModal}
          maxWidth={"sm"}
        >
          <Box>
            <Box sx={sliderStyles.modalHeadingStyle}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="title">Add Banner Image</Typography>

                <IconButton onClick={handleToggleModal}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
            <Grid container px={5} py={5}>
              <Grid item xs={12}>
                {!selectedimageData.previewUrl ? (
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
                ) : (
                  <Stack
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <img
                      srcSet={`${selectedimageData.previewUrl}`}
                      src={`${selectedimageData.previewUrl}`}
                      alt={"banner image"}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "contain",
                      }}
                    />

                    <Stack
                      direction="row"
                      gap={3}
                      width={"70%"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Button
                        component="label"
                        role={undefined}
                        variant="outlined"
                        tabIndex={-1}
                        sx={{
                          borderRadius: "10px",
                          width: "100%",
                          textTransform: "capitalize",
                          minHeight: "45px",
                          marginTop: "clamp(.75rem,2vw, 1rem)",
                        }}
                        startIcon={<UploadRoundedIcon />}
                      >
                        Change file
                        <VisuallyHiddenInput
                          type="file"
                          onChange={handleFileUpload}
                          multiple
                        />
                      </Button>
                      <CustomButton
                        buttonName="Remove"
                        variant="outlined"
                        color="error"
                        onClick={handleRemoveFile}
                        startIcon={<DeleteIcon />}
                      />
                    </Stack>
                  </Stack>
                )}
                <CustomButton
                  variant={"contained"}
                  type="submit"
                  onClick={handleSubmitForm}
                  buttonName={"Submit"}
                />
                {error && (
                  <Typography color={"error"} variant="body2">
                    Please Upload the Image{" "}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>
        </AppModal>
      )}

      {deleteModalData.isDeleteModalOpen && (
        <AppModal
          open={deleteModalData.isDeleteModalOpen}
          maxWidth={"sm"}
          handleCloseOpen={handleCancelDelete}
        >
          <>
            <Box sx={sliderStyles.modalHeadingStyle}>
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
                    handleDeleteBannerSliderImage(deleteModalData.imageId)
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
