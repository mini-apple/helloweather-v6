import React from "react";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function ExplainWindSpeed() {
  const theme = createTheme({
    typography: {
      fontFamily: "'Noto Sans Kr', sans-serif",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Typography component="ul" sx={{ padding: "0rem 0rem 0rem 1rem" }}>
        <Typography
          component="li"
          sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
        >
          풍속의 단위는 m/s를 사용합니다.
        </Typography>
        <Typography
          component="li"
          sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
        >
          점수는 예보값과 실황값의 풍속 구간 차이에 따라 계산합니다.
        </Typography>
        <Typography
          component="li"
          sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
        >
          차이에 따라 0(10점), 1(7점), 2(4점), 3(1점), 그 이상(0점)을
          부여합니다.
        </Typography>
      </Typography>
    </ThemeProvider>
  );
}

export default ExplainWindSpeed;
