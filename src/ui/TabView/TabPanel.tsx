import React from 'react';

export interface TabPanelProps {
  header: string;
  subheader?: string;
  isValidated?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}

const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
  // TabPanel is just a container - TabView handles the rendering
  return <>{children}</>;
};

export default TabPanel;

