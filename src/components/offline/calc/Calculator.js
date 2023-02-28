import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";

import StringInput from "components/offline/calc/StringInput";
import InputCloudiness from "components/input/InputCloudiness";
import InputWindDiriction from "components/input/InputWindDirenction";
import InputWindSpeed from "components/input/InputWindSpeed";
import InputTemperature from "components/input/InputTemperature";
import InputPrecipitation from "components/input/InputPrecipitation";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 7,
    label: "7",
  },
  {
    value: 8,
    label: "8",
  },
  {
    value: 9,
    label: "9",
  },
  {
    value: 10,
    label: "10",
  },
];

function Calculator() {
  const [answer, setAnswer] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [difference, setDifference] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [result, setResult] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [evid, setEvid] = useState(10);
  const [evidResult, setEvidResult] = useState(0);
  const [score, setScore] = useState(0);

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

  // 근거개수입력
  const onEvidChange = (event) => {
    const {
      target: { value },
    } = event;
    setEvid(value);
  };

  const onScore = () => {
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
      alert("입력되지 않은 항목이 있습니다.\n모든 항목을 입력해주세요!");
      return;
    }

    const inp = [
      parseFloat(L1.cloudiness),
      parseFloat(L1.windDirection),
      parseFloat(L1.windSpeed),
      parseFloat(L1.temperature),
      parseFloat(L1.precipitation),
      parseFloat(L2.cloudiness),
      parseFloat(L2.windDirection),
      parseFloat(L2.windSpeed),
      parseFloat(L2.temperature),
      parseFloat(L2.precipitation),
    ];
    const ans = [
      parseFloat(answer[0]),
      parseFloat(answer[1]),
      parseFloat(answer[2]),
      parseFloat(answer[3]),
      parseFloat(answer[4]),
      parseFloat(answer[5]),
      parseFloat(answer[6]),
      parseFloat(answer[7]),
      parseFloat(answer[8]),
      parseFloat(answer[9]),
    ];

    const diff = [
      inp[0] - ans[0],
      inp[1] - ans[1],
      inp[2] - ans[2],
      inp[3] - ans[3],
      inp[4] - ans[4],
      inp[5] - ans[5],
      inp[6] - ans[6],
      inp[7] - ans[7],
      inp[8] - ans[8],
      inp[9] - ans[9],
    ];
    const res = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // 지역1 운량
    if (diff[0] === 0) {
      res[0] = 10;
    } else if (diff[0] === 1 || diff[0] === -1) {
      res[0] = 8;
    } else if (diff[0] === 2 || diff[0] === -2) {
      res[0] = 6;
    } else if (diff[0] === 3 || diff[0] === -3) {
      res[0] = 4;
    } else if (diff[0] === 4 || diff[0] === -4) {
      res[0] = 2;
    } else {
      res[0] = 0;
    }

    // 지역1 풍향
    if (diff[1] === 0) {
      res[1] = 10;
    } else if (
      diff[1] === 22.5 ||
      diff[1] === -22.5 ||
      diff[1] === 337.5 ||
      diff[1] === -337.5
    ) {
      res[1] = 8;
    } else if (
      diff[1] === 45 ||
      diff[1] === -45 ||
      diff[1] === 315 ||
      diff[1] === -315
    ) {
      res[1] = 6;
    } else if (
      diff[1] === 67.5 ||
      diff[1] === -67.5 ||
      diff[1] === 292.5 ||
      diff[1] === -292.5
    ) {
      res[1] = 4;
    } else if (
      diff[1] === 90 ||
      diff[1] === -90 ||
      diff[1] === 270 ||
      diff[1] === -270
    ) {
      res[1] = 2;
    } else {
      res[1] = 0;
    }

    // 지역1 풍속
    if (diff[2] === 0) {
      res[2] = 10;
    } else if (diff[2] === 1 || diff[2] === -1) {
      res[2] = 7;
    } else if (diff[2] === 2 || diff[2] === -2) {
      res[2] = 4;
    } else if (diff[2] === 3 || diff[2] === -3) {
      res[2] = 1;
    } else {
      res[2] = 0;
    }

    // 지역1 기온
    if (-1 <= diff[3] && diff[3] <= 1) {
      res[3] = 10;
    } else if (-2 <= diff[3] && diff[3] <= 2) {
      res[3] = 8;
    } else if (-3 <= diff[3] && diff[3] <= 3) {
      res[3] = 6;
    } else if (-4 <= diff[3] && diff[3] <= 4) {
      res[3] = 4;
    } else if (-5 <= diff[3] && diff[3] <= 5) {
      res[3] = 2;
    } else {
      res[3] = 0;
    }

    // 지역1 강수량
    if (diff[4] === 0) {
      res[4] = 10;
    } else if (diff[4] === 1 || diff[4] === -1) {
      res[4] = 7;
    } else if (diff[4] === 2 || diff[4] === -2) {
      res[4] = 4;
    } else if (diff[4] === 3 || diff[4] === -3) {
      res[4] = 1;
    } else {
      res[4] = 0;
    }

    // 지역2 운량
    if (diff[5] === 0) {
      res[5] = 10;
    } else if (diff[5] === 1 || diff[5] === -1) {
      res[5] = 8;
    } else if (diff[5] === 2 || diff[5] === -2) {
      res[5] = 6;
    } else if (diff[5] === 3 || diff[5] === -3) {
      res[5] = 4;
    } else if (diff[5] === 4 || diff[5] === -4) {
      res[5] = 2;
    } else {
      res[5] = 0;
    }

    // 지역2 풍향
    if (diff[6] === 0) {
      res[6] = 10;
    } else if (
      diff[6] === 22.5 ||
      diff[6] === -22.5 ||
      diff[6] === 337.5 ||
      diff[6] === -337.5
    ) {
      res[6] = 8;
    } else if (
      diff[6] === 45 ||
      diff[6] === -45 ||
      diff[6] === 315 ||
      diff[6] === -315
    ) {
      res[6] = 6;
    } else if (
      diff[6] === 67.5 ||
      diff[6] === -67.5 ||
      diff[6] === 292.5 ||
      diff[6] === -292.5
    ) {
      res[6] = 4;
    } else if (
      diff[6] === 90 ||
      diff[6] === -90 ||
      diff[6] === 270 ||
      diff[6] === -270
    ) {
      res[6] = 2;
    } else {
      res[6] = 0;
    }

    // 지역2 풍속
    if (diff[7] === 0) {
      res[7] = 10;
    } else if (diff[7] === 1 || diff[7] === -1) {
      res[7] = 7;
    } else if (diff[7] === 2 || diff[7] === -2) {
      res[7] = 4;
    } else if (diff[7] === 3 || diff[7] === -3) {
      res[7] = 1;
    } else {
      res[7] = 0;
    }

    // 지역2 기온
    if (-1 <= diff[8] && diff[8] <= 1) {
      res[8] = 10;
    } else if (-2 <= diff[8] && diff[8] <= 2) {
      res[8] = 8;
    } else if (-3 <= diff[8] && diff[8] <= 3) {
      res[8] = 6;
    } else if (-4 <= diff[8] && diff[8] <= 4) {
      res[8] = 4;
    } else if (-5 <= diff[8] && diff[8] <= 5) {
      res[8] = 2;
    } else {
      res[8] = 0;
    }

    // 지역2 강수량
    if (diff[9] === 0) {
      res[9] = 10;
    } else if (diff[9] === 1 || diff[9] === -1) {
      res[9] = 7;
    } else if (diff[9] === 2 || diff[9] === -2) {
      res[9] = 4;
    } else if (diff[9] === 3 || diff[9] === -3) {
      res[9] = 1;
    } else {
      res[9] = 0;
    }

    // 계산
    const evidScore = evid * 5;
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      sum = sum + res[i];
    }
    sum = sum + evidScore;

    setDifference(diff);
    setResult(res);
    setEvidResult(evidScore);
    setScore(sum);
  };

  const onReset = () => {
    setText0("");
    setText1("");
    setText2("");
    setText3("");
    setText4("");
    setText5("");
    setText6("");
    setText7("");
    setText8("");
    setText9("");
    setEvid(10);

    setL1({
      cloudiness: null,
      windDirection: null,
      windSpeed: null,
      temperature: null,
      precipitation: null,
    });
    setL2({
      cloudiness: null,
      windDirection: null,
      windSpeed: null,
      temperature: null,
      precipitation: null,
    });
    setResult([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setEvidResult(0);
    setScore(0);
  };

  const theme = createTheme({
    typography: {
      fontFamily: "'Noto Sans Kr', sans-serif",
    },
  });

  return (
    <Box>
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
              정답코드 입력하기
            </Box>
            <StringInput setAnswer={setAnswer} />
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
              나의 답안 입력하기
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
                <Divider />
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
              근거개수 및 채점하기
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Box>근거개수 : {evid}개</Box>
              <Box sx={{ padding: "1rem" }}>
                <Slider
                  defaultValue={10}
                  value={evid}
                  onChange={onEvidChange}
                  valueLabelDisplay="auto"
                  step={1}
                  marks={marks}
                  min={0}
                  max={10}
                />
              </Box>
            </Box>
            <ThemeProvider theme={theme}>
              <ButtonGroup
                fullWidth
                disableElevation
                variant="outlined"
                size="small"
              >
                <Button variant="outlined" color="error" onClick={onReset}>
                  Reset
                </Button>
                <Button variant="outlined" color="primary" onClick={onScore}>
                  Score
                </Button>
              </ButtonGroup>
            </ThemeProvider>
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
              채점결과
            </Box>
            <TableContainer component={Paper} sx={{ borderRadius: "0.5rem" }}>
              <Table size="small">
                <TableHead>
                  <TableRow
                    sx={{
                      "& th": {
                        padding: { xs: "0.2rem 0rem", md: "0.3rem" },
                        fontSize: "0.9rem",
                      },
                    }}
                  >
                    <TableCell component="th" align="center" colSpan={5}>
                      지역1
                    </TableCell>
                    <TableCell component="th" align="center" colSpan={5}>
                      지역2
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      "& td": { padding: "0.4rem", fontSize: "0.9rem" },
                    }}
                  >
                    <TableCell align="center">운량</TableCell>
                    <TableCell align="center">풍향</TableCell>
                    <TableCell align="center">풍속</TableCell>
                    <TableCell align="center">기온</TableCell>
                    <TableCell align="center">강수</TableCell>
                    <TableCell align="center">운량</TableCell>
                    <TableCell align="center">풍향</TableCell>
                    <TableCell align="center">풍속</TableCell>
                    <TableCell align="center">기온</TableCell>
                    <TableCell align="center">강수</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "& td": { padding: "0.4rem 0rem", fontSize: "0.9rem" },
                    }}
                  >
                    <TableCell align="center">{result[0]}</TableCell>
                    <TableCell align="center">{result[1]}</TableCell>
                    <TableCell align="center">{result[2]}</TableCell>
                    <TableCell align="center">{result[3]}</TableCell>
                    <TableCell align="center">{result[4]}</TableCell>
                    <TableCell align="center">{result[5]}</TableCell>
                    <TableCell align="center">{result[6]}</TableCell>
                    <TableCell align="center">{result[7]}</TableCell>
                    <TableCell align="center">{result[8]}</TableCell>
                    <TableCell align="center">{result[9]}</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "& td": {
                        padding: { xs: "0.4rem 0rem", md: "0.3rem" },
                        fontSize: "0.9rem",
                      },
                    }}
                  >
                    <TableCell align="center" colSpan={10}>
                      근거점수
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "& td": { padding: "0.3rem 0rem", fontSize: "0.9rem" },
                    }}
                  >
                    <TableCell align="center" colSpan={10}>
                      {evidResult}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "& td": {
                        padding: { xs: "0.4rem 0rem", md: "0.3rem" },
                        fontSize: "0.9rem",
                      },
                    }}
                  >
                    <TableCell align="center" colSpan={10}>
                      채점결과
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "& td": { padding: "0.3rem 0rem", fontSize: "0.9rem" },
                    }}
                  >
                    <TableCell align="center" colSpan={10}>
                      {score}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Calculator;
