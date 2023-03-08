import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "components/home/Homepage";
import OnlineProfile from "routes/OnlineProfile";
import OnlineMember from "routes/OnlineMember";
import OnlineForecast from "routes/OnlineForecast";
import OfflineCalc from "routes/OfflineCalc";
import OfflineString from "routes/OfflineString";
import OfflineCriteria from "routes/OfflineCriteria";
import CreateUser from "components//auth/CreateUser";
import LoginUser from "components/auth/LoginUser";

const Router = ({ isLoggedIn, setIsLoggedIn, userObj, semesters }) => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route path="/login" element={<LoginUser isLoggedIn={isLoggedIn} />} />
      <Route
        path="/register"
        element={<CreateUser isLoggedIn={isLoggedIn} semesters={semesters} />}
      />

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
      <Route path="/forecast" element={<OnlineForecast />} />

      <Route path="/calculator" element={<OfflineCalc />} />
      <Route path="/string" element={<OfflineString />} />
      <Route path="/criteria" element={<OfflineCriteria />} />
    </Routes>
  );
};

export default Router;
