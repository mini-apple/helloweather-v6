import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { db } from "fbase";
import { collection, query, where, getDocs } from "firebase/firestore";
import MemberCard from "./MemberCard";

const MemberStatus = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const years = [];
  if (currentMonth <= 6) {
    years.push(currentYear + "-1학기");
  } else if (7 <= currentMonth && currentMonth <= 12) {
    years.push(currentYear + "-2학기");
    years.push(currentYear + "-1학기");
  }
  for (let i = currentYear - 1; i >= 2009; i--) {
    for (let j = 2; j >= 1; j--) {
      years.push(i + "-" + j + "학기");
    }
  }

  const [selectYear, setSelectYear] = useState(years[0]);
  const [titleYear, setTitleYear] = useState(years[0]);
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
      where("activeYear", "array-contains", selectYear)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });
    setMemberList(list);
    setTitleYear(selectYear);
  };

  return (
    <>
      <Box className="container">
        <Box className="title">멤버현황</Box>
        <Box className="year-container">
          <Box className="year-select">
            <FormControl fullWidth size="small">
              <InputLabel id="select-year">활동학기</InputLabel>
              <Select
                labelId="select-year"
                value={selectYear}
                label="활동학기"
                onChange={handleChange}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button variant="outlined" onClick={onGetMember} size="small">
            불러오기
          </Button>
        </Box>
      </Box>
      <Box className="container">
        <Box className="title">{titleYear}</Box>
        <Box className="member-card-container">
          {memberList.map((userAttrObj) => (
            <MemberCard key={userAttrObj.uid} userAttrObj={userAttrObj} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default MemberStatus;
