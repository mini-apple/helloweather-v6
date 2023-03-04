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

function CreateUser({ isLoggedIn }) {
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
              <CreateUserGoogle isLoggedIn={isLoggedIn} />
            ) : (
              <CreateUserEmail />
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
          이 애플리케이션은 최소한의 정보저장으로 적은 관리를 통해 지속가능하게
          운영되기를 지향합니다. DB에 저장되는 회원정보는 비밀번호를 제외한 최초
          회원가입시 입력하는 모든 정보입니다.
        </Box>
      </Popover>
    </>
  );
}

export default CreateUser;
