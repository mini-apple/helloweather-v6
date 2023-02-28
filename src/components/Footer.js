import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <Box
      sx={{
        height: { xs: "8rem", md: "7rem" },
        padding: { xs: "1rem", md: "1rem" },
        marginTop: { xs: "0rem", md: "1rem" },
      }}
    >
      <Divider />
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <Box sx={{ marginBottom: { xs: "0.5rem", md: "0rem" } }}>
          &copy; {new Date().getFullYear()} Hello Weather
        </Box>
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
