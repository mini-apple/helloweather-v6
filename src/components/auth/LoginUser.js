import React, { useState, useEffect } from "react";
import { auth } from "fbase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { useNavigate, useMatch } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel, { inputLabelClasses } from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";

function LoginUser({ isLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const match = useMatch("/login");

  useEffect(() => {
    if (Boolean(match) && isLoggedIn) {
      navigate("/");
    }
  }, [match, isLoggedIn]);

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
      .then(() => {
        navigate("/");
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
    await signInWithRedirect(auth, provider);
  };

  const [showPassword, setShowPassword] = useState(false);

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

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: { xs: "100%", md: "35%" },
              border: "1px solid rgba(5, 5, 5, 20%)",
              borderRadius: "1rem",
              padding: "1rem 1rem 2rem 1rem",
              margin: "2rem 0rem 6rem 0rem",
            }}
          >
            <Box>
              <Box sx={{ textAlign: "center", margin: "1rem 0rem" }}>
                이메일/비밀번호 로그인
              </Box>
              <Box sx={{ marginBottom: "0.8rem" }}>
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
                    value={password}
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

              <Box>
                <Button
                  fullWidth
                  size="small"
                  variant="outlined"
                  color="success"
                  onClick={onEmailLogin}
                  sx={{ borderRadius: "10rem" }}
                >
                  로그인하기
                </Button>
              </Box>

              <Box sx={{ textAlign: "center", margin: "3rem 0rem 1rem 0rem" }}>
                소셜 로그인
              </Box>

              <Box>
                <Button
                  fullWidth
                  size="small"
                  variant="outlined"
                  onClick={onGoogleLogin}
                  sx={{ borderRadius: "10rem" }}
                  startIcon={<GoogleIcon />}
                >
                  구글계정으로 로그인하기
                </Button>
              </Box>
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
