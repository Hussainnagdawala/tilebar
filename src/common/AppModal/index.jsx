import * as React from "react";
import Dialog from "@mui/material/Dialog";

export const AppModal = ({ handleCloseOpen, open, children, maxWidth }) => {
  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        open={open}
        keepMounted
        onClose={handleCloseOpen}
        maxWidth={maxWidth ?? "md"}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 4,
          },
        }}
      >
        {children}
      </Dialog>
    </React.Fragment>
  );
};
