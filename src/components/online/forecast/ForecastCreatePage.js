import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import InputCloudiness from "components/input/InputCloudiness";
import InputWindDiriction from "components/input/InputWindDirenction";
import InputWindSpeed from "components/input/InputWindSpeed";
import InputTemperature from "components/input/InputTemperature";
import InputPrecipitation from "components/input/InputPrecipitation";

import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

import { db, storage } from "fbase";
import {
  collection,
  setDoc,
  query,
  where,
  getDocs,
  doc,
  onSnapshot,
} from "firebase/firestore";

const ForecastCreatePage = ({ userObj }) => {
  const navigate = useNavigate();
  const { semester } = useParams();
  const [answerInAdvance, setAnswerInAdvance] = useState(true);
  const [creatorObj, setCreatorObj] = useState({
    area_1: "",
    area_2: "",
    forecastDate: "",
    forecastStatus: true,
    leaderAnswer: "",
    leaderAnswerInAdvance: true,
    leaderName: userObj.displayName,
    leaderSpaceName: "",
    leaderUID: userObj.uid,
    timestamp: new Date().getTime(),
    semester: semester,
    userAnswerObj: {},
    userList: [],
  });

  useEffect(() => {
    getUserData();
    console.log("creatorObj", creatorObj);
  }, []);

  const getUserData = async () => {
    const userRef = collection(db, "users");
    // Create a query against the collection.
    const q = query(userRef, where("uid", "==", userObj.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setCreatorObj({ ...creatorObj, leaderSpaceName: doc.data().spaceName });
    });
  };

  const makeForecastGame = async () => {
    if (
      creatorObj.area_1 === "" ||
      creatorObj.area_2 === "" ||
      creatorObj.forecastDate === ""
    ) {
      alert("입력되지 않은 항목이 존재합니다. 모든 항목을 입력해주세요.");
      return;
    } else if (
      creatorObj.leaderAnswerInAdvance &&
      (L1.cloudiness === "" ||
        L1.windDirection === "" ||
        L1.windSpeed === "" ||
        L1.temperature === "" ||
        L1.precipitation === "" ||
        L2.cloudiness === "" ||
        L2.windDirection === "" ||
        L2.windSpeed === "" ||
        L2.temperature === "" ||
        L2.precipitation === "")
    ) {
      console.log(creatorObj.leaderAnswerInAdvance);
      alert(
        "정답을 모두 입력해주세요. 또는 채점할 때 입력하기를 선택해주세요."
      );
      return;
    }
    // 정답문자열 만들기
    const plainText = `${L1.cloudiness}/${L1.windDirection}/${L1.windSpeed}/${L1.temperature}/${L1.precipitation}/${L2.cloudiness}/${L2.windDirection}/${L2.windSpeed}/${L2.temperature}/${L2.precipitation}`;
    const newCreatorObj = { ...creatorObj, leaderAnswer: plainText };

    // firestore에 저장하기
    try {
      const docRef = await setDoc(
        doc(db, `${creatorObj.semester}`, `${creatorObj.timestamp}`),
        newCreatorObj
      );
      alert("등록이 완료되었습니다!");
      navigate("/forecast");
    } catch (e) {
      alert(`등록에 실패 했습니다!\nError adding document: ${e}`);
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "forecastDate") {
      setCreatorObj({ ...creatorObj, forecastDate: value });
    } else if (name === "area1") {
      setCreatorObj({ ...creatorObj, area_1: value });
    } else if (name === "area2") {
      setCreatorObj({ ...creatorObj, area_2: value });
    } else if (name === "answerInAdvance") {
      console.log(value === "true" ? true : false);
      setAnswerInAdvance(value);
      setCreatorObj({
        ...creatorObj,
        leaderAnswerInAdvance: value === "true" ? true : false,
      });
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

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              margin: { xs: "1rem 0rem", md: "1rem" },
              padding: "1rem",
              borderRadius: { xs: "0rem", md: "1rem" },
              minHeight: { xs: "0rem", md: "70vh" },
            }}
          >
            <Box
              sx={{
                fontSize: "1.1rem",
                fontWeight: "500",
                marginBottom: "2rem",
              }}
            >
              예보게임 정보 입력하기
            </Box>
            <Box sx={{ display: "flex", gap: { xs: "5rem", md: "8rem" } }}>
              <Box>
                <Box mb={3}>
                  <Box sx={{ fontSize: "0.8rem" }}>인도자</Box>
                  <Box sx={{ fontSize: "1.1rem" }}>{creatorObj.leaderName}</Box>
                </Box>
                <Box mb={3}>
                  <Box sx={{ fontSize: "0.8rem" }}>학기분류</Box>
                  <Box sx={{ fontSize: "1.1rem" }}>
                    {creatorObj.semester}학기
                  </Box>
                </Box>
                <Box mb={3}>
                  <Box sx={{ fontSize: "0.8rem" }}>등록번호</Box>
                  <Box sx={{ fontSize: "1.1rem" }}>{creatorObj.timestamp}</Box>
                </Box>
              </Box>
              <Box>
                <Box mb={3}>
                  <Box sx={{ fontSize: "0.8rem" }}>Space Name</Box>
                  <Box sx={{ fontSize: "1.1rem" }}>
                    {creatorObj.leaderSpaceName}
                  </Box>
                </Box>
                <Box mb={3}>
                  <Box sx={{ fontSize: "0.8rem" }}>예보게임 예정일</Box>
                  <Box>
                    <TextField
                      variant="outlined"
                      size="small"
                      type="date"
                      value={creatorObj.forecastDate}
                      name="forecastDate"
                      onChange={onChange}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Divider />
            <Box mt={2} mb={3}>
              <Alert severity="info">
                지역순서는 예보게임지의 순서대로 위에서부터 지역1, 지역2 입니다.
              </Alert>
            </Box>
            <Box mb={2}>
              <Box sx={{ fontSize: "0.8rem" }}>지역1</Box>
              <Box>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="서울"
                  value={creatorObj.area_1}
                  name="area1"
                  onChange={onChange}
                />
              </Box>
            </Box>
            <Box mb={2}>
              <Box sx={{ fontSize: "0.8rem" }}>지역2</Box>
              <Box>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="부산"
                  value={creatorObj.area_2}
                  name="area2"
                  onChange={onChange}
                />
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
              minHeight: { xs: "0rem", md: "70vh" },
            }}
          >
            <Box
              sx={{
                fontSize: "1.1rem",
                fontWeight: "500",
                marginBottom: "2rem",
              }}
            >
              정답 입력
            </Box>

            <Box mb={3}>
              <Alert severity="info">
                정답은 예보게임이 모두 끝난 후 채점할 때 입력할 수도 있습니다.
              </Alert>
            </Box>

            <Box mb={3} sx={{ textAlign: "center" }}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  <Box>정답 입력 여부</Box>
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="answerInAdvance"
                  value={answerInAdvance}
                  onChange={onChange}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label={<Box>미리 입력하기</Box>}
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label={<Box>채점할 때 입력하기</Box>}
                  />
                </RadioGroup>
              </FormControl>
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
                  {creatorObj.area_1}
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
                  {creatorObj.area_2}
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
            <Button variant="outlined" size="small" onClick={makeForecastGame}>
              예보게임 등록하기
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ForecastCreatePage;
