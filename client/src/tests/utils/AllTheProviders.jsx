import { MemoryRouter } from "react-router";
import { SnackbarProvider } from "providers";
import { PositionedSnackbar } from "components";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const AllTheProviders = ({ children }) => (
  <MemoryRouter>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SnackbarProvider>
        {children}
        <PositionedSnackbar />
      </SnackbarProvider>
    </LocalizationProvider>
  </MemoryRouter>
);

export default AllTheProviders;
