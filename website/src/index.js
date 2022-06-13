import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import NFT from './nfts';

<Routes>
  <Route path="/nfts" element={<NFT />} />
</Routes>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <NFT />
  </React.StrictMode>
)