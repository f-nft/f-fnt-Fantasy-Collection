import './App.css';
import { Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import 'sf-font';
import { polygonscanapikey, moralisapikey, NFTCONTRACT, STAKINGCONTRACT, polygonscanapi, moralisapi, nftpng } from "./config";
import axios from 'axios';
import ABI from './ABI.json';
import VAULTABI from './VAULTABI.json';
import TOKENABI from './TOKENABI.json';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import Web3 from 'web3';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';

var account = null;
var contract = null;
var vaultcontract = null;
var web3 = null;

const Web3Alc = createAlchemyWeb3("https://polygon-mainnet.g.alchemy.com/v2/qqfXh-S-3dEdCR-orpw_NY06qvD0EFKk");

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

class App extends Component {
	constructor() {
		super();
		this.state = {
			balance: [],
			nftdata: [],
			// rawearn: [],
		};
	}

	handleModal() {
		this.setState({ show: !this.state.show })
	}

	handleStake() {
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
		const { nftdata } = this.state;

		const sleep = (milliseconds) => {
			return new Promise(resolve => setTimeout(resolve, milliseconds))
		}

		web3Modal.clearCachedProvider();
		const expectedBlockTime = 10000;

		async function connectwallet() {
			var _pid = "0";
			var provider = await web3Modal.connect();
			web3 = new Web3(provider);
			await provider.send('eth_requestAccounts');
			var accounts = await web3.eth.getAccounts();
			account = accounts[0];
			document.getElementById('wallet-address').textContent = account;
			contract = new web3.eth.Contract(ABI, NFTCONTRACT);
			vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);
			var getstakednfts = await vaultcontract.methods.tokensOfOwner(account, _pid).call();
			document.getElementById('yournfts').textContent = getstakednfts;
			var getbalance = Number(await vaultcontract.methods.balanceOf(account, _pid).call());
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
		return (
			<div className="App nftapp">
				<nav className="navbar navbarfont navbarglow navbar-expand-md navbar-dark bg-dark mb-4">
					<div className="container-fluid">
						<a className="navbar-brand px-5" style={{ fontWeight: "800", fontSize: '22px' }} href="#"></a><img src="FNFT.png" width="8%" />
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarCollapse">
							<ul className="navbar-nav me-auto mb-2 px-3 mb-md-0" style={{ fontSize: "22px" }}>
								<li className="nav-item">
									<a className="nav-link active" aria-current="page" href="#">Dashboard</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#">List NFTs</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#">Upgrade NFTs</a>
								</li>
							</ul>
						</div>
					</div>
					<div className='px-5'>
						<input id="connectbtn" type="button" className="connectbutton" onClick={connectwallet} style={{ border: "0.2px", borderRadius: "14px", boxShadow: "1px 1px 5px #000000", fontFamily: 'Rambla' }} value="Connect Your Wallet" />
					</div>
				</nav>
				<div className='row'>
					<div className='col'>
						<body className='nftstaker container border-1' style={{ borderRadius: "25px", boxShadow: "1px 1px 15px #ffffff", minWidth: '395px', maxWidth: '395px', minHeight: '700px', maxHeight: "700px" }}>
							<form>
								<div className="row pt-4">
									<div>
										<h1 className="pt-2" style={{ fontWeight: "500", fontFamily: 'Blaka' }}>NFT Minted</h1>
									</div>
									<h2 style={{ fontFamily: 'Blaka' }}>{balance.result}/10,000</h2>
									<h4>Your Wallet Address</h4>
									<div className="pb-3" id='wallet-address' style={{
										color: "#39FF14",
										fontWeight: "400",
										textShadow: "1px 1px 1px black",
									}}>
										<label for="floatingInput">Please Connect Wallet</label>
									</div>
								</div>
								<div>
									<label style={{ fontWeight: "300", fontSize: "20px" }}>Select NFT Quantity</label>
								</div>
								<ButtonGroup size="lg"
									aria-label="First group"
									name="amount"
									style={{ boxShadow: "1px 3px 8px #000000", fontFamily: 'Black Ops One', fontSize: '25px', marginTop: '5px', marginBottom: '5px', marginInline: '5px' }}
									onClick={nftamount => this.handleNFT(nftamount, "value")}>
									<Button value="1" >1</Button>
									<Button value="5">5</Button>
									<Button value="10">10</Button>
									<Button value="50">50</Button>
									<Button value="100">100</Button>
								</ButtonGroup>
								<h6 className="pt-2" style={{ fontFamily: 'Rambla', fontWeight: "300", fontSize: "18px", marginBottom: '1px' }}>Buy with your preferred crypto!</h6>
								<div className="row px-2 pb-2 row-style" style={{ marginTop: '1px', fontFamily: 'Rambla', fontWeight: "300", fontSize: "12px" }}>
									<div className="col">
										<Button className="button-style" onClick={mint0} style={{ border: "0.2px", borderRadius: "14px", boxShadow: "1px 1px 5px #000000" }}>
											<img src={"FNFT.png"} width="50%" />
										</Button>
									</div>
									<div className="col">
										<Button className="button-style" style={{ border: "0.2px", borderRadius: "14px", boxShadow: "1px 1px 5px #000000" }}>
											<img src="usdt.png" width="50%" />
										</Button>
									</div>
									<div className="col">
										<Button className="button-style" onClick={mintnative} style={{ border: "0.2px", borderRadius: "14px", boxShadow: "1px 1px 5px #000000" }}>
											<img src="matic.png" width="50%" />
										</Button>
									</div>
									<div>
										<label id='txout' style={{ color: "#39FF14", marginTop: "5px", fontWeight: '500', textShadow: "1px 1px 2px #000000" }}>
											<p style={{ fontSize: "20px" }}>Transfer Status</p>
										</label>
									</div>
								</div>
							</form>
						</body>
					</div>
					<div className='col'>
						<body className='nftstaker container border-1' style={{ borderRadius: "25px", boxShadow: "1px 1px 15px #ffffff", maxWidth: '100%', minHeight: '700px', maxHeight: "700px" }}>
							<form style={{ fontFamily: 'Rambla' }} >
								<h1 style={{ fontWeight: "500", fontFamily: 'Blaka', marginTop: '25px' }}>Fantasy NFT Staking Vault </h1>
								<h6 style={{ fontWeight: "300" }}>First time staking?</h6>
								<Button className="btn" style={{ backgroundColor: "#ffffff10", boxShadow: "1px 1px 5px #000000" }} >Authorize Your Wallet</Button>
								<div className="row px-3" >
									<div className="col container" style={{ minWidth: '400px', maxWidth: '100%', maxHeight: "300px", minHeight: '300px' }}>
										<form class="stakingrewards" style={{ borderRadius: "25px", boxShadow: "1px 1px 15px #ffffff" }}>
											<h4 style={{ color: "#FFFFFF", fontWeight: '300' }}>Your Vault Activity</h4>
											<h6 style={{ color: "#FFFFFF" }}>Verify Staked Amount</h6>
											<Button style={{ backgroundColor: "#ffffff10", boxShadow: "1px 1px 5px #000000" }} >Verify</Button>
											<table className='table mt-3 mb-5 px-3 table-dark'>
												<tr>
													<td style={{ fontSize: "16px" }}>Your Staked NFTs:
														<span style={{ backgroundColor: "#ffffff00", fontSize: "18px", color: "#39FF14", fontWeight: "500", textShadow: "1px 1px 2px #000000" }} id='yournfts'></span>
													</td>
												</tr>
												<tr>
													<td style={{ fontSize: "16px" }}>Total Staked NFTs:
														<span style={{ backgroundColor: "#ffffff00", fontSize: "18px", color: "#39FF14", fontWeight: "500", textShadow: "1px 1px 2px #000000" }} id='stakedbalance'></span>
													</td>
												</tr>
												<tr>
													<Button className='mb-3' style={{ backgroundColor: "#ffffff10", boxShadow: "1px 1px 5px #000000" }}>Unstake All</Button>
												</tr>
											</table>
										</form>
									</div>
									<div className="col container" style={{ minWidth: '400px', maxWidth: '100%', maxHeight: "300px", minHeight: '300px' }}>
										<form className='stakingrewards' style={{ borderRadius: "25px", boxShadow: "1px 1px 15px #ffffff", fontFamily: 'Rambla' }}>
											<h4 style={{ color: "#FFFFFF", fontWeight: '300' }}> Staking Rewards</h4>
											<Button style={{ backgroundColor: "#ffffff10", boxShadow: "1px 1px 5px #000000" }} >Earned FOT Rewards</Button>
											<div id='earned' style={{ color: "#39FF14", marginTop: "5px", fontSize: '25px', fontWeight: '500', textShadow: "1px 1px 2px #000000" }}><p style={{ fontSize: "20px" }}>Earned Tokens</p></div>
											<div className='col-12 mt-2'>
												<div style={{ color: 'white' }}>Claim Rewards</div>
												<Button style={{ backgroundColor: "#ffffff10", boxShadow: "1px 1px 5px #000000" }} className="mb-2">Claim</Button>
											</div>
										</form>
									</div>
								</div>
							</form>
						</body>
					</div>
					<div className="row px-4 pt-2">
						<div className="header">
							<div style={{ fontSize: '25px', borderRadius: '14px', color: "#ffffff", fontWeight: "300", fontFamily: 'Black Ops One' }}>Fantasy NFT Staking Pool Active Rewards</div>
							<table className='table px-3 table-bordered table-dark' style={{ fontSize: '20px' }}>
								<thead className='thead-light'>
									<tr>
										<th scope="col">Collection</th>
										<th scope="col">Rewards Per Day</th>
										<th scope="col">Exchangeable Items</th>
									</tr>
								</thead>
								<tbody style={{ fontSize: '18px' }}>
									<tr>
										<td>Discovery</td>
										<td className="amount" data-test-id="rewards-summary-ads">
											<span className="amount">0.50</span>&nbsp;<span class="currency">FOT</span>
										</td>
										<td className="exchange">
											<span className="amount">2</span>&nbsp;<span class="currency">NFTs/M</span>
										</td>
									</tr>
									<tr>
										<td>Angel & Devil</td>
										<td className="amount" data-test-id="rewards-summary-ac">
											<span className="amount">2.50</span>&nbsp;<span class="currency">FOT</span>
										</td>
										<td className="exchange"><span class="amount">10</span>&nbsp;<span class="currency">NFTs/M</span>
										</td>
									</tr>
									<tr className='stakegoldeffect'>
										<td>Chaos</td>
										<td className="amount" data-test-id="rewards-summary-one-time"><span class="amount">1</span>&nbsp;<span class="currency">FOT™</span>
										</td>
										<td className="exchange">
											<span className="amount">25 NFTs/M or </span>
											<span className="currency">100 FOT/M</span>
										</td>
									</tr>
								</tbody>
							</table>
							<div className="header">
								<div style={{ fontSize: '25px', borderRadius: '14px', fontWeight: '300', fontFamily: 'Black Ops One', color: 'white' }}>FOT Token Stake Farms</div>
								<table className='table table-bordered table-dark' style={{ borderRadius: '14px' }} >
									<thead className='thead-light' style={{ fontSize: '20px' }}>
										<tr>
											<th scope="col">Farm Pools</th>
											<th scope="col">Harvest Daily Earnings</th>
										</tr>
									</thead>
									<tbody style={{ fontSize: '18px' }}>
										<tr>
											<td>Stake FOT to Earn FOT</td>
											<td className="amount" data-test-id="rewards-summary-ads">
												<span className="amount">0.01</span>&nbsp;<span class="currency">Per FOT</span>
											</td>
										</tr>
										<tr>
											<td>Stake FOT to Earn FOT™</td>
											<td className="amount" data-test-id="rewards-summary-ac">
												<span className="amount">0.005</span>&nbsp;<span class="currency">Per FOT™</span>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div className="container col-lg-11">
					<div className="row items px-3 pt-3">
						<div id='wallet-address' className="ml-3 mr-3" style={{ display: "inline-grid", gridTemplateColumns: "repeat(4, 5fr)", columnGap: "20px" }}>
							{nftdata.map((result, i) => {
								async function stakeit() {
									vaultcontract.methods.stake([result.token_id]).send({ from: account });
								}
								async function unstakeit() {
									vaultcontract.methods.unstake([result.token_id]).send({ from: account });
								}
								return (
									<div className="card nft-card mt-3" key={i} >
										<div className="image-over">
											<img className="card-img-top" src={nftpng + result.token_id} alt="" />
										</div>
										<div className="card-caption col-12 p-0">
											<div className="card-body">
												<h5 className="mb-0">Fantasy NFT #{result.token_id}</h5>
												<h6 className="mb-0 mt-2">Owner<p style={{ color: "#39FF14", textShadow: "1px 1px 2px #000000", fontWeight: '100', fontSize: '12' }}>{result.owner_of}</p></h6>
												<div className="card-bottom d-flex justify-content-between">
													<input key={i} type="hidden" id='stakeid' value={result.token_id} />
													<Button style={{ marginTop: '2px', backgroundColor: "#ffffff10" }} onClick={stakeit}>Stake</Button>
													<Button style={{ marginTop: '2px', backgroundColor: "#ffffff10" }} onClick={unstakeit}>Unstake</Button>
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
		)
	}
}
export default App;