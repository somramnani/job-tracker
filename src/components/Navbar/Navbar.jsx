import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { Logo, NavbarItems, NavbarButton } from "./navbarStyles";
import { Link } from "react-router-dom"; // Import Link from React Router

const Navbar = () => {
  const navItems = [
    { title: "Job Board", link: "/job-board" },
    { title: "Overview", link: "/overview" },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        left: 0,
        right: 0,
        margin: 0,
      }}
    >
      <Toolbar sx={{ paddingLeft: 0, paddingRight: 0, width: "100%" }}>
        <Logo
          component={Link} // This makes the Logo behave like a link
          to="/" // Link to the home page
          sx={{
            fontFamily: "cursive",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "white",
            flexGrow: 1,
            display: "inline-block",
            whiteSpace: "nowrap",
          }}
        >
          Job Tracker
        </Logo>

        {/* Map through navItems to render the navbar items dynamically */}
        <NavbarItems>
          {navItems.map((item, index) => (
            <NavbarButton key={index} component={Link} to={item.link}>
              {item.title}
            </NavbarButton>
          ))}
        </NavbarItems>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
