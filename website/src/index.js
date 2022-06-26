import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import './index.css';
import App from "./App.js";

async function main() {
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3("https://polygon-mainnet.g.alchemy.com/v2/qqfXh-S-3dEdCR-orpw_NY06qvD0EFKk",);
    const blockNumber = await web3.eth.getBlockNumber();
    console.log("The latest block number is " + blockNumber);
    const gasPrice = await web3.eth.getGasPrice();
    console.log("Gas Price is " + gasPrice);
}
main();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
