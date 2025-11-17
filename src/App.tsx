import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewProject from './pages/NewProject/NewProject';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './styles/app.scss';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<div className="home-page"><h1>Home</h1></div>} />
          <Route path="/new-project" element={<NewProject />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

