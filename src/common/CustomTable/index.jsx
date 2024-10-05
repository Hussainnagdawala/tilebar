import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { tableHeadCellStyles, tableCellStyles } from "./style";
// import NoDataFound from "../NoDataFound";
export const CustomTable = ({ columns, data, isLoading }) => {
  return (
    <>
      <Paper sx={{ boxShadow: "none" }}>
        <TableContainer
          sx={{
            maxHeight: "calc(100dvh - 245px)",
            position: "relative",
            overflowX: "scroll",
            "::-webkit-scrollbar": {
              // display: "none",
            },
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            {columns?.length > 0 && (
              <TableHead>
                <TableRow>
                  {columns?.map((column, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        ...tableHeadCellStyles,
                        textAlign: column.center ? "center" : "left",
                        maxWidth: "400px",
                      }}
                    >
                      {column.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {data?.length > 0 && !isLoading
                ? data.map((row, rowIndex) => (
                    <TableRow sx={{ backgroundColor: "#fff" }} key={rowIndex}>
                      {columns?.map((column, colIndex) => (
                        <TableCell
                          key={colIndex}
                          sx={{
                            ...tableCellStyles,
                            textAlign: column.center ? "center" : "left",
                            maxHeight: "50px", // Limit height as per your requirement
                            maxWidth: "400px",
                            whiteSpace: "nowrap", // Prevent text from wrapping
                            overflow: "hidden", // Hide overflowed text
                            textOverflow: "ellipsis", // Show
                          }}
                        >
                          {column.selector(row)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : !isLoading && (
                    <>
                      <TableRow sx={{ width: "100%" }}>
                        <TableCell
                          colSpan={columns.length}
                          sx={{
                            textAlign: "center",
                            borderBottom: "none",
                            fontWeight: 500,
                          }}
                        >
                          No Data Found
                          {/* <NoDataFound /> */}
                        </TableCell>
                      </TableRow>
                    </>
                  )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};
