import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AfterLoginHome from "components/home/AfterLoginHome";
import BeforeLoginHome from "components/home/BeforeLoginHome";
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
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <AfterLoginHome />
            ) : (
              <BeforeLoginHome
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                userObj={userObj}
              />
            )
          }
        />

        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<CreateUser />} />

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