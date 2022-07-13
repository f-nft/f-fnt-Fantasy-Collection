import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './App.css';
import './index.css';
import AppFunctional from './AppFunctional';
import MyNavBar from './components/MyNavBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyNavBar />
      <AppFunctional />
  </React.StrictMode>
);
