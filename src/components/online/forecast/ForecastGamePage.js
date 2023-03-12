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

const ForecastGamePage = ({ userObj }) => {
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
  const [showInput, setShowInput] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [isLeader, setIsLeader] = useState(false);
  const [participants, setParticipants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getForecastGameData();
  }, []);

  const getForecastGameData = async () => {
    const docRef = doc(db, `${semester}`, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      if (data.leaderUID === userObj.uid) {
        setIsLeader(true);
        navigate(`/forecast/leader/${semester}/${id}`);
      }
      // 이전 입력데이터 있을 경우 가져오기
      if (data.userAnswerObj.hasOwnProperty(userObj.uid)) {
        const ok = window.confirm(
          `${userObj.displayName}님의 이전 데이터가 있습니다.\n이전 데이터를 가져오시겠습니까?`
        );

        if (ok) {
          const ansString = data.userAnswerObj[userObj.uid].userAnswer;
          const inpList = ansString.split("/");
          for (let i = 0; i < inpList.length; i++) {
            inpList[i] = Number(inpList[i]);
          }
          setText0(inpList[0]);
          setText1(inpList[1]);
          setText2(inpList[2]);
          setText3(inpList[3]);
          setText4(inpList[4]);
          setText5(inpList[5]);
          setText6(inpList[6]);
          setText7(inpList[7]);
          setText8(inpList[8]);
          setText9(inpList[9]);
          setL1({
            cloudiness: inpList[0],
            windDirection: inpList[1],
            windSpeed: inpList[2],
            temperature: inpList[3],
            precipitation: inpList[4],
          });
          setL2({
            cloudiness: inpList[5],
            windDirection: inpList[6],
            windSpeed: inpList[7],
            temperature: inpList[8],
            precipitation: inpList[9],
          });
        }
      }
    } else {
      console.log("No such document!");
    }

    onSnapshot(docRef, (doc) => {
      const data = doc.data();
      setForecastObj(data);
      findName(data);
    });
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

  const onShowInput = () => {
    if (
      L1.cloudiness === "" ||
      L1.windDirection === "" ||
      L1.windSpeed === "" ||
      L1.temperature === "" ||
      L1.precipitation === "" ||
      L2.cloudiness === "" ||
      L2.windDirection === "" ||
      L2.windSpeed === "" ||
      L2.temperature === "" ||
      L2.precipitation === ""
    ) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const newList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // 3.정답 표시해주기
    // 3-1. L1 운량
    newList[0] = L1.cloudiness;
    // 3-2. 풍향
    if (L1.windDirection === 0) {
      newList[1] = "N";
    } else if (L1.windDirection === 22.5) {
      newList[1] = "NNE";
    } else if (L1.windDirection === 45) {
      newList[1] = "NE";
    } else if (L1.windDirection === 67.5) {
      newList[1] = "ENE";
    } else if (L1.windDirection === 90) {
      newList[1] = "E";
    } else if (L1.windDirection === 112.5) {
      newList[1] = "ESE";
    } else if (L1.windDirection === 135) {
      newList[1] = "SE";
    } else if (L1.windDirection === 157.5) {
      newList[1] = "SSE";
    } else if (L1.windDirection === 180) {
      newList[1] = "S";
    } else if (L1.windDirection === 202.5) {
      newList[1] = "SSW";
    } else if (L1.windDirection === 225) {
      newList[1] = "SW";
    } else if (L1.windDirection === 247.5) {
      newList[1] = "WSW";
    } else if (L1.windDirection === 270) {
      newList[1] = "W";
    } else if (L1.windDirection === 292.5) {
      newList[1] = "WNW";
    } else if (L1.windDirection === 315) {
      newList[1] = "NW";
    } else if (L1.windDirection === 337.5) {
      newList[1] = "NNW";
    } else {
      newList[1] = "";
    }
    // 3-3.풍속
    if (L1.windSpeed === 0) {
      newList[2] = "0 m/s ≤ ~ < 0.5 m/s";
    } else if (L1.windSpeed === 1) {
      newList[2] = "0.5 m/s ≤ ~ < 5 m/s";
    } else if (L1.windSpeed === 2) {
      newList[2] = "5 m/s ≤ ~ < 10 m/s";
    } else if (L1.windSpeed === 3) {
      newList[2] = "10 m/s ≤ ~ < 15 m/s";
    } else if (L1.windSpeed === 4) {
      newList[2] = "15 m/s ≤ ~ < 20 m/s";
    } else if (L1.windSpeed === 5) {
      newList[2] = "20 m/s 이상";
    } else {
      newList[2] = "";
    }
    // 3-4.기온
    newList[3] = L1.temperature;
    // 3-5. 강수량
    if (L1.precipitation === 0) {
      newList[4] = "X";
    } else if (L1.precipitation === 1) {
      newList[4] = "0.0 mm ≤ ~ < 5 mm";
    } else if (L1.precipitation === 2) {
      newList[4] = "5 mm ≤ ~ < 10 mm";
    } else if (L1.precipitation === 3) {
      newList[4] = "10 mm ≤ ~ < 20 mm";
    } else if (L1.precipitation === 4) {
      newList[4] = "20 mm ≤ ~ < 30 mm";
    } else if (L1.precipitation === 5) {
      newList[4] = "30 mm ≤ ~ < 50 mm";
    } else if (L1.precipitation === 6) {
      newList[4] = "50 mm ≤ ~ < 80 mm";
    } else if (L1.precipitation === 7) {
      newList[4] = "80 mm ≤ ~ < 120 mm";
    } else if (L1.precipitation === 8) {
      newList[4] = "120 mm 이상";
    } else {
      newList[4] = "";
    }
    // 3-1. L1 운량
    newList[5] = L2.cloudiness;
    // 3-2. 풍향
    if (L2.windDirection === 0) {
      newList[6] = "N";
    } else if (L2.windDirection === 22.5) {
      newList[6] = "NNE";
    } else if (L2.windDirection === 45) {
      newList[6] = "NE";
    } else if (L2.windDirection === 67.5) {
      newList[6] = "ENE";
    } else if (L2.windDirection === 90) {
      newList[6] = "E";
    } else if (L2.windDirection === 112.5) {
      newList[6] = "ESE";
    } else if (L2.windDirection === 135) {
      newList[6] = "SE";
    } else if (L2.windDirection === 157.5) {
      newList[6] = "SSE";
    } else if (L2.windDirection === 180) {
      newList[6] = "S";
    } else if (L2.windDirection === 202.5) {
      newList[6] = "SSW";
    } else if (L2.windDirection === 225) {
      newList[6] = "SW";
    } else if (L2.windDirection === 247.5) {
      newList[6] = "WSW";
    } else if (L2.windDirection === 270) {
      newList[6] = "W";
    } else if (L2.windDirection === 292.5) {
      newList[6] = "WNW";
    } else if (L2.windDirection === 315) {
      newList[6] = "NW";
    } else if (L2.windDirection === 337.5) {
      newList[6] = "NNW";
    } else {
      newList[6] = "";
    }
    // 3-3.풍속
    if (L2.windSpeed === 0) {
      newList[7] = "0 m/s ≤ ~ < 0.5 m/s";
    } else if (L2.windSpeed === 1) {
      newList[7] = "0.5 m/s ≤ ~ < 5 m/s";
    } else if (L2.windSpeed === 2) {
      newList[7] = "5 m/s ≤ ~ < 10 m/s";
    } else if (L2.windSpeed === 3) {
      newList[7] = "10 m/s ≤ ~ < 15 m/s";
    } else if (L2.windSpeed === 4) {
      newList[7] = "15 m/s ≤ ~ < 20 m/s";
    } else if (L2.windSpeed === 5) {
      newList[7] = "20 m/s 이상";
    } else {
      newList[7] = "";
    }
    // 3-4.기온
    newList[8] = L2.temperature;
    // 3-5. 강수량
    if (L2.precipitation === 0) {
      newList[9] = "X";
    } else if (L2.precipitation === 1) {
      newList[9] = "0.0 mm ≤ ~ < 5 mm";
    } else if (L2.precipitation === 2) {
      newList[9] = "5 mm ≤ ~ < 10 mm";
    } else if (L2.precipitation === 3) {
      newList[9] = "10 mm ≤ ~ < 20 mm";
    } else if (L2.precipitation === 4) {
      newList[9] = "20 mm ≤ ~ < 30 mm";
    } else if (L2.precipitation === 5) {
      newList[9] = "30 mm ≤ ~ < 50 mm";
    } else if (L2.precipitation === 6) {
      newList[9] = "50 mm ≤ ~ < 80 mm";
    } else if (L2.precipitation === 7) {
      newList[9] = "80 mm ≤ ~ < 120 mm";
    } else if (L2.precipitation === 8) {
      newList[9] = "120 mm 이상";
    } else {
      newList[9] = "";
    }

    newList[10] = evid;
    setShowInput(newList);
  };

  const onSubmit = async () => {
    if (
      L1.cloudiness === "" ||
      L1.windDirection === "" ||
      L1.windSpeed === "" ||
      L1.temperature === "" ||
      L1.precipitation === "" ||
      L2.cloudiness === "" ||
      L2.windDirection === "" ||
      L2.windSpeed === "" ||
      L2.temperature === "" ||
      L2.precipitation === ""
    ) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const plainText = `${L1.cloudiness}/${L1.windDirection}/${L1.windSpeed}/${L1.temperature}/${L1.precipitation}/${L2.cloudiness}/${L2.windDirection}/${L2.windSpeed}/${L2.temperature}/${L2.precipitation}`;
    const newForecastObj = forecastObj;
    const uid = userObj.uid;
    newForecastObj.userAnswerObj[uid] = {
      userName: userObj.displayName,
      userUID: userObj.uid,
      userAnswer: plainText,
      userEvid: evid * 5,
    };

    // firestore에 newProfileObj를 저장
    try {
      const docRef = await setDoc(
        doc(db, `${semester}`, `${id}`),
        newForecastObj
      );

      alert(`${userObj.displayName}님의 정답을 제출했습니다.`);
      navigate("/forecast");
    } catch (e) {
      alert(
        `${userObj.displayName}님의 정답 제출을 실패했습니다. \nError adding document: ${e}`
      );
    }
  };

  const [L1, setL1] = useState({
    cloudiness: "",
    windDirection: "",
    windSpeed: "",
    temperature: "",
    precipitation: "",
  });
  const [L2, setL2] = useState({
    cloudiness: "",
    windDirection: "",
    windSpeed: "",
    temperature: "",
    precipitation: "",
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

  const [evid, setEvid] = useState(10);
  const [evidResult, setEvidResult] = useState(0);

  // 근거개수입력
  const onEvidChange = (event) => {
    const {
      target: { value },
    } = event;
    setEvid(value);
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
              <Box mb={1}>
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
        </Paper>
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
            정답 입력하기
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
                  height: "1.5rem",
                }}
              >
                {forecastObj.area_1}
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
                  height: "1.5rem",
                }}
              >
                {forecastObj.area_2}
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
            근거개수 입력하기
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
            정답 제출하기
          </Box>

          <Box mb={2}>
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
                    <TableCell align="center">{showInput[0]}</TableCell>
                    <TableCell align="center">{showInput[5]}</TableCell>
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
                    <TableCell align="center">{showInput[1]}</TableCell>
                    <TableCell align="center">{showInput[6]}</TableCell>
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
                    <TableCell align="center">{showInput[2]}</TableCell>
                    <TableCell align="center">{showInput[7]}</TableCell>
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
                    <TableCell align="center">{showInput[3]}</TableCell>
                    <TableCell align="center">{showInput[8]}</TableCell>
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
                    <TableCell align="center">{showInput[4]}</TableCell>
                    <TableCell align="center">{showInput[9]}</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "& td": {
                        padding: "0.4rem 0.6rem",
                        fontSize: "0.9rem",
                      },
                    }}
                  >
                    <TableCell align="center">근거</TableCell>
                    <TableCell align="center" colSpan={2}>
                      {showInput[10]}개
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <ButtonGroup
            fullWidth
            disableElevation
            variant="outlined"
            size="small"
          >
            <Button variant="outlined" color="success" onClick={onShowInput}>
              입력 확인하기
            </Button>
            <Button variant="outlined" color="primary" onClick={onSubmit}>
              정답 제출하기
            </Button>
          </ButtonGroup>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ForecastGamePage;
