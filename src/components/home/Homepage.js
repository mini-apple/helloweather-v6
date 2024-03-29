import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import Fade from "@mui/material/Fade";

import "./Homepage.css";

const offlineExplains = [
  {
    label: "정답코드 만들기 (인도자)",
    description: `예보게임 준비가 끝났다면 인도자는 멤버들을 위해 정답코드를 만들어봅시다.  
                  준비한 정답을 입력해서 정답코드를 생성해보세요.`,
  },
  {
    label: "예보게임",
    description: `예보게임이 끝나면 이제 채점을 해봅시다. 인도자는 정답코드를 복사해서 멤버들에게 공유해줍니다.`,
  },
  {
    label: "채점하기 (멤버)",
    description: `채점하기 탭으로 간 후 인도자가 공유해준 정답코드를 입력합니다. 
                  정답코드를 입력하면 정답정보가 표시됩니다. 나의 정답을 
                  입력하고 Score 버튼을 눌러 나의 점수를 확인해보세요!`,
  },
];

const onlineExplains = [
  {
    label: "방 생성하기 (인도자)",
    description: `예보게임 탭에서 새 예보게임 등록하기 버튼을 클릭해서 예보게임을 준비해주세요.
                  '진행중'이라고 표시되면 정상적으로 예보게임이 생성된 것입니다.`,
  },
  {
    label: "예보게임 (멤버)",
    description: `멤버들은 해당 예보게임에 들어가서 자신의 정답을 제출해주세요.`,
  },
  {
    label: "채점하기 (인도자)",
    description: `인도자는 해당 예보게임에 들어가면 인도자만 갈 수 있는 채점 관리 페이지가 있습니다.
                  채점 관리 페이지에서 모두의 정답이 입력된 것을 확인한 후 채점하기를 클릭해주세요.`,
  },
  {
    label: "결과 확인",
    description: `정상적으로 채점이 완료되었다면 '마감'이라고 표시됩니다. 각자의 채점결과를 확인하면서
                  멤버들과 정답을 비교해봅시다!`,
  },
];

const Homepage = () => {
  let navigate = useNavigate();

  const [homepageAlert, setHomepageAlert] = useState(true);

  const onLoginPage = () => {
    navigate("/forecast");
  };

  // 오프라인 설명 컨트롤
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // 온라인 설명 컨트롤
  const [activeOnlineStep, setActiveOnlineStep] = useState(0);

  const handleOnlineNext = () => {
    setActiveOnlineStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleOnlineBack = () => {
    setActiveOnlineStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleOnlineReset = () => {
    setActiveOnlineStep(0);
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
        {homepageAlert && (
          <Alert
            severity="info"
            onClose={() => {
              setHomepageAlert(false);
            }}
          >
            <AlertTitle>
              <Box>구글계정 로그인 안내</Box>
            </AlertTitle>
            <Box mt={2}>1. 이미 구글 로그인을 한 적이 있어요!</Box>
            <Box mt={0.5}>
              로그인 후 프로필 탭에 가시면 프로필 편집 버튼이 있습니다. 여기서
              프로필 정보를 입력한 후 저장해주시면 됩니다. 꼭꼭 모든 멤버가 이
              과정을 진행한 후 채점해주세요!!
            </Box>

            <Box mt={2.5}>2. 아직 로그인을 한 적이 없다면?</Box>
            <Box mt={0.5}>
              계정생성하기 - 구글회원가입 절차를 따라주세요! 계정정보가 자동
              세팅됩니다.
            </Box>
          </Alert>
        )}
        <Box
          sx={{
            padding: { xs: "1", md: "5" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box>
            <Box
              mt={25}
              mb={4}
              className="test"
              sx={{ fontSize: { xs: "3rem", md: "4rem" } }}
            >
              환영합니다
            </Box>
            <Fade in={true} timeout={4000}>
              <Box mb={8} sx={{ fontSize: { xs: "1.3rem", md: "1.5rem" } }}>
                부산대학교 대기환경과학과 학술동아리 Hello Weather입니다.
              </Box>
            </Fade>
            <Box>
              <Button variant="outlined" onClick={onLoginPage}>
                예보게임 시작하기
              </Button>
            </Box>

            <Box mt={30} mb={5} sx={{ fontSize: "1.5rem" }}>
              간편하고 쉬운 오프라인 채점
            </Box>
            <Box
              sx={{
                maxWidth: "40rem",
              }}
            >
              <Stepper activeStep={activeStep} orientation="vertical">
                {offlineExplains.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      optional={
                        index === 2 ? (
                          <Typography variant="caption">Last step</Typography>
                        ) : null
                      }
                    >
                      {step.label}
                    </StepLabel>
                    <StepContent>
                      <Box>{step.description}</Box>
                      <Box sx={{ mb: 2 }}>
                        <div>
                          <Button
                            variant="outlined"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            {index === offlineExplains.length - 1
                              ? "완료"
                              : "다음단계"}
                          </Button>
                          <Button
                            disabled={index === 0}
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            이전단계
                          </Button>
                        </div>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {activeStep === offlineExplains.length && (
                <Paper elevation={0} sx={{ p: 3, borderRadius: "1rem" }}>
                  <Box>
                    오프라인 채점방식을 알아봤습니다.{" "}
                    <Link href="/calculator" underline="none" color="inherit">
                      오프라인 채점하러 가기
                    </Link>
                  </Box>
                  <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    다시보기
                  </Button>
                </Paper>
              )}
            </Box>

            <Box mt={20} mb={5} sx={{ fontSize: "1.5rem" }}>
              예보기록 공유와 분석, 온라인 채점
            </Box>
            <Box
              sx={{
                maxWidth: "40rem",
                marginBottom: "10rem",
              }}
            >
              <Stepper activeStep={activeOnlineStep} orientation="vertical">
                {onlineExplains.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      optional={
                        index === 3 ? (
                          <Typography variant="caption">Last step</Typography>
                        ) : null
                      }
                    >
                      {step.label}
                    </StepLabel>
                    <StepContent>
                      <Box>{step.description}</Box>
                      <Box sx={{ mb: 2 }}>
                        <div>
                          <Button
                            variant="outlined"
                            onClick={handleOnlineNext}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            {index === onlineExplains.length - 1
                              ? "완료"
                              : "다음단계"}
                          </Button>
                          <Button
                            disabled={index === 0}
                            onClick={handleOnlineBack}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            이전단계
                          </Button>
                        </div>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {activeOnlineStep === onlineExplains.length && (
                <Paper elevation={0} sx={{ p: 3, borderRadius: "1rem" }}>
                  <Box>
                    온라인 채점방식을 알아봤습니다.{" "}
                    <Link href="/forecast" underline="none" color="inherit">
                      온라인 채점하러 가기
                    </Link>
                  </Box>
                  <Button onClick={handleOnlineReset} sx={{ mt: 1, mr: 1 }}>
                    다시보기
                  </Button>
                </Paper>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default Homepage;
