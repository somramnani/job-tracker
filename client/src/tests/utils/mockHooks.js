export const mockAuth = (user = null) => {
  const { useAuth } = require("hooks");
  useAuth.mockReturnValue({
    user,
    handleLogout: jest.fn(),
  });
};

export const mockSnackbar = ({
  message = "",
  type = "info",
  open = false,
  closeSnackbar = jest.fn(),
} = {}) => {
  const { useSnackbar } = require("hooks");
  useSnackbar.mockReturnValue({
    message,
    type,
    open,
    closeSnackbar,
  });
};
