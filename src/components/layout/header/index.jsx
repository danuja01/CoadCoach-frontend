import { twMerge } from "tailwind-merge";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Navbar from "./navbar";

// eslint-disable-next-line no-unused-vars
const internalNavLinks = [];

const Header = ({ className }) => {
  return (
    <header className={twMerge(``, className)}>
      <Navbar />
      <Box className="mx-5 pt-5">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            home
          </Link>
          <Typography color="text.primary">dashboard</Typography>
        </Breadcrumbs>
        <Divider />
      </Box>
    </header>
  );
};

export default Header;
