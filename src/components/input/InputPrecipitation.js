import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function InputPrecipitation({ data, setData, text, setText }) {
  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setData({ ...data, precipitation: value });
    setText(value);
  };

  return (
    <Box sx={{ width: { xs: "38vw", md: "100%" } }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">강수량</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={text}
          label="precipitation"
          onChange={onChange}
        >
          <MenuItem value={0}>X (없음)</MenuItem>
          <MenuItem value={1}>0.0 mm ≤ ~ &lt; 5 mm</MenuItem>
          <MenuItem value={2}>5 mm ≤ ~ &lt; 10 mm</MenuItem>
          <MenuItem value={3}>10 mm ≤ ~ &lt; 20 mm</MenuItem>
          <MenuItem value={4}>20 mm ≤ ~ &lt; 30 mm</MenuItem>
          <MenuItem value={5}>30 mm ≤ ~ &lt; 50 mm</MenuItem>
          <MenuItem value={6}>50 mm ≤ ~ &lt; 80 mm</MenuItem>
          <MenuItem value={7}>80 mm ≤ ~ &lt; 120 mm</MenuItem>
          <MenuItem value={8}>120 mm 이상</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default InputPrecipitation;
