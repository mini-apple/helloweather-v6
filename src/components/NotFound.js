import React from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import NearMeIcon from "@mui/icons-material/NearMe";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        margin: { xs: "1rem 0rem", md: "1rem" },
        padding: "1rem",
        borderRadius: { xs: "0rem", md: "1rem" },
      }}
    >
      <Alert severity="info">
        <AlertTitle>
          <Box>404: 해당 페이지를 찾을 수 없어요! ㅠㅠ</Box>
        </AlertTitle>
      </Alert>
      <Box sx={{ textAlign: "center", padding: "12rem 0rem 12rem 0rem" }}>
        <Box sx={{ fontSize: "1.5rem" }}>404 오류</Box>
        <Box mt={1}>해당 페이지는 삭제된거 같아요... ㅠㅠ</Box>
        <Box mt={3}>
          <IconButton onClick={() => navigate("/")}>
            <NearMeIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default NotFound;
