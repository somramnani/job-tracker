import { MemoryRouter } from "react-router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SnackbarProvider } from "providers";
import { PositionedSnackbar } from "components";

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
