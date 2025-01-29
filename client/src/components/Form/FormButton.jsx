import { Button, CircularProgress } from "@mui/material";

const FormButton = ({
  message,
  icon,
  onClick,
  isLoadingSubmit = false,
  color = "primary",
  type = "submit",
  disabled = false,
}) => {
  return (
    <Button
      variant="contained"
      startIcon={icon}
      type={type}
      onClick={onClick}
      color={color}
      disabled={disabled || isLoadingSubmit}
      fullWidth
    >
      {isLoadingSubmit ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        message
      )}
    </Button>
  );
};

export default FormButton;
