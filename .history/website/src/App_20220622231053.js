// eslint-disable-next-lineimport './App.css';
// App.js;
import './App.css';
import './index.css';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Component } from 'react';
import 'sf-font';
import axios from 'axios';
import ABI from './ABI.json';
import VAULTABI from './VAULTABI.json';
import TOKENABI from './TOKENABI.json';
import { NFTCONTRACT, STAKINGCONTRACT, polygonscanapi, moralisapi } from './config';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import Web3 from 'web3';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import moving from './images/moving.gif';
import ListNft from './components/Listnft';

var account = null;
var contract = null;
var vaultcontract = null;
var web3 = null;

const Web3Alc = createAlchemyWeb3("https://polygon-mainnet.g.alchemy.com/v2/qqfXh-S-3dEdCR-orpw_NY06qvD0EFKk");
const moralisapikey = "1ByvMyujsaXkDVTlnUjQIje5e09J2zLHGaS2P6JytHVA1LxfAPPYE8UdOpEjc6ca";
const polygonscanapikey = "QW34TJU2T87NCU4HWKR7TGUEC1I8TYVDHW";

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
			rpc: "",
			chainId: 137,
			appLogoUrl: null,
			darkMode: true
		}
	},
};

const web3Modal = new Web3Modal({
	network: "rinkeby",
	theme: "dark",
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
			});
		let config = { 'X-API-Key': moralisapikey, 'accept': 'application/json' };
		await axios.get((moralisapi + `/nft/${NFTCONTRACT}/owners?chain=mumbai&format=decimal`), { headers: config })
			.then(outputb => {
				const { result } = outputb.data
				this.setState({
					nftdata: result
				})
				console.log(outputb.data)
			});
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
					var earned = String(item).split(",")[0];
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
			contract.methods.setApprovalForAll(STAKINGCONTRACT, true).send({ from: account });
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
					});
				});
			});
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
					});
				});
			});
		}

		async function mintnative() {
			var _mintAmount = Number(outvalue);
			var mintRate = Number(await contract.methods.cost().call());
			var totalAmount = mintRate * _mintAmount * 100;
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
			});
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
							from: account,
							maxFeePerGas: maxFee,
							maxPriorityFeePerGas: maxPriority
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
							from: account,
							maxFeePerGas: maxFee,
							maxPriorityFeePerGas: maxPriority
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
		const refreshPage = () => {
			window.location.reload();
		}

		return (
			<div className="items-center justify-start p-2 text-center">
				<nav className='navbar full-width navbar-expand-md navbar-dark mb-3'>
					<div className='container-fluid'>
						<div className='navbar-brand px-5'
							style={{ fontWeight: '800', fontSize: '22px' }} href='#'></div><img className='react-logo' src='FNFT.png' width='20%' alt='logofnft' />
						<Button className='navbar-toggler' type='Button' data-bs-toggle='collapse' data-bs-target='#navbarCollapse' aria-controls='navbarCollapse' aria-expanded='false' aria-label='Toggle navigation'>
							<span className='navbar-toggler-icon'></span>
						</Button>
						<div className='collapse navbar-collapse' id='navbarCollapse'>
							<ul className='navbar-nav me-auto mb-2 px-3 mb-md-0' style={{ fontSize: '22px' }}>
								<li className='nav-item'>
									<a className='nav-link active' aria-current='page' href='#'>Dashboard</a>
								</li>
								<li className='nav-item'>
									<a className='nav-link' href='#'>List NFTs</a>
								</li>
								<li className='nav-item'>
									<a className='nav-link' href='#'>Upgrade NFTs</a>
								</li>
							</ul>
						</div>
					</div>
					<div className='p-3'>
						<input id='connectbtn' type='Button' className='stakegoldeffect2 connectbutton font-blk' onClick={connectWallet} style={{ fontSize: '20px', border: '0.2px', borderRadius: '15px', boxShadow: '1px 1px 5px #000000', fontFamily: 'Rambla' }} value='Connect Your Wallet' />
					</div>
				</nav>
				<div id='nftminter' className='flex-1 justify-between items-center p-5'>
					<div className='nftminted row px-3 p-3 center'>
						<div className='col'>
							<img src='f-nft0-100.gif' width='79%' alt='fantasy' />
						</div>
						<div className='col justify-center'>
							<div className='row container-fluid'>
								<div>
									<h1 className='pt-2' style={{ fontWeight: '500', fontFamily: 'Blaka', textShadow: '1px 1px 2px #000000' }}>NFT Minted</h1>
								</div>
								<h4 style={{ fontFamily: 'Black Ops One', textShadow: '1px 1px 2px #000000' }}>{balance.result}/10,000</h4>
								<h5>Your Wallet Address</h5>
								<div id='wallet-address' style={{
									fontSize: '15px',
									color: '#39FF14',
									fontFamily: 'Ubuntu',
									textShadow: '1px 1px 3px black',
								}}>
									<label for='floatingInput'>Please Connect Wallet</label>
								</div>
							</div>
							<div>
								<label style={{ fontWeight: '200', fontSize: '20px', textShadow: '1px 1px 2px #000000' }}>Select NFT Quantity</label>
							</div>
							<ButtonGroup variant="outline-dark" className="nftminter bg-gradient-to-r from-indigo-500" size='4g'
								aria-label='First group'
								name='amount'
								style={{ boxShadow: '1px 3px 8px #0f1fb0', fontFamily: 'Black Ops One', fontSize: '25px', marginTop: '5px', marginBottom: '5px', marginInline: '10px', textShadow: '1px 1px 5px #000000' }}
								onClick={nftamount => this.handleNFT(nftamount, 'value')}>
								<Button variant="outline-success" value='1' >1</Button>
								<Button variant="outline-info" value='5'>5</Button>
								<Button variant="outline-secondary" value='10'>10</Button>
								<Button variant="outline-warning" value='50'>50</Button>
								<Button className="stakegoldeffect2" variant="outline-dark" value='100'>100</Button>
							</ButtonGroup>
							<h6 className='pt-2' style={{ fontFamily: 'Rambla', fontWeight: '300', fontSize: '18px', marginBottom: '1px', textShadow: '1px 1px 2px #000000' }}>WHAT DO YOU WANT TO PAY?</h6>
							<div className='row px-3 pb-1 pt-1 row-style' style={{ marginTop: '1px', fontFamily: 'Rambla', fontWeight: '300', fontSize: '12px' }}>

								<div className='col'>
									<Button variant="outline-dark" className='Button-style' onClick={mint1} style={{ border: '0.2px', borderRadius: '14px', boxShadow: '1px 1px 5px #000000' }}>
										<img src='usdt.png' width='30%' alt='usdt' />
									</Button>
								</div>
								<div className='col'>
									<Button variant="outline-dark" className='Button-style' onClick={mint0} style={{ border: '0.2px', borderRadius: '14px', boxShadow: '1px 1px 5px #000000' }}>
										<img src={'FNFT.png'} width='30%' alt='fnft' />
									</Button>
								</div>

								<div className='col'>
									<Button variant="outline-dark" className='Button-style' onClick={mintnative} style={{ border: '0.2px', borderRadius: '14px', boxShadow: '1px 1px 5px #000000' }}>
										<img src='matic.png' width='30%' alt='matic' />
									</Button>
								</div>
								<div>
									<label id='txout pb-2' style={{ color: '#39FF14', marginTop: '5px', fontWeight: '500', textShadow: '1px 1px 2px #000000' }}>
										<p style={{ fontSize: '15px' }}>Transfer Status</p>
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id='table' className='row container-fluid px-8 pt-1 mt-2 mb-1'>
					<div className='header container' >
						<div style={{ fontSize: '25px', borderRadius: '14px', color: '#ffffff', fontWeight: '300', fontFamily: 'Black Ops One', textShadow: '1px 1px 5px #000000' }}>Fantasy NFT Staking Pool Active Rewards</div>
						<table className='table px-3 table-bordered table-dark' style={{ fontSize: '20px' }}>
							<thead className='thead-light'>
								<tr>
									<th scope='col'>Collection</th>
									<th scope='col'>Rewards Per Day</th>
									<th scope='col'>Exchangeable Items</th>
								</tr>
							</thead>
							<tbody style={{ fontSize: '18px' }}>
								<tr>
									<td>Discovery</td>
									<td className='amount' data-test-id='rewards-summary-ads'>
										<span className='amount'>0.50</span>&nbsp;<span className='currency'>FOT</span>
									</td>
									<td className='exchange'>
										<span className='amount'>2</span>&nbsp;<span className='currency'>NFTs/M</span>
									</td>
								</tr>
								<tr>
									<td>Angel & Devil</td>
									<td className='amount' data-test-id='rewards-summary-ac'>
										<span className='amount'>2.50</span>&nbsp;<span className='currency'>FOT</span>
									</td>
									<td className='exchange'><span className='amount'>10</span>&nbsp;<span className='currency'>NFTs/M</span>
									</td>
								</tr>
								<tr className='stakegoldeffect'>
									<td>Chaos</td>
									<td className='amount' data-test-id='rewards-summary-one-time'><span className='amount'>1</span>&nbsp;<span className='currency'>FOT™</span>
									</td>
									<td className='exchange'>
										<span className='amount'>25 NFTs/M or </span>
										<span className='currency'>100 FOT/M</span>
									</td>
								</tr>
							</tbody>
						</table>
						<div className='table'>
							<div style={{ fontSize: '25px', borderRadius: '14px', color: '#ffffff', fontWeight: '300', fontFamily: 'Black Ops One', textShadow: '1px 1px 5px #000000' }}>FOT Token Stake Farms</div>
							<table className='table table-bordered table-dark' style={{ borderRadius: '14px' }} >
								<thead className='thead-light' style={{ fontSize: '20px' }}>
									<tr>
										<th scope='col'>Farm Pools</th>
										<th scope='col'>Harvest Daily Earnings</th>
									</tr>
								</thead>
								<tbody style={{ fontSize: '18px' }}>
									<tr>
										<td>Stake FOT to Earn FOT</td>
										<td className='amount' data-test-id='rewards-summary-ads'>
											<span className='amount'>0.01</span>&nbsp;<span className='currency'>Per FOT</span>
										</td>
									</tr>
									<tr>
										<td>Stake FOT to Earn FOT™</td>
										<td className='amount' data-test-id='rewards-summary-ac'>
											<span className='amount'>0.005</span>&nbsp;<span className='currency'>Per FOT™</span>
										</td>
									</tr>
								</tbody>
								<tr style={{ fontSize: '12px', fontStyle: 'italic' }}>* FOT™ can be access Special Mint =&gt; High className Fantasy NFT</tr>
							</table>
						</div>
					</div>
				</div>
				<h1 className="flex justify-center" style={{ color: 'white', fontWeight: '500', fontFamily: 'Blaka', textShadow: '#fffff2' }}>Fantasy NFT Staking Vault </h1>
				<h5 className='flex justify-center p-2' style={{ color: 'orange', fontWeight: '300' }}>Please Connect To Your Wallet First</h5>
				<Button className="btn" onClick={enable} style={{ backgroundColor: "#ffffff10", boxShadow: "1px 1px 5px #000000" }} >Enable Staking</Button>
				<div id='vault' className="flex flex-wrap md:w-65 items-center p-3 px-3" style={{
					borderRadius: '25px', boxShadow: '1px 1px 15px #000000', textShadow: '1px 1px 2px #000000',
					border: "15px",
					fontFamily: 'Rambla',
					backgroundImage: [`url(${moving})`],
					backgroundPosition: [("center")],
					backgroundRepeat: ["repeat-z"],
					backgroundSize: [("100%")],
					backgroundBlendMode: ["ovelay"]
				}}>
					<div className="row">
						<div className="d-flex justify-content-around">
							<div className='align-self-start stakingrewards flow-row flex-1 basis-1 items-center p-3' style={{ borderRadius: '25px', boxShadow: '1px 1px 15px #ffffff', fontFamily: 'Rambla', minWidth: '250px', maxWidth: '250px', maxHeight: '300px', minHeight: '300px' }}>
								<h4 style={{ color: '#FFFFFF', fontWeight: '300' }}>Your Vault Activity</h4>
								<h6 style={{ color: '#FFFFFF' }}>Verify Staked Amount</h6>
								<Button onClick={verify} id='verify' style={{ backgroundColor: '#ffffff10', boxShadow: '1px 1px 5px #000000' }} >Verify</Button>
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
							</div>
							<img className='align-self-center' src='logonew.png' width="200" alt="feature" />
							<div className=' align-self-end stakingrewards flex-1 basis-1 items-center p-3' style={{ borderRadius: '25px', boxShadow: '1px 1px 15px #ffffff', fontFamily: 'Rambla', minWidth: '250px', maxWidth: '250px', maxHeight: '300px', minHeight: '300px' }}>
								<h4 style={{ color: '#FFFFFF', fontWeight: '300' }}> Staking Rewards</h4>
								<Button onClick={rewardinfo} style={{ backgroundColor: '#ffffff10', boxShadow: '1px 1px 5px #000000' }} >Earned FOT Rewards</Button>
								<div id='earned' style={{ color: '#39FF14', marginTop: '5px', fontSize: '25px', fontWeight: '500', textShadow: '1px 1px 2px #000000' }}><p style={{ fontSize: '20px' }}>Earned Tokens</p></div>
								<div className='col-12 mt-2'>
									<div style={{ color: 'white' }}>Claim Rewards</div>
									<Button onClick={claimit} style={{ backgroundColor: '#ffffff10', boxShadow: '1px 1px 5px #000000' }} className='mb-2'>Claim</Button>
								</div>
							</div>
						</div>
						<div className="grid grid-flow-row-dense items-center grid-cols-4 grid-rows-3 ...">
							<div className="col-span-2 row-span-4 p-2">
								<div className='flex-non justify-center items-center pb-2' >
									<img className='flex flex-2 justify-start react-logo' src='FNFT.png' alt='logo' />
									<div id='listnft' className='row'>
										<div id='titlelist' className='row center'>
											<h2 className='row center' style={{ color: 'white', border: '1px', paddingInline: '1px', borderRadius: '5px', boxShadow: '1px 1px 5px #000000' }} >NFTs VAULT</h2>
											<Button className='btn' onClick={refreshPage} style={{ backgroundColor: 'red', border: '1px', padding: '1px', borderRadius: '5px', boxShadow: "1px 1px 5px #000000", maxWidth: "200px" }}>Refresh NFT Vault</Button>
										</div>
									</div>
									<ListNft />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};
}

export default App;
