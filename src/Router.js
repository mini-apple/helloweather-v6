import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";
import Home from "components/home/Homepage";
import OnlineProfile from "routes/OnlineProfile";
import OnlineMember from "routes/OnlineMember";
import OnlineForecast from "routes/OnlineForecast";
import OfflineCalc from "routes/OfflineCalc";
import OfflineString from "routes/OfflineString";
import OfflineCriteria from "routes/OfflineCriteria";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
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
