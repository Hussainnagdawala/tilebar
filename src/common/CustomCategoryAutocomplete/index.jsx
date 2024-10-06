import { Autocomplete, ListItem, TextField } from "@mui/material";
import React from "react";
import { colors } from "../../theme";
import { useEmpty } from "../../hooks";

const CustomCategoryAutocomplete = ({
  value = {},
  handleChange = () => {},
  optionListData = [],
}) => {
  const { isValidArray } = useEmpty();
  return (
    <Autocomplete
      value={value}
      onChange={handleChange}
      options={
        isValidArray(optionListData)
          ? optionListData.map((item) => {
              return { label: item.title, ...item };
            })
          : [{ label: "no options available", value: "" }]
      }
      isOptionEqualToValue={(option, value) => option._id === value._id}
      sx={{
        "& fieldset": {
          borderRadius: "10px",
          borderColor: colors.primary.main,
        },
        "& input": {
          fontSize: "14px",
          "&::placeholder": {
            color: `rgba(0,0,0,0.5)`,
            opacity: 1,
          },
        },
      }}
      getOptionLabel={(option) => option.title || ""}
      renderOption={(props, option, { selected }) => {
        return (
          <ListItem
            {...props}
            sx={{
              backgroundColor: selected ? colors.secondary.light : "inherit",
              color: selected ? colors.primary.main : "inherit",
            }}
          >
            {option.label}
          </ListItem>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder="select Category" />
      )}
    />
  );
};

export default CustomCategoryAutocomplete;
