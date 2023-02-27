import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <Box sx={{ height: "7rem", padding: { xs: "0rem", md: "1rem" } }}>
      <Divider />
      <Box
        sx={{
          padding: { xs: "1rem" },
          display: { xs: "block", md: "flex" },
          justifyContent: "space-between",
        }}
      >
        <Box>&copy; {new Date().getFullYear()} Hello Weather</Box>
        <Box>
          <Box
            sx={{
              width: "16rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>네이버카페</Box>
            <Box>방재기상정보시스템</Box>
            <Box>
              <GitHubIcon />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
