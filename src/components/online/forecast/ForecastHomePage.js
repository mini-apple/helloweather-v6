import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { auth, db, storage } from "fbase";
import {
  collection,
  setDoc,
  query,
  where,
  getDocs,
  doc,
  onSnapshot,
} from "firebase/firestore";

const ForecastHomePage = ({ semesters }) => {
  const [selectSemester, setSelectSemester] = useState(semesters[0]);
  const [forecastGameList, setForecastGameList] = useState([]);

  let navigate = useNavigate();

  const handleChange = async (event) => {
    const {
      target: { value },
    } = event;
    setSelectSemester(value);
  };

  useEffect(() => {
    getForecastGameListData();
  }, [selectSemester]);

  const getForecastGameListData = async () => {
    const collectionName = `${selectSemester}`.slice(0, -2);
    const q = query(collection(db, collectionName));

    onSnapshot(q, (querySnapshot) => {
      const gameList = [];
      querySnapshot.forEach((doc) => {
        gameList.push(doc.data());
      });
      setForecastGameList(gameList);
    });
  };

  return (
    <>
      <Paper
        sx={{
          margin: { xs: "1rem 0rem", md: "1rem" },
          padding: "1rem",
          borderRadius: { xs: "0rem", md: "1rem" },
          minHeight: "70vh",
        }}
      >
        <Box
          sx={{
            fontSize: "1.1rem",
            fontWeight: "500",
            marginBottom: "2rem",
          }}
        >
          학기선택
        </Box>
        <Box>
          <Box
            sx={{
              width: { xs: "100%", md: "20%" },
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <FormControl fullWidth size="small">
              <InputLabel id="select-Semester">활동학기</InputLabel>
              <Select
                labelId="select-Semester"
                value={selectSemester}
                label="활동학기"
                onChange={handleChange}
              >
                {semesters.map((semester) => (
                  <MenuItem key={semester} value={semester}>
                    {semester}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box sx={{ marginTop: "2rem", marginBottom: "1rem" }}>
          <Divider />
        </Box>

        <Box
          sx={{
            fontSize: "1.1rem",
            fontWeight: "500",
            marginBottom: "2rem",
          }}
        >
          {selectSemester}
        </Box>

        <Box
          bgcolor={"action.hover"}
          sx={{
            padding: { xs: "0.5rem", md: "1rem" },
            borderRadius: "0.5rem",
          }}
        >
          {forecastGameList.length === 0 ? (
            <Box sx={{ textAlign: "center", padding: "5rem 0rem" }}>
              등록된 예보게임이 없습니다.
            </Box>
          ) : (
            forecastGameList.map((forecastGame) => (
              <Box
                bgcolor={"background.default"}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                  padding: { xs: "0.5rem", md: "0.5rem 1rem" },
                  borderRadius: "0.5rem",
                }}
              >
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <Box sx={{ fontSize: "0.6rem" }}>일시</Box>
                  <Box>{forecastGame.forecastDate}</Box>
                </Box>
                <Box sx={{ display: { xs: "block", md: "none" } }}>
                  <Box sx={{ fontSize: "0.6rem" }}>일시</Box>
                  <Box>{forecastGame.forecastDate.slice(5)}</Box>
                </Box>
                <Box>
                  <Box sx={{ fontSize: "0.6rem", width: "4rem" }}>인도자</Box>
                  <Box>{forecastGame.leaderName}</Box>
                </Box>
                <Box>
                  <Box sx={{ fontSize: "0.6rem", width: "2rem" }}>제출됨</Box>
                  <Box>{Object.keys(forecastGame.userAnswerObj).length}</Box>
                </Box>
                <Box>
                  <Box sx={{ fontSize: "0.6rem" }}>지역</Box>
                  <Box>{`${forecastGame.area_1},  ${forecastGame.area_2}`}</Box>
                </Box>
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <Box sx={{ fontSize: "0.6rem" }}>등록번호</Box>
                  <Box>{forecastGame.timestamp}</Box>
                </Box>
                <Box>
                  {forecastGame.forecastStatus ? (
                    <Button
                      sx={{
                        width: { xs: "4rem", md: "5rem" },
                        height: "2.4rem",
                        padding: "0rem",
                        borderRadius: "5rem",
                      }}
                      variant="outlined"
                      color="success"
                      onClick={() => {
                        navigate(
                          `/forecast/game/${selectSemester.slice(0, -2)}/${
                            forecastGame.timestamp
                          }/@${forecastGame.leaderSpaceName}`
                        );
                      }}
                    >
                      진행중
                    </Button>
                  ) : (
                    <Button
                      sx={{
                        width: { xs: "4rem", md: "5rem" },
                        height: "2.4rem",
                        padding: "0rem",
                        borderRadius: "5rem",
                      }}
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        navigate(
                          `/forecast/result/${selectSemester.slice(0, -2)}/${
                            forecastGame.timestamp
                          }/@${forecastGame.leaderSpaceName}`
                        );
                      }}
                    >
                      마감
                    </Button>
                  )}
                </Box>
              </Box>
            ))
          )}
        </Box>

        <Box mt={2}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              navigate(`/forecast/create/${selectSemester.slice(0, -2)}`);
            }}
          >
            새 예보게임 등록하기
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default ForecastHomePage;
