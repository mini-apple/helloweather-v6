import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "components/home/Homepage";
import OnlineProfile from "routes/OnlineProfile";
import OnlineMember from "routes/OnlineMember";
import OnlineForecast from "routes/OnlineForecast";
import OfflineCalc from "routes/OfflineCalc";
import OfflineString from "routes/OfflineString";
import OfflineCriteria from "routes/OfflineCriteria";
import CreateUser from "./auth/CreateUser";
import LoginUser from "./auth/LoginUser";

const Router = ({ isLoggedIn, setIsLoggedIn, userObj }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage isLoggedIn={isLoggedIn} />} />

        <Route
          path="/login"
          element={
            <LoginUser isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/register"
          element={<CreateUser isLoggedIn={isLoggedIn} />}
        />

        <Route path="/profile" element={<OnlineProfile />} />
        <Route path="/member" element={<OnlineMember />} />
        <Route path="/forecast" element={<OnlineForecast />} />

        <Route path="/calculator" element={<OfflineCalc />} />
        <Route path="/string" element={<OfflineString />} />
        <Route path="/criteria" element={<OfflineCriteria />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
