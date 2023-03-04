import React, { useState } from "react";
import Box from "@mui/material/Box";
import Navbar from "components/navigation/Navbar";
import Sidebar from "components/navigation/Sidebar";
import Router from "components/Router";
import Grid from "@mui/material/Grid";
import Footer from "components/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Layout = ({ isLoggedIn, setIsLoggedIn, userObj }) => {
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("theme") || "light"
  );

  const darkTheme = createTheme({
    palette: {
      mode: themeMode,
      whiteness: {
        main: "#ffffff",
      },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.secondary"}>
        <Navbar setThemeMode={setThemeMode} themeMode={themeMode} />
        <Box sx={{ flexGrow: 1 }} bgcolor={"action.hover"}>
          <Grid container>
            <Grid item xs={12} md={2}>
              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                  height: "100vh",
                }}
              >
                <Sidebar setThemeMode={setThemeMode} themeMode={themeMode} />
              </Box>
            </Grid>
            <Grid item xs={12} md={10}>
              <Box sx={{ padding: { xs: "0rem", md: "0rem 3rem 0rem 0rem" } }}>
                <Router
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  userObj={userObj}
                />
                <Footer />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
