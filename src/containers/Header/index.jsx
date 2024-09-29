import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem as MUIMenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { headerStyles } from "./styles";
import { globalConstant } from "../../constant";
import { useLocalStorage } from "../../hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { NavigationLists } from "../../common";
import { RoutePaths } from "../../routes/RouterPaths";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const Index = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { pathname } = useLocation();
  const location = useLocation();
  const routepath = location.pathname.split("/")[1];
  const isUserPage = globalConstant.USER === routepath;
  const { clear, load } = useLocalStorage();
  const userDetails = load("admin_detail");
  const navigate = useNavigate();
  const [headerTitle, setHeaderTitle] = useState("Overview");
  // const dispatch = useAppDispatch();
  console.log(userDetails);
  useEffect(() => {
    const getActiveTitle = globalConstant.HEADER_ACTIVE_TITLE.find((items) => {
      if (
        globalConstant.REFERRAL_CHILDRENS_PATH.includes(pathname) &&
        items.isReferral
      ) {
        return items;
      } else if (items.path === globalConstant.USER) {
        return items;
      } else {
        return items.path === pathname;
      }
    });
    setHeaderTitle(getActiveTitle?.title);
  }, [pathname]);

  // function to handle drawer toggle
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // function to handle profile dialog toggle starts
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // ends

  const handleNavigate = () => {
    navigate(`/user/${globalConstant.PROFILE}`);
  };



  // const handleResetPassword = async () => {
  //   try {
  //     const response = await logoutUserMutation();
  //     if (response?.data?.status === 200) {
  //       dispatch(logout());
  //       clear();
  //       navigate("/auth/login");
  //       handleClose();
  //       toast.success(response?.data?.message);
  //     }
  //   } catch (error) {
  //     const fetchError = error;
  //     toast.error(fetchError?.data?.message, {
  //       autoClose: 1000,
  //     });
  //   }
  // };

  function handleLogout() {
    // MySwal.fire({
    //   text: "Are you sure you want to logout ?",
    //   showCancelButton: true,
    //   confirmButtonText: "Yes",
    //   icon: "info",
    //   cancelButtonText: "No",
    //   confirmButtonColor: colors.primary.main,
    //   customClass: {
    //     confirmButton: "custom-confirm-button",
    //     cancelButton: "custom-cancel-button",
    //   },
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     handleResetPassword();
    //   } else if (result.dismiss === Swal.DismissReason.cancel) {
    //     MySwal.close();
    //     handleClose();
    //   }
    // });
  }

  return (
    <>
      <AppBar component="nav" sx={headerStyles.appBarBackground(routepath)}>
        <Toolbar sx={headerStyles.headerToolbarStyles}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={headerStyles.hamburgerButton}
          >
            <MenuIcon />
          </IconButton>
          {isUserPage && (
            <Box
              sx={headerStyles.smallScreenLogoBoxStyles}
              onClick={() => navigate(RoutePaths.overViewPath)}
            >
              <img
                src="https://i.ibb.co/jL1D25m/mylogo.png"
                alt=""
                width="175px"
              />
            </Box>
          )}
          <Typography
            variant="h6"
            sx={{
              ...headerStyles.headerTitle,
              display: {
                // color: "#fff",
                md: routepath !== globalConstant.USER ? "block" : "none",
              },
            }}
          >
            {headerTitle}
          </Typography>

          <Box sx={{ display: "block" }}>
            <Stack direction={"row"} textAlign={"right"} alignItems={"center"}>
              <Box>
                <Typography variant="subhead" sx={headerStyles.profileTitle}>
                  {userDetails?.first_name}
                </Typography>
                <Typography variant="subhead" sx={headerStyles.profileSubhead}>
                  {userDetails?.email}
                </Typography>
              </Box>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleProfileClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={anchorEl ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={anchorEl ? "true" : undefined}
                >
                  <Avatar
                    alt={userDetails?.first_name}
                    sx={{ width: 40, height: 40 }}
                  />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            sx={headerStyles.profileDialog}
          >
            <MUIMenuItem onClick={handleNavigate}>
              <ListItemIcon>
                <PersonOutlineOutlinedIcon sx={{ color: "#243641" }} />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </MUIMenuItem>
            <MUIMenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon
                  sx={{ color: "#243641" }}
                  width={"20px"}
                  height={"20px"}
                />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </MUIMenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={headerStyles.headerCollapsibleDrawer}
        >
          <Box textAlign={"center"} py={2}>
            <img
              src="https://i.ibb.co/jL1D25m/mylogo.png"
              alt=""
              width="175px"
            />
          </Box>
          <NavigationLists handleDrawerToggle={handleDrawerToggle} />
        </Drawer>
      </nav>
    </>
  );
};

export default Index;
