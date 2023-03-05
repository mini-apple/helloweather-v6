import React, { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Sidebar from "./Sidebar";

import { signOut } from "firebase/auth";
import { auth } from "fbase";

const Navbar = ({ themeMode, setThemeMode, isLoggedIn, userObj }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onLogoutClick = () => {
    signOut(auth);
  };

  return (
    <AppBar position="sticky" color="whiteness">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
        <Link href="/" underline="none" color="inherit">
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
        </Link>
        <Box sx={{ display: "block", alignItems: "center", gap: "20px" }}>
          {isLoggedIn ? (
            <Avatar
              src={userObj.photoURL}
              sx={{ width: 30, height: 30 }}
              onClick={() => setIsProfileOpen(true)}
            />
          ) : (
            <Avatar
              sx={{ width: 30, height: 30 }}
              onClick={() => setIsProfileOpen(true)}
            />
          )}
        </Box>
      </Toolbar>
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
        {isLoggedIn ? (
          <Box>
            <Link href="/profile" underline="none" color="inherit">
              <MenuItem>{userObj.displayName} 님</MenuItem>
            </Link>
            <Link href="/" underline="none" color="inherit">
              <MenuItem onClick={onLogoutClick}>로그아웃</MenuItem>
            </Link>
          </Box>
        ) : (
          <Box>
            <Link href="/login" underline="none" color="inherit">
              <MenuItem>로그인</MenuItem>
            </Link>
          </Box>
        )}
      </Menu>
    </AppBar>
  );
};

export default Navbar;
