import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import SubdirectoryArrowLeftRoundedIcon from "@mui/icons-material/SubdirectoryArrowLeftRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import Chip from "@mui/material/Chip";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function StringInput({ setAnswer }) {
  const [string, setString] = useState("");
  const [ansVerify, setAnsVerify] = useState(false);
  const [answerList, setAnswerList] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const onStringChange = (event) => {
    const {
      target: { value },
    } = event;
    setString(value);
  };

  const onConvert = () => {
    const inpList = string.split("/");
    const newList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    if (inpList.length !== 10) {
      setAnsVerify(false);
      alert("Unvalid string code!");
      return;
    } else if (inpList.length === 10) {
      setAnsVerify(true);

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
    }
    setAnswerList(newList);

    // 문자 => 숫자 변환
    for (let i = 0; i < 10; i++) {
      inpList[i] = parseFloat(inpList[i]);
    }
    setAnswer(inpList);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [foldTable, setFoldTable] = useState(false);
  const onFoldTable = () => {
    setFoldTable(!foldTable);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="정답코드"
          variant="outlined"
          value={string}
          onChange={onStringChange}
          size="small"
        />
        <IconButton
          variant="outlined"
          onClick={onConvert}
          className="string-input-button"
          color="primary"
        >
          <SubdirectoryArrowLeftRoundedIcon />
        </IconButton>
      </Box>
      {ansVerify ? (
        <>
          <Box sx={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
            <Box>
              <Chip
                label="Verified"
                color="success"
                variant="outlined"
                size="small"
                icon={<CheckCircleOutlineRoundedIcon />}
                deleteIcon={
                  foldTable ? (
                    <KeyboardArrowDownIcon />
                  ) : (
                    <KeyboardArrowUpIcon />
                  )
                }
                onDelete={onFoldTable}
              />
            </Box>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Chip
                label="View"
                color="primary"
                variant="outlined"
                size="small"
                deleteIcon={<SearchIcon />}
                onDelete={handleOpen}
              />
            </Box>
          </Box>
          {foldTable ? (
            <Box></Box>
          ) : (
            <Box sx={{ marginTop: "1rem" }}>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell component="th" align="center">
                        지역1
                      </TableCell>
                      <TableCell component="th" align="center">
                        지역2
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
                      <TableCell align="center">{answerList[0]}</TableCell>
                      <TableCell align="center">{answerList[5]}</TableCell>
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
                      <TableCell align="center">{answerList[1]}</TableCell>
                      <TableCell align="center">{answerList[6]}</TableCell>
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
                      <TableCell align="center">{answerList[2]}</TableCell>
                      <TableCell align="center">{answerList[7]}</TableCell>
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
                      <TableCell align="center">{answerList[3]}</TableCell>
                      <TableCell align="center">{answerList[8]}</TableCell>
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
                      <TableCell align="center">{answerList[4]}</TableCell>
                      <TableCell align="center">{answerList[9]}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </>
      ) : (
        <Box></Box>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box
          bgcolor={"background.default"}
          color={"text.primary"}
          sx={{
            width: "50vw",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            border: "1px solid rgba(5, 5, 5, 10%)",
            borderRadius: "1rem",
            padding: "1rem",
          }}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell component="th" align="center">
                    지역1
                  </TableCell>
                  <TableCell component="th" align="center">
                    지역2
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">운량</TableCell>
                  <TableCell align="center">{answerList[0]}</TableCell>
                  <TableCell align="center">{answerList[5]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">풍향</TableCell>
                  <TableCell align="center">{answerList[1]}</TableCell>
                  <TableCell align="center">{answerList[6]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">풍속</TableCell>
                  <TableCell align="center">{answerList[2]}</TableCell>
                  <TableCell align="center">{answerList[7]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">기온</TableCell>
                  <TableCell align="center">{answerList[3]}</TableCell>
                  <TableCell align="center">{answerList[8]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">강수량</TableCell>
                  <TableCell align="center">{answerList[4]}</TableCell>
                  <TableCell align="center">{answerList[9]}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </>
  );
}
