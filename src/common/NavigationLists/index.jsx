import { globalConstant } from "../../constant";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  // useMediaQuery,
  // useTheme,
} from "@mui/material";
// import { MenuItem } from "@schemas";
import React, { useEffect, useMemo, useState } from "react";
import { colors } from "../../theme";
import { styles } from "./style";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useLocalStorage, useEmpty } from "../../hooks";

// type NavigationPropType = {
//   handleDrawerToggle: () => void;
// };

export const NavigationLists = ({ handleDrawerToggle }) => {
  const [openSubMenus, setOpenSubMenus] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { load } = useLocalStorage();
  const userData = load("user");
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

  const getMenuListData = useMemo(() => {
    const getIsAdminGranted = userData?.isAdminAccess
      ? globalConstant.MENU_LIST
      : globalConstant.MENU_LIST.slice(0, -1);
    return getIsAdminGranted;
  }, [userData]);

  return (
    <Stack
      direction={"column"}
      justifyContent={"space-between"}
      height={"100%"}
    >
      <List>
        {isValidArray(getMenuListData) &&
          getMenuListData.map((item) => {
            const Icon = item.icon;
            const hasChildren = item.children && item.children.length > 0;
            return (
              <React.Fragment key={item.title}>
                <ListItem
                  disablePadding
                  sx={{
                    borderRight: HandleMatchPathActive(item.path)
                      ? `5px solid #fbc32d`
                      : undefined,
                    color: HandleMatchPathActive(item.path)
                      ? colors.primary.main
                      : `${colors.tertiary.main}`,
                  }}
                  onClick={() => handleMenuItemClick(item)}
                >
                  <ListItemButton
                    sx={styles.onHoverBackgroundTransparent}
                    selected={HandleMatchPathActive(item.path)}
                  >
                    <ListItemIcon sx={{ minWidth: "45px" }}>
                      <Icon
                        width="30px"
                        height="30px"
                        color={
                          HandleMatchPathActive(item.path)
                            ? "#fbc32d"
                            : "#fbc32d60"
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        color: "#fbc32d",
                      }}
                      primary={item.title}
                    />
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
      {/* <List>
        {globalConstant.UTILITY_MENU_LIST.map((item: MenuItem) => {
          const Icon = item.icon;
          return (
            <React.Fragment key={item.title}>
              <ListItem
                disablePadding
                sx={{
                  borderRight: HandleMatchPathActive(item.path )
                    ? `5px solid ${colors.primary.main}`
                    : undefined,
                  color: HandleMatchPathActive(item.path )
                    ? colors.primary.main
                    : colors.tertiary.main,
                }}
                onClick={() => handleMenuItemClick(item)}
              >
                <ListItemButton
                  sx={styles.onHoverBackgroundTransparent}
                  selected={HandleMatchPathActive(item.path )}
                >
                  <ListItemIcon sx={{ minWidth: "45px" }}>
                    <Icon
                      width={isSmallScreen ? "20px" : "22px"}
                      height={isSmallScreen ? "20px" : "22px"}
                      color={
                        HandleMatchPathActive(item.path )
                          ? colors.primary.main
                          : colors.tertiary.main
                      }
                    />
                  </ListItemIcon>
                  <ListItemText
                    sx={styles.listItemText}
                    primary={item.title}
                  />
                </ListItemButton>
              </ListItem>
            </React.Fragment>
          );
        })}
      </List> */}
    </Stack>
  );
};
