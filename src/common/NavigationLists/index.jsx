import { globalConstant } from "../../constant";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { colors } from "../../theme";
import { styles } from "./style";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useEmpty } from "../../hooks";

export const NavigationLists = ({ handleDrawerToggle }) => {
  const [openSubMenus, setOpenSubMenus] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isValidArray } = useEmpty();

  const HandleMatchPathActive = (href) => {
    const match = useMatch(`${href}/*`);
    const isActive = match != null;
    return isActive;
  };

  //funtion to handle submenuItem Click
  const handleSubMenuItemClick = (subMenuData) => {
    navigate(subMenuData.path);
    handleDrawerToggle();
  };
  //ends

  //funtion to handle menuItem Click
  const handleMenuItemClick = (menuData) => {
    navigate(menuData.path);
    const hasChildren = menuData.children && menuData.children.length > 0;
    if (hasChildren) {
      setOpenSubMenus(!openSubMenus);
    } else {
      handleDrawerToggle();
      setOpenSubMenus(false);
    }
  };
  //ends

  useEffect(() => {
    const shouldExpendCollapse = globalConstant.REFERRAL_CHILDRENS_PATH;
    shouldExpendCollapse.includes(pathname)
      ? setOpenSubMenus(true)
      : setOpenSubMenus(false);
  }, []);

  return (
    <Stack
      direction={"column"}
      justifyContent={"space-between"}
      height={"100%"}
    >
      <List sx={{ px: 4 }}>
        {isValidArray(globalConstant.MENU_LIST) &&
          globalConstant.MENU_LIST.map((item) => {
            const Icon = item.icon;
            const hasChildren = item.children && item.children.length > 0;
            return (
              <React.Fragment key={item.title}>
                <ListItem
                  disablePadding
                  sx={{
                    borderRadius: "10px",
                    mb: 3,
                    background: HandleMatchPathActive(item.path)
                      ? colors.primary.main
                      : "transparent",
                    color: HandleMatchPathActive(item.path)
                      ? colors.white.main
                      : colors.primary.main,
                    "&:hover": {
                      background:
                        HandleMatchPathActive(item.path) && colors.primary.main,
                    },
                  }}
                  onClick={() => handleMenuItemClick(item)}
                >
                  <ListItemButton
                    sx={{
                      ...styles.onHoverBackgroundTransparent,
                      borderRadius: "10px",
                    }}
                    selected={HandleMatchPathActive(item.path)}
                  >
                    <ListItemIcon sx={{ minWidth: "45px" }}>
                      <Icon
                        width="30px"
                        height="30px"
                        color={
                          HandleMatchPathActive(item.path)
                            ? colors.white.main
                            : colors.primary.main
                        }
                      />
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                    {hasChildren &&
                      (!openSubMenus ? <ExpandMore /> : <ExpandLess />)}
                  </ListItemButton>
                </ListItem>
                {hasChildren && (
                  <Collapse in={openSubMenus} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={styles.listItem}>
                      {(item.children ?? []).map((subItem) => {
                        const SubItemIcon = subItem.icon;
                        return (
                          <ListItem
                            key={subItem.title}
                            disablePadding
                            sx={
                              (styles.listItem,
                              styles.onHoverBackgroundTransparent,
                              {
                                color: HandleMatchPathActive(subItem.path)
                                  ? colors.primary.main
                                  : `${
                                      subItem.title === "RedFlag"
                                        ? "error.main"
                                        : colors.tertiary.main
                                    }`,
                              })
                            }
                            onClick={() => handleSubMenuItemClick(subItem)}
                          >
                            <ListItemButton
                              sx={{
                                pl: 8,
                                "&.Mui-selected": {
                                  borderRight: HandleMatchPathActive(
                                    subItem.path
                                  )
                                    ? `5px solid ${colors.primary.main}`
                                    : undefined,
                                  color: `${
                                    subItem.title === "RedFlag"
                                      ? colors.error.main
                                      : ""
                                  }`,
                                },
                              }}
                              selected={HandleMatchPathActive(subItem.path)}
                            >
                              <ListItemIcon sx={{ minWidth: "45px" }}>
                                <SubItemIcon
                                  width={25}
                                  height={25}
                                  color={
                                    HandleMatchPathActive(subItem.path)
                                      ? `${
                                          subItem.title === "RedFlag"
                                            ? colors.error.main
                                            : colors.primary.main
                                        }`
                                      : `${
                                          subItem.title === "RedFlag"
                                            ? colors.error.main
                                            : colors.tertiary.main
                                        }`
                                  }
                                />
                              </ListItemIcon>
                              <ListItemText primary={subItem.title} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            );
          })}
      </List>
      {/* ends */}
      <List sx={{ px: 4 }}>
        {globalConstant.UTILITY_MENU_LIST.map((item) => {
          const Icon = item.icon;
          return (
            <React.Fragment key={item.title}>
              <ListItem
                disablePadding
                sx={{
                  borderRadius: "10px",
                  mb: 3,
                  background: HandleMatchPathActive(item.path)
                    ? colors.primary.main
                    : "transparent",
                  color: HandleMatchPathActive(item.path)
                    ? colors.white.main
                    : colors.primary.main,
                  "&:hover": {
                    background:
                      HandleMatchPathActive(item.path) && colors.primary.main,
                  },
                }}
                onClick={() => handleMenuItemClick(item)}
              >
                <ListItemButton
                  sx={styles.onHoverBackgroundTransparent}
                  selected={HandleMatchPathActive(item.path)}
                >
                  <ListItemIcon sx={{ minWidth: "45px" }}>
                    <Icon
                      width={"22px"}
                      height={"22px"}
                      color={
                        HandleMatchPathActive(item.path)
                          ? colors.white.main
                          : colors.primary.main
                      }
                    />
                  </ListItemIcon>
                  <ListItemText sx={styles.listItemText} primary={item.title} />
                </ListItemButton>
              </ListItem>
            </React.Fragment>
          );
        })}
      </List>
    </Stack>
  );
};
