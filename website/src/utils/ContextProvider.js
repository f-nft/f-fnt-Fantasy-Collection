import { useState } from "react";
import { ModalContext } from "./ModalContext";


const ContextProvider = ({ children }) => {
  const [visibility, setVisibility] = useState(false);
  const [walletModalvisibility, setModalvisibility] = useState(false);
  const [shareModalVisibility, setShareModalvisibility] = useState(false);
  const [priceModalVisibiity, setPriceModalVisibility] = useState(false);
  const [isWalletConnect, setIsWalletConnect] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [Stateaccounts, setStateaccouts] = useState("");
  const [stateprovider, setStateprovider] = useState("");
  const [stateContract, setStateContract] = useState("");
  const [stateRate, setStateRate] = useState("");
  const [statePrice, setStatePrice] = useState("");
  const [stateCrypto, setStateCrypto] = useState("");
  const [stateWeb3, setStateWeb3] = useState("");
  const [stateChainId, setStateChainId] = useState("");


  const mintButtonHandler = () => {
    setIsWalletConnect(true);
  }

  const mintModalHandle = () => {
    setVisibility(!visibility);
  };
  
  const priceModalHandle=()=>{
    setPriceModalVisibility(!priceModalVisibiity);
  }
  const walletModalHandle = () => {
    setModalvisibility(!walletModalvisibility);
  };
  const shareModalHandle = (e) => {
    e.preventDefault();
    setShareModalvisibility(!shareModalVisibility);
  };

  return (
    <ModalContext.Provider
      value={{
        visibility,
        mintModalHandle,
        walletModalHandle,
        walletModalvisibility,
        shareModalVisibility,
        priceModalVisibiity,
        shareModalHandle,
        priceModalHandle,
        isWalletConnect,
        mintButtonHandler,
        walletAddress, setWalletAddress,
        balance, setBalance,
        Stateaccounts, setStateaccouts,
        stateprovider, setStateprovider,
        stateContract, setStateContract,
        stateWeb3, setStateWeb3,
        stateRate, setStateRate,
        statePrice, setStatePrice,
        stateCrypto, setStateCrypto,
        stateChainId, setStateChainId
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ContextProvider;
