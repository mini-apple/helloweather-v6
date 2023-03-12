import React from "react";
import { useParams } from "react-router-dom";

const ForecastResultPage = ({ userObj }) => {
  const { semester, id, spaceName } = useParams();
  return (
    <div>
      ForecastResultPage {semester} {id} {spaceName}
    </div>
  );
};

export default ForecastResultPage;
