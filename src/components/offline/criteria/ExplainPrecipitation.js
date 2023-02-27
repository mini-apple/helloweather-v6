import React from "react";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function ExplainPrecipitation() {
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
          강수량의 단위는 mm를 사용합니다.
        </Typography>
        <Typography
          component="li"
          sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
        >
          강수량은 당일 0시부터 예보시각까지의 누적값으로 상정합니다. (ex:
          0시~15시)
        </Typography>
        <Typography
          component="li"
          sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
        >
          점수는 예보값과 실황값의 강수량 구간 차이에 따라 계산합니다.
        </Typography>
        <Typography
          component="li"
          sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
        >
          차이에 따라서 0(10점), 1(7점), 2(4점), 3(1점), 그 이상(0점)을
          부여합니다.{" "}
        </Typography>
      </Typography>
    </ThemeProvider>
  );
}

export default ExplainPrecipitation;
