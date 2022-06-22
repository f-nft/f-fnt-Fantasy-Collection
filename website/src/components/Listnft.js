// eslint-disable-next-line
import '../App.css';
import { Button, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import 'sf-font';
import axios from 'axios';
import VAULTABI from '../VAULTABI.json';
import { NFTCONTRACT, STAKINGCONTRACT, moralisapi, nftpng } from '../config';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import Web3 from 'web3';
import * as React from "react";

var account = null;
var vaultcontract = null;
var web3 = null;

const moralisapikey = "1ByvMyujsaXkDVTlnUjQIje5e09J2zLHGaS2P6JytHVA1LxfAPPYE8UdOpEjc6ca";
const providerOptions = {
    binancechainwallet: {
        package: true
    },
    Walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: '50f6635fbcc742f18ce7a2a5cbe73ffa'
        }
    },
    Walletlink: {
        package: WalletLink,
        options: {
            appName: 'f-nft Polygon',
            infuraId: '50f6635fbcc742f18ce7a2a5cbe73ffa',
            rpc: "",
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

export default function ListNft() {
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
        const stakednfts = await vaultcontract.methods.tokensOfOwner(account).call()
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
        <div className='flex flex-1 justify-center'>
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
                                    <Carousel>
                                        <Carousel.Item>
                                            <Carosual.Caption className="snap-center static card nft-card mt-3 mb-3" style={{ scrollPaddingInline: "auto", textShadow: "1px 1px 2px #000000", minWidth: '200px' }} key={i}>
                                                <div className="image-over">
                                                    <img className="card-img-top" src={nftpng + nft.tokenId} alt="Fantasy NFT" />
                                                </div>
                                                <div className="card-caption col-12 p-0">
                                                    <div className="card-body">
                                                        <h6 className="mb-0">Fantasy Collection NFT #{nft.tokenId}</h6>
                                                        <h6 className="mb-0 mt-2">Status<p>Ready to Stake</p></h6>
                                                        <div className="card-bottom d-flex justify-content-between">
                                                            <input key={i} type="hidden" id='stakeid' value={nft.tokenId} />
                                                            <Button className="items-center" style={{ marginLeft: '15px', backgroundColor: "green", textShadow: "1px 1px 2px #000000", padding: '5px', fontSize: '12px', border: '1px', borderRadius: '2px', boxShadow: '1px 1px 5px #000000', marginBottom: '5px' }} onClick={stakeit}>Stake it</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Carosual.Caption>
                                        </Carousel.Item>
                                    </Carousel>
                                )
                            }
                            else {
                                return null;
                            }
                        })}
                        {nftstk.map((nft, i) => {
                            async function unstakeit() {
                                vaultcontract.methods.unstake([nft.tokenId]).send({ from: account });
                            }
                            return (
                                <div className="snap-center card stakedcard mt-3 mb-3" style={{ textShadow: "1px 1px 2px #000000", minWidth: '200px' }} key={i} >
                                    <div className="image-over">
                                        <img style={{ position: 'absolute', top: '0.05rem', width: '39px' }} src={Image} alt='Checked'></img>
                                        <img className="card-img-top" src={nftpng + nft.tokenId} alt="Fantasy NFT" />
                                    </div>
                                    <div className="card-caption col-12 p-0">
                                        <div className="card-body">
                                            <h6 className="mb-0">Fantasy Collection NFT #{nft.tokenId}</h6>
                                            <h6 className="mb-0 mt-2">Status<p style={{ color: "#f524EE", textShadow: "1px 1px 2px #000000" }}>Currently Staked</p></h6>
                                            <div className="card-bottom d-flex justify-content-between">
                                                <input key={i} type="hidden" id='stakeid' value={nft.tokenId} />
                                                <Button style={{ marginLeft: '15px', backgroundColor: "blue", textShadow: "1px 1px 2px #000000", padding: '5px', fontSize: '12px', border: '1px', borderRadius: '2px', boxShadow: '1px 1px 5px #000000', marginBottom: '5px' }} onClick={unstakeit}>Unstake it</Button>
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
