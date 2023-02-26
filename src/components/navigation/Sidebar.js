import { AccountBox, Home, ModeNight } from "@mui/icons-material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Switch,
} from "@mui/material";
import React, { useEffect } from "react";

const Sidebar = ({ themeMode, setThemeMode }) => {
  // darkmode
  const toggleTheme = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  return (
    <Box>
      <Box position="fixed" width={200} height="100vh" component={Paper}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/profile">
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/member">
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Members" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton component="a" href="/forecast">
              <ListItemIcon>
                <ThermostatIcon />
              </ListItemIcon>
              <ListItemText primary="예보게임" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton component="a" href="/calculator">
              <ListItemIcon>
                <CalculateOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="채점하기" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/string">
              <ListItemIcon>
                <CachedOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="정답코드" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/criteria">
              <ListItemIcon>
                <TableChartOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="채점기준" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <ModeNight />
            </ListItemIcon>
            <Switch onChange={toggleTheme} />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
