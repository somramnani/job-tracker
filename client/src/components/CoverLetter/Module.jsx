import { styled } from "@mui/material/styles";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
  IconButton,
} from "@mui/material/";
import { Add, Close } from "@mui/icons-material";
import { useState } from "react";
import { TextField } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Module = ({ message, coverLetter, setCurrentCoverLetter }) => {
  const [userInput, setUserInput] = useState({
    company: "",
    jobName: "",
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCopy = () => {
    alert("Copied!");
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClickOpen()}
        startIcon={<Add />}
      >
        {message}
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {message}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <Close />
        </IconButton>
        <DialogContent dividers>
          <TextField
            id="outlined-textarea"
            label={message}
            placeholder={"Placeholder"}
            value={coverLetter}
            fullWidth
            style={{ width: "500px" }}
            onChange={(event) => {
              setCurrentCoverLetter(event.target.value);
            }}
            multiline
          />
          <TextField fullWidth style={{ width: "500px" }} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCopy}>
            Copy
          </Button>
          <Button autoFocus onClick={handleClose}>
            Save changes (Add to cover letter board)
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default Module;
