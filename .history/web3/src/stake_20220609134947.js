import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';
import axios from 'axios';
import React, { Component } from 'react';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import ABI from "./ABI.json"
import VAULTABI from "./VAULTABI.json"

class stake extends Component {
        return (
            <div className="App" style={{ background: 'black' }}>
                <Button onClick={connectwallet} style={{ marginBottom: "5px", marginTop: "5px", color: "#FFFFFF", marginRight: '3px' }}>Connect Wallet</Button>
                <Button onClick={enable}>Enable Staking</Button>
                <div className='container'>
                    <div className='row'>
                        <form class="gradient col-lg-5 mt-5" style={{ borderRadius: "25px", boxShadow: "1px 1px 15px #000000", marginRight: "5px" }}>
                            <h4 style={{ color: "#FFFFFF" }}>Mint Portal</h4>
                            <h5 style={{ color: "#FFFFFF" }}>Please connect your wallet</h5>

                            <div class="card" id='wallet-address' style={{ marginTop: "3px", boxShadow: "1px 1px 4px #000000" }}>
                                <label for="floatingInput">Wallet Address</label>
                            </div>
                            <div class="card" style={{ marginTop: "3px", boxShadow: "1px 1px 4px #000000" }}>
                                <input type="number" name="amount" defaultValue="1" min="1" max="5" />
                                <label >Please select the amount of NFTs to mint.</label>
                                <Button onClick={mint}>Buy/Mint!</Button>
                            </div>
                            <label style={{ color: "#FFFFFF" }}>Price 0.05 ETH each mint.</label>
                            <h5 style={{ color: "white", textShadow: "1px 1px 3px #000000" }}> Tokens Minted so far= {balance.result}/10,000</h5>
                        </form>
                        <form class="gradient col-lg-3 mt-5 mr-3" style={{ borderRadius: "25px", boxShadow: "1px 1px 15px #000000", marginRight: "5px" }}>
                            <h4 style={{ color: "#FFFFFF" }}>Staking Vault</h4>
                        </form>
                        <form class="gradient col-lg-3 mt-5" style={{ borderRadius: "25px", boxShadow: "1px 1px 15px #000000", marginRight: "5px" }}>
                            <h4 style={{ color: "#FFFFFF" }}>NFT Vault Options</h4>
                            <h5 style={{ color: "#FFFFFF" }}>Verify Amount Staked</h5>
                            <Button onClick={verify}>Verify</Button>
                            <div class="card" id='stakedbalance' style={{ marginTop: "3px", boxShadow: "1px 1px 4px #000000" }}>
                                <label for="floatingInput">NFT Balance</label>
                            </div>
                            <div class="card" style={{ marginTop: "3px", boxShadow: "1px 1px 4px #000000" }}>
                                <input type="number" name="claimid" />
                                <label >Input NFT ID</label>
                                <Button onClick={claimit}>Claim Rewards</Button>
                            </div>
                        </form>
                        <div className="row items mt-3">
                            <div className="ml-3 mr-3" style={{ display: "inline-grid", gridTemplateColumns: "repeat(4, 5fr)", columnGap: "10px" }}>
                                {nftdata.map((assets, i) => {
                                    async function stakeit() {
                                        vaultcontract.methods.stake([assets.token_id]).send({ from: account });
                                    }
                                    async function unstakeit() {
                                        vaultcontract.methods.unstake([assets.token_id]).send({ from: account });
                                    }
                                    return (
                                        <div className="card mt-3" key={i} >
                                            <div className="image-over">
                                                <img className="card-img-top" src={nftpng + assets.token_id + '.png'} alt="" />
                                            </div>
                                            <div className="card-caption col-12 p-0">
                                                <div className="card-body">
                                                    <h5 className="mb-0">Fantasy Collection NFT #{assets.token_id}</h5>
                                                    <h5 className="mb-0 mt-2">Location Status<p style={{ color: "#39FF14", fontWeight: "bold", textShadow: "1px 1px 2px #000000" }}>{assets.owner.address}</p></h5>
                                                    <div className="card-bottom d-flex justify-content-between">
                                                        <input key={i} type="hidden" id='stakeid' value={assets.token_id} />
                                                        <Button className="mb-2 mt-3 col-5" style={{ marginLeft: '2px' }} onClick={stakeit}>Stake</Button>
                                                        <Button className="mb-2 mt-3 col-5" style={{ marginLeft: '2px' }} onClick={unstakeit}>Unstake</Button>
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