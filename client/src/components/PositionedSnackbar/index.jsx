import { Snackbar, Button, Alert } from "@mui/material";
import { useSnackbar } from "../../hooks";

const PositionedSnackbar = () => {
  const { message, type, open, closeSnackbar, showSnackbar } = useSnackbar();

  return (
    <div>
      <Button onClick={() => showSnackbar("Logged in!", "success")}>
        Open Snackbar
      </Button>
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
