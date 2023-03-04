import React, { useState } from "react";
import { auth } from "fbase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function LoginUser({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onEmailLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setIsLoggedIn(true);
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(
          `로그인 오류 정보\nerrorCode:  ${errorCode} \nerrorMessage:  ${errorMessage}`
        );
      });
  };

  const onGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then(() => {
      setIsLoggedIn(true);
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Paper
        sx={{
          margin: { xs: "1rem 0rem", md: "1rem" },
          padding: "1rem",
          borderRadius: { xs: "0rem", md: "1rem" },
        }}
      >
        <Box
          sx={{
            fontSize: "1.1rem",
            fontWeight: "500",
            marginBottom: "2rem",
          }}
        >
          로그인 후 이용해주세요!
        </Box>

        <Box className="sign-in-email-container">
          <Box>
            <Box className="email-input-box">
              <Box className="email-input-box-title">
                이메일/비밀번호 로그인
              </Box>
              <Box className="email-input-field">
                <TextField
                  fullWidth
                  name="email"
                  label="이메일"
                  variant="outlined"
                  size="small"
                  value={email}
                  onChange={onChange}
                />
              </Box>
              <Box className="email-input-field">
                <FormControl size="small" variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">
                    비밀번호
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    label="비밀번호"
                    name="password"
                    value={password}
                    onChange={onChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
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
              <Box>
                <Button
                  fullWidth
                  size="small"
                  variant="outlined"
                  onClick={onEmailLogin}
                >
                  로그인
                </Button>
              </Box>
            </Box>
            <Box>
              <Box className="email-input-box-title">소셜 로그인</Box>
              <button onClick={onGoogleLogin} className="btn-google">
                Google로 로그인하기
              </button>
            </Box>
          </Box>
        </Box>

        <Box className="sign-in-toggle">
          <Divider />
          <Button variant="text" onClick={() => navigate("/register")}>
            계정생성하기
          </Button>
        </Box>
      </Paper>
    </>
  );
}

export default LoginUser;
