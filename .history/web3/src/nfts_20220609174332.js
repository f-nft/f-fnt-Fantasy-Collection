import './App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, useEffect, useState } from 'react';
import 'sf-font';
import { moralisapikey, NFTCONTRACT, STAKINGCONTRACT, moralisapi, nftpng } from './config';
import axios from 'axios';
import ABI from './ABI.json';
import VAULTABI from './VAULTABI.json';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import WalletLink from 'walletlink';
import Web3 from 'web3';

var account = null;
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

// class NFT extends Component {
//     constructor() {
//         super();
//         this.state = {
//             nftdata: [],
//         };
//     }

//     handleModal() {
//         this.setState({ show: !this.state.show })
//     }

//     handleNFT(nftamount) {
//         this.setState({ outvalue:nftamount.target.value });
//     }

//     async componentDidMount() {

//         let config = { 'X-API-Key': moralisapikey, 'accept': 'application/json' };
//         await axios.get((moralisapi + `/nft/${NFTCONTRACT}/owners?chain=polygon&format=decimal`), { headers:config })
//             .then(outputb => {
//                 const { result } = outputb.data
//                 this.setState({
//                     nftdata: result
//                 })
//                 console.log(outputb.data)
//             })
//     }

//     render() {
//         const { nftdata } = this.state;

//         async function getWeb3() {
//             var provider = await web3Modal.connect();
//             web3 = new Web3(provider);
//             await provider.send('eth_requestAccounts');
//             var accounts = await web3.eth.getAccounts();
//             account = accounts[0];
//             document.getElementById('wallet-address').textContent = account;
//             contract = new web3.eth.Contract(ABI, NFTCONTRACT);
//             vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);
//         }

//         return (
//             <div className='nftapp'>
//                 <div className='container-style col-lg-12 center' style={{ marginTop: '-15px' }}>
//                     <div className='row items px-5 pt-5' onLoad={getWeb3}>
//                         <div className='ml-5 mr-5' style={{ display: 'inline-grid', gridTemplateColumns: 'repeat(4, 5fr)', columnGap: '15px', marginTop: '-15px' }}>
//                             {nftdata.map((result, i) => {
//                                 async function stakeit() {
//                                     vaultcontract.methods.stake([result.token_id]).send({ from:account });
//                                 }
//                                 async function unstakeit() {
//                                     vaultcontract.methods.unstake([result.token_id]).send({ from:account });
//                                 }
//                                 return (
//                                     <div className='card nft-card mt-3 stakegoldeffect2' key={i} style={{ minWidth: '200px' }}>
//                                         <div className='image-over'>
//                                             <img className='card-img-top' src={nftpng + result.token_id} alt='' />
//                                         </div>
//                                         <div className='card-caption col-12 p-0' >
//                                             <div className='card-body' >
//                                                 <h5 className='mb-0'>Fantasy NFT #{result.token_id}</h5>
//                                                 <div className='mb-0 mt-0'>Owner<p style={{ color: '#39FF14', textShadow: '1px 1px 2px #000000', marginTop: '5px' }}>{result.owner_of}</p></div>
//                                                 <div className='card-bottom d-flex justify-content-between'>
//                                                     <input key={i} type='hidden' id='stakeid' value={result.token_id} />
//                                                     <Button style={{ marginTop: '2px', backgroundColor: '#ffffff10' }} onClick={stakeit}>Stake</Button>
//                                                     <Button style={{ marginTop: '2px', backgroundColor: '#ffffff10' }} onClick={unstakeit}>Unstake</Button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

export default function NFT() {
    const [apicall, getNfts] = useState([])
    const [nftstk, getStk] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')

    useEffect(() => {
        callApi()
    }, [])

    async function callApi() {
        var provider = await web3Modal.connect();
        web3 = new Web3(provider);
        await provider.send('eth_requestAccounts');
        var accounts = await web3.eth.getAccounts();
        account = accounts[0];
        vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);
        let config = { 'X-API-Key': moralisapikey, 'accept': 'application/json' };
        const nfts = await axios.get((moralisapi + `/nft/${NFTCONTRACT}/owners?chain=polygon&format=decimal`), { headers: config })
            .then(output => {
                const { result } = output.data
                return result;
            })
        const apicall = await Promise.all(nfts.map(async i => {
            let item = {
                tokenId: i.token_id,
                holder: i.owner_of,
                wallet: account,
            }
            return item
        }))
        var _pid = await vaultcontract.methods.tokensOfOwner().call(tokenId);
        const stakednfts = await vaultcontract.methods.tokensOfOwner(accounts, _pid).call()
            .then(id => {
                return id;
            })
        const nftstk = await Promise.all(stakednfts.map(async i => {
            let stkid = {
                tokenId: i,
            }
            return stkid
        }))
        getNfts(apicall)
        getStk(nftstk)
        console.log(apicall);
        setLoadingState('loaded')
    }
    if (loadingState === 'loaded' && !apicall.length)
        return (
            <h1 className="text-3xl">Wallet Not Connected</h1>)
    return (
        <div className='nftportal mb-4'>
            <div className="container col-lg-11">
                <div className="row items px-3 pt-3">
                    <div className="ml-3 mr-3" style={{ display: "inline-grid", gridTemplateColumns: "repeat(4, 5fr)", columnGap: "20px" }}>
                        {apicall.map((nft, i) => {
                            var owner = nft.wallet.toLowerCase();
                            if (owner.indexOf(nft.holder) !== -1) {
                                async function stakeit() {
                                    vaultcontract.methods.stake([nft.tokenId]).send({ from: account });
                                }
                                return (
                                    <div className="card nft-card mt-3 mb-3" key={i} >
                                        <div className="image-over">
                                            <img className="card-img-top" src={nftpng + nft.tokenId + '.png'} alt="" />
                                        </div>
                                        <div className="card-caption col-12 p-0">
                                            <div className="card-body">
                                                <h5 className="mb-0">Fantasy Collection NFT #{nft.tokenId}</h5>
                                                <h5 className="mb-0 mt-2">Status<p style={{ color: "#39FF14", fontWeight: "bold", textShadow: "1px 1px 2px #000000" }}>Ready to Stake</p></h5>
                                                <div className="card-bottom d-flex justify-content-between">
                                                    <input key={i} type="hidden" id='stakeid' value={nft.tokenId} />
                                                    <Button style={{ marginLeft: '2px', backgroundColor: "#ffff3330" }} onClick={stakeit}>Stake it</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                        {nftstk.map((nft, i) => {
                            async function unstakeit() {
                                vaultcontract.methods.unstake([nft.tokenId]).send({ from: account });
                            }
                            return (
                                <div>

                                    <div className="card stakedcard mt-3 mb-3" key={i} >
                                        <div className="image-over">
                                            <img style={{ position: 'absolute', top: '0.05rem', width: '90px' }} src='stakeicon.png'></img>
                                            <img className="card-img-top" src={nftpng + nft.tokenId + '.png'} alt="" />
                                        </div>
                                        <div className="card-caption col-12 p-0">
                                            <div className="card-body">
                                                <h5 className="mb-0">Fantasy Collection NFT #{nft.tokenId}</h5>
                                                <h5 className="mb-0 mt-2">Status<p style={{ color: "#1524EE", fontWeight: "bold", textShadow: "1px 1px 2px #000000" }}>Currently Staked</p></h5>
                                                <div className="card-bottom d-flex justify-content-between">
                                                    <input key={i} type="hidden" id='stakeid' value={nft.tokenId} />
                                                    <Button style={{ marginLeft: '2px', backgroundColor: "#ffff3330" }} onClick={unstakeit}>Unstake it</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}