import { styled } from "@mui/material/styles";
import { Dialog } from "@mui/material/";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    width: "80%", // Set the desired width (e.g., 80% of the viewport width)
    maxWidth: "800px", // Optional: limit the max width
  },
}));

export default BootstrapDialog;
