import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ExplainString from "components/offline/string/ExplainString";
import InputCloudiness from "components/input/InputCloudiness";
import InputWindDiriction from "components/input/InputWindDirenction";
import InputWindSpeed from "components/input/InputWindSpeed";
import InputTemperature from "components/input/InputTemperature";
import InputPrecipitation from "components/input/InputPrecipitation";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function StringForm() {
  const [L1, setL1] = useState({
    cloudiness: null,
    windDirection: null,
    windSpeed: null,
    temperature: null,
    precipitation: null,
  });
  const [L2, setL2] = useState({
    cloudiness: null,
    windDirection: null,
    windSpeed: null,
    temperature: null,
    precipitation: null,
  });

  const [text0, setText0] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [text4, setText4] = useState("");
  const [text5, setText5] = useState("");
  const [text6, setText6] = useState("");
  const [text7, setText7] = useState("");
  const [text8, setText8] = useState("");
  const [text9, setText9] = useState("");

  const [string, setString] = useState("");

  const onConvert = () => {
    if (
      L1.cloudiness === null ||
      L1.windDirection === null ||
      L1.windSpeed === null ||
      L1.temperature === null ||
      L1.precipitation === null ||
      L2.cloudiness === null ||
      L2.windDirection === null ||
      L2.windSpeed === null ||
      L2.temperature === null ||
      L2.precipitation === null
    ) {
      alert("입력되지 않은 항목이 있습니다. \n모든 항목을 입력해주세요!");
      return;
    }
    const plainText = `${L1.cloudiness}/${L1.windDirection}/${L1.windSpeed}/${L1.temperature}/${L1.precipitation}/${L2.cloudiness}/${L2.windDirection}/${L2.windSpeed}/${L2.temperature}/${L2.precipitation}`;
    setString(plainText);
  };

  const onCopy = () => {
    navigator.clipboard.writeText(string);
    alert("복사되었습니다.");
  };

  const theme = createTheme({
    typography: {
      fontFamily: "'Noto Sans Kr', sans-serif",
    },
  });

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              margin: { xs: "1rem 0rem", md: "1rem" },
              padding: "1rem",
              borderRadius: { xs: "0rem", md: "1rem" },
            }}
          >
            <Box
              sx={{
                fontSize: "1.1rem",
                fontWeight: "500",
                marginBottom: "2rem",
              }}
            >
              정답코드 만들기
            </Box>
            <ExplainString />
          </Paper>
          <Paper
            sx={{
              margin: { xs: "1rem 0rem", md: "1rem" },
              padding: "1rem",
              borderRadius: { xs: "0rem", md: "1rem" },
            }}
          >
            <Box
              sx={{
                fontSize: "1.1rem",
                fontWeight: "500",
                marginBottom: "2rem",
              }}
            >
              답안 입력하기
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <Box
                sx={{
                  border: "1px solid rgba(5, 5, 5, 10%)",
                  borderRadius: "0.5rem",
                }}
              >
                <Box
                  bgcolor={"action.hover"}
                  sx={{
                    textAlign: "center",
                    borderRadius: "0.5rem 0.5rem 0rem 0rem",
                    padding: "0.2rem",
                  }}
                >
                  지역1
                </Box>
                <Divider />
                <Box
                  bgcolor={"background.default"}
                  sx={{
                    padding: "0.8rem 0.5rem",
                    borderRadius: " 0rem 0rem 0.5rem 0.5rem",
                  }}
                >
                  <InputCloudiness
                    data={L1}
                    setData={setL1}
                    text={text0}
                    setText={setText0}
                  />
                  <InputWindDiriction
                    data={L1}
                    setData={setL1}
                    text={text1}
                    setText={setText1}
                  />
                  <InputWindSpeed
                    data={L1}
                    setData={setL1}
                    text={text2}
                    setText={setText2}
                  />
                  <InputTemperature
                    data={L1}
                    setData={setL1}
                    text={text3}
                    setText={setText3}
                  />
                  <InputPrecipitation
                    data={L1}
                    setData={setL1}
                    text={text4}
                    setText={setText4}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  border: "1px solid rgba(5, 5, 5, 10%)",
                  borderRadius: "0.5rem",
                }}
              >
                <Box
                  bgcolor={"action.hover"}
                  sx={{
                    textAlign: "center",
                    borderRadius: "0.5rem 0.5rem 0rem 0rem",
                    padding: "0.2rem",
                  }}
                >
                  지역2
                </Box>
                <Box
                  bgcolor={"background.default"}
                  sx={{
                    padding: "0.8rem 0.5rem",
                    borderRadius: " 0rem 0rem 0.5rem 0.5rem",
                  }}
                >
                  <InputCloudiness
                    data={L2}
                    setData={setL2}
                    text={text5}
                    setText={setText5}
                  />
                  <InputWindDiriction
                    data={L2}
                    setData={setL2}
                    text={text6}
                    setText={setText6}
                  />
                  <InputWindSpeed
                    data={L2}
                    setData={setL2}
                    text={text7}
                    setText={setText7}
                  />
                  <InputTemperature
                    data={L2}
                    setData={setL2}
                    text={text8}
                    setText={setText8}
                  />
                  <InputPrecipitation
                    data={L2}
                    setData={setL2}
                    text={text9}
                    setText={setText9}
                  />
                </Box>
              </Box>
            </Box>
            <Box>
              <ThemeProvider theme={theme}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  onClick={onConvert}
                >
                  create
                </Button>
              </ThemeProvider>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              margin: { xs: "0rem 0rem 1rem 0rem", md: "1rem" },
              padding: "1rem",
              borderRadius: { xs: "0rem", md: "1rem" },
            }}
          >
            <Box
              sx={{
                fontSize: "1.1rem",
                fontWeight: "500",
                marginBottom: "2rem",
              }}
            >
              정답코드 복사하기
            </Box>
            <Box
              bgcolor={"action.hover"}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderRadius: "5rem",
                padding: "0rem 0.5rem",
              }}
            >
              <Box
                sx={{
                  padding: "0.5rem",
                  fontSize: { xs: "0.9rem", md: "1rem" },
                }}
              >
                정답코드
              </Box>
              <Box
                sx={{
                  padding: "0.5rem",
                  fontSize: { xs: "0.9rem", md: "1rem" },
                }}
              >
                {string}
              </Box>
              <IconButton onClick={onCopy}>
                <ContentCopyRoundedIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
export default StringForm;
