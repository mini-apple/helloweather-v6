import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import Divider from "@mui/material/Divider";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import InputCloudiness from "components/input/InputCloudiness";
import InputWindDiriction from "components/input/InputWindDirenction";
import InputWindSpeed from "components/input/InputWindSpeed";
import InputTemperature from "components/input/InputTemperature";
import InputPrecipitation from "components/input/InputPrecipitation";

import { auth, db, storage } from "fbase";
import {
  collection,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
  doc,
  onSnapshot,
} from "firebase/firestore";
import ForecastResultCard from "./ForecastResultCard";

const ForecastResultPage = ({ userObj }) => {
  const { semester, id, spaceName } = useParams();
  const [forecastObj, setForecastObj] = useState({
    area_1: "",
    area_2: "",
    forecastDate: "",
    forecastStatus: "",
    leaderAnswer: "",
    leaderAnswerInAdvance: "",
    leaderName: "",
    leaderSpaceName: "",
    leaderUID: "",
    timestamp: "",
    semester: "",
    userAnswerObj: {},
    userList: [],
  });
  const [participants, setParticipants] = useState([]);
  const [answerTable, setAnswerTable] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  useEffect(() => {
    getForecastGameData();
  }, []);

  const getForecastGameData = async () => {
    const docRef = doc(db, `${semester}`, id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setForecastObj(data);
      findName(data);
      onAnswerTable(data.leaderAnswer);
    }
  };

  const findName = async (data) => {
    //uid로 이름찾기
    const UIDList = Object.keys(data.userAnswerObj);
    const nameList = [];
    try {
      const q = query(collection(db, "users"), where("uid", "in", UIDList));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        nameList.push(doc.data().name);
      });
      setParticipants(nameList);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const onAnswerTable = (leaderAnswer) => {
    const inpList = leaderAnswer.split("/");
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
    <Grid container>
      <Grid item xs={12} md={6}>
        <Paper
          sx={{
            margin: { xs: "1rem 0rem 0rem 0rem", md: "1rem" },
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
            예보 정보
          </Box>

          <Box sx={{ display: "flex", gap: { xs: "5rem", md: "10rem" } }}>
            <Box>
              <Box mb={3}>
                <Box sx={{ fontSize: "0.8rem" }}>학기</Box>
                <Box sx={{ fontSize: "1.1rem" }}>
                  {forecastObj.semester}학기
                </Box>
              </Box>
              <Box mb={3}>
                <Box sx={{ fontSize: "0.8rem" }}>인도자</Box>
                <Box sx={{ fontSize: "1.1rem" }}>{forecastObj.leaderName}</Box>
              </Box>
              <Box mb={3}>
                <Box sx={{ fontSize: "0.8rem" }}>지역</Box>
                <Box sx={{ fontSize: "1.1rem" }}>
                  {`${forecastObj.area_1}, ${forecastObj.area_2}`}
                </Box>
              </Box>
            </Box>
            <Box>
              <Box mb={3}>
                <Box sx={{ fontSize: "0.8rem" }}>일시</Box>
                <Box sx={{ fontSize: "1.1rem" }}>
                  {forecastObj.forecastDate}
                </Box>
              </Box>
              <Box mb={3}>
                <Box sx={{ fontSize: "0.8rem" }}>등록번호</Box>
                <Box sx={{ fontSize: "1.1rem" }}>{forecastObj.timestamp}</Box>
              </Box>
              <Box mb={1}>
                <Box sx={{ fontSize: "0.8rem" }}>제출됨</Box>
                <Box sx={{ fontSize: "1.1rem" }}>
                  {Object.keys(forecastObj.userAnswerObj).length} 명
                </Box>
              </Box>
            </Box>
          </Box>

          <Box mb={5}>
            <Box sx={{ fontSize: "0.8rem" }}>참여자 명단</Box>
            <Box sx={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {participants.map((p) => (
                <Box>{p}</Box>
              ))}
            </Box>
          </Box>

          <Box mt={2} mb={2}>
            <Divider />
          </Box>
          <Box
            sx={{
              fontSize: "1.1rem",
              fontWeight: "500",
              marginBottom: "2rem",
            }}
          >
            정답표
          </Box>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell component="th" align="center">
                    {forecastObj.area_1}
                  </TableCell>
                  <TableCell component="th" align="center">
                    {forecastObj.area_2}
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
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper
          sx={{
            margin: { xs: "1rem 0rem 0rem 0rem", md: "1rem" },
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
            예보게임 결과
          </Box>
          <Box>
            {forecastObj.userList.map((user) => (
              <ForecastResultCard
                participant={forecastObj.userAnswerObj[user]}
                area_1={forecastObj.area_1}
                area_2={forecastObj.area_2}
              />
            ))}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ForecastResultPage;
