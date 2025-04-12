import React, { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SimulationIcon from "@mui/icons-material/TimerOutlined";
import "../../../styles/globals.css"; // Import your global styles here

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMobile = Boolean(anchorEl);

  return (
    <AppBar position="static" className="bg-muiBlue">
      <Toolbar className="flex justify-between navbar-container">
        {/* Left Side - Title with Icon */}
        <Box className="flex items-center">
          {/* <SimulationIcon fontSize={"large"} className="mr-2" /> */}
          <Typography variant="h5" className="font-extrabold">
            Emergency Department Simulation
          </Typography>
        </Box>

        {/* Right Side - Links (Hidden on mobile) */}
        <Box className="hidden md:flex space-x-4">
          <Link href="/" passHref>
            <Typography
              variant="button"
              className="text-white  cursor-pointer  p-3 mr-5"
            >
              <span className="text-white font-bold hover:text-gray-100 ">
                Simulator
              </span>
            </Typography>
          </Link>
          <Link href="/queuing-calculator" passHref>
            <Typography
              variant="button"
              className="hover:font-extrabold cursor-pointer p-3 mx-3"
            >
              <span className="text-white font-bold hover:text-gray-100 ">
                Queuing Calculator
              </span>
            </Typography>
          </Link>
        </Box>

        {/* Mobile Menu (Hidden on medium and up screens) */}
        {/* <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          className="md:hidden"
          onClick={handleMenuOpen}
        >
          <span className="md:hidden">
            <MenuIcon />
          </span>
        </IconButton> */}

        {/* Mobile Menu Items */}
        <Menu
          anchorEl={anchorEl}
          open={isMobile}
          onClose={handleMenuClose}
          className="md:hidden"
        >
          <MenuItem onClick={handleMenuClose}>
            <Link href="/simulator">Simulator</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link href="/queuing-calculator">Queuing Calculator</Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
