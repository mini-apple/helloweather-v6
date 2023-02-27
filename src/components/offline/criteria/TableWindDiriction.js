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

function TableWindDirection() {
  const rows = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  const cols = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];

  const index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const dataSet = [
    [10, 8, 6, 4, 2, null, null, null, null, null, null, null, 2, 4, 6, 8],
    [8, 10, 8, 6, 4, 2, null, null, null, null, null, null, null, 2, 4, 6],
    [6, 8, 10, 8, 6, 4, 2, null, null, null, null, null, null, null, 2, 4],
    [4, 6, 8, 10, 8, 6, 4, 2, null, null, null, null, null, null, null, 2],
    [2, 4, 6, 8, 10, 8, 6, 4, 2, null, null, null, null, null, null, null],
    [null, 2, 4, 6, 8, 10, 8, 6, 4, 2, null, null, null, null, null, null],
    [null, null, 2, 4, 6, 8, 10, 8, 6, 4, 2, null, null, null, null, null],
    [null, null, null, 2, 4, 6, 8, 10, 8, 6, 4, 2, null, null, null, null],
    [null, null, null, null, 2, 4, 6, 8, 10, 8, 6, 4, 2, null, null, null],
    [null, null, null, null, null, 2, 4, 6, 8, 10, 8, 6, 4, 2, null, null],
    [null, null, null, null, null, null, 2, 4, 6, 8, 10, 8, 6, 4, 2, null],
    [null, null, null, null, null, null, null, 2, 4, 6, 8, 10, 8, 6, 4, 2],
    [2, null, null, null, null, null, null, null, 2, 4, 6, 8, 10, 8, 6, 4],
    [4, 2, null, null, null, null, null, null, null, 2, 4, 6, 8, 10, 8, 6],
    [6, 4, 2, null, null, null, null, null, null, null, 2, 4, 6, 8, 10, 8],
    [8, 6, 4, 2, null, null, null, null, null, null, null, 2, 4, 6, 8, 10],
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <TableContainer component={Paper} sx={{ margin: "2rem 0rem 1rem 0rem" }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {rows.map((row) => (
                <TableCell key={row} align="center">
                  {row}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {index.map((i) => (
              <TableRow>
                <TableCell component="th" scope="row" align="center">
                  {cols[i]}
                </TableCell>
                <TableCell align="center">{dataSet[i][0]}</TableCell>
                <TableCell align="center">{dataSet[i][1]}</TableCell>
                <TableCell align="center">{dataSet[i][2]}</TableCell>
                <TableCell align="center">{dataSet[i][3]}</TableCell>
                <TableCell align="center">{dataSet[i][4]}</TableCell>
                <TableCell align="center">{dataSet[i][5]}</TableCell>
                <TableCell align="center">{dataSet[i][6]}</TableCell>
                <TableCell align="center">{dataSet[i][7]}</TableCell>
                <TableCell align="center">{dataSet[i][8]}</TableCell>
                <TableCell align="center">{dataSet[i][9]}</TableCell>
                <TableCell align="center">{dataSet[i][10]}</TableCell>
                <TableCell align="center">{dataSet[i][11]}</TableCell>
                <TableCell align="center">{dataSet[i][12]}</TableCell>
                <TableCell align="center">{dataSet[i][13]}</TableCell>
                <TableCell align="center">{dataSet[i][14]}</TableCell>
                <TableCell align="center">{dataSet[i][15]}</TableCell>
              </TableRow>
            ))}
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
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {rows.map((row) => (
                    <TableCell key={row} align="center">
                      {row}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {index.map((i) => (
                  <TableRow>
                    <TableCell component="th" scope="row" align="center">
                      {cols[i]}
                    </TableCell>
                    <TableCell align="center">{dataSet[i][0]}</TableCell>
                    <TableCell align="center">{dataSet[i][1]}</TableCell>
                    <TableCell align="center">{dataSet[i][2]}</TableCell>
                    <TableCell align="center">{dataSet[i][3]}</TableCell>
                    <TableCell align="center">{dataSet[i][4]}</TableCell>
                    <TableCell align="center">{dataSet[i][5]}</TableCell>
                    <TableCell align="center">{dataSet[i][6]}</TableCell>
                    <TableCell align="center">{dataSet[i][7]}</TableCell>
                    <TableCell align="center">{dataSet[i][8]}</TableCell>
                    <TableCell align="center">{dataSet[i][9]}</TableCell>
                    <TableCell align="center">{dataSet[i][10]}</TableCell>
                    <TableCell align="center">{dataSet[i][11]}</TableCell>
                    <TableCell align="center">{dataSet[i][12]}</TableCell>
                    <TableCell align="center">{dataSet[i][13]}</TableCell>
                    <TableCell align="center">{dataSet[i][14]}</TableCell>
                    <TableCell align="center">{dataSet[i][15]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </>
  );
}

export default TableWindDirection;
