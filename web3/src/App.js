import './App.css';
import { Button, ButtonToolbar,ButtonGroup, Modal } from 'react-bootstrap';  
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';
import axios from 'axios';
import React, { Component } from 'react';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import "sf-font";

const ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const VAULTABI = [
	{
		"inputs": [
			{
				"internalType": "contract Collection",
				"name": "_nft",
				"type": "address"
			},
			{
				"internalType": "contract FNFTRewards",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "addVault",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "_pid",
				"type": "uint256"
			}
		],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Claimed",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "_pid",
				"type": "uint256"
			}
		],
		"name": "claimForAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "NFTStaked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "NFTUnstaked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pid",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			}
		],
		"name": "stake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "_pid",
				"type": "uint256"
			}
		],
		"name": "unstake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_pid",
				"type": "uint256"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			}
		],
		"name": "earningInfo",
		"outputs": [
			{
				"internalType": "uint256[2]",
				"name": "info",
				"type": "uint256[2]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC721Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_pid",
				"type": "uint256"
			}
		],
		"name": "tokensOfOwner",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "ownerTokens",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalStaked",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "vault",
		"outputs": [
			{
				"internalType": "uint24",
				"name": "tokenId",
				"type": "uint24"
			},
			{
				"internalType": "uint48",
				"name": "timestamp",
				"type": "uint48"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "VaultInfo",
		"outputs": [
			{
				"internalType": "contract Collection",
				"name": "nft",
				"type": "address"
			},
			{
				"internalType": "contract FNFTRewards",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

var TOKENABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

var TOKENABI1 = [{"inputs":[{"internalType":"address","name":"_proxyTo","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_new","type":"address"},{"indexed":false,"internalType":"address","name":"_old","type":"address"}],"name":"ProxyOwnerUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_new","type":"address"},{"indexed":true,"internalType":"address","name":"_old","type":"address"}],"name":"ProxyUpdated","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxyOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxyType","outputs":[{"internalType":"uint256","name":"proxyTypeId","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferProxyOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newProxyTo","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"updateAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_newProxyTo","type":"address"}],"name":"updateImplementation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
var TOKENABI2 = []

var account = null;
var contract = null;
var vaultcontract = null;
var web3 = null;

const NFTCONTRACT = "0xBb00E372CE028aB76E8D829975299c686Fc3ece9";
const STAKINGCONTRACT = "0x5f042D808409b30f8589567bc3214d66a1428461"
const polygonscanapikey = "QW34TJU2T87NCU4HWKR7TGUEC1I8TYVDHW";
const polygonscanapi = "https://api.polygonscan.com/api/"
const moralisapi = "https://deep-index.moralis.io/api/v2/";
const moralisapikey = "1ByvMyujsaXkDVTlnUjQIje5e09J2zLHGaS2P6JytHVA1LxfAPPYE8UdOpEjc6ca";
const nftpng = "https://ipfs.io/ipfs/QmaEL7JDG5BvF898gmB13y5oe99RjPzbAA6Ne1W9my1UmW?filename=Fantasy_";

const providerOptions = {
	binancechainwallet: {
		package: true
	  },
	  walletconnect: {
		package: WalletConnectProvider,
		options: {
		  infuraId: "2425ded72dea4c43942e4b1dc7e3aa7a"
		}
	},
	walletlink: {
		package: WalletLink, 
		options: {
		  appName: "f-nft Polygon", 
		  infuraId: "2425ded72dea4c43942e4b1dc7e3aa7a",
		  rpc: "", 
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


class App extends Component {
	constructor() {
		super();
		this.state = {
			balance: [],
			nftdata: [],
		};
	}

	handleModal(){  
		this.setState({show:!this.state.show})  
	} 

	handleNFT(nftamount) {
		this.setState({outvalue:nftamount.target.value});
  	}

	async componentDidMount() {
		
		await axios.get((polygonscanapi + `?module=stats&action=tokensupply&contractaddress=${NFTCONTRACT}&apikey=${polygonscanapikey}`))
		.then(outputa => {
            this.setState({
                balance:outputa.data
            })
            console.log(outputa.data)
        })
		let config = {'X-API-Key': moralisapikey, 'accept': 'application/json'};
		await axios.get((moralisapi + `/nft/${NFTCONTRACT}/owners?chain=mumbai&format=decimal`), {headers: config})
		.then(outputb => {
			const { result } = outputb.data
            this.setState({
                nftdata:result
            })
            console.log(outputb.data)
        })
	}
  
  render() {
	const {balance} = this.state;
	const {nftdata} = this.state;
	const {outvalue} = this.state;

	async function connectwallet() { 
		var provider = await web3Modal.connect();
		web3 = new Web3(provider); 
		await provider.send('eth_requestAccounts'); 
		var accounts = await web3.eth.getAccounts(); 
		account = accounts[0]; 
		document.getElementById('wallet-address').textContent = account; 
		contract = new web3.eth.Contract(ABI, NFTCONTRACT);
		vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);
  }

  async function mint0() {
	  	  var _pid = "0";
		  var erc20address = await contract.methods.getCryptotoken(_pid).call();
		  var currency = new web3.eth.Contract(TOKENABI, erc20address);
		  var mintRate = await contract.methods.getNFTCost(_pid).call();
		  var _mintAmount = Number(outvalue);
		  var totalAmount = mintRate * _mintAmount;
		  currency.methods.approve(NFTCONTRACT, String(totalAmount)).send({from: account})
		  .then(
		  await currency.methods.transfer(NFTCONTRACT, String(totalAmount)).send({from:account}))
		  .then(
			contract.methods.mintpid(account, _mintAmount, _pid).send({from: account})
		  );
		}
  async function mint1() {
	  	  var _pid = "1";
		  var erc20address = await contract.methods.getCryptotoken(_pid).call();
		  var currency = new web3.eth.Contract(TOKENABI1, erc20address);
		  var mintRate = await contract.methods.getNFTCost(_pid).call();
		  var _mintAmount = Number(outvalue);
		  var totalAmount = mintRate * _mintAmount;
		  currency.methods.approve(NFTCONTRACT, String(totalAmount)).send({from: account})
		  .then(
		  await currency.methods.transfer(NFTCONTRACT, String(totalAmount)).send({from:account}))
		  .then(
			contract.methods.mintpid(account, _mintAmount, _pid).send({from: account})
		  );
		}

  async function mint2() {
	  	  var _pid = "2";
		  var erc20address = await contract.methods.getCryptotoken(_pid).call();
		  var currency = new web3.eth.Contract(TOKENABI2, erc20address);
		  var mintRate = await contract.methods.getNFTCost(_pid).call();
		  var _mintAmount = Number(outvalue);
		  var totalAmount = mintRate * _mintAmount;
		  currency.methods.approve(NFTCONTRACT, String(totalAmount)).send({from: account})
		  .then(
		  await currency.methods.transfer(NFTCONTRACT, String(totalAmount)).send({from:account}))
		  .then(
			contract.methods.mintpid(account, _mintAmount, _pid).send({from: account})
		  );
		}
  
		async function mint() {
			var _mintAmount = Number(outvalue);
			var mintRate = Number(await contract.methods.cost().call()); 
			var totalAmount = mintRate * _mintAmount; 
		  contract.methods.mint(account, _mintAmount).send({ from: account, value: String(totalAmount) }); 
		} 
  async function claimit() {
	  var tokenids = Number(document.querySelector("[name=stkid]").value);
	  vaultcontract.methods.claim([tokenids]).send({from: account});
  }
  
  async function verify() {
	  var getbalance = Number(await vaultcontract.methods.balanceOf(account).call());
	  document.getElementById('stakedbalance').textContent = getbalance; 
  }
  
  async function enable() {
	  contract.methods.setApprovalForAll(STAKINGCONTRACT, true).send({from: account});
	}

  async function rewardinfo() {
    var tokenid = Number(document.querySelector("[name=stkid]").value);
    var rawearn = await vaultcontract.methods.earningInfo(account, ([tokenid])).call();
    var earned =  String(rawearn).split(",")[0];
    var earnedrwd = Web3.utils.fromWei(earned);
    var rewards = Number(earnedrwd).toFixed(2);
    document.getElementById('earned').textContent = rewards;
  }

  return (
    <div className="App" style={{background:"#00000090"}}>
      <div className='col'>
          <body className='nftstaker border-0'>
            <form  style={{ fontFamily: "SF Pro Display" }}>
            <Button style={{ backgroundColor: "#6789ff10", boxShadow: "1px 1px 5px #000000" }} onClick={()=>this.handleModal()}>MINT NFT</Button>
              <h2 style={{ borderRadius: '14px', fontWeight: "300", fontSize: "25px" }}>Fantasy NFT Staking Vault </h2>
              <h6 style={{ fontWeight: "300" }}>First time staking?</h6>
              <Button className="btn" style={{ backgroundColor: "#ffffff10", boxShadow: "1px 1px 5px #000000" }} >Authorize Your Wallet</Button>
              <div className="row px-3">
                {/* <div className="col">
                  <form class="stakingrewards" style={{ borderRadius: "25px", boxShadow: "1px 1px 15px #ffffff" }}>
                    <h5 style={{ color: "#FFFFFF", fontWeight: '300' }}>Your Vault Activity</h5>
                    <h6 style={{ color: "#FFFFFF" }}>Verify Staked Amount</h6>
                    <Button style={{ backgroundColor: "#ffffff10", boxShadow: "1px 1px 5px #000000" }} >Verify</Button>
                    <table className='table mt-3 mb-5 px-3 table-dark'>
                      <tr>
                        <td style={{ fontSize: "medium" }}>Your Staked NFTs:
                          <span style={{ backgroundColor: "#ffffff00", fontSize: "21px", color: "#39FF14", fontWeight: "500", textShadow: "1px 1px 2px #000000" }} id='yournfts'></span>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: "medium" }}>Total Staked NFTs:
                          <span style={{ backgroundColor: "#ffffff00", fontSize: "21px", color: "#39FF14", fontWeight: "500", textShadow: "1px 1px 2px #000000" }} id='stakedbalance'></span>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: "medium" }}>Unstake All Staked NFTs
                          <Button className='mb-3' style={{ backgroundColor: "#ffffff10", boxShadow: "1px 1px 5px #000000" }}>Unstake All</Button>
                        </td>
                      </tr>
                    </table>
                  </form>
                  </div>
                  <img className="col-lg-4" src="fnft-features.png"/>
                  <div className="col">
                    <form className='stakingrewards' style={{ borderRadius: "25px", boxShadow: "1px 1px 15px #ffffff", fontFamily: "SF Pro Display" }}>
                      <h5 style={{ color: "#FFFFFF", fontWeight: '300' }}> Staking Rewards</h5>
                      <Button style={{ backgroundColor: "#ffffff10", boxShadow: "1px 1px 5px #000000" }} >Earned FOT Rewards</Button>
                      <div id='earned' style={{ color: "#39FF14", marginTop: "5px", fontSize: '25px', fontWeight: '500', textShadow: "1px 1px 2px #000000" }}><p style={{ fontSize: "20px" }}>Earned Tokens</p></div>
                      <div className='col-12 mt-2'>
                        <div style={{ color: 'white' }}>Claim Rewards</div>
                        <Button style={{ backgroundColor: "#ffffff10", boxShadow: "1px 1px 5px #000000" }} className="mb-2">Claim</Button>
                      </div>
                    </form>
                  </div> */}
                </div>
                <div className="row px-4 pt-2">
                  <div class="header">
                    <div style={{ fontSize: '25px', borderRadius: '14px', color: "#ffffff", fontWeight: "300" }}>Fantasy NFT Staking Pool Active Rewards</div>
                    <table className='table px-3 table-bordered table-dark'>
                      <thead className='thead-light'>
                        <tr>
                          <th scope="col">Collection</th>
                          <th scope="col">Rewards Per Day</th>
                          <th scope="col">Exchangeable Items</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Fantasy Discovery Collection</td>
                          <td class="amount" data-test-id="rewards-summary-ads">
                            <span class="amount">0.50</span>&nbsp;<span class="currency">FOT</span>
                          </td>
                          <td class="exchange">
                            <span class="amount">2</span>&nbsp;<span class="currency">NFTs/M</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Fantasy Angel&Devil Collection</td>
                          <td class="amount" data-test-id="rewards-summary-ac">
                            <span class="amount">2.50</span>&nbsp;<span class="currency">FOT</span>
                          </td>
                          <td class="exchange"><span class="amount">10</span>&nbsp;<span class="currency">NFTs / Month</span>
                          </td>
                        </tr>
                        <tr className='stakegoldeffect'>
                          <td>Fantasy Chaos Collection</td>
                          <td class="amount" data-test-id="rewards-summary-one-time"><span class="amount">1</span>&nbsp;<span class="currency">FOT*</span>
                          </td>
                          <td class="exchange">
                            <span class="amount">25 NFTs/ Month or </span>
                            <span class="currency">100 FOTs/ Month</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div class="header">
                      <div style={{ fontSize: '25px', borderRadius: '14px', fontWeight: '300' }}>FOT Token Stake Farms</div>
                      <table className='table table-bordered table-dark' style={{ borderRadius: '14px' }} >
                        <thead className='thead-light'>
                          <tr>
                            <th scope="col">Farm Pools</th>
                            <th scope="col">Harvest Daily Earnings</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Stake FOT to Earn FOT</td>
                            <td class="amount" data-test-id="rewards-summary-ads">
                              <span class="amount">0.01</span>&nbsp;<span class="currency">Per FOT</span>
                            </td>
                          </tr>
                          <tr>
                            <td>Stake FOT to Earn FOT*</td>
                            <td class="amount" data-test-id="rewards-summary-ac">
                              <span class="amount">0.005</span>&nbsp;<span class="currency">Per FOT</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
            </form>
          </body>
        </div>


		<form class="gradient col-2 lg-3 mt-20 mr-50" width="240" height="240" style={{borderRadius:"25px",boxShadow:"1px 1px 15px #000000", marginTop:"55px"}}>
	    
    </form>
    <Button onClick={enable}>Enable Staking</Button>
  <Modal size="lg" className='border-0 d-flex' style={{backgroundColor:"#00000090"}} show={this.state.show} onHide={()=>this.handleModal()}>
    <div className='container fluid'>
	    <div className='row'>
		    <div className='col'>
		      <Modal.Body className='modal-style col-12 border-0'>
			      <div className="row">
			        <div className="col mb-4">
			          <Button className="btn mb-0" margin="alignTop" style={{backgroundColor:"#fff9f10"}} onClick={connectwallet}>Connect Your Wallet</Button>
				          <h1 style={{fontWeight:"30"}}>NFT Minter</h1>
				           <h3>{balance.result}1/10,000</h3>
				        </div>
		          <div className="col">
		        <img src="fnft-features.png" className='mt-3 ml-3' width="240" height="240"/>
		    </div>
		  </div>
		<div className='row'>
		  <div className='col xs={6} md={4}'>
		    <h6 style={{fontSize:"20px"}}>Your Wallet Address</h6>
		      <div className="" id='wallet-address' style={{
            color: "#39FF14", 
            textShadow:"1px 1px 1px black",
            fontSize:"17px"
            }}>
      	    <label for="floatingInput">Please Connect Wallet</label>
		      </div>
		  </div>
		</div>
			  <div className='row'>
			    <label style={{fontWeight:"300", fontSize:"18px"}}>Select NFT Quantity</label>
			      <ButtonToolbar aria-label="Toolbar">
  				    <ButtonGroup size="lg" className="me-3 mb-2" aria-label="First group" name="amount" style={{boxShadow:"1px 1px 5px #000000"}} onClick={nftamount => this.handleNFT(nftamount, "value")}>
                <Button value="1">1</Button>
                <Button value="2">2</Button>
                <Button value="5">5</Button>
                <Button value="10">10</Button>
                <Button value="50">50</Button>
  				    </ButtonGroup>
			      </ButtonToolbar>
		      </div>
		    <div className="row mt-2">
		      <div className="col xs={10} md={8}">
		        <h6 style={{fontFamily:"SF Pro Display", fontWeight:"300", fontSize:"18px"}}>Buy with your preferred crypto!</h6>
              <button style={{marginRight:"2px", backgroundColor:"transparent", border:"0.1"}} onClick={mint0}>
                FOT<img src="FNFT.png" width="90" height="90"/>
              </button>
              <button style={{marginRight:"2px", backgroundColor:"transparent", border:"1"}} onClick={mint1}>
                Polygon<img src="usdt.png" width="90"/>
              </button>
              <button style={{marginRight:"2px", backgroundColor:"transparent", border:"1"}} onClick={mint2}>
                BRP20<img src="binance_usd.png" width="90"/>
              </button>
              <button style={{marginRight:"2px", backgroundColor:"transparent", border:"1"}} onClick={mint}>
                MATIC<img src="matic.png" width="90"/>
              </button>
		        </div>
		      </div>
		    <div class="root">
        <div class="header">
        <div className='mt-2' style={{fontSize:'20px', borderRadius:'14px'}}>Fantasy NFT Staking Pools Active Rewards</div>
    </div>
	<table className='table table-bordered table-dark' style={{borderRadius:'14px'}} >
			<thead className='thead-light'>
    		<tr>
                <th scope="col">Collection</th>
      	 		<th scope="col">Rewards Per Day</th>
      			<th scope="col">Exchangeable Items</th>
    		</tr>
			</thead>
                <tbody>
                    <tr>
                        <td>Fantasy Discover Collection</td>
                        <td class="amount" data-test-id="rewards-summary-ads">
                            <span class="amount">0.50</span>&nbsp;<span class="currency">FOT</span>
                        </td>
                        <td class="exchange">
                            <span class="amount">2</span>&nbsp;<span class="currency">NFTs/M</span>
                        </td>
                    </tr>
                    <tr>
                        <td>Fantasy Angel&Devil Collection</td>
                        <td class="amount" data-test-id="rewards-summary-ac">
                            <span class="amount">2.50</span>&nbsp;<span class="currency">FOT</span>
                        </td>
                        <td class="exchange"><span class="amount">10</span>&nbsp;<span class="currency">NFTs/M</span>
                        </td>
                    </tr>
                    <tr>
                        <td>Fantasy Chaos Collection</td>
                        <td class="amount" data-test-id="rewards-summary-one-time"><span class="amount">1</span>&nbsp;<span class="currency">FOT+</span>
                        </td>
                        <td class="exchange">
                            <span class="amount">25 NFTs/M or </span>
							<span class="currency">100 FOT/M</span>
                        </td>
                    </tr>
                </tbody>
            </table>
			<div class="header">
        		<div className='mt-2' style={{fontSize:'20px', borderRadius:'14px'}}>FOT Token Stake Farms</div>
    		</div>
			<table className='table table-bordered table-dark' style={{borderRadius:'14px'}} >
			<thead className='thead-light'>
    		<tr>
                <th scope="col">Farm Pools</th>
      	 		<th scope="col">Harvest Daily Earnings</th>
    		</tr>
			</thead>
                <tbody>
                    <tr>
                        <td>Stake FOT to Earn FOT</td>
                        <td class="amount" data-test-id="rewards-summary-ads">
                            <span class="amount">0.01</span>&nbsp;<span class="currency">Per FOT</span>
                        </td>
                    </tr>
                    <tr>
                        <td>Stake FOT to Earn FOT+</td>
                        <td class="amount" data-test-id="rewards-summary-ac">
                            <span class="amount">0.005</span>&nbsp;<span class="currency">Per FOT</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
		  <div className="row mt-2">
		  <div className="col xs={12} md={12}">
            <Button style={{backgroundColor:"#ffffff10"}} className="mb-3"  onClick={()=>this.handleModal()}>Cancel</Button>  
			</div>
		</div>
		  </Modal.Body>
		  </div>
		  </div>
		  </div>
        </Modal> 
 <div className='container'>
<div className='row'>
  <form class="gradient col-lg-3 mt-5 mr-3" style={{borderRadius:"25px",boxShadow:"1px 1px 15px #000000", marginRight:"5px"}}>
    <h4 style={{color:"#FFFFFF"}}>Staking Vault</h4>
	<h5 style={{color:"#FFFFFF"}}>Verify Amount Staked</h5>
	<Button onClick={verify}>Verify</Button>
	<div id='stakedbalance' style={{marginTop:"5px",color:"#39FF14",fontWeight:"bold",textShadow:"1px 1px 2px #000000", fontSize:"35px" }}>
      <label for="floatingInput">NFT Balance</label>
      </div>
  </form>
  <form class="gradient col-lg-3 mt-5 mr-3" style={{borderRadius:"25px",boxShadow:"1px 1px 15px #000000", marginRight:"5px"}}>
  <h5 style={{color:"#FFFFFF"}}> Staking Rewards</h5>
	<Button onClick={rewardinfo}>Earned FOT Rewards</Button>
	<div id='earned' style={{color: "#39FF14",marginTop:"5px", fontSize:'25px',fontWeight:'bold',textShadow:"1px 1px 2px #000000"}}><p style={{fontSize:"20px"}}>Earned Tokens</p></div>
	<input name="stkid" style={{color: "#39FF14",fontSize:'25px',fontWeight:'bold',textShadow:"1px 1px 2px #000000",width:'50px',backgroundColor:'#00000000'}}/>
	<label className="col-4" style={{color:'white'}}>NFT ID</label>
	<div className='col-12 mt-2'>
      <div style={{color:'white'}}>Claim Rewards</div>
      <Button className="mb-2" onClick={claimit}>Claim</Button>
    </div>
  </form>
  <div className="row items mt-3">
  <div className="ml-3 mr-3" style={{display: "inline-grid",gridTemplateColumns: "repeat(4, 5fr)",columnGap: "10px"}}>
  {nftdata.map((result, i )=> {
	    	async function stakeit() {
			vaultcontract.methods.stake([result.token_id]).send({from: account});
		  	}
		  	async function unstakeit() {
			vaultcontract.methods.unstake([result.token_id]).send({from: account});
		  	}
	  return (
			<div className="card mt-3" key={i} >
            		<div className="image-over">
					<img className="card-img-top"  src={nftpng + result.token_id +'.png'} alt="" />
					</div>
					<div className="card-caption col-12 p-0">
                    	<div className="card-body">
							<h5 className="mb-0">Fantasy Collection NFT #{result.token_id}</h5>
							<h5 className="mb-0 mt-2">Location Status<p style={{color:"#39FF14",fontWeight:"bold",textShadow:"1px 1px 2px #000000"}}>{result.owner_of}</p></h5>
                    	<div className="card-bottom d-flex justify-content-between">
						<input key={i} type="hidden" id='stakeid' value={result.token_id} />
							<Button className="mb-2 mt-3 col-5" style={{marginLeft:'2px'}} onClick={stakeit}>Stake it</Button>
							<Button className="mb-2 mt-3 col-5" style={{marginLeft:'2px'}} onClick={unstakeit}>Unstake it</Button>
							</div>
					</div>
                </div>
            </div>
        	);
    	})}
	</div>
	</div>
  	</div>
	</div>
 	  
     
     
     
     </div>
  	);
};
}

export default App;
