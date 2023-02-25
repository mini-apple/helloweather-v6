import React, { useState } from "react";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "components/navigation/Navbar";
import Sidebar from "components/navigation/Sidebar";
import Homepage from "components/home/Homepage";
import { Stack } from "@mui/material";
import Footer from "components/Footer";

const Router = () => {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
      whiteness: {
        main: "#ffffff",
      },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box flex={1} p={2}>
            <Sidebar setMode={setMode} mode={mode} />
          </Box>
          <Box flex={5} p={2}>
            <Stack>
              <Homepage />
            </Stack>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Router;
