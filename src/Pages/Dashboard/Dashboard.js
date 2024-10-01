import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { colors } from "../../theme";
const Dashboard = () => {
  return (
    <>
      <Grid
        container
        gap={3}
        sx={{
          flexWrap: { lg: "nowrap" },
        }}
      >
        <Grid xs={12} md={6} lg={3}>
          <Box
            sx={{
              border: "1px solid #cecece",
              p: 6,
              borderRadius: "10px",
              background: colors.secondary.light,
            }}
          >
            <IconButton
              variant="contained"
              size="large"
              sx={{
                borderRadius: "50%",
                background: colors.primary.main,
                color: colors.white.main,
              }}
            >
              <DeleteIcon fontSize="medium" />
            </IconButton>
            <Stack direction={"row"} gap={4}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    my: 3,
                    color: "#413e3270",
                  }}
                >
                  Total Orders
                </Typography>
                <Typography variant="h5">$500</Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid xs={12} md={6} lg={3}>
          <Box
            sx={{
              border: "1px solid #cecece",
              p: 6,
              borderRadius: "10px",
              background: colors.secondary.light,
            }}
          >
            <IconButton
              variant="contained"
              size="large"
              sx={{
                borderRadius: "50%",
                background: colors.primary.main,
                color: colors.white.main,
              }}
            >
              <DeleteIcon fontSize="medium" />
            </IconButton>
            <Stack direction={"row"} gap={4}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    my: 3,
                    color: "#413e3270",
                  }}
                >
                  Total Orders
                </Typography>
                <Typography variant="h5">$500</Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid xs={12} md={6} lg={3}>
          <Box
            sx={{
              border: "1px solid #cecece",
              p: 6,
              borderRadius: "10px",
              background: colors.secondary.light,
            }}
          >
            <IconButton
              variant="contained"
              size="large"
              sx={{
                borderRadius: "50%",
                background: colors.primary.main,
                color: colors.white.main,
              }}
            >
              <DeleteIcon fontSize="medium" />
            </IconButton>
            <Stack direction={"row"} gap={4}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    my: 3,
                    color: "#413e3270",
                  }}
                >
                  Total Orders
                </Typography>
                <Typography variant="h5">$500</Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid xs={12} md={6} lg={3}>
          <Box
            sx={{
              border: "1px solid #cecece",
              p: 6,
              borderRadius: "10px",
              background: colors.secondary.light,
            }}
          >
            <IconButton
              variant="contained"
              size="large"
              sx={{
                borderRadius: "50%",
                background: colors.primary.main,
                color: colors.white.main,
              }}
            >
              <DeleteIcon fontSize="medium" />
            </IconButton>
            <Stack direction={"row"} gap={4}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    my: 3,
                    color: "#413e3270",
                  }}
                >
                  Total Orders
                </Typography>
                <Typography variant="h5">$500</Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
{
  /* <div>
<div className="content-wrapper pb-2 mb-0">
  <section className="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-3 mb-4">
          <div class="card shadow-sm">
            <div class="card-body d-flex align-items-center">
              <div class="icon-container bg-primary text-white d-flex align-items-center justify-content-center">
                <i class="fas fa-shopping-cart"></i>
              </div>
              <div class="ml-3">
                <h6>Total Orders</h6>
                <h3>1,200</h3>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-md-3 mb-4">
          <div class="card shadow-sm">
            <div class="card-body d-flex align-items-center">
              <div class="icon-container bg-success text-white d-flex align-items-center justify-content-center">
                <i class="fas fa-dollar-sign"></i>
              </div>
              <div class="ml-3">
                <h6>Total Revenue</h6>
                <h3>$45,300</h3>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-md-3 mb-4">
          <div class="card shadow-sm">
            <div class="card-body d-flex align-items-center">
              <div class="icon-container bg-warning text-white d-flex align-items-center justify-content-center">
                <i class="fas fa-boxes"></i>
              </div>
              <div class="ml-3">
                <h6>Total Products</h6>
                <h3>450</h3>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-md-3 mb-4">
          <div class="card shadow-sm">
            <div class="card-body d-flex align-items-center">
              <div class="icon-container bg-danger text-white d-flex align-items-center justify-content-center">
                <i class="fas fa-users"></i>
              </div>
              <div class="ml-3">
                <h6>Total Customers</h6>
                <h3>890</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</div> */
}
