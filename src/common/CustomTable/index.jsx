import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { tableHeadCellStyles, tableCellStyles } from "./style"; // Adjust the path as per your file structure
// import NoDataFound from "../NoDataFound";
export const CustomTable = ({ columns, data, isLoading }) => {
  return (
    <Paper sx={{ boxShadow: "none" }}>
      <TableContainer
        sx={{
          maxHeight: "calc(100dvh - 245px)",
          position: "relative",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          {columns?.length > 0 && (
            <TableHead>
              <TableRow>
                {columns?.map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (column, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        ...tableHeadCellStyles,
                        textAlign: column.center ? "center" : "left",
                      }}
                    >
                      {column.name}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {data?.length > 0 && !isLoading
              ? data.map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (row, rowIndex) => (
                    <TableRow sx={{ backgroundColor: "#fff" }} key={rowIndex}>
                      {columns?.map(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (column, colIndex) => (
                          <TableCell
                            key={colIndex}
                            sx={{
                              ...tableCellStyles,
                              textAlign: column.center ? "center" : "left",
                            }}
                          >
                            {column.selector(row)}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  )
                )
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
  );
};
