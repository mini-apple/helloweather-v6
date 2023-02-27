import React from "react";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function ExplainWindDirection() {
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
          풍향은 북점을 기준으로하는 16방위각을 사용합니다.
        </Typography>
        <Typography
          component="li"
          sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
        >
          점수는 예보값과 실황값의 각도 차이에 따라 계산합니다.
        </Typography>
        <Typography
          component="li"
          sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
        >
          차이에 따라 0°(10점), 22.5°(8점), 45°(6점), 67.5°(4점), 90°(2점), 그
          이상(0점) 을 부여합니다.
        </Typography>
      </Typography>
    </ThemeProvider>
  );
}

export default ExplainWindDirection;
