import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import GoogleIcon from "@mui/icons-material/Google";

import { auth, db } from "fbase";
import { setDoc, doc } from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  updateProfile,
} from "firebase/auth";

import { useNavigate, useMatch } from "react-router-dom";

const CreateUserGoogle = ({ isLoggedIn }) => {
  let navigate = useNavigate();
  const match = useMatch("/register");

  // 리디렉션 정보저장
  useEffect(() => {
    if (Boolean(match) && isLoggedIn) {
      const retrievedObj = JSON.parse(sessionStorage.getItem("accountObj"));
      console.log("retrievedObj", retrievedObj);
      redirectSaveProfile(retrievedObj);
    }
  }, [match, isLoggedIn]);

  const [accountObj, setAccountObj] = useState({
    name: "",
    spaceName: "",
    entranceUniv: "",
    activeSemester: [],
  });

  // 학기정보
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

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "name") {
      setAccountObj({ ...accountObj, name: value });
    } else if (name === "spaceName") {
      setAccountObj({ ...accountObj, spaceName: value });
    } else if (name === "entranceUniv") {
      setAccountObj({ ...accountObj, entranceUniv: value });
    } else if (name === "activeSemester") {
      setAccountObj({
        ...accountObj,
        activeSemester: typeof value === "string" ? value.split(",") : value,
      });
    }
  };

  // 프로필정보 저장
  const onSaveProfile = async (user, retrievedObj) => {
    const newProfileObj = {
      activeSemester: retrievedObj.activeSemester,
      attachmentUrl: "",
      entranceUniv: retrievedObj.entranceUniv,
      email: user.email,
      forecastLog: {},
      name: retrievedObj.name,
      spaceName: "@" + retrievedObj.spaceName,
      uid: user.uid,
    };

    // firestore에 newProfileObj를 저장
    try {
      const docRef = await setDoc(
        doc(db, "users", `${user.uid}`),
        newProfileObj
      );
      if (user.displayName !== newProfileObj.name) {
        // displayName 업데이트
        await updateProfile(auth.currentUser, {
          displayName: newProfileObj.name,
        });
      }
      alert("프로필이 저장되었습니다!");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("프로필 변경에 실패했습니다!");
    }
  };

  const onGoogleCreate = async () => {
    if (
      accountObj.name === "" ||
      accountObj.entranceUniv === "" ||
      accountObj.activeSemester.length === 0 ||
      accountObj.spaceName === ""
    ) {
      alert("모든 정보를 입력해주세요!");
      return;
    }

    sessionStorage.setItem("accountObj", JSON.stringify(accountObj));

    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  const redirectSaveProfile = (retrievedObj) => {
    getRedirectResult(auth)
      .then((result) => {
        alert("새로운 계정이 생성되었습니다.");
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        onSaveProfile(user, retrievedObj);
        alert("프로필 정보가 저장되었습니다.");
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  return (
    <>
      <Box>
        <Box sx={{ marginBottom: "0.8rem" }}>
          <Alert severity="info">
            User ID란 사용자를 구분하기위한 고유아이디입니다.
          </Alert>
        </Box>

        <Box sx={{ textAlign: "center", margin: "1rem 0rem 0.5rem 0rem" }}>
          기본정보
        </Box>

        <Box sx={{ marginBottom: "0.8rem" }}>
          <TextField
            fullWidth
            label="이름"
            variant="outlined"
            size="small"
            name="name"
            value={accountObj.name}
            onChange={onChange}
          />
        </Box>

        <Box sx={{ marginBottom: "0.8rem" }}>
          <TextField
            fullWidth
            name="entranceUniv"
            label="학번"
            variant="outlined"
            size="small"
            placeholder={currentYear}
            value={accountObj.entranceUniv}
            onChange={onChange}
          />
        </Box>
        <Box sx={{ marginBottom: "1rem" }}>
          <FormControl fullWidth size="small">
            <InputLabel>활동학기</InputLabel>
            <Select
              multiple
              name="activeSemester"
              value={accountObj.activeSemester}
              onChange={onChange}
              input={<OutlinedInput label="활동학기" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  <Checkbox
                    checked={accountObj.activeSemester.indexOf(year) > -1}
                  />
                  <ListItemText primary={year} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ marginBottom: "2rem" }}>
          <TextField
            fullWidth
            label="User ID"
            variant="outlined"
            size="small"
            name="spaceName"
            value={accountObj.spaceName}
            onChange={onChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">@</InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ textAlign: "center", margin: "1rem 0rem 0.5rem 0rem" }}>
          소셜 회원가입
        </Box>
        <Button
          fullWidth
          variant="outlined"
          onClick={onGoogleCreate}
          sx={{ borderRadius: "10rem" }}
          startIcon={<GoogleIcon />}
        >
          구글로 계정생성하기
        </Button>
      </Box>
    </>
  );
};

export default CreateUserGoogle;
