import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function InputWindSpeed({ data, setData, text, setText }) {
  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setData({ ...data, windSpeed: value });
    setText(value);
  };
  return (
    <Box sx={{ width: { xs: "38vw", md: "100%" }, marginBottom: "0.7rem" }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">풍속</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={text}
          label="WindSpeed"
          onChange={onChange}
        >
          <MenuItem value={0}>0 m/s ≤ ~ &lt; 0.5 m/s</MenuItem>
          <MenuItem value={1}>0.5 m/s ≤ ~ &lt; 5 m/s</MenuItem>
          <MenuItem value={2}>5 m/s ≤ ~ &lt; 10 m/s</MenuItem>
          <MenuItem value={3}>10 m/s ≤ ~ &lt; 15 m/s</MenuItem>
          <MenuItem value={4}>15 m/s ≤ ~ &lt; 20 m/s</MenuItem>
          <MenuItem value={5}>20 m/s 이상</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default InputWindSpeed;
