import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";

import { AccountBox, Home, ModeNight } from "@mui/icons-material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";

const Sidebar = ({
  themeMode,
  setThemeMode,
  isLoggedIn,
  userObj,
  setIsDrawerOpen,
}) => {
  // darkmode
  const toggleTheme = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const theme = createTheme({
    typography: {
      fontFamily: "'Noto Sans Kr', sans-serif",
    },
  });

  return (
    <Box position="fixed" width={200} height="100vh" component={Paper}>
      <List>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setIsDrawerOpen(false)}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ThemeProvider theme={theme}>
                <ListItemText color={"text.secondary"} primary="홈" />
              </ThemeProvider>
            </ListItemButton>
          </ListItem>
        </Link>

        <Link
          to="/profile"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem disablePadding>
            <ListItemButton onClick={() => setIsDrawerOpen(false)}>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ThemeProvider theme={theme}>
                <ListItemText
                  primary={isLoggedIn ? `${userObj.displayName} 님` : "프로필"}
                />
              </ThemeProvider>
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/member" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setIsDrawerOpen(false)}>
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ThemeProvider theme={theme}>
                <ListItemText primary="멤버들" />
              </ThemeProvider>
            </ListItemButton>
          </ListItem>
        </Link>

        <Divider />

        <Link
          to="/forecast"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem disablePadding>
            <ListItemButton onClick={() => setIsDrawerOpen(false)}>
              <ListItemIcon>
                <ThermostatIcon />
              </ListItemIcon>
              <ThemeProvider theme={theme}>
                <ListItemText primary="예보게임" />
              </ThemeProvider>
            </ListItemButton>
          </ListItem>
        </Link>

        <Divider />

        <Link
          to="/calculator"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem disablePadding>
            <ListItemButton onClick={() => setIsDrawerOpen(false)}>
              <ListItemIcon>
                <CalculateOutlinedIcon />
              </ListItemIcon>
              <ThemeProvider theme={theme}>
                <ListItemText primary="채점하기" />
              </ThemeProvider>
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/string" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setIsDrawerOpen(false)}>
              <ListItemIcon>
                <CachedOutlinedIcon />
              </ListItemIcon>
              <ThemeProvider theme={theme}>
                <ListItemText primary="정답코드" />
              </ThemeProvider>
            </ListItemButton>
          </ListItem>
        </Link>

        <Link
          to="/criteria"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem disablePadding>
            <ListItemButton onClick={() => setIsDrawerOpen(false)}>
              <ListItemIcon>
                <TableChartOutlinedIcon />
              </ListItemIcon>
              <ThemeProvider theme={theme}>
                <ListItemText primary="채점기준" />
              </ThemeProvider>
            </ListItemButton>
          </ListItem>
        </Link>

        <Divider />

        <ListItem>
          <ListItemIcon>
            <ModeNight />
          </ListItemIcon>
          <Switch onChange={toggleTheme} />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
