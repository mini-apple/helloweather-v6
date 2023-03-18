import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
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
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    onGetMember();
  }, [selectSemester]);

  const handleChange = (event) => {
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
          멤버정보 가져오기
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
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: { xs: "0rem 0.3rem", md: "1rem 5rem" },
            borderRadius: "1rem",
          }}
        >
          {memberList.length === 0 ? (
            <Box sx={{ textAlign: "center", padding: "5rem 0rem" }}>
              <Box mb={1}>해당 학기의 활동멤버 정보가 없습니다.</Box>
              <Box>프로필에서 활동학기를 설정해주세요.</Box>
            </Box>
          ) : (
            memberList.map((member) => (
              <MemberCard
                key={member.uid}
                member={member}
                semester={selectSemester}
              />
            ))
          )}
        </Box>
      </Paper>
    </>
  );
};

export default MemberPage;
