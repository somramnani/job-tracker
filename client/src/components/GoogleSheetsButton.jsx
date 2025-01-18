import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const GoogleSheetsButton = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<GoogleIcon />}
      target="_blank"
      href={process.env.REACT_APP_GOOGLE_SHEET}
      fullWidth
      style={{
        backgroundColor: "#34A853",
        color: "#fff",
        textTransform: "none",
      }}
    >
      GOOGLE SHEETS DOCUMENT
    </Button>
  );
};

export default GoogleSheetsButton;
