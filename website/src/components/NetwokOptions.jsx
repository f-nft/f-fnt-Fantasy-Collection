import { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import { Button } from "react-bootstrap";
const networks = {
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: [
      "https://bsc-dataseed1.binance.org",
      "https://bsc-dataseed2.binance.org",
      "https://bsc-dataseed3.binance.org",
      "https://bsc-dataseed4.binance.org",
      "https://bsc-dataseed1.defibit.io",
      "https://bsc-dataseed2.defibit.io",
      "https://bsc-dataseed3.defibit.io",
      "https://bsc-dataseed4.defibit.io",
      "https://bsc-dataseed1.ninicoin.io",
      "https://bsc-dataseed2.ninicoin.io",
      "https://bsc-dataseed3.ninicoin.io",
      "https://bsc-dataseed4.ninicoin.io",
      "wss://bsc-ws-node.nariox.org",
    ],
    blockExplorerUrls: ["https://bscscan.com"],
  },
};
const changeNetwork = async ({ networkName, setError }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        },
      ],
    });
  } catch (err) {
    setError(err.message);
  }
};


export default function NetworkOptions() {
  const [error, setError] = useState();

  const handleNetworkSwitch = async (networkName) => {
    setError();
    await changeNetwork({ networkName, setError });
  };

  const networkChanged = (chainId) => {
    console.log({ chainId });
  };

  useEffect(() => {
    window.ethereum.on("chainChanged", networkChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);

  return (
    <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
      <main className="mt-1 p-4" style={{textAlign:"center"}}>
        <h4 className="text-xl font-semibold text-gray-700 text-center">
          Change MetaMask network
        </h4>
        <div className="mt-4">
          <Button onClick={() => handleNetworkSwitch("polygon")}
          style={{borderRadius: "10px", backgroundColor: "#00bcd4", color: "white"}} 
          className="mt-2 mb-2 btn btn-primary submit-button focus:ring focus:outline-none w-full">
            Switch to Polygon
          </Button>
          <br/>
          <Button onClick={() => handleNetworkSwitch("bsc")} 
            style={{borderRadius: "10px", color: "white"}} 
          className="mt-2 mb-2 bg-danger border-warning btn submit-button focus:ring focus:outline-none w-full">
            Switch to BSC
          </Button>
          <ErrorMessage message={error} />
        </div>
      </main>
    </div>
  );
}
