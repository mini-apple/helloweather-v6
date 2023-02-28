import React from "react";
import Typography from "@mui/material/Typography";

import { createTheme, ThemeProvider } from "@mui/material/styles";

function ExplainString() {
  const theme = createTheme({
    typography: {
      fontFamily: "'Noto Sans Kr', sans-serif",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Typography
        component="ul"
        sx={{
          padding: { xs: "0rem 0rem 0rem 1rem", md: "0rem 0rem 0rem 1.5rem" },
        }}
      >
        <Typography
          component="li"
          sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
        >
          정답코드는 인도자가 만들어 공유해줍니다.
        </Typography>
        <Typography
          component="li"
          sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
        >
          지역 순서는 예보게임지의 순서대로 위에서부터 지역1, 지역2입니다.
        </Typography>
      </Typography>
    </ThemeProvider>
  );
}

export default ExplainString;
