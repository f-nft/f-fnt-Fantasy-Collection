
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
import {Container,Row,Col} from "react-bootstrap";
import hero from "./images/hero.png";
import about from "./images/about.png"
import ImageScroller from 'react-image-scroller';
import AOS from 'aos';
import "aos/dist/aos.css";
import { Card} from "react-bootstrap";
import footerimg from './images/footer.png';
import Commonimg from './images/common.png'


const { ethereum } = window;
var account = null;
var vaultcontract = null;
var web3 = null;
var isWalletConnect = false;
var contract=null;

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
            // contract = new web3.eth.Contract(ABI, NFTCONTRACT);
            isWalletConnect = true;

            // account = await web3.eth.getAccounts().then((accounts) => accounts[0]);

            console.log("Account selected " + account);
        } catch (err) {
            alert(err.message);
            return null;
        }
        //get contract
        try {
            // contract = new web3.eth.Contract(ABI, NFTCONTRACT);
            vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);
            console.log("Contract loaded");
            console.log(contract);
            console.log(vaultcontract);

        }
        catch (err) {
            alert(err.message);
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
         AOS.init({
            duration: 1000,
            once: true,
            
        });
        AOS.refresh();
    }, []);



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
    async function mint1() {
			var _pid = "1";
			var erc20address = await contract.methods.getCryptotoken(_pid).call();
			var currency = new web3.eth.Contract(TOKENABI, erc20address);
			var mintRate = await contract.methods.getNFTCost(_pid).call();
			var _mintAmount = Number(outvalue);
			var totalAmount = mintRate * _mintAmount;
            try{
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
            catch(err){
                alert(err);
            }
			
		}
    async function metamint2() {
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
        <div data-aos="fade-up">
        <Container fluid style={{width:"100%"}}>
            {/* create a hero div for image */}
            <div className="hero mt-4" style={{textAlign:"center"}}>
                {/* image for hero */}
                <img src={hero} alt="hero" style={{width:"80%",marginTop:"50px"}}/>

                {/* create a container with border radius */}
                <div className="container" style={{padding:"20px"}} id="herodiv">
                    21000 Unique Rogue's. <br/>
                    Fantasy NFT Staking Rewards<br/><br/>

                    <p>Pre-minting (October 2022)</p> <br/>
                    <h5 style={{color:"red"}}>Your Wallet Address</h5> 
                                <div id="wallet-address" style={{ fontSize: "15px"}}>
                                    <label htmlFor="floatingInput">Please Connect Wallet</label>
                                </div>
                     <p style={{fontWeight:"bold"}} id="totalmint">{balance.result}/10,000</p>

                {/* Button with red background and white text */}
                <Button onClick={metamint2}
                style={{width:"6em", fontSize: "26px", border: "0.2px", borderRadius: "15px",fontFamily: "Rambla",backgroundColor:"#e50303" }}
                >
                    Mint
                </Button> <br/>
                 <h6>PAYMENT (Only 120 Matic)</h6>
                        </div>
                             <div>
                                    <label id="txout pb-2" style={{ color: "red", marginTop: "5px", fontWeight: "500", textShadow: "1px 1px 2px #000000", }}>
                                        <p style={{ fontSize: "15px" }}>Transfer Status</p>
                                    </label>
                                </div>
            </div>
                </Container>
         <div className="grid items-center justify-start p-2 text-center">
            <div id="nftsell">
                <Row id="nftminter" className="flex-1 justify-between items-center p-5">
                
                </Row>
        <Container fluid style={{backgroundColor:"black"}}>
                 <MyCarousel/>
                 {/* Row with 2 columns */}
                 <Row data-aos="slide-left" style={{color:"white",fontSize:"46px",fontWeight:"bold",marginTop:"5em"}}>
                    <Col sm={6} data-aos="fade-zoom-in">
                        What is F-NFTs? <br/>
                        <p style={{fontSize:"18px",marginTop:"5em"}}>
                        Non-Fungible Token, concretely means an indivisible token, that is to say, 
                        an asset exchangeable on the blockchain, but not a crypto-currency. Snoop Dog, Activision or Atari,
                         and big companies like artists are getting into Nfts, Reasons to care about Nfts An interesting 
                         technology NFTS is now one of the pillars of the blockchain ecosystem, 
                         if you missed Crypto-currencies or are not interested in them, NFTS will be a very good introduction to discovering what blockchain is.
                         </p>
                    </Col>
                    <Col sm={6}>
                        <img src={about} alt="about" style={{width:"100%"}}/>
                    </Col>
                 </Row>
        </Container>
        <Row style={{marginTop:"2em"}}>
            <Col sm={6} style={{textAlign:"left"}}>
                <h1 style={{fontWeight:"bold"}}>Rarity</h1>
                <p style={{marginTop:"40px",fontSize:"18px",fontWeight:"bold"}}>
                    Rarity is a decentralized platform that allows you to create your own unique collectible <br/>
                    and sell it to other users.<br/>
                    Each collectible is unique and can be sold to anyone for a price.<br/>
                    You can also buy collectibles from other users.<br/>
                </p>
                {/* create a list of 5 buttons */}
                <ul style={{marginTop:"2em"}}>
                    <li>
                        <Button style={{marginTop:"1em",width:"10em", fontSize: "18px", border: "0.2px", 
                        borderRadius: "15px",fontFamily: "Rambla",backgroundColor:"#e50303" ,opacity:"34%",height:"46px"}}>
                              <a href="/" style={{textDecoration:"none",color:"white"}}>
                                Register
                            </a>
                        </Button>
                    </li>
                    <li>
                        <Button style={{marginTop:"1em",width:"10em", fontSize: "18px", border: "0.2px", 
                        borderRadius: "15px",fontFamily: "Rambla",backgroundColor:"#e50303",opacity:"45%",height:"46px" }}>
                              <a href="/" style={{textDecoration:"none",color:"white"}}>
                                Rare
                            </a>
                        </Button>
                    </li>
                    <li>
                        <Button style={{marginTop:"1em",width:"10em", fontSize: "18px", border: "0.2px",
                         borderRadius: "15px",fontFamily: "Rambla",backgroundColor:"#e50303",opacity:"55%",height:"46px" }}>
                              <a href="/" style={{textDecoration:"none",color:"white"}}>
                                Epic
                            </a>
                        </Button>
                    </li>
                    <li>
                        <Button style={{marginTop:"1em",width:"10em", fontSize: "18px", border: "0.2px", 
                        borderRadius: "15px",fontFamily: "Rambla",backgroundColor:"#e50303",opacity:"64%",height:"46px" }}>
                              <a href="/" style={{textDecoration:"none",color:"white"}}>
                                Exotic
                            </a>
                        </Button>
                    </li>
                    <li>
                        <Button style={{marginTop:"1em",width:"10em", fontSize: "18px", border: "0.2px",
                         borderRadius: "15px",fontFamily: "Rambla",backgroundColor:"#e50303",height:"46px" }}>
                            <a href="/" style={{textDecoration:"none",color:"white"}}>
                                Legendary
                            </a>
                        </Button>
                    </li>
                    </ul>

                </Col>
            <Col sm={6}>
                <img src={Commonimg} alt="about2" style={{width:"100%"}}/>
                </Col>
        </Row>
        <ImageScroller>
            <img src={about} alt="image1" style={{width:"100%"}}/>
            <img src={about} alt="image1" style={{width:"100%"}}/>
            <img src={about} alt="image1" style={{width:"100%"}}/>
            <img src={about} alt="image1" style={{width:"100%"}}/>
            <img src={about} alt="image1" style={{width:"100%"}}/>
            <img src={about} alt="image1" style={{width:"100%"}}/>
        </ImageScroller>
        {/* create 3 cards and replace them with table columns */}
        <Row style={{fontFamily: "Black Ops One" ,color:"white"}}>
              <div
                            style={{ fontSize: "25px", borderRadius: "14px", color: "red", fontWeight: "300", fontFamily: "Black Ops One"
                           , marginTop:"3em",marginBottom:"3em" }}>
                            Fantasy NFT Staking Rewards
                        </div>
            <Card style={{ width: '18rem'}} id="CardId"  className="CardClass">
              <Card.Body>
                        <h2 style={{color:"white"}}>
                            Discovery
                        </h2>
                        <h4 className="cardheading">Reward</h4>
                        <p>
                            0.50 FOT
                        </p>
                        <h4 className="cardheading">Exchangeable Items</h4>
                        <p>
                            2 NFTs/M
                        </p>
                    </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }} id="CardId"  className="CardClass">
                    <Card.Body>
                        <h2 style={{color:"white"}}>
                            Angel & Devil
                        </h2>
                         <h4 className="cardheading">Reward</h4>
                        <p>
                            2.50 FOT
                        </p>
                         <h4 className="cardheading">Exchangeable Items</h4>
                        <p>
                            10 NFTs/M
                        </p>
                    </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }} id="CardId" className="CardClass">
                
                    <Card.Body>
                        <h2 style={{color:"white"}}>
                        Chaos
                        </h2>
                         <h4 className="cardheading">Reward</h4>
                        <p>
                            1 FOT
                        </p>
                         <h4 className="cardheading">Exchangeable Items</h4>
                        <p>
                            25 NFTs/M or 100 FOT/M
                        </p>    
                    </Card.Body>
            </Card>
                <div style={{ marginBlock:"2em",color:"red", fontSize: "12px", fontStyle: "italic" }}>
                    * Only FOT™ can be access Special Mint =&gt; High Quality
                                        Fantasy NFT
                </div>
        </Row>
              
            </div>
            <h1 className="flex justify-center" style={{ color: "red", fontWeight: "500", fontFamily: "Blaka", textShadow: "#fffff2", }}>
                Fantasy NFT Staking Coming Soon
            </h1>
        </div>
        
        {/* a new div with black background */}
        <Row style={{ backgroundColor: "#000000", textAlign:"center",color:"white" }}>

            <h2 style={{fontWeight:"bold"}}>RoadMap</h2>
            <Col sm={6} id="leftCol">
                <h2 style={{color:"red"}}>2022 Q3</h2>
                <ul>
                <li>
                    Lauch Website 
                </li>
                <li>
                    Launch Mobile App
                </li>
                <li>
                    Launch Desktop App
                </li>
                <li>
                    Launch DApp
                </li>
                    </ul>

                  <h2 style={{color:"red",marginTop:"6em"}}>2022 Q5</h2>
                <ul>
                <li>
                    Lauch Website 
                </li>
                <li>
                    Launch Mobile App
                </li>
                <li>
                    Launch Desktop App
                </li>
                <li>
                    Launch DApp
                </li>
                    </ul>
                </Col>
            <Col sm={6} >
                   <h2 style={{marginTop:"4em",color:"red"}}>2022 Q2</h2>
                   <ul>
                <li>
                    Lauch Website 
                </li>
                <li>
                    Launch Mobile App
                </li>
                <li>
                    Launch Desktop App
                </li>
                <li>
                    Launch DApp
                </li>
                    </ul>

                     <h2 style={{marginTop:"8em",color:"red"}}>2022 Q1</h2>
                   <ul>
                <li>
                    Lauch Website 
                </li>
                <li>
                    Launch Mobile App
                </li>
                <li>
                    Launch Desktop App
                </li>
                <li>
                    Launch DApp
                </li>
                    </ul>
                </Col>
                <h2 style={{marginBlock:"2em"}}>Farm Pools</h2>
                <p>
                    While we are populating the world of Fantasy NFTs, we are also working on the Lucky Wheel.<br/>
                    The Lucky Wheel is a game that will be launched in the coming months.

                </p>
                <h2 style={{color:"red",marginTop:"3em"}}>FOT Token Stake Farms</h2>
                <p style={{fontSize:"18px",fontWeight:"bold"}}>
                    Staked FOT to Earn FOT <br/>
                    0.01 Per FOT
                </p>
                 <p style={{fontSize:"18px",fontWeight:"bold",marginTop:"2em"}}>
                    Staked FOT to Earn FOT <br/>
                    0.005 Per FOT
                </p>

                


            </Row>
        {/* Footer */}
        <Row>
            <Col sm={6}>
                <h2 style={{color:"red",marginTop:"2em"}}>F-Fnt-Fantasy-Collection</h2>
                <p className="footerparagraph">
                    Staked FOT to Earn FOT <br/>
                    Which NFT will you get?<br/>
                    Join the FOT Token Stake Farms and earn FOT<br/>
                </p>
                {/* Discord icon */}
               
                </Col>
            <Col sm={6}>
                <img src={footerimg} alt="footer" style={{width:"100%"}}/>
                </Col>
        </Row>
            <div style={{textAlign:"center",marginTop:"2em"}}>
            <h5>All Rights Reserved © 2020 F-Fnt-Fantasy-Collection</h5>
            </div>
        </div>
    )
}




/*   <Table responsive="sm" size="sm">
                    <div className="header container" id="title">
                      
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
                </Table> */