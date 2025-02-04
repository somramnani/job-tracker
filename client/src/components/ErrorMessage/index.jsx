import { Typography } from "@mui/material";

const ErrorMessage = ({ fieldName, isFieldNotFound }) => {
  if (!isFieldNotFound) return null;

  return (
    <div data-testid="error-message">
      <Typography
        variant="caption"
        sx={{
          color: "red",
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
        }}
      >
        ✗ {fieldName} not found
      </Typography>
    </div>
  );
};

export default ErrorMessage;
