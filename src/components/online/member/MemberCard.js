import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

const MemberCard = ({ userAttrObj }) => {
  return (
    <Box className="member-card">
      <Avatar src={userAttrObj.attachmentUrl} sx={{ width: 65, height: 65 }} />
      <Box className="member-card-info">
        <Box className="member-card-name-box">
          <Box>{userAttrObj.name}</Box>
          <Box className="member-card-spaceName">{userAttrObj.spaceName}</Box>
        </Box>

        <Box className="member-card-entranveUniv">
          학번: {userAttrObj.entranceUniv}
        </Box>
        <Box className="member-card-activeYear-box">
          {userAttrObj.activeYear.map((activeYear) => (
            <Box key={activeYear} className="member-card-activeYear">
              {activeYear}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MemberCard;
