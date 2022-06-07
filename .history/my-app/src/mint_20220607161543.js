import { useState } from "@chakra-ui/react";
import { ethers, BigNumber } form 'ethers';
import './App.css';
import { Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import 'sf-font';
import axios from 'axios';
import ABI from './ABI.json';
import VAULTABI from './VAULTABI.json';
import TOKENABI from './TOKENABI.json';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import Web3 from 'web3';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';

const Web3Alc = createAlchemyWeb3("https://polygon-mainnet.g.alchemy.com/v2/qqfXh-S-3dEdCR-orpw_NY06qvD0EFKk");
const polygonscanapikey = "QW34TJU2T87NCU4HWKR7TGUEC1I8TYVDHW";
const moralisapikey = "1ByvMyujsaXkDVTlnUjQIje5e09J2zLHGaS2P6JytHVA1LxfAPPYE8UdOpEjc6ca";
const NFTCONTRACT = "0x3AdEaEe8926485108c6e13983f51A4f6f8D1fA77";
const STAKINGCONTRACT = "0xdBa11414449e7cFC29eb1341fc36C992f01eBbd5";
const polygonscanapi = "https://api.polygonscan.com/api";
const moralisapi = "https://deep-index.moralis.io/api/v2";
const nftpng = "https://bafybeidw6ei2srqovsoeoy5kck4iwzp2tskonq42ztoxy4rvtblob7k7pe.ipfs.nftstorage.link/Fantasy%20%23";

const mint = 
const providerOptions = {
	binancechainwallet: {
		package: true
	},
	walletconnect: {
		package: WalletConnectProvider,
		options: {
			infuraId: "50f6635fbcc742f18ce7a2a5cbe73ffa"
		}
	},
	walletlink: {
		package: WalletLink,
		options: {
			appName: "f-nft Polygon",
			infuraId: "50f6635fbcc742f18ce7a2a5cbe73ffa",
			rpc: "https://polygon-mainnet.infura.io/v3",
			chainId: 137,
			appLogoUrl: null,
			darkMode: true
		}
	},
};

const web3Modal = new Web3Modal({
	network: "mainnet",
	theme: "dark",
	cacheProvider: true,
	providerOptions
});


async function mintnative() {
    var _mintAmount = Number(outvalue);
    var mintRate = Number(await contract.methods.cost().call());
    var totalAmount = mintRate * _mintAmount;
    await Web3Alc.eth.getMaxPriorityFeePerGas().then((tip) => {
        Web3Alc.eth.getBlock('pending').then((block) => {
            var baseFee = Number(block.baseFeePerGas);
            var maxPriority = Number(tip);
            var maxFee = baseFee + maxPriority
            contract.methods.mint(account, _mintAmount)
                .send({
                    from: account,
                    value: String(totalAmount),
                    maxFeePerGas: maxFee,
                    maxPriorityFeePerGas: maxPriority
                });
        });
    })
}

async function mint0() {
    var _pid = "0";
    var erc20address = await contract.methods.getCryptotoken(_pid).call();
    var currency = new web3.eth.Contract(TOKENABI, erc20address);
    var mintRate = await contract.methods.getNFTCost(_pid).call();
    var _mintAmount = Number(outvalue);
    var totalAmount = mintRate * _mintAmount;
    await Web3Alc.eth.getMaxPriorityFeePerGas().then((tip) => {
        Web3Alc.eth.getBlock('pending').then((block) => {
            var baseFee = Number(block.baseFeePerGas);
            var maxPriority = Number(tip);
            var maxFee = maxPriority + baseFee;
            currency.methods.approve(NFTCONTRACT, String(totalAmount))
                .send({
                    from: account
                })
                .then(currency.methods.transfer(NFTCONTRACT, String(totalAmount))
                    .send({
                        from: account,
                        maxFeePerGas: maxFee,
                        maxPriorityFeePerGas: maxPriority
                    },
                        async function (error, transactionHash) {
                            console.log("Transfer Submitted, Hash: ", transactionHash)
                            let transactionReceipt = null
                            while (transactionReceipt == null) {
                                transactionReceipt = await web3.eth.getTransactionReceipt(transactionHash);
                                await sleep(expectedBlockTime)
                            }
                            window.console = {
                                log: function (str) {
                                    var out = document.createElement("div");
                                    out.appendChild(document.createTextNode(str));
                                    document.getElementById("txout").appendChild(out);
                                }
                            }
                            console.log("Transfer Complete", transactionReceipt);
                            contract.methods.mintpid(account, _mintAmount, _pid)
                                .send({
                                    from: account,
                                    maxFeePerGas: maxFee,
                                    maxPriorityFeePerGas: maxPriority
                                });
                        }));
        });
    });
}