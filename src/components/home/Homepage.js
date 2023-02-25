import React from "react";
import { Fade } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import "./Homepage.css";

const Home = () => {
  return (
    <Box>
      <Box
        p={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box>
          <Box fontSize={80} mt={10} mb={4} className="test">
            환영합니다
          </Box>
          <Fade in={true} timeout={4000}>
            <Box fontSize={20} mb={10}>
              부산대학교 대기환경과학과 학술동아리 Hello Weather입니다.
            </Box>
          </Fade>
          <Button variant="outlined">로그인하여 시작하기</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
