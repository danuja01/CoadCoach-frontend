import { useState } from "react";
import { brand } from "@/constants";
import { Avatar, Box, Button, Container, Divider, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className="bg-secondary shadow-none py-1">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            className="font-codeSans font-bold text-[30px] flex-grow"
            variant="h5"
            noWrap
            component="a"
            href="/"
          >
            {brand.name}
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open user settings">
              <Button className="bg-primary px-6 py-2" onClick={handleMenu}>
                <Avatar
                  alt="D"
                  sx={{
                    width: 30,
                    height: 30
                  }}
                />
                <Typography className="font-inter font-medium text-[16px] ml-3 text-white">danuja01</Typography>
              </Button>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                "mt": "55px",
                "& .MuiPaper-root": {
                  width: "180px" // Set the width to auto to match the button's width
                }
              }}
              id="menu-appbar"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
            >
              <MenuItem>
                <Typography textAlign="center">Log out</Typography>
              </MenuItem>
              <Divider />
              <MenuItem>
                <Typography textAlign="center">Settings</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
