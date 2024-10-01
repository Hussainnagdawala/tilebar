import {
  Box,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { style } from "./style";
import { globalConstant } from "../../constant";

export const AppPagination = ({
  totalCount,
  totalPages,
  limit,
  currentPage,
  handlePageChange,
  handleLimitChange,
}) => {
  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, totalCount);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box sx={style.container}>
        <Box>
          <Select
            defaultValue={limit}
            value={limit}
            onChange={(e) => handleLimitChange(e.target.value)}
            variant="outlined"
            sx={style.select}
          >
            {globalConstant.TABLE_LIMIT.map((pageSize, index) => (
              <MenuItem key={index} value={pageSize?.value} sx={style.menuItem}>
                {pageSize?.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box>
          <Typography sx={style.typography}>
            {`${start} - ${end} of ${totalCount}`}
          </Typography>
        </Box>
        <Stack spacing={3}>
          <Pagination
            page={currentPage}
            count={totalPages}
            variant="outlined"
            onChange={handlePageChange}
            sx={style.pagination}
            size={isSmallScreen ? "small" : "large"}
          />
        </Stack>
      </Box>
    </>
  );
};
