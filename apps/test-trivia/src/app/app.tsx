import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { TabPanel } from './components/layout/TabPanel';
import { HealthCheck } from './components/guidance/HealthCheck';
import { Header } from './components/layout/Header';
import { NavBar } from './components/layout/NavBar';
import { Instructions } from './components/guidance/Instructions';

export const App = () => {
  const [tabIndex, setTab] = React.useState(0);

  const handleChange = (_: any, newValue: number) => {
    setTab(newValue);
  };

  return (
    <>
      <CssBaseline />
      <Header />
      <NavBar value={tabIndex} handleChange={handleChange} />
      <TabPanel value={tabIndex} index={0}>
        FELAT
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <HealthCheck />
        <Instructions />
      </TabPanel>
    </>
  );
};

export default App;
