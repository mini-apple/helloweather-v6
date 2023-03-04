import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Fade } from "@mui/material";

import "./BeforeLoginHome.css";

const BeforeLoginHome = () => {
  let navigate = useNavigate();

  const onLoginPage = () => {
    navigate("/login");
  };

  return (
    <>
      <Paper
        sx={{
          margin: { xs: "1rem 0rem", md: "1rem" },
          padding: "1rem",
          borderRadius: { xs: "0rem", md: "1rem" },
        }}
      >
        <Box
          sx={{
            padding: { xs: "1", sm: "5" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box>
            <Box
              mt={10}
              mb={4}
              className="test"
              sx={{ fontSize: { xs: "3rem", sm: "5rem" } }}
            >
              환영합니다
            </Box>
            <Fade in={true} timeout={4000}>
              <Box mb={10} sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }}>
                부산대학교 대기환경과학과 학술동아리 Hello Weather입니다.
              </Box>
            </Fade>
            <Button variant="outlined" onClick={onLoginPage}>
              로그인하여 시작하기
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default BeforeLoginHome;
