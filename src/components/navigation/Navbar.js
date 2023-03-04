import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Sidebar from "./Sidebar";
import {
  AppBar,
  Avatar,
  IconButton,
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

const Icons = styled(Box)(({ theme }) => ({
  display: "block",
  alignItems: "center",
  gap: "20px",
}));

const Navbar = ({ themeMode, setThemeMode }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <AppBar position="sticky" color="whiteness">
      <StyledToolbar>
        <IconButton
          onClick={() => setIsDrawerOpen(true)}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <Box width="200px" role="presentation">
            <Sidebar setThemeMode={setThemeMode} themeMode={themeMode} />
          </Box>
        </Drawer>
        <Typography variant="h6">
          <Typography variant="h6" component="span" sx={{ color: "#ffa726" }}>
            H
          </Typography>
          ello{" "}
          <Typography variant="h6" component="span" sx={{ color: "#5673eb" }}>
            W
          </Typography>
          eather
        </Typography>
        <Icons>
          <Avatar
            sx={{ width: 30, height: 30 }}
            onClick={() => setIsProfileOpen(true)}
          />
        </Icons>
      </StyledToolbar>
      <Menu
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>My Profile</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
