import { Snackbar, Alert } from "@mui/material";
import { useSnackbar } from "../../hooks";

const PositionedSnackbar = () => {
  const { message, type, open, closeSnackbar } = useSnackbar();

  return (
    <div>
      <Snackbar
        open={open}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
      >
        <Alert
          onClose={closeSnackbar}
          open={type}
          severity={type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PositionedSnackbar;
