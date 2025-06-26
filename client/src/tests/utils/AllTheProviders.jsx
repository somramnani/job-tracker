import { MemoryRouter } from "react-router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SnackbarProvider, AuthProvider } from "providers";
import { PositionedSnackbar } from "components";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const AllTheProviders = ({ children }) => (
  <MemoryRouter>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SnackbarProvider>
            {children}
            <PositionedSnackbar />
          </SnackbarProvider>
        </LocalizationProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </MemoryRouter>
);

export default AllTheProviders;
