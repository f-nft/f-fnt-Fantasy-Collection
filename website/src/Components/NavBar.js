import '../App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sf-font';
import { polygonscanapikey, moralisapikey, NFTCONTRACT, STAKINGCONTRACT, polygonscanapi, moralisapi } from '../config';
import axios from 'axios';
import ABI from '../ABI.json';
import VAULTABI from '../VAULTABI.json';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import WalletLink from 'walletlink';
import Web3 from 'web3';
import React, { Component } from 'react'

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


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: [],
            rawearn: [],
            wallet: [],
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
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }

        const expectedBlockTime = 10000;

        async function connectWallet(props) {
			console.log(props);
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

        return (
            <nav className='navbar navbarfont navbarglow navbar-expand-md navbar-dark bg-dark mb-4'>
                <div className='container-fluid'>
                <img className='react-logo' src='FNFT.png' width='8%'/>
                    <a className='navbar-brand px-5' style={{ fontWeight: '800', fontSize: '22px' }} href='#'></a><img className='react-logo' src='FNFT.png' width='8%'/>
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
                <div className='px-5'>
                    <input id='connectbtn' type='Button' className='connectbutton' onClick={connectWallet} style={{ fontSize: '15px', border: '0.2px', borderRadius: '14px', boxShadow: '1px 1px 5px #000000', fontFamily: 'Rambla' }} value='Connect Your Wallet' />
                </div>
            </nav>
        )
    }
}

export default Navbar;