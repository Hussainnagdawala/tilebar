// import LoadingButton from "@mui/lab/LoadingButton";
import { styles } from "./styles";
import { Button } from "@mui/material";

export const CustomButton = ({
  buttonName,
  buttonColor,
  isLoading,
  disabled,
  onClick,
  variant,
  sx={},
  type = "submit",
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
