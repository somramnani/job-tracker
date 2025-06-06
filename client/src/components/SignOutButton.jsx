import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "hooks";
import { Link } from "react-router";

const SignOutButton = () => {
  const { user, handleLogout } = useAuth();

  return (
    <Button
      disabled={!user}
      variant="outlined"
      size="small"
      disableElevation
      onClick={handleLogout}
      component={Link}
      to="/"
      sx={{
        textTransform: "capitalize",
        fontWeight: "normal",
        filter: "opacity(0.9)",
        transition: "filter 0.2s ease-in",
        "&:hover": {
          filter: "opacity(1)",
        },
      }}
      startIcon={<LogoutIcon />}
    >
      Sign Out
    </Button>
  );
};
export default SignOutButton;
