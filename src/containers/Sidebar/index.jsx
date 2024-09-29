import { Box, Drawer, Toolbar } from "@mui/material";
import { sidebarStyles } from "./styles";
import { SRSicon } from "../../assets";
import { NavigationLists } from "../../common";

const Index = () => {
  return (
    <>
      <Drawer sx={sidebarStyles.drawerStyles} variant="permanent" anchor="left">
        <Toolbar sx={sidebarStyles.toolbarStyles}>
          <Box>
            <img
              src="https://i.ibb.co/jL1D25m/mylogo.png"
              alt=""
              width="175px"
            />
            {/* <SRSicon {...{ width: "155px", height: "58px" }} /> */}
          </Box>
        </Toolbar>
        <NavigationLists handleDrawerToggle={() => {}} />
      </Drawer>
    </>
  );
};

export default Index;
