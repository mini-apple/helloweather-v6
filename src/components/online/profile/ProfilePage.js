import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";

import { auth, db, storage } from "fbase";
import {
  collection,
  setDoc,
  query,
  where,
  getDocs,
  doc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { deleteUser, signOut, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const ProfilePage = ({ userObj, semesters }) => {
  const navigate = useNavigate();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [activeSemester, setActiveSemester] = useState([]);
  const [profile, setProfile] = useState({
    activeSemester: [],
    activityDetails: [],
    entranceClub: "",
    entranceUniv: "",
    email: "",
    forecastLog: [
      {
        area: "",
        forecastDate: "",
        leaderName: "",
        score: "",
        timestamp: "",
      },
    ],
    name: "",
    photoURL: "",
    providerId: "",
    spaceName: "",
    uid: userObj.uid,
  });

  const [newProfile, setNewProfile] = useState({
    activeSemester: [],
    activityDetails: [],
    entranceClub: "",
    entranceUniv: "",
    email: "",
    forecastLog: [
      {
        area: "",
        forecastDate: "",
        leaderName: "",
        score: "",
        timestamp: "",
      },
    ],
    name: "",
    photoURL: "",
    providerId: "",
    spaceName: "",
    uid: userObj.uid,
  });

  // 현재정보 불러오기
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userRef = collection(db, "users");
    // Create a query against the collection.
    const q = query(userRef, where("uid", "==", userObj.uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      onSnapshot(doc(db, "users", profile.uid), (doc) => {
        // activeSemester
        const data = doc.data();
        const details = data.activityDetails;
        const semesterList = [];
        details.map((detail) => semesterList.push(detail.semester));

        setActiveSemester(semesterList);
        setProfile(data);
        setNewProfile({
          ...data,
          spaceName: data.spaceName.slice(1),
        });
      });
    }
  };

  const onLogoutClick = () => {
    signOut(auth);
    navigate("/");
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      // 이건 이미지를 문자열로 바꾼거임
      setNewProfile({ ...profile, photoURL: result });
    };
    reader.readAsDataURL(theFile);
  };

  //기본 프로필 사진으로 변경
  const onSaveBasicProfileImg = async () => {
    setNewProfile({ ...profile, photoURL: "" });

    // firestore에 newProfileObj를 저장
    try {
      const docRef = await setDoc(doc(db, "users", `${userObj.uid}`), {
        ...profile,
        photoURL: "",
      });
      alert("기본 프로필사진으로 변경되었습니다.");
    } catch (e) {
      alert(`프로필 사진 변경에 실패했습니다. \nError adding document: ${e}`);
    }
  };

  // 프로필 사진 변경
  const onSaveProfileImg = async () => {
    let attachmentUrl = "";
    const attachment = newProfile.photoURL;

    // storage에 업로드
    if (attachment !== "") {
      // 파일 참조경로 만들기
      const attachmentRef = ref(storage, `${userObj.uid}`);
      // storage 참조경로로  파일 업로드하기
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );

      // storage 참조경로에 있는 파일 url을 다운로드 해서 attachmentUrl 변수 업데이트
      attachmentUrl = await getDownloadURL(response.ref);

      await updateProfile(auth.currentUser, {
        photoURL: attachmentUrl,
      });
    }

    // firestore에 newProfileObj를 저장
    try {
      const docRef = await setDoc(
        doc(db, "users", `${userObj.uid}`),
        newProfile
      );
      alert("프로필 사진이 변경되었습니다.");
    } catch (e) {
      alert(`프로필 사진 변경에 실패했습니다. \nError adding document: ${e}`);
    }
  };

  // 실제 저장
  const onSaveProfileInfo = async () => {
    // firestore에 newProfileObj를 저장
    try {
      const docRef = await setDoc(doc(db, "users", `${userObj.uid}`), {
        ...newProfile,
        spaceName: "@" + newProfile.spaceName,
      });

      // displayName 업데이트
      await updateProfile(auth.currentUser, {
        displayName: newProfile.name,
      });
      alert("프로필이 업데이트 되었습니다.");
    } catch (e) {
      alert(`프로필 업데이트를 실패했습니다. \nError adding document: ${e}`);
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "name") {
      setNewProfile({ ...newProfile, name: value });
    } else if (name === "spaceName") {
      setNewProfile({ ...newProfile, spaceName: value });
    } else if (name === "entranceClub") {
      setNewProfile({ ...newProfile, entranceClub: value });
    } else if (name === "entranceUniv") {
      setNewProfile({ ...newProfile, entranceUniv: value });
    } else if (name === "activeSemester") {
      const semesterList = typeof value === "string" ? value.split(",") : value;
      setActiveSemester(semesterList.sort());

      const activityList = [];
      for (let i = 0; i < semesterList.length; i++) {
        activityList.push({
          index: i,
          semester: semesterList[i],
          position: "",
        });
      }
      setNewProfile({
        ...newProfile,
        activityDetails: activityList,
        activeSemester: semesterList,
      });
    }

    // 직급 핸들링
    for (let i = 0; i < newProfile.activityDetails.length; i++) {
      if (name === `position${i}`) {
        const detail = newProfile.activityDetails[i];
        detail.position = value;
        setNewProfile({ ...newProfile });
        console.log(newProfile);
      }
    }
  };

  const onDeleteUser = async () => {
    const ok = window.confirm(
      `${userObj.displayName}님의 모든 예보기록 및 회원정보가 삭제됩니다.\n회원탈퇴를 하시겠습니까?`
    );

    if (ok) {
      const user = auth.currentUser;

      await deleteDoc(doc(db, "users", user.uid));

      deleteUser(user)
        .then(() => {
          alert(
            `${userObj.displayName}님의 회원탈퇴가 정상적으로 처리되었습니다.`
          );
        })
        .catch((e) => {
          // An error ocurred
          alert(`${e.Code}\n회원탈퇴 실패`);
        });
    }
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={6}>
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
              나의 프로필
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: { xs: "1rem", md: "2rem" },
                marginBottom: "2rem",
              }}
            >
              <Box>
                <Avatar
                  src={profile.photoURL}
                  sx={{
                    width: { xs: "5rem", md: "8rem" },
                    height: { xs: "5rem", md: "8rem" },
                  }}
                />
              </Box>
              <Box sx={{ width: { xs: "80%", md: "70%" } }}>
                <Box
                  sx={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}
                >
                  <Box sx={{ fontSize: "1.3rem", fontWeight: "500" }}>
                    {profile.name}
                  </Box>
                  <Box
                    color={"text.secondary"}
                    sx={{ fontSize: "0.8rem", lineHeight: "2.2rem" }}
                  >
                    {profile.spaceName}
                  </Box>
                </Box>
                <Box>
                  <Box>
                    <Box
                      sx={{ display: "flex", gap: { xs: "3rem", md: "5rem" } }}
                    >
                      <Box mb={2}>
                        <Box sx={{ fontSize: "0.9rem" }}>학번</Box>
                        <Box>{profile.entranceUniv}</Box>
                      </Box>
                      <Box mb={2}>
                        <Box sx={{ fontSize: "0.9rem" }}>기수</Box>
                        <Box>{profile.entranceClub}기</Box>
                      </Box>
                      <Box mb={2}>
                        <Box sx={{ fontSize: "0.9rem" }}>Verified by.</Box>
                        <Box>
                          {profile.providerId === "password"
                            ? "E-mail"
                            : profile.providerId}
                        </Box>
                      </Box>
                    </Box>

                    <Box>
                      <Box mb={2}>
                        <Box sx={{ fontSize: "0.9rem" }}>이메일</Box>
                        <Box>{profile.email}</Box>
                      </Box>
                    </Box>
                  </Box>

                  <Box>
                    <Box sx={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                      활동학기
                    </Box>
                    <Box
                      sx={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
                    >
                      {profile.activityDetails.map((detail) => (
                        <Box
                          key={detail.semester}
                          bgcolor={"action.hover"}
                          color={"text.secondary"}
                          sx={{
                            width: "6rem",
                            fontSize: "0.8rem",
                            borderRadius: "5rem",
                            textAlign: "center",
                            padding: "0rem 0.5rem",
                          }}
                        >
                          <Box>{detail.position && `${detail.position}`}</Box>
                          <Box>{detail.semester}</Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={onLogoutClick}
              >
                로그아웃
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setShowEditProfile(!showEditProfile)}
              >
                프로필 편집
              </Button>
            </Box>
          </Paper>

          {showEditProfile && (
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
                프로필 사진
              </Box>

              <Box sx={{ marginBottom: "0.5rem" }}>
                <Box
                  sx={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}
                >
                  <Avatar
                    src={newProfile.photoURL}
                    sx={{
                      width: { xs: "7rem", md: "8rem" },
                      height: { xs: "7rem", md: "8rem" },
                    }}
                  />
                  <Box sx={{ width: "50vw" }}>
                    <input
                      type="file"
                      accept="image/*"
                      size="small"
                      style={{ width: "100%" }}
                      onChange={onFileChange}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        width: "100%",
                        marginTop: "1.5rem",
                        borderRadius: "5rem",
                      }}
                      onClick={onSaveProfileImg}
                    >
                      선택한 프로필사진으로 저장
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        width: "100%",
                        marginTop: "1rem",
                        borderRadius: "5rem",
                      }}
                      onClick={onSaveBasicProfileImg}
                    >
                      기본 프로필사진으로 저장
                    </Button>
                  </Box>
                </Box>
                <Divider />
                <Box
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: "500",
                    margin: "1rem 0rem 2rem 0rem",
                  }}
                >
                  프로필 정보
                </Box>
                <Box>
                  <Box mt={3} mb={2}>
                    <TextField
                      fullWidth
                      name="name"
                      label="이름"
                      variant="outlined"
                      size="small"
                      value={newProfile.name}
                      onChange={onChange}
                    />
                  </Box>
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      name="spaceName"
                      label="Space Name"
                      variant="outlined"
                      size="small"
                      value={newProfile.spaceName}
                      onChange={onChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">@</InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      name="entranceUniv"
                      label="학번"
                      variant="outlined"
                      size="small"
                      type="number"
                      value={newProfile.entranceUniv}
                      onChange={onChange}
                    />
                  </Box>
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      name="entranceClub"
                      label="기수"
                      variant="outlined"
                      size="small"
                      type="number"
                      value={newProfile.entranceClub}
                      onChange={onChange}
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-multiple-checkbox-label">
                        활동학기
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        multiple
                        name="activeSemester"
                        value={activeSemester}
                        onChange={onChange}
                        input={<OutlinedInput label="활동학기" />}
                        renderValue={(selected) => selected.join(", ")}
                      >
                        {semesters.map((semester) => (
                          <MenuItem key={semester} value={semester}>
                            <Checkbox
                              checked={activeSemester.indexOf(semester) > -1}
                            />
                            <ListItemText primary={semester} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {newProfile.activityDetails.map((detail) => (
                      <Box
                        sx={{ display: "flex", gap: "1rem", marginTop: "1rem" }}
                      >
                        <Button
                          fullWidth
                          variant="outlined"
                          disabled
                          size="small"
                        >
                          {detail.semester}
                        </Button>
                        <FormControl fullWidth size="small">
                          <InputLabel id="demo-simple-select-label">
                            position
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name={"position" + detail.index}
                            value={detail.position}
                            label="position"
                            onChange={onChange}
                          >
                            <MenuItem value={"리더"}>리더</MenuItem>
                            <MenuItem value={"총무"}>총무</MenuItem>
                            <MenuItem value={"학술부장"}>학술부장</MenuItem>
                            <MenuItem value={"학술부원"}>학술부원</MenuItem>
                            <MenuItem value={"홍보부장"}>홍보부장</MenuItem>
                            <MenuItem value={"홍보부원"}>홍보부원</MenuItem>
                            <MenuItem value={"기획부장"}>기획부장</MenuItem>
                            <MenuItem value={"기획부원"}>기획부원</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    ))}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "1rem",
                      marginTop: "2rem",
                    }}
                  >
                    <Button
                      disableElevation
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={onDeleteUser}
                    >
                      회원탈퇴
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={onSaveProfileInfo}
                    >
                      수정하기
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              margin: { xs: "0rem 0rem 1rem 0rem", md: "1rem" },
              padding: "1rem",
              borderRadius: { xs: "0rem", md: "1rem" },
              minHeight: { xs: "20vh", md: "50vh" },
            }}
          >
            <Box
              sx={{
                fontSize: "1.1rem",
                fontWeight: "500",
                marginBottom: "2rem",
              }}
            >
              나의 예보기록
            </Box>
            <Paper sx={{ borderRadius: "0.5rem" }}>
              <Box
                bgcolor={"action.hover"}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                }}
              >
                <Box sx={{ width: "5rem", textAlign: "center" }}>일시</Box>
                <Box>인도자</Box>
                <Box sx={{ width: "4rem", textAlign: "center" }}>지역</Box>
                <Box>점수</Box>
              </Box>
            </Paper>
            {profile.forecastLog.map((forecast) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.5rem 1rem",
                }}
              >
                <Box>{forecast.forecastDate}</Box>
                <Box>{forecast.leaderName}</Box>
                <Box>{forecast.area}</Box>
                <Box>{forecast.score}</Box>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
