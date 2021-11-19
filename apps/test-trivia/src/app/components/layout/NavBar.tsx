import React from 'react';
import { Box } from '@mui/system';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { a11yProps } from './TabPanel';

export const NavBar = ({ handleChange, value }: any) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="The Game to be implemented" {...a11yProps(0)} />
        <Tab label="Instructions & server health" {...a11yProps(1)} />
      </Tabs>
    </Box>
  );
};
