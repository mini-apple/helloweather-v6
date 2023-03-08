import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";

const MemberCard = ({ member, semester }) => {
  const [position, setPosition] = useState("");

  useEffect(() => {
    console.log(semester);
    const details = member.activityDetails;
    for (let i = 0; i < details.length; i++) {
      if (details[i].semester === semester) {
        setPosition(details[i].position);
      }
    }
  }, [member]);

  return (
    <Paper
      sx={{
        width: { xs: "100%", md: "21rem" },
        borderRadius: "1rem",
        display: "flex",
        gap: "1rem",
        padding: "0.5rem",
        margin: { xs: "0.5rem 0rem", md: "0.5rem" },
      }}
    >
      <Avatar src={member.photoURL} sx={{ width: 80, height: 80 }} />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ fontSize: "1.1rem", fontWeight: "500" }}>
            {member.name}
          </Box>
          <Box color={"text.secondary"} sx={{ fontSize: "0.8rem" }}>
            {member.spaceName}
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: "2rem", margin: "0.4rem 0rem" }}>
          <Box>
            <Box sx={{ fontSize: "0.6rem" }}>학번</Box>
            <Box sx={{ fontSize: "0.9rem" }}>{member.entranceUniv}</Box>
          </Box>
          <Box>
            <Box sx={{ fontSize: "0.6rem" }}>역할</Box>
            <Box sx={{ fontSize: "0.9rem" }}>{position}</Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {member.activityDetails.map((detail) => (
            <Box
              key={detail.semester}
              bgcolor={"action.hover"}
              color={"text.secondary"}
              sx={{
                width: "3.5rem",
                fontSize: "0.7rem",
                borderRadius: "5rem",
                textAlign: "center",
                padding: "0rem 0.5rem",
              }}
            >
              <Box>{detail.semester}</Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default MemberCard;
