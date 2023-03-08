import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";

import { db } from "fbase";
import { collection, query, where, getDocs } from "firebase/firestore";
import MemberCard from "./MemberCard";
import { margin } from "@mui/system";

const MemberPage = ({ semesters }) => {
  const [selectYear, setSelectYear] = useState(semesters[0]);
  const [titleYear, setTitleYear] = useState(semesters[0]);
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    onGetMember();
  }, []);

  const handleChange = async (event) => {
    const {
      target: { value },
    } = event;
    setSelectYear(value);
  };

  const onGetMember = async () => {
    const list = [];
    const selectYearRef = collection(db, "users");
    const q = query(
      selectYearRef,
      where("activeSemester", "array-contains", selectYear)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });
    console.log(list);
    // 리더 총무 학술부장 학술부원 홍보부장 홍보부원 기획부장 기획부원 순으로 정렬
    console.log(list);

    setMemberList(list);
    setTitleYear(selectYear);
    console.log("MemberList", memberList);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={12}>
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
                  <InputLabel id="select-year">활동학기</InputLabel>
                  <Select
                    labelId="select-year"
                    value={selectYear}
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
                  onClick={onGetMember}
                  sx={{ width: "8rem", padding: "0rem" }}
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
              {titleYear}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {memberList.map((member) => (
                <MemberCard member={member} semester={titleYear} />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default MemberPage;
