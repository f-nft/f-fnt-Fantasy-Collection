
import "./App.css";
import "./index.css";
import { Button, ButtonGroup } from "react-bootstrap";
import {Table} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import "sf-font";
import axios from "axios";
import ABI from "./config/ABI.json";
import VAULTABI from "./config/VAULTABI.json";
import TOKENABI from "./config/TOKENABI.json";
import { NFTCONTRACT, STAKINGCONTRACT, polygonscanapi, moralisapi } from "./config/config";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import Web3 from "web3";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import moving from "./images/moving.gif";
import ListNft from "./components/Listnft";
import  MyCarousel  from "./components/CarouselComponent";
import { ethers } from "ethers";
import {Container,Row} from "react-bootstrap";


const { ethereum } = window;
var account = null;
var contract = null;
var vaultcontract = null;
var web3 = null;
var isWalletConnect = false;

const Web3Alc = createAlchemyWeb3("https://polygon-mainnet.g.alchemy.com/v2/qqfXh-S-3dEdCR-orpw_NY06qvD0EFKk");
const moralisapikey = "1ByvMyujsaXkDVTlnUjQIje5e09J2zLHGaS2P6JytHVA1LxfAPPYE8UdOpEjc6ca";
const polygonscanapikey = "QW34TJU2T87NCU4HWKR7TGUEC1I8TYVDHW";


const providerOptions = {
    //Binance Chain Mainnet
     binancechainwallet: { package: true },
     bsc:{
        package: true,
        rpcUrl: "https://api.binance.com/api/v3/ticker/price?symbol=BNTUSDT"

     },

     //Coinbase Wallet
     walletconnect: {
        //Wallet Connect
         package: WalletConnectProvider,
         options: { infuraId: "50f6635fbcc742f18ce7a2a5cbe73ffa" },
     },
     //MetaMask Mainnet
    walletlink: {
        package: WalletLink,
        options: {
            appName: "f-nft Polygon",
            infuraId: "50f6635fbcc742f18ce7a2a5cbe73ffa",
            rpc: "", chainId: 137,
            appLogoUrl: null,
            darkMode: true,
        },
    },
};


const web3Modal = new Web3Modal({
    network: "mainnet",
    theme: "dark",
    cacheProvider: false,
    providerOptions,
});
 export async function connectWallet() {
        //if outside modal is clicked, close modal and return to main page in catch block
        try {
            var provider = await web3Modal.connect()
            web3 = new Web3(provider);
           
        }
        catch (error) {
            alert("Please select a wallet");
            return;
        }
        isWalletConnect = true;
        localStorage.setItem("isWalletConnected", true);

        //get account
        try {
            var accounts = await ethereum.request({ method: "eth_accounts" });
            console.log(accounts);
            account = accounts[0];
            isWalletConnect = true;

            // account = await web3.eth.getAccounts().then((accounts) => accounts[0]);

            console.log("Account selected " + account);
        } catch (err) {
            alert(err.message);
            return null;
        }
        //get contract
        try {
            contract = new web3.eth.Contract(ABI, NFTCONTRACT);
            vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);
            console.log("Contract loaded");
        }
        catch (err) {
            console.log(err);
        }
        await provider.send("eth_requestAccounts").catch((err) => alert(err));
        // var accounts = await web3.eth.getAccounts().catch((err) => alert(err));

        account = accounts[0];
        document.getElementById("wallet-address").textContent = account;
        contract = new web3.eth.Contract(ABI, NFTCONTRACT);
        vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);

        var getstakednfts = await vaultcontract.methods
            .tokensOfOwner(account)
            .call()
            .catch((err) => alert(err));

        // document.getElementById("yournfts").textContent = getstakednfts;
        // var getbalance = await web3.eth
        //   .getBalance(account)
        //   .catch((err) => alert(err));
        var getbalance = Number(
            await vaultcontract.methods
                .balanceOf(account)
                .call()
                .catch((err) => alert(err))
        );
        // document.getElementById("stakedbalance").textContent = getbalance;
        //get account balance
        console.log("Account balance is " + getbalance);

        var arraynft = [];
        getstakednfts
            ? (arraynft = Array.from(getstakednfts.map(Number)))
            : (arraynft = []);
        const tokenid = arraynft.filter(Number);
        var rwdArray = [];
        tokenid.forEach(async (id) => {
            var rawearn = await vaultcontract.methods
                .earningInfo(account, [id])
                .call()
                .catch((err) => alert(err));
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
            return new Promise((resolve) => setTimeout(resolve, 300));
        }
        async function delayedLog(item) {
            await delay();
            var sum = item.reduce((a, b) => a + b, 0);
            var formatsum = Number(sum).toFixed(2);
            // document.getElementById("earned").textContent = formatsum;
        }
        async function processArray(rwdArray) {
            for (const item of rwdArray) {
                await delayedLog(item);
            }
        }
        return processArray([rwdArray])

    }

      //disconnectWallet function
    export async function disconnectWallet() {
        isWalletConnect = false;
        localStorage.setItem('isWalletConnected', false)
        web3Modal.clearCachedProvider();
        web3 = null;
        account = null;
        contract = null;
        vaultcontract = null;
        document.getElementById("wallet-address").textContent = "";
        // document.getElementById("yournfts").textContent = "";
        // document.getElementById("stakedbalance").textContent = "";
        // document.getElementById("earned").textContent = "";
        window.location.reload();
    }

