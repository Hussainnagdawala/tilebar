import { styles } from "./styles";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { colors } from "../../theme";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useState } from "react";
import { globalConstant } from "../../constant";
import { useNavigate } from "react-router-dom";

export const CustomInput = ({
  label,
  placeholder,
  handleChange,
  value,
  type,
  name,
  screen,
  error,
  startAdornment,
  disabled,
  minDate,
  helperText,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();
  const loginScreenColorBlack = "rgba(0,0,0,0.5)";

  const renderEndAdorment = () => {
    if (type === "password") {
      return (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            edge="end"
          >
            {showPassword ? (
              <VisibilityOffOutlinedIcon />
            ) : (
              <VisibilityOutlinedIcon />
            )}
          </IconButton>
        </InputAdornment>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <Box sx={styles.parentInputBox}>
        {label && (
          <Box mb={1.3}>
            <Typography variant="label" sx={styles.textLabel}>
              {label}
            </Typography>
          </Box>
        )}
        <TextField
          fullWidth
          variant="outlined"
          placeholder={placeholder}
          size="small"
          id={label}
          name={name}
          type={showPassword ? "text" : type}
          value={value}
          helperText={error && helperText}
          onChange={handleChange}
          disabled={disabled}
          inputProps={type === "date" ? { min: minDate } : {}}
          sx={{
            "& .MuiOutlinedInput-root": {
              ...styles.muiOutlinedInputroot,
              backgroundColor: disabled ? colors.secondary.main : "",
              "& fieldset": {
                borderColor:
                  screen === "referrals"
                    ? "transparent"
                    : loginScreenColorBlack,
              },

              "&:hover fieldset": {
                borderColor: "primary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
            },
            "& .MuiOutlinedInput-input": {
              backgroundColor: "transparent !important",
              cursor: disabled ? "not-allowed" : "inherit",
              minHeight: name === "search" ? "27px" : "30px",
              "&:-webkit-autofill": styles.webkit_autofill,
              "&::placeholder": {
                color: loginScreenColorBlack,
                opacity: 1,
              },
            },
            "& input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 30px rgba(0,0,0,0) inset !important",
              WebkitTextFillColor: "#000 !important",
              transition: "background-color 5000s ease-in-out 0s",
            },
            "& .MuiFormHelperText-root": {
              color: colors.error.main,
              fontWeight: 500,
            },
            "& .Mui-disabled": {
              background: "transparent",
              opacity: 0.8,
            },
            ...(type === "number"
              ? {
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }
              : {}),
          }}
          InputProps={{
            style: styles.input,
            endAdornment: renderEndAdorment(),
            startAdornment: startAdornment && (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ),
          }}
        />
        {/* {screen === globalConstant.CHANGE_EMAIL && (
          <Box
            onClick={() => {
              navigate(`/user/changeEmail`);
            }}
            sx={{ textAlign: "end", cursor: "pointer" }}
          >
            <Link variant="body2">Update email</Link>
          </Box>
        )} */}
      </Box>
    </>
  );
};
