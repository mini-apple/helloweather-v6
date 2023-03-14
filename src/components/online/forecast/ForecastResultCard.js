import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

import Divider from "@mui/material/Divider";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const ForecastResultCard = ({ participant, area_1, area_2 }) => {
  const [open, setOpen] = useState(false);
  const [answerTable, setAnswerTable] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const onOpenClick = () => {
    setOpen(!open);
    onAnswerTable();
  };

  const onAnswerTable = () => {
    const inpList = participant.userAnswer.split("/");
    const newList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // 3.정답 표시해주기
    // 3-1. L1 운량
    newList[0] = inpList[0];
    // 3-2. 풍향
    if (inpList[1] === "0") {
      newList[1] = "N";
    } else if (inpList[1] === "22.5") {
      newList[1] = "NNE";
    } else if (inpList[1] === "45") {
      newList[1] = "NE";
    } else if (inpList[1] === "67.5") {
      newList[1] = "ENE";
    } else if (inpList[1] === "90") {
      newList[1] = "E";
    } else if (inpList[1] === "112.5") {
      newList[1] = "ESE";
    } else if (inpList[1] === "135") {
      newList[1] = "SE";
    } else if (inpList[1] === "157.5") {
      newList[1] = "SSE";
    } else if (inpList[1] === "180") {
      newList[1] = "S";
    } else if (inpList[1] === "202.5") {
      newList[1] = "SSW";
    } else if (inpList[1] === "225") {
      newList[1] = "SW";
    } else if (inpList[1] === "247.5") {
      newList[1] = "WSW";
    } else if (inpList[1] === "270") {
      newList[1] = "W";
    } else if (inpList[1] === "292.5") {
      newList[1] = "WNW";
    } else if (inpList[1] === "315") {
      newList[1] = "NW";
    } else if (inpList[1] === "337.5") {
      newList[1] = "NNW";
    }
    // 3-3.풍속
    if (inpList[2] === "0") {
      newList[2] = "0 m/s ≤ ~ < 0.5 m/s";
    } else if (inpList[2] === "1") {
      newList[2] = "0.5 m/s ≤ ~ < 5 m/s";
    } else if (inpList[2] === "2") {
      newList[2] = "5 m/s ≤ ~ < 10 m/s";
    } else if (inpList[2] === "3") {
      newList[2] = "10 m/s ≤ ~ < 15 m/s";
    } else if (inpList[2] === "4") {
      newList[2] = "15 m/s ≤ ~ < 20 m/s";
    } else if (inpList[2] === "5") {
      newList[2] = "20 m/s 이상";
    }
    // 3-4.기온
    newList[3] = inpList[3];
    // 3-5. 강수량
    if (inpList[4] === "0") {
      newList[4] = "X";
    } else if (inpList[4] === "1") {
      newList[4] = "0.0 mm ≤ ~ < 5 mm";
    } else if (inpList[4] === "2") {
      newList[4] = "5 mm ≤ ~ < 10 mm";
    } else if (inpList[4] === "3") {
      newList[4] = "10 mm ≤ ~ < 20 mm";
    } else if (inpList[4] === "4") {
      newList[4] = "20 mm ≤ ~ < 30 mm";
    } else if (inpList[4] === "5") {
      newList[4] = "30 mm ≤ ~ < 50 mm";
    } else if (inpList[4] === "6") {
      newList[4] = "50 mm ≤ ~ < 80 mm";
    } else if (inpList[4] === "7") {
      newList[4] = "80 mm ≤ ~ < 120 mm";
    } else if (inpList[4] === "8") {
      newList[4] = "120 mm 이상";
    }
    // 3-1. L1 운량
    newList[5] = inpList[5];
    // 3-2. 풍향
    if (inpList[6] === "0") {
      newList[6] = "N";
    } else if (inpList[6] === "22.5") {
      newList[6] = "NNE";
    } else if (inpList[6] === "45") {
      newList[6] = "NE";
    } else if (inpList[6] === "67.5") {
      newList[6] = "ENE";
    } else if (inpList[6] === "90") {
      newList[6] = "E";
    } else if (inpList[6] === "112.5") {
      newList[6] = "ESE";
    } else if (inpList[6] === "135") {
      newList[6] = "SE";
    } else if (inpList[6] === "157.5") {
      newList[6] = "SSE";
    } else if (inpList[6] === "180") {
      newList[6] = "S";
    } else if (inpList[6] === "202.5") {
      newList[6] = "SSW";
    } else if (inpList[6] === "225") {
      newList[6] = "SW";
    } else if (inpList[6] === "247.5") {
      newList[6] = "WSW";
    } else if (inpList[6] === "270") {
      newList[6] = "W";
    } else if (inpList[6] === "292.5") {
      newList[6] = "WNW";
    } else if (inpList[6] === "315") {
      newList[6] = "NW";
    } else if (inpList[6] === "337.5") {
      newList[6] = "NNW";
    }
    // 3-3.풍속
    if (inpList[7] === "0") {
      newList[7] = "0 m/s ≤ ~ < 0.5 m/s";
    } else if (inpList[7] === "1") {
      newList[7] = "0.5 m/s ≤ ~ < 5 m/s";
    } else if (inpList[7] === "2") {
      newList[7] = "5 m/s ≤ ~ < 10 m/s";
    } else if (inpList[7] === "3") {
      newList[7] = "10 m/s ≤ ~ < 15 m/s";
    } else if (inpList[7] === "4") {
      newList[7] = "15 m/s ≤ ~ < 20 m/s";
    } else if (inpList[7] === "5") {
      newList[7] = "20 m/s 이상";
    }
    // 3-4.기온
    newList[8] = inpList[8];
    // 3-5. 강수량
    if (inpList[9] === "0") {
      newList[9] = "X";
    } else if (inpList[9] === "1") {
      newList[9] = "0.0 mm ≤ ~ < 5 mm";
    } else if (inpList[9] === "2") {
      newList[9] = "5 mm ≤ ~ < 10 mm";
    } else if (inpList[9] === "3") {
      newList[9] = "10 mm ≤ ~ < 20 mm";
    } else if (inpList[9] === "4") {
      newList[9] = "20 mm ≤ ~ < 30 mm";
    } else if (inpList[9] === "5") {
      newList[9] = "30 mm ≤ ~ < 50 mm";
    } else if (inpList[9] === "6") {
      newList[9] = "50 mm ≤ ~ < 80 mm";
    } else if (inpList[9] === "7") {
      newList[9] = "80 mm ≤ ~ < 120 mm";
    } else if (inpList[9] === "8") {
      newList[9] = "120 mm 이상";
    }
    setAnswerTable(newList);
  };

  return (
    <Box
      bgcolor={"action.hover"}
      sx={{
        padding: { xs: "0.2rem 0.5rem", md: "0.2rem 1rem" },
        borderRadius: "0.5rem",
        margin: "1rem 0rem",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Box sx={{ fontSize: "0.6rem" }}>이름</Box>
          <Box>{participant.userName}</Box>
        </Box>
        <Box>
          <Box sx={{ fontSize: "0.6rem" }}>점수</Box>
          <Box>{participant.userScore}</Box>
        </Box>
        <Box sx={{ lineHeight: "2.1rem" }}>
          <IconButton aria-label="delete" size="small" onClick={onOpenClick}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
      {open && (
        <>
          <Box mt={3} sx={{ fontSize: "0.9rem", fontWeight: "400" }}>
            1. 입력값
          </Box>
          <TableContainer
            sx={{
              margin: "0.5rem 0rem",
              border: "1px solid rgba(5, 5, 5, 10%)",
              borderRadius: "0.5rem",
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      padding: { xs: "0.2rem 0rem", md: "0.2rem" },
                      fontSize: "0.9rem",
                    },
                  }}
                >
                  <TableCell></TableCell>
                  <TableCell component="th" align="center">
                    {area_1}
                  </TableCell>
                  <TableCell component="th" align="center">
                    {area_2}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    "& td": {
                      padding: "0.4rem 0.6rem",
                      fontSize: "0.9rem",
                    },
                  }}
                >
                  <TableCell align="center">운량</TableCell>
                  <TableCell align="center">{answerTable[0]}</TableCell>
                  <TableCell align="center">{answerTable[5]}</TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "& td": {
                      padding: "0.4rem 0.6rem",
                      fontSize: "0.9rem",
                    },
                  }}
                >
                  <TableCell align="center">풍향</TableCell>
                  <TableCell align="center">{answerTable[1]}</TableCell>
                  <TableCell align="center">{answerTable[6]}</TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "& td": {
                      padding: "0.4rem 0.6rem",
                      fontSize: "0.9rem",
                    },
                  }}
                >
                  <TableCell align="center">풍속</TableCell>
                  <TableCell align="center">{answerTable[2]}</TableCell>
                  <TableCell align="center">{answerTable[7]}</TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "& td": {
                      padding: "0.4rem 0.6rem",
                      fontSize: "0.9rem",
                    },
                  }}
                >
                  <TableCell align="center">기온</TableCell>
                  <TableCell align="center">{answerTable[3]}</TableCell>
                  <TableCell align="center">{answerTable[8]}</TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "& td": {
                      padding: "0.4rem 0.6rem",
                      fontSize: "0.9rem",
                    },
                  }}
                >
                  <TableCell align="center">강수</TableCell>
                  <TableCell align="center">{answerTable[4]}</TableCell>
                  <TableCell align="center">{answerTable[9]}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Box mt={3} sx={{ fontSize: "0.9rem", fontWeight: "400" }}>
            2. 점수
          </Box>

          <TableContainer
            sx={{
              margin: "0.5rem 0rem",
              border: "1px solid rgba(5, 5, 5, 10%)",
              borderRadius: "0.5rem",
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      padding: { xs: "0.2rem 0rem", md: "0.2rem" },
                      fontSize: "0.9rem",
                    },
                  }}
                >
                  <TableCell component="th" align="center" colSpan={5}>
                    {area_1}
                  </TableCell>
                  <TableCell component="th" align="center" colSpan={5}>
                    {area_2}
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
                  <TableCell align="center">
                    {participant.userResult[0]}
                  </TableCell>
                  <TableCell align="center">
                    {participant.userResult[1]}
                  </TableCell>
                  <TableCell align="center">
                    {participant.userResult[2]}
                  </TableCell>
                  <TableCell align="center">
                    {participant.userResult[3]}
                  </TableCell>
                  <TableCell align="center">
                    {participant.userResult[4]}
                  </TableCell>
                  <TableCell align="center">
                    {participant.userResult[5]}
                  </TableCell>
                  <TableCell align="center">
                    {participant.userResult[6]}
                  </TableCell>
                  <TableCell align="center">
                    {participant.userResult[7]}
                  </TableCell>
                  <TableCell align="center">
                    {participant.userResult[8]}
                  </TableCell>
                  <TableCell align="center">
                    {participant.userResult[9]}
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
                    근거점수
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "& td": { padding: "0.3rem 0rem", fontSize: "0.9rem" },
                  }}
                >
                  <TableCell align="center" colSpan={10}>
                    {participant.userEvid}
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
                    {participant.userScore}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default ForecastResultCard;
