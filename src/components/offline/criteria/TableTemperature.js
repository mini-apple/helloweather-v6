import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

function TableTemperature() {
  const rows = [
    "1.0°C 이하",
    "1.0°C<~≤2.0°C",
    "2.0°C<~≤3.0°C",
    "3.0°C<~≤4.0°C",
    "4.0°C<~≤5.0°C",
    "5.0°C 초과",
  ];

  const dataSet = [10, 8, 6, 4, 2, 0];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <TableContainer component={Paper} sx={{ margin: "2rem 0rem 1rem 0rem" }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              {rows.map((row) => (
                <TableCell key={row} align="center">
                  {row}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" align="center">
                점수
              </TableCell>
              <TableCell align="center">{dataSet[0]}</TableCell>
              <TableCell align="center">{dataSet[1]}</TableCell>
              <TableCell align="center">{dataSet[2]}</TableCell>
              <TableCell align="center">{dataSet[3]}</TableCell>
              <TableCell align="center">{dataSet[4]}</TableCell>
              <TableCell align="center">{dataSet[5]}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={handleOpen}
        >
          전체화면
        </Button>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          bgcolor={"background.default"}
          color={"text.primary"}
          sx={{
            width: "60vw",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            border: "1px solid rgba(5, 5, 5, 10%)",
            borderRadius: "1rem",
            padding: "1rem",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  {rows.map((row) => (
                    <TableCell key={row} align="center">
                      {row}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row" align="center">
                    점수
                  </TableCell>
                  <TableCell align="center">{dataSet[0]}</TableCell>
                  <TableCell align="center">{dataSet[1]}</TableCell>
                  <TableCell align="center">{dataSet[2]}</TableCell>
                  <TableCell align="center">{dataSet[3]}</TableCell>
                  <TableCell align="center">{dataSet[4]}</TableCell>
                  <TableCell align="center">{dataSet[5]}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </>
  );
}

export default TableTemperature;
