import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './App.css';
import './index.css';
import App from "./App.js";
import AppFunctional from './AppFunctional';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppFunctional />
    </React.StrictMode>
);
