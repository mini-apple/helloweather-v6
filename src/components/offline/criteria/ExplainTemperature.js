import React from "react";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function ExplainTemperature() {
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
          기온의 단위는 °C를 사용합니다.
        </Typography>
        <Typography
          component="li"
          sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
        >
          점수는 예보값과 실황값의 기온 차이에 따라 계산합니다.
        </Typography>
        <Typography
          component="li"
          sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
        >
          차이에 따라서 1°C 이하(10점), 2°C 이하(8점), 3°C 이하(6점), 4°C
          이하(4점), 5°C 이하(2점), 그 이상(0점) 을 부여합니다.
        </Typography>
      </Typography>
    </ThemeProvider>
  );
}

export default ExplainTemperature;
