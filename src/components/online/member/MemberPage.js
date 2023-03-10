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
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import MemberCard from "./MemberCard";

const MemberPage = ({ semesters }) => {
  const [selectSemester, setSelectSemester] = useState(semesters[0]);
  const [titleSemester, setTitleSemester] = useState(semesters[0]);
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    onGetMember();
  }, []);

  const handleChange = async (event) => {
    const {
      target: { value },
    } = event;
    setSelectSemester(value);
  };

  const onGetMember = async () => {
    const list = [];
    const selectSemesterRef = collection(db, "users");
    const q = query(
      selectSemesterRef,
      where("activeSemester", "array-contains", selectSemester),
      orderBy("entranceClub"),
      orderBy("entranceUniv"),
      orderBy("name")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });

    setMemberList(list);
    setTitleSemester(selectSemester);
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
              {titleSemester}
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
            >
              {memberList.map((member) => (
                <MemberCard
                  key={member.uid}
                  member={member}
                  semester={titleSemester}
                />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default MemberPage;
