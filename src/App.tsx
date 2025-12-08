import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DialogProvider } from './contexts/DialogContext';
import NewProject from './pages/NewProject/NewProject';
import DialogPage from './pages/Dialog/Dialog';
import ProjectStatus from './pages/ProjectStatus';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import styles from './styles/App.module.scss';

const App: React.FC = () => {
  return (
    <DialogProvider>
      <Router>
        <div className={styles.appContainer}>
          <Routes>
            <Route path="/" element={<div className={styles.homePage}><h1>Home</h1></div>} />
            <Route path="/new-project" element={<NewProject />} />
            <Route path="/dialog" element={<DialogPage />} />
            <Route path="/project-status" element={<ProjectStatus />} />
          </Routes>
        </div>
      </Router>
    </DialogProvider>
  );
};

export default App;

