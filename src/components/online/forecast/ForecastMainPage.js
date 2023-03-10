import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import InputCloudiness from "components/input/InputCloudiness";
import InputWindDiriction from "components/input/InputWindDirenction";
import InputWindSpeed from "components/input/InputWindSpeed";
import InputTemperature from "components/input/InputTemperature";
import InputPrecipitation from "components/input/InputPrecipitation";

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

const ForecastMainPage = ({ semesters }) => {
  const [selectSemester, setSelectSemester] = useState(semesters[0]);
  const [titleSemester, setTitleSemester] = useState(semesters[0]);

  const handleChange = async (event) => {
    const {
      target: { value },
    } = event;
    setSelectSemester(value);
  };

  const onGetForecast = () => {
    setTitleSemester(selectSemester);
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
              width: { xs: "100%", md: "30%" },
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
            <Button
              variant="outlined"
              sx={{ width: "8rem", padding: "0rem" }}
              onClick={onGetForecast}
            >
              불러오기
            </Button>
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
          {titleSemester}
        </Box>
        <Box mb={2}>
          <Button variant="outlined">방 생성하기</Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: { xs: "0rem", md: "1rem 5rem" },
            border: { xs: "0px", md: "1px solid rgba(5, 5, 5, 10%)" },
            borderRadius: "1rem",
          }}
        ></Box>
      </Paper>
    </>
  );
};

export default ForecastMainPage;
