import { MemoryRouter } from "react-router";
import { SnackbarProvider, AuthProvider } from "providers";
import { PositionedSnackbar } from "components";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const AllTheProviders = ({ children }) => (
  <MemoryRouter>
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SnackbarProvider>
          {children}
          <PositionedSnackbar />
        </SnackbarProvider>
      </LocalizationProvider>
    </AuthProvider>
  </MemoryRouter>
);

export default AllTheProviders;
