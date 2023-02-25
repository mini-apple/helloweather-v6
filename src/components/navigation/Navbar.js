import { Pets } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";

import React, { useState } from "react";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled("Box")(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: { display: "flex" },
}));

const UserBox = styled("Box")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: { display: "none" },
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <AppBar position="sticky" color="whiteness">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          <Typography variant="h6" component="span" sx={{ color: "#ffa726" }}>
            H
          </Typography>
          ello{" "}
          <Typography variant="h6" component="span" sx={{ color: "#5673eb" }}>
            W
          </Typography>
          eather
        </Typography>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        <Icons>
          <Avatar
            sx={{ width: 30, height: 30 }}
            onClick={() => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={() => setOpen(true)}>
          <Avatar sx={{ width: 30, height: 30 }} />
          <Typography variant="span">John</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
