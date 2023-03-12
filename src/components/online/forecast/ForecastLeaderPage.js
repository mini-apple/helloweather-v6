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
  updateDoc,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";

const ForecastLeaderPage = ({ userObj }) => {
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
  const [isLeader, setIsLeader] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getForecastGameData();
  }, []);

  const getForecastGameData = async () => {
    const docRef = doc(db, `${semester}`, id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      // 이전 입력데이터 있을 경우 가져오기
      if (data.leaderAnswerInAdvance) {
        const ansString = data.leaderAnswer;
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

    onSnapshot(docRef, (doc) => {
      const data = doc.data();
      if (data.leaderUID === userObj.uid) {
        setIsLeader(true);
      }
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

  const closeForecastGame = async () => {
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

    const UIDList = Object.keys(forecastObj.userAnswerObj);
    console.log(UIDList);
    const newForecastObj = {
      ...forecastObj,
      leaderAnswer: plainText,
      userList: UIDList,
    };

    // firestore에 newProfileObj를 저장
    try {
      const docRef = await setDoc(
        doc(db, `${semester}`, `${id}`),
        newForecastObj
      );
      setConfirm(true);
      alert(
        `${participants.length}명의 정답을 채점할 수 있습니다.\n채점하기를 눌러 채점을 완료해주세요.`
      );
    } catch (e) {
      alert(`Error adding document: ${e}`);
    }
  };

  const onCalculate = async () => {
    if (!confirm) {
      alert(`정답제출 마감하기를 눌러주세요.`);
      return;
    }
    const userList = forecastObj.userList;
    const ansList = forecastObj.leaderAnswer.split("/");
    const ans = [
      parseFloat(ansList[0]),
      parseFloat(ansList[1]),
      parseFloat(ansList[2]),
      parseFloat(ansList[3]),
      parseFloat(ansList[4]),
      parseFloat(ansList[5]),
      parseFloat(ansList[6]),
      parseFloat(ansList[7]),
      parseFloat(ansList[8]),
      parseFloat(ansList[9]),
    ];

    for (let i = 0; i < userList.length; i++) {
      const uid = userList[i];
      const inpList = forecastObj.userAnswerObj[uid].userAnswer.split("/");
      const inp = [
        parseFloat(inpList[0]),
        parseFloat(inpList[1]),
        parseFloat(inpList[2]),
        parseFloat(inpList[3]),
        parseFloat(inpList[4]),
        parseFloat(inpList[5]),
        parseFloat(inpList[6]),
        parseFloat(inpList[7]),
        parseFloat(inpList[8]),
        parseFloat(inpList[9]),
      ];
      console.log(inp);

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
      const evidScore = forecastObj.userAnswerObj[uid].userEvid;
      let sum = 0;
      for (let i = 0; i < 10; i++) {
        sum = sum + res[i];
      }
      sum = sum + evidScore;
      console.log("diff", diff, "res", res, "score", sum);

      const newForecastObj = forecastObj;
      newForecastObj.forecastStatus = false;
      newForecastObj.userAnswerObj[uid] = {
        ...forecastObj.userAnswerObj[uid],
        userDifference: diff,
        userResult: res,
        userScore: sum,
      };

      // firestore에 newforecastObj를 저장
      try {
        const forecastRef = await setDoc(
          doc(db, `${semester}`, id),
          newForecastObj
        );
        await updateDoc(doc(db, "users", uid), {
          forecastLog: arrayUnion({
            ...newForecastObj.userAnswerObj[uid],
            leaderName: forecastObj.leaderName,
            forecastDate: forecastObj.forecastDate,
            timestamp: forecastObj.timestamp,
            area: `${forecastObj.area_1}, ${forecastObj.area_2}`,
          }),
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    alert(`채점이 완료되었습니다.`);
    navigate("/forecast");
  };

  const deleteForecast = async () => {
    const ok = window.confirm(`정말 해당 예보게임을 삭제하시겠습니까?`);

    if (ok) {
      await deleteDoc(doc(db, `${semester}`, id));
      navigate("/forecast");
    }
  };

  return (
    <>
      {isLeader ? (
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
                    <Box sx={{ fontSize: "1.1rem" }}>
                      {forecastObj.leaderName}
                    </Box>
                  </Box>
                  <Box mb={3}>
                    <Box sx={{ fontSize: "0.8rem" }}>지역</Box>
                    <Box sx={{ fontSize: "1.1rem" }}>
                      {`${forecastObj.area_1}, ${forecastObj.area_2}`}
                    </Box>
                  </Box>
                  <Box mb={1}>
                    <Box sx={{ fontSize: "0.8rem" }}>제출됨</Box>
                    <Box sx={{ fontSize: "1.1rem" }}>
                      {Object.keys(forecastObj.userAnswerObj).length} 명
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
                    <Box sx={{ fontSize: "1.1rem" }}>
                      {forecastObj.timestamp}
                    </Box>
                  </Box>
                  <Box mb={1}>
                    <Box sx={{ fontSize: "0.8rem" }}>정답입력여부</Box>
                    <Box sx={{ fontSize: "1.1rem" }}>
                      {forecastObj.leaderAnswerInAdvance
                        ? "입력됨"
                        : "채점할 때 입력하기"}
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box mt={2} mb={2}>
                <Divider />
              </Box>

              <Box>
                <Box mb={5}>
                  <Box sx={{ fontSize: "0.8rem" }}>정답 제출자 명단</Box>
                  <Box sx={{ display: "flex", gap: "0.5rem" }}>
                    {participants.map((p) => (
                      <Box>{p}</Box>
                    ))}
                  </Box>
                </Box>
              </Box>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={deleteForecast}
              >
                예보게임 삭제하기
              </Button>
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
                채점정답 입력하기
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

              <ButtonGroup
                fullWidth
                disableElevation
                variant="outlined"
                size="small"
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={closeForecastGame}
                >
                  정답제출 마감하기
                </Button>
                <Button variant="outlined" color="error" onClick={onCalculate}>
                  {forecastObj.userList.length}명 채점하기
                </Button>
              </ButtonGroup>
            </Paper>
          </Grid>
        </Grid>
      ) : (
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
              textAlign: "center",
              lineHeight: "70vh",
            }}
          >
            인도자가 아닙니다. 접근 권한이 없습니다.
          </Box>
        </Paper>
      )}
    </>
  );
};

export default ForecastLeaderPage;
