import { useModal } from "../../../utils/ModalContext";
import { FiX, FiChevronRight } from "react-icons/fi";
import WalletModalStyleWrapper from "./WalletModal.style";
import hoverShape from "../../../assets/images/icon/hov_shape_L.svg";
import metamaskIcon from "../../../assets/images/icon/MetaMask.svg";
import formatic from "../../../assets/images/icon/Formatic.svg";
import trustWalletIcon from "../../../assets/images/icon/Trust_Wallet.svg";
import walletConnect from "../../../assets/images/icon/WalletConnect.svg";
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import { NFTCONTRACT } from '../../config/config';
import { ETHNFTCONTRACT } from '../../config/ethconfig';
import { BSCNFTCONTRACT } from '../../config/bscconfig';

const providerOptions = {
};

const { ethereum } = window;
const NftPrice = () => {
  const { walletModalHandle } = useModal();
  async function connectWallet() {

    try {
      let web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions: providerOptions

      });
      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance);
      var accounts = await web3ModalProvider.listAccounts();
      console.log(accounts);
      //get balance
      const balance = await web3ModalProvider.getBalance(accounts[0]);
      //convert balance to ether
      const etherBalance = ethers.utils.formatEther(balance);
      console.log(etherBalance);
      //close current modal
      walletModalHandle();
      //if wallet is connected then set the wallet address in local storage
      localStorage.setItem("walletAddress", accounts[0]);
      //set balance in local storage
      localStorage.setItem("balance", etherBalance);

      try {
        //agree network chain ID to which user is connected
        // eslint-disable-next-line
        const chainId = await web3ModalProvider.getNetwork().then(function (network) {
          console.log(network.chainId)
          //get typeof chainID
          console.log("type of chainID", typeof network.chainId)

          localStorage.setItem("chainId", network.chainId);
        }
        ).catch(function (error) {
          console.log(error)
        }
        );
      } catch (error) {
        console.log(error);
      }
      //get network chain id
      //get account
      try {
        accounts = await ethereum.request({ method: "eth_accounts" });
        console.log(accounts);
        var account = accounts[0];
        console.log("Account selected" + account);
      } catch (err) {
        alert(err.message);
        return null;
      }
    } catch (error) {
    }
  }

  return (
    <>
      <WalletModalStyleWrapper className="modal_overlay">
        <div
          className="mint_modal_box"
        >
          <div className="mint_modal_content">
            <div className="modal_header">
              <h2>CONNECT WALLET</h2>
              <button onClick={() => walletModalHandle()}>
                <FiX />
              </button>
            </div>
            <div className="modal_body text-center">
              <p>
                Please select a wallet to connect for start Minting your NFTs
              </p>
              <div className="wallet_list">
                <a href="# " onClick={connectWallet}>
                  <img src={metamaskIcon} alt="Metmask" />
                  Metamask
                  <span>
                    <FiChevronRight />
                  </span>
                </a>
                <a href="# ">
                  <img src={formatic} alt="coinbase" />
                  Coinbase
                  <span>
                    <FiChevronRight />
                  </span>
                </a>
                <a href="# ">
                  <img src={trustWalletIcon} alt="Trust" />
                  Trust Wallet
                  <span>
                    <FiChevronRight />
                  </span>
                </a>
                <a href="# ">
                  <img src={walletConnect} alt="Wallet" />
                  WalletConnect
                  <span>
                    <FiChevronRight />
                  </span>
                </a>
              </div>
              <div className="modal_bottom_text">
                By connecting your wallet, you agree to our
                <a href="# ">Terms of Service</a>
                <a href="# ">Privacy Policy</a>
              </div>
            </div>

            <div className="modal_bottom_shape_wrap">
              <span className="modal_bottom_shape shape_left">
                <img src={hoverShape} alt="f-nft nft hover shape" />
              </span>
              <span className="modal_bottom_shape shape_right">
                <img src={hoverShape} alt="f-nft nft hover shape" />
              </span>
            </div>
          </div>
        </div>
      </WalletModalStyleWrapper>
    </>
  );
};

export async function mint(numberofNFTs, e, nftPrice) {
  const maticPrice = "https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT";
  const responseMatic = await fetch(maticPrice);
  const dataMatic = await responseMatic.json()
  console.log("Matic " + dataMatic.price); //data.price is the price of MATIC in USDT
  e.preventDefault();
  var maticRate = 1 / dataMatic.price;

  const bnbPrice = "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT";
  const responseBnb = await fetch(bnbPrice);
  const dataBnb = await responseBnb.json()
  console.log("BNB " + dataBnb.price); //data.price is the price of BNB in USDT
  e.preventDefault();
  var bnbRate = 1 / dataBnb.price;

  const ethPrice = "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT";
  const responseEth = await fetch(ethPrice);
  const dataEth = await responseEth.json()
  console.log("ETH " + dataEth.price); //data.price is the price of ETH in USDT
  e.preventDefault();
  var ethRate = 1 / dataEth.price;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  try {
    if (!window.ethereum.selectedAddress) {
      alert("Please unlock your MetaMask account");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    let balance = await provider.getBalance(accounts[0]);
    if (balance.lt(ethers.utils.parseEther("0.001"))) {
      alert("Please deposit at least 0.05 ETH / 80 Matic / 0.025 BNB to the MetaMask account");
      return;
    }
    let bal = ethers.utils.formatEther(balance);
    console.log(bal);
    var ContractID = null;
    // get chainID from local storage
    const chainId = localStorage.getItem("chainId");
    // eslint-disable-next-line
    if (chainId == 137) {
      //mint for polygon network
      ContractID = NFTCONTRACT;
      nftPrice = 60 * maticRate;
      console.log("NFT Price in Matic " + nftPrice);
      localStorage.setItem("nftPriceMatic", nftPrice);

    }
    // eslint-disable-next-line
    else if (chainId == 56) {
      //mint for BSC network
      ContractID = BSCNFTCONTRACT;
      nftPrice = 60 * bnbRate;
      localStorage.setItem("nftPriceBNB", nftPrice);

    }
    // eslint-disable-next-line
    else if (chainId == 1) {
      //mit for ETH network
      ContractID = ETHNFTCONTRACT;
      nftPrice = 60 * ethRate;
      localStorage.setItem("nftPriceETH", nftPrice);
    }
    else {
      alert("Please connect to a supported network");
      return;
    }

    var gasfromcontract = await provider.getGasPrice();
    //convert gas to ether
    var gasEther = ethers.utils.formatEther(gasfromcontract);
    console.log("Gas is " + gasEther);
    //convert gasEther to wei
    var gasWei = ethers.utils.parseEther(gasEther);
    console.log("New gas WEI is " + gasWei);

    // var rateValue = nftPrice;
    var sumValue = numberofNFTs * nftPrice;
    console.log("Total " + sumValue);

    var sumValues = ethers.utils.formatEther(sumValue);
    console.log("Total in Wei" + sumValues);
    // var sum = BigNumber.sumValues;

    ethereum.request({
      method: "eth_sendTransaction", params: [{
        from: accounts[0],
        to: ContractID,
        // gas: (gasWei * 0.0003).toString(),
        gasLimit: 30000,
        gasPrice: (numberofNFTs * gasfromcontract).toString(),
        value: sumValues.toString(),
        id: "tx",
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

export default NftPrice;