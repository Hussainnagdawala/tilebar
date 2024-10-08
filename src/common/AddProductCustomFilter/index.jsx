import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomInput } from "../CustomInput";
import { useEmpty } from "../../hooks";

const CommonFilterComponent = ({
  initialData = [],
  initialSelectedData = [],
  onSelectionChange = () => {},
  inputPlaceholder = "placeholder",
  inputLabel = "select",
  inputName = "name",
  title = "Select Options from Below",
}) => {
  const [searchFilterData, setSearchFilterData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const { isValidArray } = useEmpty();

  // Initialize selected data and search data on load or when props change
  useEffect(() => {
    setSearchFilterData(initialData);
    setSelectedData(initialSelectedData);
  }, [initialData, initialSelectedData]);

  // Function to filter the search input
  const handleCustomFilter = (e) => {
    const value = e.target.value;
    const filteredData = initialData.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setSearchFilterData(filteredData);
  };

  // Add selected item and update the state
  const handleSelectedData = (data) => {
    const isDataPresent = selectedData.some((item) => item._id === data._id);
    if (!isDataPresent) {
      const updatedSelectedData = [...selectedData, data];
      setSelectedData(updatedSelectedData);
      onSelectionChange &&
        onSelectionChange(updatedSelectedData.map((item) => item._id));
    }
  };

  // Remove item from selected data
  const handleDeleteSelectedData = (data) => {
    const updatedSelectedData = selectedData.filter(
      (item) => item._id !== data._id
    );
    setSelectedData(updatedSelectedData);
    onSelectionChange &&
      onSelectionChange(updatedSelectedData.map((item) => item._id));
  };

  const unselectedItems = searchFilterData.filter(
    (item) => !selectedData.some((selected) => selected._id === item._id)
  );
  return (
    <Box>
      <CustomInput
        label={inputLabel}
        handleChange={handleCustomFilter}
        placeholder={inputPlaceholder}
        type={"text"}
        name={inputName}
      />
      <Grid
        container
        spacing={2}
        sx={{
          border: "1px solid gray",
          borderRadius: "10px",
          margin: 0,
          width: "100%",
        }}
      >
        <Grid
          item
          xs={6}
          sx={{ borderRight: "1px solid #cecece", paddingLeft: "0 !important" }}
        >
          <Box>
            <List
              sx={{
                height: "250px",
                overflow: "auto",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader
                  component="div"
                  sx={{ borderBottom: "1px solid #cecece" }}
                >
                  {title}
                </ListSubheader>
              }
            >
              {isValidArray(unselectedItems) ? (
                unselectedItems.map((item) => {
                  return (
                    <ListItemButton
                      key={item.id}
                      onClick={() => handleSelectedData(item)}
                    >
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  );
                })
              ) : (
                <ListItemButton disabled>
                  <ListItemText primary={"no options left"} />
                </ListItemButton>
              )}
            </List>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <List
              sx={{
                height: "250px",
                overflow: "auto",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader
                  component="div"
                  sx={{ borderBottom: "1px solid #cecece" }}
                >
                  Selected Options
                </ListSubheader>
              }
            >
              {selectedData.map((item) => (
                <ListItemButton key={item.id} disableRipple>
                  <ListItemText primary={item.title} />
                  <IconButton onClick={() => handleDeleteSelectedData(item)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommonFilterComponent;
