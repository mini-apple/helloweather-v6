import React from "react";
import ProfilePage from "components/online/profile/ProfilePage";

const OnlineProfile = ({ userObj, semesters }) => {
  return (
    <>
      <ProfilePage userObj={userObj} semesters={semesters} />
    </>
  );
};

export default OnlineProfile;
