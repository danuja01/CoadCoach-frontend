import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { brand } from "@/constants";
import { authApi, useLogoutMutation } from "@/store/api/auth";
import { Avatar, Box, Button, Container, Divider, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = localStorage.getItem("user_username");

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutClick = async () => {
    logout();
    localStorage.clear();
    dispatch(authApi.util.resetApiState());
    navigate("/");
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
                <Typography className="font-inter font-medium text-[16px] ml-3 text-white">{username}</Typography>
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
                <Button
                  onClick={() => {
                    onLogoutClick();
                    console.log("clicked");
                  }}
                  className="p-0 text-red-600"
                >
                  Log out
                </Button>
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
