import { useModal } from "../../../../utils/ModalContext";
import Counter from "../../../../common/counter";
import Button from "../../../../common/button";
import BannerV1Wrapper from "./Banner.style";
import characterThumb from "../../../../assets/images/nft/Character1.png";
import mintLiveText from "../../../../assets/images/nft/mint_live_text.png";
import homeImageBG from "../../../../assets/images/nft/home_img_bg.png";
import { useEffect, useState } from "react";
import Countdown from "../../countdown/countDown";

const Banner = () => {
  const { mintModalHandle, priceModalHandle, walletModalHandle, isWalletConnect, walletAddress, balance, stateCrypto } = useModal();
  const [nftPriceMatic, setNftPriceMatic] = useState(null);
  const [nftPriceBnb, setNftPriceBnb] = useState(null);
  const [nftPriceEth, setNftPriceEth] = useState(null);
  const [usdRate, setUsdRate] = useState(null);

  useEffect(() => {
    async function getRates(usdRate, ethRate, bnbRate, maticRate) {
      const ethPrice = "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT";
      const responseEth = await fetch(ethPrice)
      var ethData = await responseEth.json()
      console.log("ETH Price " + ethData.price); //data.price is the price of Eth in USDT
      ethRate = 1 / ethData.price;
      localStorage.setItem("ethRate", ethRate);

      usdRate = 60;
      setUsdRate(usdRate);
      localStorage.setItem("usdRate", usdRate);

      var nftPrice = usdRate * ethRate;
      var nftPriceEth = nftPrice.toFixed(5);
      setNftPriceEth(nftPriceEth);
      localStorage.setItem("nftPriceEth", nftPriceEth);

      const bnbPrice = "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT";
      const responseBnb = await fetch(bnbPrice)
      var bnbData = await responseBnb.json()
      console.log("BNB Price " + bnbData.price); //data.price is the price of Bnb in USDT
      bnbRate = 1 / bnbData.price;
      localStorage.setItem("bnbRate", bnbRate);

      var nftBnbPrice = usdRate * bnbRate;
      var nftPriceBnb = nftBnbPrice.toFixed(5);
      setNftPriceBnb(nftPriceBnb);
      localStorage.setItem("nftPriceBnb", nftPriceBnb);


      const maticPrice = "https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT";
      const responseMatic = await fetch(maticPrice)
      var maticData = await responseMatic.json()
      console.log("Matic Price " + maticData.price); //data.price is the price of MATIC in USDT
      maticRate = 1 / maticData.price;
      localStorage.setItem("maticRate", maticRate);

      var nftEthPrice = usdRate * maticRate;
      var nftPriceMatic = nftEthPrice.toFixed(5);
      setNftPriceMatic(nftPriceMatic);
      localStorage.setItem("nftPriceMatic", nftPriceMatic);
    };
    getRates();
  }, []);

  return (
    <>
      <BannerV1Wrapper id="home">
        <div className="container" style={{ marginTop: "-200px" }}>
          <div className="row">
            <div className="col-lg-6">
              <div className="f-nft_v1_baner_left">
                <h1>f-nft Fantasy</h1>
                <h2>👗 3D NFT</h2>
                <div className="f-nft_v1_timer">
                  <h5 className="text-uppercase" style={{ color: "red" }}>Public Mint End In</h5>
                  <div className="timer timer_1">
                    <Countdown style={{ maxWidth: "30%" }}
                      timeTillDate="10 30 2022, 6:00 am"
                      timeFormat="MM DD YYYY, h:mm a" />
                  </div>
                </div>
                <h4 style={{ color: "#375730", textShadow: "1px 1px 3px" }}>
                  <span className="count">
                    <Counter end={1325} duration={1790} />
                  </span>{" "}
                  / 10,000 Minted
                </h4>
                <h5 style={{ color: "green" }}>
                  Your Wallet Address:<br />
                  {walletAddress ?
                    (<span style={{ color: "white" }}>{walletAddress}</span>) :
                    (<span style={{ color: "white" }}>0x0</span>)}<br />
                  {stateCrypto ?
                    (<span>You Are Connected to <h5 style={{ color: "red" }}>{stateCrypto} </h5></span>) :
                    (<span></span>)}
                </h5>
                <h5 style={{ color: "green" }}>
                  Your Balance <br />
                  {balance ?
                    (<span style={{ color: "white" }}>{balance}</span>) :
                    (<span style={{ color: "blue" }}>0.00</span>)}
                </h5>
                <div className="banner_buttons">
                  {isWalletConnect ? (
                    <Button lg variant="mint" onClick={() => mintModalHandle()}>
                      Mint NFT</Button>
                  ) : (
                    <Button lg variant="mint" onClick={() => walletModalHandle()}
                    >
                      Connect Wallet First</Button>
                  )}
                  <Button className="NFTPricebutton" lg variant="outline" data-toggle="modal" data-target="#exampleModalCenter"
                    onClick={() => priceModalHandle()}>
                    NFT Price
                  </Button>
                </div>
                <div className="coin-info">
                  <span>
                    <h4>Mint Price ${usdRate} USD  <br /></h4>
                    {nftPriceEth} ETH + gas <br />
                    {nftPriceMatic} Matic + gas <br />
                    {nftPriceBnb} BNB + gas<br />
                    <br />
                    </span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="f-nft_v1_baner_right">
                <div className="f-nft_v1_baner_right_img_sect">
                  <div className="mint_live_circle_sect">
                    <div className="mint_live_circle">
                      <span>
                      </span>
                      <span className="mint_live_text rotated-style">
                        <img src={mintLiveText} alt="" />
                      </span>
                    </div>
                  </div>
                  <div className="f-nft_v1_baner_right_img_bg">
                    <img src={homeImageBG} alt="" />
                  </div>
                  <div className="f-nft_v1_baner_right_img">
                    <img src={characterThumb} alt="avata" />
                  </div>
                </div>
                <h4>
                  <span >
                    MINT IS LIVE UNTIL 01 SEP 04:00
                  </span><br/>
                  <span>
                    Max 10 per wallet </span>
                  <span><br />Presale: SOLDOUT</span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </BannerV1Wrapper>
    </>
  );
};

export default Banner;