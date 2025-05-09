import ReactDOM from "react-dom/client";
import App from "App";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SnackbarProvider, AuthProvider } from "providers";
import { PositionedSnackbar } from "components";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SnackbarProvider>
          <App />
          <PositionedSnackbar />
        </SnackbarProvider>
      </LocalizationProvider>
    </AuthProvider>
  </GoogleOAuthProvider>
);
