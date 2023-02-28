import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function InputWindDiriction({ data, setData, text, setText }) {
  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setData({ ...data, windDirection: value });
    setText(value);
  };

  return (
    <Box sx={{ width: { xs: "38vw", md: "100%" }, marginBottom: "0.7rem" }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">풍향</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={text}
          label="WindDirection"
          onChange={onChange}
        >
          <MenuItem value={0}>N</MenuItem>
          <MenuItem value={22.5}>NNE</MenuItem>
          <MenuItem value={45}>NE</MenuItem>
          <MenuItem value={67.5}>ENE</MenuItem>
          <MenuItem value={90}>E</MenuItem>
          <MenuItem value={112.5}>ESE</MenuItem>
          <MenuItem value={135}>SE</MenuItem>
          <MenuItem value={157.5}>SSE</MenuItem>
          <MenuItem value={180}>S</MenuItem>
          <MenuItem value={202.5}>SSW</MenuItem>
          <MenuItem value={225}>SW</MenuItem>
          <MenuItem value={247.5}>WSW</MenuItem>
          <MenuItem value={270}>W</MenuItem>
          <MenuItem value={292.5}>WNW</MenuItem>
          <MenuItem value={315}>NW</MenuItem>
          <MenuItem value={337.5}>NNW</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default InputWindDiriction;
