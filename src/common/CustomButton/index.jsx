// import LoadingButton from "@mui/lab/LoadingButton";
import { colors } from "../../theme";
import { styles } from "./styles";
import { Button } from "@mui/material";

export const CustomButton = ({
  buttonName = "",
  buttonColor = "",
  isLoading = false,
  color = "primary",
  disabled = false,
  onClick = () => {},
  variant = "contained",
  sx = {},
  type = "submit",
  endIcon = null,
  startIcon = null,
}) => {
  return (
    <>
      <Button
        onClick={onClick}
        variant={variant ?? "contained"}
        fullWidth
        loading={isLoading}
        type={type}
        disabled={disabled}
        endIcon={endIcon}
        color={color}
        startIcon={startIcon}
        sx={{
          ...styles.buttonStyle,
          backgroundColor: buttonColor,
          "&:hover": { backgroundColor: buttonColor },
        }}
      >
        {buttonName}
      </Button>
    </>
  );
};
