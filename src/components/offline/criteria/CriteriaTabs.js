import React, { useState } from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExplainCloudiness from "./ExplainCloudiness";
import ExplainWindDirection from "./ExplainWindDirection";
import ExplainWindSpeed from "./ExplainWindSpeed";
import ExplainTemperature from "./ExplainTemperature";
import ExplainPrecipitation from "./ExplainPrecipitation";
import TableCloudiness from "./TableCloudiness";
import TableWindDirection from "./TableWindDiriction";
import TableWindSpeed from "./TableWindSpeed";
import TableTemperature from "./TableTemperature";
import TablePrecipitation from "./TablePrecipitation";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CriteriaTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Paper
        sx={{
          margin: { xs: "1rem 0rem", md: "1rem" },
          padding: "1rem",
          borderRadius: { xs: "0rem", md: "1rem" },
        }}
      >
        <Box
          sx={{ fontSize: "1.1rem", fontWeight: "500", marginBottom: "2rem" }}
        >
          채점기준 및 채점표
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Criteria tab"
            variant="scrollable"
            allowScrollButtonsMobile
            scrollButtons="true"
            sx={{ padding: "0px" }}
          >
            <Tab label="운량" {...a11yProps(0)} />
            <Tab label="풍향" {...a11yProps(1)} />
            <Tab label="풍속" {...a11yProps(2)} />
            <Tab label="기온" {...a11yProps(3)} />
            <Tab label="강수량" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ExplainCloudiness />
          <TableCloudiness />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ExplainWindDirection />
          <TableWindDirection />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ExplainWindSpeed />
          <TableWindSpeed />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ExplainTemperature />
          <TableTemperature />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <ExplainPrecipitation />
          <TablePrecipitation />
        </TabPanel>
      </Paper>
    </>
  );
}

export default CriteriaTabs;
