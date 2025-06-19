import ReactDOM from "react-dom/client";
import App from "App";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SnackbarProvider, AuthProvider } from "providers";
import { PositionedSnackbar } from "components";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SnackbarProvider>
          <App />
          <PositionedSnackbar />
        </SnackbarProvider>
      </LocalizationProvider>
    </AuthProvider>
  </GoogleOAuthProvider>
);
