import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Nft from './nfts';

<Routes>
<Route path="/nfts" element={<Nft />} />
</Routes>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <App />
    <Nft />
  </React.StrictMode>
);