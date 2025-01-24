import React, { createContext, useState } from "react";

export const SnackbarContext = createContext();

const SnackbarProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");

  const closeSnackbar = () => {
    setOpen(false);
  };

  const showSnackbar = ({ message: snackbarMessage, type: snackbarType }) => {
    setMessage(snackbarMessage);
    setType(snackbarType);
    setOpen(true);
  };

  const contextValue = {
    closeSnackbar,
    showSnackbar,
    message,
    open,
    type,
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
