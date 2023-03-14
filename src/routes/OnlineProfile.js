import React from "react";
import ProfilePage from "components/online/profile/ProfilePage";

const OnlineProfile = ({ userObj, refreshUserObj, semesters }) => {
  return (
    <>
      <ProfilePage
        userObj={userObj}
        refreshUserObj={refreshUserObj}
        semesters={semesters}
      />
    </>
  );
};

export default OnlineProfile;
