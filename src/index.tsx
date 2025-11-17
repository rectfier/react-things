import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

const rootElement: HTMLElement | null = document.getElementById('root');

if (rootElement !== null) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
} else {
  throw new Error('Root element not found');
}

