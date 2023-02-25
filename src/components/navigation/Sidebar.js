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
  Switch,
} from "@mui/material";
import React from "react";

const Sidebar = ({ mode, setMode }) => {
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "block" },
      }}
    >
      <Box position="fixed" width={200}>
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
            <Switch
              onChange={() => setMode(mode === "light" ? "dark" : "light")}
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
