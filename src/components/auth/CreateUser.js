import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import CreateUserEmail from "./CreateUserEmail";
import CreateUserGoogle from "./CreateUserGoogle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import GoogleIcon from "@mui/icons-material/Google";

function CreateUser({ isLoggedIn, semesters }) {
  let navigate = useNavigate();

  // true: google, false: email-password
  const [registMode, setRegistMode] = useState(true);

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
          <Box>5초 회원가입</Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: { xs: "100%", md: "35%" },
              border: "1px solid rgba(5, 5, 5, 20%)",
              borderRadius: "1rem",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <Box mb={3}>
              <ButtonGroup fullWidth size="small">
                <Button
                  onClick={() => setRegistMode(true)}
                  color="primary"
                  startIcon={<GoogleIcon />}
                >
                  구글 회원가입
                </Button>
                <Button
                  onClick={() => setRegistMode(false)}
                  color="success"
                  startIcon={<MailOutlineIcon />}
                >
                  이메일 회원가입
                </Button>
              </ButtonGroup>
            </Box>

            {registMode ? (
              <CreateUserGoogle isLoggedIn={isLoggedIn} semesters={semesters} />
            ) : (
              <CreateUserEmail semesters={semesters} />
            )}
          </Box>
        </Box>
        <Box className="sign-in-toggle">
          <Divider />
          <Button variant="text" onClick={() => navigate("/login")}>
            로그인하기
          </Button>
        </Box>
      </Paper>
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
            회원가입 조건은 헬로웨더의 활동멤버, 역대멤버입니다. 활동학기는
            2009년 이후부터 설정되어있으며 활동학기에 따라 멤버가 그룹됩니다.
          </Box>
          <Box>
            회원인증은 Firebase 및 Google에서 제공하는 회원인증 방식이
            사용되었으며, 비밀번호 등 주요 개인정보는 관리자를 거치지 않고
            Google의 보안 프로토콜과 방식이 적용되어 보호됩니다.
          </Box>
        </Box>
      </Popover>
    </>
  );
}

export default CreateUser;
