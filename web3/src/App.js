import './App.css';
import Navbar from './Components/Navbar';
import Nfts	from './Components/Nfts';
import Stake from './Components/Stake';
import { Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import 'sf-font';
import { polygonscanapikey, moralisapikey, NFTCONTRACT, STAKINGCONTRACT, polygonscanapi, moralisapi, Web3Alc } from './config';
import axios from 'axios';
import ABI from './ABI.json';
import VAULTABI from './VAULTABI.json';
import TOKENABI from './TOKENABI.json';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import WalletLink from 'walletlink';
import Web3 from 'web3';
// import { createClient } from 'redis';

var account = null;
var contract = null;
var vaultcontract = null;
var web3 = null;

const providerOptions = {
	binancechainwallet: {
		package: true
	},
	walletconnect: {
		package: WalletConnectProvider,
		options: {
			infuraId: '50f6635fbcc742f18ce7a2a5cbe73ffa'
		}
	},
	walletlink: {
		package: WalletLink,
		options: {
			appName: 'f-nft Polygon',
			infuraId: '50f6635fbcc742f18ce7a2a5cbe73ffa',
			rpc: 'https://polygon-mainnet.infura.io/v3',
			chainId: 137,
			appLogoUrl: null,
			darkMode: true
		}
	},
};
		
const web3Modal = new Web3Modal({
	network: 'mainnet',
	theme: 'dark',
	cacheProvider: true,
	providerOptions
});

class App extends Component {
	constructor() {
		super();
		this.state = {
			balance: [],
			rawearn: [],
		};
	}

	handleModal() {
		this.setState({ show: !this.state.show })
	}

	handleNFT(nftamount) {
		this.setState({ outvalue: nftamount.target.value });
	}

	async componentDidMount() {

		await axios.get((polygonscanapi + `?module=stats&action=tokensupply&contractaddress=${NFTCONTRACT}&apikey=${polygonscanapikey}`))
			.then(outputa => {
				this.setState({
					balance: outputa.data
				})
				console.log(outputa.data)
			})
		let config = { 'X-API-Key': moralisapikey, 'accept': 'application/json' };
		await axios.get((moralisapi + `/nft/${NFTCONTRACT}/owners?chain=polygon&format=decimal`), { headers: config })
			.then(outputb => {
				const { result } = outputb.data
				this.setState({
					nftdata: result
				})
				console.log(outputb.data)
			})
	}


	render() {
		const { balance } = this.state;
		const { outvalue } = this.state;

		const sleep = (milliseconds) => {
			return new Promise(resolve => setTimeout(resolve, milliseconds))
		}

		const expectedBlockTime = 10000;

		async function connectWallet() {
			var provider = await web3Modal.connect();
			web3 = new Web3(provider);
			await provider.send('eth_requestAccounts');
			var accounts = await web3.eth.getAccounts();

			account = accounts[0];
			document.getElementById('wallet-address').textContent = account;
			contract = new web3.eth.Contract(ABI, NFTCONTRACT);
			vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);
			var getstakednfts = await vaultcontract.methods.tokensOfOwner(account).call();
			document.getElementById('yournfts').textContent = getstakednfts;
			var getbalance = Number(await vaultcontract.methods.balanceOf(account).call());
			document.getElementById('stakedbalance').textContent = getbalance;
			const arraynft = Array.from(getstakednfts.map(Number));
			const tokenid = arraynft.filter(Number);
			var rwdArray = [];
			tokenid.forEach(async (id) => {
				var rawearn = await vaultcontract.methods.earningInfo(account, [id]).call();
				var array = Array.from(rawearn.map(Number));
				console.log(array);
				array.forEach(async (item) => {
					var earned = String(item).split(',')[0];
					var earnedrwd = Web3.utils.fromWei(earned);
					var rewardx = Number(earnedrwd).toFixed(2);
					var numrwd = Number(rewardx);
					console.log(numrwd);
					rwdArray.push(numrwd);
				});
			});
			function delay() {
				return new Promise(resolve => setTimeout(resolve, 300));
			}
			async function delayedLog(item) {
				await delay();
				var sum = item.reduce((a, b) => a + b, 0);
				var formatsum = Number(sum).toFixed(2);
				document.getElementById('earned').textContent = formatsum;
			}
			async function processArray(rwdArray) {
				for (const item of rwdArray) {
					await delayedLog(item);
				}
			}
			return processArray([rwdArray]);
		}

		async function verify() {
			var getstakednfts = await vaultcontract.methods.tokensOfOwner(account).call();
			document.getElementById('yournfts').textContent = getstakednfts;
			var getbalance = Number(await vaultcontract.methods.balanceOf(account).call());
			document.getElementById('stakedbalance').textContent = getbalance;
		}

		async function enable() {
			if (contract.methods.setApprovalForAll(STAKINGCONTRACT, true).send({ from:account }));
			return connectWallet
		}
		async function rewardinfo() {
			var rawnfts = await vaultcontract.methods.tokensOfOwner(account).call();
			const arraynft = Array.from(rawnfts.map(Number));
			const tokenid = arraynft.filter(Number);
			var rwdArray = [];
			tokenid.forEach(async (id) => {
				var rawearn = await vaultcontract.methods.earningInfo(account, [id]).call();
				var array = Array.from(rawearn.map(Number));
				array.forEach(async (item) => {
					var earned = String(item).split(",")[0];
					var earnedrwd = Web3.utils.fromWei(earned);
					var rewardx = Number(earnedrwd).toFixed(2);
					var numrwd = Number(rewardx);
					rwdArray.push(numrwd)
				});
			});
			function delay() {
				return new Promise(resolve => setTimeout(resolve, 300));
			}
			async function delayedLog(item) {
				await delay();
				var sum = item.reduce((a, b) => a + b, 0);
				var formatsum = Number(sum).toFixed(2);
				document.getElementById('earned').textContent = formatsum;
			}
			async function processArray(rwdArray) {
				for (const item of rwdArray) {
					await delayedLog(item);
				}
			}
			return processArray([rwdArray]);
		}
		async function claimit() {
			var rawnfts = await vaultcontract.methods.tokensOfOwner(account).call();
			const arraynft = Array.from(rawnfts.map(Number));
			const tokenid = arraynft.filter(Number);
			await Web3Alc.eth.getMaxPriorityFeePerGas().then((tip) => {
				Web3Alc.eth.getBlock('pending').then((block) => {
					var baseFee = Number(block.baseFeePerGas);
					var maxPriority = Number(tip);
					var maxFee = maxPriority + baseFee;
					tokenid.forEach(async (id) => {
						await vaultcontract.methods.claim([id])
							.send({
								from: account,
								maxFeePerGas: maxFee,
								maxPriorityFeePerGas: maxPriority
							})
					})
				});
			})
		}

		async function unstakeall() {
			var rawnfts = await vaultcontract.methods.tokensOfOwner(account).call();
			const arraynft = Array.from(rawnfts.map(Number));
			const tokenid = arraynft.filter(Number);
			await Web3Alc.eth.getMaxPriorityFeePerGas().then((tip) => {
				Web3Alc.eth.getBlock('pending').then((block) => {
					var baseFee = Number(block.baseFeePerGas);
					var maxPriority = Number(tip);
					var maxFee = maxPriority + baseFee;
					tokenid.forEach(async (id) => {
						await vaultcontract.methods.unstake([id])
							.send({
								from: account,
								maxFeePerGas: maxFee,
								maxPriorityFeePerGas: maxPriority
							})
					})
				});
			})
		}

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
									console.log("Fail To Mint", error)
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

		async function mint1() {
			var _pid = "1";
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
									console.log("Fail To Mint", error)
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

									window.console = {
										log: function (str) {
											var out = document.createElement("div");
											out.appendChild(document.createTextNode(str));
											document.getElementById("error").appendChild(out);
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

		const refreshPage = (error) => {
			window.location.reload();
		}

		// const client = createClient();

		// client.on('error', (err) => console.log('Redis Client Error', err));

		// await client.connect();

		// await client.set('key', 'value');
		// const value = await client.get('key');

		return (
			<div className='App nftapp'>
				<Navbar />
				<div className='row bt-1 pt-2 pb-1 center'>
					<div className='col bt-1 pt-3 pb-3 center'>
						<body className='nftminter' style={{ borderRadius: '25px', boxShadow: '1px 1px 15px #ffffff', minWidth: '385px', maxWidth: '385px', minHeight: '400px', maxHeight: '400px' }}>
							<form>
								<div className='row pt-4'>
									<div>
										<h1 className='pt-2' style={{ fontWeight: '500', fontFamily: 'Blaka' }}>NFT Minted</h1>
									</div>
									<h2 style={{ fontFamily: 'Blaka' }}>{balance.result}/10,000</h2>
									<h5>Your Wallet Address</h5>
									<div className='b' id='wallet-address' style={{
										fontSize: '12px',
										color: '#39FF14',
										textShadow: '1px 1px 1px black',
									}}>
										<label for='floatingInput'>Please Connect Wallet</label>
									</div>
								</div>
								<div>
									<label style={{ fontWeight: '300', fontSize: '20px' }}>Select NFT Quantity</label>
								</div>
								<ButtonGroup size='lg'
									aria-label='First group'
									name='amount'
									style={{ boxShadow: '1px 3px 8px #000000', fontFamily: 'Black Ops One', fontSize: '25px', marginTop: '5px', marginBottom: '5px', marginInline: '10px' }}
									onClick={nftamount => this.handleNFT(nftamount, 'value')}>
									<Button value='1' >1</Button>
									<Button value='5'>5</Button>
									<Button value='10'>10</Button>
									<Button value='50'>50</Button>
									<Button value='100'>100</Button>
								</ButtonGroup>
								<h6 className='pt-2' style={{ fontFamily: 'Rambla', fontWeight: '300', fontSize: '18px', marginBottom: '1px' }}>Buy with your preferred crypto!</h6>
								<div className='row px-2 pb-2 row-style' style={{ marginTop: '1px', fontFamily: 'Rambla', fontWeight: '300', fontSize: '12px' }}>
									<div className='col'>
										<Button className='Button-style' onClick={mint1} style={{ border: '0.2px', borderRadius: '14px', boxShadow: '1px 1px 5px #000000' }}>
											<img src={'FNFT.png'} width='30%' />
										</Button>
									</div>
									<div className='col'>
										<Button className='Button-style' onClick={mint0} style={{ border: '0.2px', borderRadius: '14px', boxShadow: '1px 1px 5px #000000' }}>
											<img src='usdt.png' width='30%' />
										</Button>
									</div>
									<div className='col'>
										<Button className='Button-style' onClick={mintnative} style={{ border: '0.2px', borderRadius: '14px', boxShadow: '1px 1px 5px #000000' }}>
											<img src='matic.png' width='30%' />
										</Button>
									</div>
									<div>
										<label id='txout' style={{ color: '#39FF14', marginTop: '5px', fontWeight: '500', textShadow: '1px 1px 2px #000000' }}>
											<p style={{ fontSize: '15px' }}>Transfer Status</p>
										</label>
									</div>
								</div>
							</form>
						</body>
					</div>
					<div className='col bt-1 pt-2 pb-1 center'>
						<body className='nftstaker' style={{ borderRadius: '25px', boxShadow: '1px 1px 15px #ffffff', minWidth: '385px', maxWidth: '100%', minHeight: '700px', maxHeight: '700px' }}>
							<form style={{ fontFamily: 'Rambla' }} >
								<h1 style={{ fontWeight: '500', fontFamily: 'Blaka', marginTop: '25px' }}>Fantasy NFT Staking Vault </h1>
								<h6 style={{ fontWeight: '300' }}>First time staking?</h6>
								<Button className='btn' conClick={enable} style={{ backgroundColor: '#ffffff10', boxShadow: '1px 1px 5px #000000' }} >Authorize Your Wallet</Button>
								<div className='row px-3 center' >
									<div className='col' style={{ minWidth: '385px', maxWidth: '100%', maxHeight: '300px', minHeight: '300px' }}>
										<form class='stakingrewards' style={{ borderRadius: '25px', boxShadow: '1px 1px 15px #ffffff' }}>
											<h4 style={{ color: '#FFFFFF', fontWeight: '300' }}>Your Vault Activity</h4>
											<h6 style={{ color: '#FFFFFF' }}>Verify Staked Amount</h6>
											<Button onClick={verify} style={{ backgroundColor: '#ffffff10', boxShadow: '1px 1px 5px #000000' }} >Verify</Button>
											<table className='table mt-3 mb-5 px-3 table-dark'>
												<tr>
													<td style={{ fontSize: '16px' }}>Your Staked NFTs:
														<span style={{ backgroundColor: '#ffffff00', fontSize: '18px', color: '#39FF14', fontWeight: '500', textShadow: '1px 1px 2px #000000' }} id='yournfts'></span>
													</td>
												</tr>
												<tr>
													<td style={{ fontSize: '16px' }}>Total Staked NFTs:
														<span style={{ backgroundColor: '#ffffff00', fontSize: '18px', color: '#39FF14', fontWeight: '500', textShadow: '1px 1px 2px #000000' }} id='stakedbalance'></span>
													</td>
												</tr>
												<tr>
													<Button className='mb-3' onClick={unstakeall} style={{ backgroundColor: '#ffffff10', boxShadow: '1px 1px 5px #000000' }}>Unstake All</Button>
												</tr>
											</table>
										</form>
									</div>
									<div className='col container' style={{ minWidth: '385px', maxWidth: '100%', maxHeight: '300px', minHeight: '300px' }}>
										<form className='stakingrewards' style={{ borderRadius: '25px', boxShadow: '1px 1px 15px #ffffff', fontFamily: 'Rambla' }}>
											<h4 style={{ color: '#FFFFFF', fontWeight: '300' }}> Staking Rewards</h4>
											<Button onClick={rewardinfo} style={{ backgroundColor: '#ffffff10', boxShadow: '1px 1px 5px #000000' }} >Earned FOT Rewards</Button>
											<div id='earned' style={{ color: '#39FF14', marginTop: '5px', fontSize: '25px', fontWeight: '500', textShadow: '1px 1px 2px #000000' }}><p style={{ fontSize: '20px' }}>Earned Tokens</p></div>
											<div className='col-12 mt-2'>
												<div style={{ color: 'white' }}>Claim Rewards</div>
												<Button onClick={claimit} style={{ backgroundColor: '#ffffff10', boxShadow: '1px 1px 5px #000000' }} className='mb-2'>Claim</Button>
											</div>
										</form>
									</div>
								</div>
							</form>
						</body>
					</div>
				</div>
				<Stake />
				<div className='row mt-1'>
					<div className='col mt-1 ml-3'>
						<img src="FNFT.png" width={'30%'}></img>
					</div>
					<div className='col'>
						<h3 className='mt-1'>NFTs VAULT</h3>
						<Button onClick={refreshPage} style={{ backgroundColor: "#000000", boxShadow: "1px 1px 5px #000000" }}>Refresh NFT Vault</Button>
					</div>
					<div className='col mt-1 mr-3'>
						<img src="matic.png" width={'15%'}></img>
					</div>
				<Nfts />
				</div>
			</div>
		)
	}
}
export default App;