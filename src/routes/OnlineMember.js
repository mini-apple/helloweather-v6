import React from "react";
import MemberPage from "components/online/member/MemberPage";

const OnlineMember = ({ semesters }) => {
  return (
    <>
      <MemberPage semesters={semesters} />
    </>
  );
};

export default OnlineMember;
