import React, { useState } from 'react';
import TabView from '../../ui/TabView/TabView';
import TabPanel from '../../ui/TabView/TabPanel';
import StepOneForm from './StepOneForm';
import StepTwoForm from './StepTwoForm';
import styles from '../../styles/NewProject.module.scss';

const NewProject: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className={styles.newProjectContainer}>
      <div className={styles.newProjectCard}>
        <h1>New Project</h1>
        <TabView 
          activeIndex={activeIndex} 
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel 
            header="Step 1" 
            subheader="Fill in Project Specifications"
          >
            <StepOneForm />
          </TabPanel>
          <TabPanel 
            header="Step 2" 
            subheader="Fill in Financial Details and Select Vendor"
          >
            <StepTwoForm />
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default NewProject;

