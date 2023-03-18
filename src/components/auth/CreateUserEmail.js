import React, { useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";

import { auth, db } from "fbase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { useNavigate } from "react-router-dom";

const CreateUserEmail = ({ semesters }) => {
  let navigate = useNavigate();
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
        index: "",
        semester: "",
        position: "",
      },
    ],
    email: "",
    password: "",
    confirmPassword: "",
  });

  // 비밀번호 보기 핸들링
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // 오류 박스 핸들링
  const [errorInfo, setErrorInfo] = useState({
    validEmail: false,
    validPassWord: false,
  });

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
      setActiveSemester(sortList.sort());

      const activityList = [];
      for (let i = 0; i < sortList.length; i++) {
        activityList.push({ index: i, semester: sortList[i], position: "" });
      }
      setAccountObj({
        ...accountObj,
        activeSemester: sortList,
        activityDetails: activityList,
      });
    } else if (name === "email") {
      const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      setAccountObj({ ...accountObj, email: value });
      setErrorInfo({ ...errorInfo, validEmail: emailPattern.test(value) });
    } else if (name === "password") {
      const passwordPattern =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      setAccountObj({ ...accountObj, password: value });
      setErrorInfo({
        ...errorInfo,
        validPassWord: passwordPattern.test(value),
      });
    } else if (name === "confirmPassword") {
      setAccountObj({ ...accountObj, confirmPassword: value });
    }
  };

  // 프로필정보 저장
  const onSaveProfile = async (user) => {
    const newProfileObj = {
      activeSemester: accountObj.activeSemester,
      activityDetails: accountObj.activityDetails,
      entranceClub: accountObj.entranceClub,
      entranceUniv: accountObj.entranceUniv,
      email: user.email,
      forecastLog: [],
      name: accountObj.name,
      photoURL: "",
      providerId: user.providerData[0].providerId,
      spaceName: accountObj.spaceName,
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
      ).then(() => {
        alert("프로필이 저장되었습니다.");
        window.location.replace("/");
      });
    } catch (e) {
      alert(`프로필 저장에 실패했습니다.\nError adding document: ${e}`);
    }
  };

  const onEmailCreate = async () => {
    const spaceNamePattern = /^[a-zA-Z0-9_]{1}[a-zA-Z0-9_.]{0,29}$/;
    if (
      accountObj.name === "" ||
      accountObj.entranceClub === "" ||
      accountObj.entranceUniv === "" ||
      accountObj.activityDetails.length === 0 ||
      accountObj.spaceName === "" ||
      accountObj.email === "" ||
      accountObj.password === "" ||
      accountObj.confirmPassword === ""
    ) {
      alert("모든 정보를 입력해주세요!");
      return;
    } else if (!spaceNamePattern.test(accountObj.spaceName)) {
      alert(
        "Space Name은 영어, 숫자, 밑줄(_), 점(.)으로 이루어질 수 있습니다."
      );
      return;
    } else if (!errorInfo.validEmail) {
      alert("유효한 이메일이 아닙니다.");
      return;
    } else if (!errorInfo.validPassWord) {
      alert(
        "비밀번호는 8자리 이상, 최소 1개 이상의 영어, 숫자, 특수문자가 포함되어야합니다."
      );
      return;
    } else if (accountObj.password !== accountObj.confirmPassword) {
      alert("입력한 비밀번호가 서로 다릅니다.");
      return;
    }

    await createUserWithEmailAndPassword(
      auth,
      accountObj.email,
      accountObj.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("새로운 계정이 생성되었습니다.");
        onSaveProfile(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(
          `계정생성 오류정보\nerrorCode:  ${errorCode} \nerrorMessage:  ${errorMessage}`
        );
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

        <Box sx={{ textAlign: "center", margin: "1rem 0rem" }}>
          이메일/비밀번호
        </Box>

        <Box sx={{ marginBottom: "0.8rem" }}>
          <TextField
            fullWidth
            name="email"
            label="이메일"
            variant="outlined"
            size="small"
            value={accountObj.email}
            onChange={onChange}
          />
        </Box>

        <Box sx={{ marginBottom: "0.8rem" }}>
          <FormControl fullWidth size="small" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              비밀번호
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              label="비밀번호"
              name="password"
              value={accountObj.password}
              onChange={onChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>

        <Box sx={{ marginBottom: "0.8rem" }}>
          <FormControl fullWidth size="small" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              비밀번호 확인
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              label="비밀번호 확인"
              name="confirmPassword"
              value={accountObj.confirmPassword}
              onChange={onChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>

        {errorInfo.validEmail ? (
          <Box sx={{ marginBottom: "0.8rem" }}>
            <Alert severity="success">올바른 이메일 형식.</Alert>
          </Box>
        ) : (
          <Box sx={{ marginBottom: "0.8rem" }}>
            <Alert severity="error">올바르지 않은 이메일 형식입니다.</Alert>
          </Box>
        )}

        {errorInfo.validPassWord ? (
          <Box sx={{ marginBottom: "0.8rem" }}>
            <Alert severity="success">올바른 비밀번호 형식.</Alert>
          </Box>
        ) : (
          <Box sx={{ marginBottom: "0.8rem" }}>
            <Alert severity="error">
              비밀번호에는 영어, 숫자, 특수문자가 포함되어야합니다.(8자리 이상)
            </Alert>
          </Box>
        )}

        <Box>
          <Button
            fullWidth
            variant="outlined"
            onClick={onEmailCreate}
            sx={{ borderRadius: "10rem" }}
          >
            계정생성하기
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CreateUserEmail;
