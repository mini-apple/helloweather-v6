import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

import Navbar from "components/navigation/Navbar";
import Sidebar from "components/navigation/Sidebar";
import Router from "components/Router";
import Grid from "@mui/material/Grid";
import Footer from "components/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Layout = ({
  init,
  isLoggedIn,
  setIsLoggedIn,
  userObj,
  refreshUserObj,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  //학기정보
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const semesters = [];
  if (currentMonth <= 6) {
    semesters.push(currentYear + "-1학기");
  } else if (7 <= currentMonth && currentMonth <= 12) {
    semesters.push(currentYear + "-2학기");
    semesters.push(currentYear + "-1학기");
  }
  for (let i = currentYear - 1; i >= 2009; i--) {
    for (let j = 2; j >= 1; j--) {
      semesters.push(i + "-" + j + "학기");
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.secondary"}>
        <Navbar
          setThemeMode={setThemeMode}
          themeMode={themeMode}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userObj={userObj}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
        <Box sx={{ flexGrow: 1 }} bgcolor={"action.hover"}>
          <Grid container>
            <Grid item xs={12} md={2}>
              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                  height: "100vh",
                }}
              >
                <Sidebar
                  setThemeMode={setThemeMode}
                  themeMode={themeMode}
                  isLoggedIn={isLoggedIn}
                  userObj={userObj}
                  setIsDrawerOpen={setIsDrawerOpen}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={10}>
              <Box
                sx={{
                  padding: { xs: "0rem", md: "0rem 3rem 0rem 0rem" },
                }}
              >
                {init ? (
                  <Router
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    userObj={userObj}
                    refreshUserObj={refreshUserObj}
                    semesters={semesters}
                  />
                ) : (
                  <Paper
                    sx={{
                      margin: { xs: "1rem 0rem", md: "1rem" },
                      padding: "1rem",
                      borderRadius: { xs: "0rem", md: "1rem" },
                      height: "80vh",
                      lineHeight: "80vh",
                      textAlign: "center",
                    }}
                  >
                    <CircularProgress />
                  </Paper>
                )}
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
