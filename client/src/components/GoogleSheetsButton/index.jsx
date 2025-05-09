import { Button } from "@mui/material";
import { GoogleIcon } from "components/Icons/CustomIcons";

const GoogleSheetsButton = () => {
  return (
    <div data-testid="google-sheet-button">
      <Button
        variant="contained"
        color="primary"
        startIcon={<GoogleIcon />}
        target="_blank"
        href={process.env.REACT_APP_GOOGLE_SHEET}
        fullWidth
        style={{
          backgroundColor: "#6dc00b",
          color: "#fff",
          textTransform: "none",
        }}
      >
        GOOGLE SHEETS DOCUMENT
      </Button>
    </div>
  );
};

export default GoogleSheetsButton;
