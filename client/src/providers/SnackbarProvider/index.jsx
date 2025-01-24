import React, { createContext, useState, useContext } from "react";

export const SnackbarContext = createContext();

const SnackbarProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(true);
  const [type, setType] = useState("false");

  const closeSnackbar = () => {
    setOpen(false);
  };

  const showSnackbar = (snackbarMessage, snackbarType) => {
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
