import { styled } from "@mui/system";
import { Typography, Button, Container } from "@mui/material";

export const Logo = styled(Button)(({ theme }) => ({
  fontFamily: "cursive",
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "white",
  flexGrow: 1,
  display: "inline-block",
  whiteSpace: "nowrap",
}));

export const NavbarItems = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  width: "100%",
  paddingLeft: 0,
  paddingRight: 0,
}));

export const NavbarButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  textTransform: "none",
  color: "white",
}));
