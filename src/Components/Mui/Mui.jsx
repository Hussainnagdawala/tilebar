import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MaterialTable from 'material-table';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const theme = createTheme();

const Mui = () => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleClickOpen = (rowData) => {
    setSelectedUser(rowData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    alert("Deleted " + selectedUser.name);
    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>

        <div className="row mb-4">
            <div className="col-md-12 text-end   bg-light">
                <button className='btn text-light'>Add Data</button>
            </div>
        </div>
      <MaterialTable
        title="Multiple Actions Preview"
        actions={[
            {
              icon: 'save',
              tooltip: 'Save User',
              onClick: (event, rowData) => alert("You saved " + rowData.name),
            },
            {
              icon: 'delete',
              tooltip: 'Delete User',
              onClick: (event, rowData) => handleClickOpen(rowData),
            },
          ]}
        columns={[
          { title: 'Name', field: 'name' },
          { title: 'Surname', field: 'surname' },
          { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
          {
            title: 'Birth Place',
            field: 'birthCity',
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
          },
        ]}
        data={[
          { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
          { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
        ]}/>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {selectedUser?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* Cancel button first */}
          <Button onClick={handleClose} variant="outlined" color="primary">
            Cancel
          </Button>
          {/* Delete button last */}
          <Button onClick={handleConfirmDelete} variant="contained" color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </ThemeProvider>
  );
};

export default Mui;
