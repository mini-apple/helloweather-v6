import React, { useState, useEffect } from "react";
import { auth } from "fbase";
import {
  sendPasswordResetEmail,
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
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Alert from "@mui/material/Alert";
import Popover from "@mui/material/Popover";

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
    } else if (name === "resetEmail") {
      setResetEmail(value);
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
        alert(`로그인 오류 정보\nerrorCode:  ${errorCode}`);
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

  // 비밀번호 재설정
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const sendPasswordEmail = () => {
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        // Password reset email sent!
        alert("이메일이 발송되었습니다.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode);
      });
  };

  const [openAlert, setOpenAlert] = useState(true);

  // popover
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
            display: "flex",
            fontSize: "1.1rem",
            fontWeight: "500",
            marginBottom: "2rem",
          }}
        >
          <IconButton size="small" onClick={handleClick}>
            <InfoOutlinedIcon fontSize="inherit" />
          </IconButton>
          <Box>로그인 후 이용해주세요!</Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: { xs: "100%", md: "35%" },
              border: "1px solid rgba(5, 5, 5, 20%)",
              borderRadius: "1rem",
              padding: "1rem",
              margin: "2rem 0rem 6rem 0rem",
            }}
          >
            <Box>
              {openAlert && (
                <Alert
                  severity="warning"
                  onClose={() => {
                    setOpenAlert(false);
                  }}
                >
                  카톡 인앱 브라우저에서는 카톡 브라우저의 보안이슈로 인해 구글
                  로그인이 허용되지 않습니다. 타 브라우저 사용을 권장합니다.
                  (403 오류)
                </Alert>
              )}
            </Box>
            <Box>
              <Box sx={{ textAlign: "center", margin: "2rem 0rem 1rem 0rem" }}>
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

              <Box mb={2}>
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
          <Box sx={{ display: "flex" }}>
            <Button variant="text" onClick={() => navigate("/register")}>
              계정생성하기
            </Button>

            <Button
              variant="text"
              onClick={() => setShowResetPasswordForm(!showResetPasswordForm)}
            >
              비밀번호 재설정
            </Button>
          </Box>
        </Box>
      </Paper>

      {showResetPasswordForm && (
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
            비밀번호 재설정 이메일 보내기
          </Box>
          <Box>이메일 틀리면 엉뚱한 사람한테 메일이 날아갑니다. (조심!)</Box>
          <Box>Gmail 5초, Naver 30초, Daum 3분정도 걸립니다.</Box>
          <Box sx={{ margin: "1rem 0rem", width: "20rem" }}>
            <TextField
              fullWidth
              name="resetEmail"
              label="계정 이메일"
              variant="outlined"
              size="small"
              value={resetEmail}
              onChange={onChange}
            />
          </Box>
          <Button variant="outlined" size="small" onClick={sendPasswordEmail}>
            이메일 보내기
          </Button>
        </Paper>
      )}

      {/* Popover */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", md: "20vw" },
            padding: "1rem",
            fontSize: "0.9rem",
          }}
        >
          <Box>
            '구글 계정으로 로그인하기'도 계정생성하기 페이지에서 회원가입을 통해
            초기정보를 설정해주세요. 만약 회원가입을 하지 않고 로그인을 했다면
            프로필 페이지에서 초기정보를 설정해주세요.
          </Box>
        </Box>
      </Popover>
    </>
  );
}

export default LoginUser;
