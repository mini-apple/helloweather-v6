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

const CreateUserGoogle = ({ isLoggedIn, semesters }) => {
  let navigate = useNavigate();
  const match = useMatch("/register");
  const currentYear = String(new Date().getFullYear());

  const [activeSemester, setActiveSemester] = useState([]);
  const [accountObj, setAccountObj] = useState({
    name: "",
    spaceName: "",
    entranceClub: "",
    entranceUniv: "",
    activeSemester: [],
    activityDetails: [
      {
        semester: "",
        position: "",
      },
    ],
  });

  // 리디렉션 정보저장
  useEffect(() => {
    if (Boolean(match) && isLoggedIn) {
      const retrievedObj = JSON.parse(sessionStorage.getItem("accountObj"));
      redirectSaveProfile(retrievedObj);
    }
  }, [match, isLoggedIn]);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "name") {
      setAccountObj({ ...accountObj, name: value });
    } else if (name === "spaceName") {
      setAccountObj({ ...accountObj, spaceName: value });
    } else if (name === "entranceClub") {
      setAccountObj({ ...accountObj, entranceClub: value });
    } else if (name === "entranceUniv") {
      setAccountObj({ ...accountObj, entranceUniv: value });
    } else if (name === "activeSemester") {
      const sortList = typeof value === "string" ? value.split(",") : value;
      const activityList = [];
      setActiveSemester(sortList.sort());
      for (let i = 0; i < sortList.length; i++) {
        activityList.push({ index: i, semester: sortList[i], position: "" });
      }
      setAccountObj({
        ...accountObj,
        activeSemester: sortList,
        activityDetails: activityList,
      });
    }
  };

  // 프로필정보 저장
  const onSaveProfile = async (user, retrievedObj) => {
    const newProfileObj = {
      activeSemester: retrievedObj.activeSemester,
      activityDetails: retrievedObj.activityDetails,
      entranceClub: retrievedObj.entranceClub,
      entranceUniv: retrievedObj.entranceUniv,
      email: user.email,
      forecastLog: [],
      name: retrievedObj.name,
      photoURL: user.photoURL,
      providerId: user.providerData[0].providerId,
      spaceName: retrievedObj.spaceName,
      uid: user.uid,
    };

    // displayName 업데이트
    await updateProfile(auth.currentUser, {
      displayName: newProfileObj.name,
    });

    // firestore에 newProfileObj를 저장
    try {
      const docRef = await setDoc(
        doc(db, "users", `${user.uid}`),
        newProfileObj
      );

      alert("프로필이 저장되었습니다!");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("프로필 변경에 실패했습니다!");
    }
  };

  const onGoogleCreate = async () => {
    const spaceNamePattern = /^[a-zA-Z0-9_]{1}[a-zA-Z0-9_.]{0,29}$/;

    if (
      accountObj.name === "" ||
      accountObj.entranceClub === "" ||
      accountObj.entranceUniv === "" ||
      accountObj.activityDetails.length === 0 ||
      accountObj.spaceName === ""
    ) {
      alert("모든 정보를 입력해주세요!");
      return;
    } else if (!spaceNamePattern.test(accountObj.spaceName)) {
      alert(
        "Space Name은 영어, 숫자, 밑줄(_), 점(.)으로 이루어질 수 있습니다."
      );
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
        alert(errorCode, errorMessage, email, credential);
      });
  };

  return (
    <>
      <Box>
        <Box sx={{ marginBottom: "0.8rem" }}>
          <Alert severity="info">
            Space Name은 고유하고 짧은 계정 식별자로, '@' 기호로 시작합니다.
            Instagram 아이디, YouTube 핸들과 같은 기능입니다.
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
            type="number"
            placeholder={currentYear}
            value={accountObj.entranceUniv}
            onChange={onChange}
          />
        </Box>

        <Box sx={{ marginBottom: "0.8rem" }}>
          <TextField
            fullWidth
            name="entranceClub"
            label="기수"
            variant="outlined"
            size="small"
            type="number"
            value={accountObj.entranceClub}
            onChange={onChange}
          />
        </Box>

        <Box sx={{ marginBottom: "1rem" }}>
          <FormControl fullWidth size="small">
            <InputLabel>활동학기</InputLabel>
            <Select
              multiple
              name="activeSemester"
              value={activeSemester}
              onChange={onChange}
              input={<OutlinedInput label="활동학기" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {semesters.map((semester) => (
                <MenuItem key={semester} value={semester}>
                  <Checkbox checked={activeSemester.indexOf(semester) > -1} />
                  <ListItemText primary={semester} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ marginBottom: "2rem" }}>
          <TextField
            fullWidth
            label="Space Name"
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
