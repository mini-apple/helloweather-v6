import React from "react";
import ProfilePage from "components/online/profile/ProfilePage";

const OnlineProfile = ({ userObj }) => {
  return (
    <>
      <ProfilePage userObj={userObj} />
    </>
  );
};

export default OnlineProfile;
