import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Homepage from "components/home/Homepage";
import OnlineProfile from "routes/OnlineProfile";
import OnlineMember from "routes/OnlineMember";
import OnlineForecast from "routes/OnlineForecast";
import OfflineCalc from "routes/OfflineCalc";
import OfflineString from "routes/OfflineString";
import OfflineCriteria from "routes/OfflineCriteria";
import CreateUser from "components//auth/CreateUser";
import LoginUser from "components/auth/LoginUser";
import ForecastCreatePage from "./online/forecast/ForecastCreatePage";
import ForecastGamePage from "./online/forecast/ForecastGamePage";
import ForecastResultPage from "./online/forecast/ForecastResultPage";
import ForecastLeaderPage from "./online/forecast/ForecastLeaderPage";
import NotFound from "./NotFound";

import { db } from "fbase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Router = ({
  isLoggedIn,
  setIsLoggedIn,
  userObj,
  refreshUserObj,
  semesters,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      // firestore에 userData가 있는지 확인
      checkHavingUserData(userObj.uid, userObj.displayName);
    }
  }, []);

  const checkHavingUserData = async (userUID, userName) => {
    const q = query(collection(db, "users"), where("uid", "==", userUID));

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      alert(
        `${userName}님의 유저정보가 없습니다.\n프로필탭의 프로필 편집에서 유저정보를 저장해주세요!`
      );
      navigate("/profile");
    }
  };

  return (
    <Routes>
      {/* Homepage */}
      <Route path="/" element={<Homepage />} />

      {/* Authentication 관리 */}
      <Route path="/login" element={<LoginUser isLoggedIn={isLoggedIn} />} />
      <Route
        path="/register"
        element={<CreateUser isLoggedIn={isLoggedIn} semesters={semesters} />}
      />

      {/* Online Pages */}
      <Route
        path="/profile"
        element={
          isLoggedIn ? (
            <OnlineProfile
              userObj={userObj}
              refreshUserObj={refreshUserObj}
              semesters={semesters}
            />
          ) : (
            <LoginUser isLoggedIn={isLoggedIn} />
          )
        }
      />
      <Route
        path="/member"
        element={
          isLoggedIn ? (
            <OnlineMember semesters={semesters} />
          ) : (
            <LoginUser isLoggedIn={isLoggedIn} />
          )
        }
      />
      <Route
        path="/forecast"
        element={
          isLoggedIn ? (
            <OnlineForecast semesters={semesters} />
          ) : (
            <LoginUser isLoggedIn={isLoggedIn} />
          )
        }
      />
      <Route
        path="/forecast/create/:semester"
        element={
          isLoggedIn ? (
            <ForecastCreatePage userObj={userObj} />
          ) : (
            <LoginUser isLoggedIn={isLoggedIn} />
          )
        }
      />
      <Route
        path="/forecast/game/:semester/:id/:spaceName"
        element={
          isLoggedIn ? (
            <ForecastGamePage userObj={userObj} />
          ) : (
            <LoginUser isLoggedIn={isLoggedIn} />
          )
        }
      />
      <Route
        path="/forecast/leader/:semester/:id"
        element={
          isLoggedIn ? (
            <ForecastLeaderPage userObj={userObj} />
          ) : (
            <LoginUser isLoggedIn={isLoggedIn} />
          )
        }
      />
      <Route
        path="/forecast/result/:semester/:id/:spaceName"
        element={
          isLoggedIn ? (
            <ForecastResultPage userObj={userObj} />
          ) : (
            <LoginUser isLoggedIn={isLoggedIn} />
          )
        }
      />

      {/* Offline Pages */}
      <Route path="/calculator" element={<OfflineCalc />} />
      <Route path="/string" element={<OfflineString />} />
      <Route path="/criteria" element={<OfflineCriteria />} />

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
