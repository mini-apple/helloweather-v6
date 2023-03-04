import React from "react";
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

    setData({ ...data, cloudiness: value });
    setText(value);
  };

  return (
    <Box sx={{ width: { xs: "38vw", md: "100%" }, marginBottom: "0.7rem" }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">운량</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="cloudiness"
          value={text}
          onChange={onChange}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default InputWindSpeed;
