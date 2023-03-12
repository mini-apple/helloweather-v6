import React from "react";
import { Route, Routes } from "react-router-dom";
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

const Router = ({ isLoggedIn, setIsLoggedIn, userObj, semesters }) => {
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
            <OnlineProfile userObj={userObj} semesters={semesters} />
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
    </Routes>
  );
};

export default Router;
