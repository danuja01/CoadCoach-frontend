import * as React from "react";
import monacoThemes from "monaco-themes/themes/themelist";
import ChevronDown from "@/icons/ChevronDown";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right"
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    "borderRadius": 6,
    "marginTop": theme.spacing(1),
    "minWidth": 180,
    "color": theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
    "boxShadow":
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0"
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    }
  }
}));

const ThemeDropdown = ({ handleThemeChange, theme }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<ChevronDown />}
        className="bg-[#E9ECF0] text-primary"
      >
        {theme.value}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button"
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {Object.entries(monacoThemes)
          .map(([themeId, themeName]) => ({
            label: themeName,
            value: themeId,
            key: themeId
          }))
          .map((theme) => (
            <div key={theme.key}>
              <MenuItem
                key={theme.value}
                onClick={() => {
                  handleClose();
                  handleThemeChange(theme);
                }}
              >
                {theme.label}
              </MenuItem>
              <Divider />
            </div>
          ))}
      </StyledMenu>
    </div>
  );
};

export default ThemeDropdown;