export default function AppFunctional() {
    const [show, setShow] = useState(false);
    const [outvalue, setOutvalue] = useState();
    const [balance, setBalance] = useState([]);
    const [rawearn, setRawearn] = useState([]);

    const [nftdata, setNftData] = useState();

    const maxPriority = 0;



    useEffect(() => {
        const init = async () => {
            web3Modal.clearCachedProvider();
            await axios.get(polygonscanapi + `?module=stats&action=tokensupply&contractaddress=${NFTCONTRACT}&apikey=${polygonscanapikey}`)
                .then((outputa) => {
                    setBalance(outputa.data);
                    console.log(outputa.data);
                })
                .catch((err) => alert(err.message));
            let config = { "X-API-Key": moralisapikey, accept: "application/json" };
            await axios.get(moralisapi + `/nft/${NFTCONTRACT}/owners?chain=polygon&format=decimal`, { headers: config })
                .then((outputb) => {
                    const { result } = outputb.data;
                    setNftData(result);
                    console.log(outputb.data);
                })
                .catch((err) => alert(err.message));
        };
        init();
    }, []);


    // Modal State
    const handleModal = () => setShow(!show)

    const handleNFT = nftamount => setOutvalue(nftamount.target.value)

    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    const expectedBlockTime = 10000;

    const refreshPage = () => {
        window.location.reload();
    };

    async function metamint() {
        //mint for metamask polygon network
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        try {
            if (!window.ethereum.selectedAddress) {
                alert("Please unlock your MetaMask account");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_accounts" });
            let balance = await provider.getBalance(accounts[0]);
            if (balance.lt(ethers.utils.parseEther("0.1"))) {
                alert("Please deposit at least 0.1 ETH to the MetaMask account");
                return;
            }
            let bal = ethers.utils.formatEther(balance);
            console.log(bal);
            //pay for the NFT minting
            ethereum.request({
                method: "eth_sendTransaction", params: [{
                    from: accounts[0],
                    to: NFTCONTRACT,
                    value: web3.utils.toWei((0.06).toString(), "ether"),
                    gas: "30000",
                    gasPriceinWei: "1000",
                }]
            }).then(function (response) {
                console.log(response);
            }
            ).catch(function (error) {
                console.log(error);
            }
            );


        }
        catch (error) {
            alert(error);
        }
    }

    return (
        <Container fluid>
         <div className="grid items-center justify-start p-2 text-center">
            <div id="nftsell">
                <Row id="nftminter" className="flex-1 justify-between items-center p-5">
                    <div className="nftminted row px-3 p-3 center" id="nftpics">
                        <div className="col-md" style={{color:"#b30062"}}>
                            <img src="f-nft0-100.gif" width="79%" alt="fantasy" />
                            <div>
                                <h1 className="pt-2" style={{ fontWeight: "500", fontFamily: "Blaka", textShadow: "1px 1px 2px #000000" }}>
                                    NFT Minted
                                </h1>
                            </div>
                            <h4 style={{ fontFamily: "Black Ops One", textShadow: "1px 1px 2px #000000", }}>
                                {balance.result}/10,000
                            </h4>
                        </div>
                        <div className="col-md justify-center">
                            <div className="row container-fluid">
                                <h5 style={{color:"#b30062"}}>Your Wallet Address</h5> 
                                <div id="wallet-address" style={{ fontSize: "15px", color: "#39FF14", fontFamily: "Ubuntu", textShadow: "1px 1px 3px black", }}>
                                    <label htmlFor="floatingInput">Please Connect Wallet</label>
                                </div>
                            </div>
                            <h3 className="pt-2" style={{ fontFamily: "Rambla", fontWeight: "300", fontSize: "12px", marginBottom: "1px", textShadow: "1px 1px 2px #000000",color:"#b30062" }}>
                                PAYMENT (Only 120 Matic)
                            </h3>
                            <ButtonGroup variant="outline-dark" className="nftminter bg-gradient-to-r from-indigo-500" size="8g" aria-label="First group" name="amount"
                                style={{ boxShadow: "1px 3px 8px #0f1fb0", fontFamily: "Black Ops One", fontSize: "25px", marginTop: "5px", marginBottom: "5px", marginInline: "20px", textShadow: "1px 1px 5px #000000" }}>
                                <Button className="stakegoldeffect2" variant="outline-dark" onClick={metamint} defaultValue="1">MINT</Button>
                            </ButtonGroup>
                            <div className="row px-3 pb-1 pt-1 row-style"
                                style={{ marginTop: "1px", fontFamily: "Rambla", fontWeight: "300", fontSize: "12px", }}>
                                <div>
                                    <label id="txout pb-2" style={{ color: "#39FF14", marginTop: "5px", fontWeight: "500", textShadow: "1px 1px 2px #000000", }}>
                                        <p style={{ fontSize: "15px" }}>Transfer Status</p>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
          <MyCarousel/>
                <Table responsive="sm" size="sm">
                    <div className="header container" id="title">
                        <div
                            style={{ fontSize: "25px", borderRadius: "14px", color: "#ffffff", fontWeight: "300", fontFamily: "Black Ops One", textShadow: "1px 1px 5px #000000" }}>
                            Fantasy NFT Staking Rewards
                        </div>
                        <table className="table px-3 table-bordered table-dark" style={{ fontSize: "20px" }}>
                            <thead className="thead-light table-primary" id="title">
                                <tr>
                                    <th scope="col">Collection</th>
                                    <th scope="col">Rewards Per Day</th>
                                    <th scope="col">Exchangeable Items</th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: "18px" }} id="subtitle">
                                <tr>
                                    <td>Discovery</td>
                                    <td className="amount" data-test-id="rewards-summary-ads">
                                        <span className="amount">0.50</span>&nbsp;
                                        <span className="currency">FOT</span>
                                    </td>
                                    <td className="exchange">
                                        <span className="amount">2</span>&nbsp;
                                        <span className="currency">NFTs/M</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Angel & Devil</td>
                                    <td className="amount" data-test-id="rewards-summary-ac">
                                        <span className="amount">2.50</span>&nbsp;
                                        <span className="currency">FOT</span>
                                    </td>
                                    <td className="exchange">
                                        <span className="amount">10</span>&nbsp;
                                        <span className="currency">NFTs/M</span>
                                    </td>
                                </tr>
                                <tr className="stakegoldeffect">
                                    <td>Chaos</td>
                                    <td className="amount" data-test-id="rewards-summary-one-time">
                                        <span className="amount">1</span>&nbsp;
                                        <span className="currency">FOT™</span>
                                    </td>
                                    <td className="exchange">
                                        <span className="amount">25 NFTs/M or </span>
                                        <span className="currency">100 FOT/M</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <Table>
                            <div
                                style={{ fontSize: "25px", borderRadius: "14px", color: "#ffffff", fontWeight: "300", fontFamily: "Black Ops One", textShadow: "1px 1px 5px #000000", }}>
                                FOT Token Stake Farms
                            </div>
                            <table className="table table-bordered table-dark" style={{ borderRadius: "14px" }}>
                                <thead className="thead-light table-primary" style={{ fontSize: "20px" }}>
                                    <tr>
                                        <th scope="col">Farm Pools</th>
                                        <th scope="col">Harvest Daily Earnings</th>
                                    </tr>
                                </thead>
                                <tbody style={{ fontSize: "18px" }}>
                                    <tr>
                                        <td>Stake FOT to Earn FOT</td>
                                        <td className="amount" data-test-id="rewards-summary-ads">
                                            <span className="amount">0.01</span>&nbsp;
                                            <span className="currency">Per FOT</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Stake FOT to Earn FOT™</td>
                                        <td className="amount" data-test-id="rewards-summary-ac">
                                            <span className="amount">0.005</span>&nbsp;
                                            <span className="currency">Per FOT™</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <tbody>
                                <tr style={{ fontSize: "12px", fontStyle: "italic" }}>
                                    <td>
                                        * Only FOT™ can be access Special Mint =&gt; High Quality
                                        Fantasy NFT
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Table>
            </div>
            <h1 className="flex justify-center" style={{ color: "white", fontWeight: "500", fontFamily: "Blaka", textShadow: "#fffff2", }}>
                Fantasy NFT Staking Coming Soon
            </h1>
        </div>
        </Container>
    )
}
