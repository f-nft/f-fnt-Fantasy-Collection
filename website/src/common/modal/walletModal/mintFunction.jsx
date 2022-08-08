export async function mint(numberofNFTs, e) {
    const maticPrice = "https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT";
    const responseMatic = await fetch(maticPrice);
    const dataMatic = await responseMatic.json()
    console.log("Matic Price " + dataMatic.price); //data.price is the price of MATIC in USDT
    e.preventDefault();
    var maticRate = 1 / dataMatic.price;

    const bnbPrice = "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT";
    const responseBnb = await fetch(bnbPrice);
    const dataBnb = await responseBnb.json()
    console.log("BNB Price " + dataBnb.price); //data.price is the price of BNB in USDT
    e.preventDefault();
    var bnbRate = 1 / dataBnb.price;

    const ethPrice = "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT";
    const responseEth = await fetch(ethPrice);
    const dataEth = await responseEth.json()
    console.log("ETH Price " + dataEth.price); //data.price is the price of ETH in USDT
    var ethRate = 1 / (dataEth.price); //reduce gas price

    try {
        if (!window.ethereum.selectedAddress) {
            alert("Please unlock your MetaMask account");
        }

        const accounts = await ethereum.request({ method: "eth_accounts" });
        let balance = await provider.getBalance(accounts[0]);
        if (balance.lt(ethers.utils.parseEther("0.005"))) {
            alert("Please deposit at least $60 ~ 0.05 ETH / 80 Matic / 0.25 BNB to the MetaMask account");
            window.location.reload(true);
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
            var nftPrice = 1 * maticRate;
            console.log("NFT Price in Matic " + nftPrice);
            localStorage.setItem("nftPriceMatic", nftPrice);

            var gasfromcontract = await provider.getGasPrice(16);
            //convert gas to ether
            var gasEther = ethers.utils.formatEther(gasfromcontract);
            console.log("Gas is " + gasEther);
            //convert gasEther to wei
            var gasWei = ethers.utils.parseEther(gasEther);
            console.log("New gas WEI is " + gasWei);
            var Gas = gasWei * 10;
            var gasLimit = 30000;
            var gasLimitPlus = gasLimit * 5000;

        }

        // eslint-disable-next-line
        else if (chainId == 56) {
            //mint for BSC network
            ContractID = BSCNFTCONTRACT;
            nftPrice = 6 * bnbRate;
            console.log("NFT Price in BNB " + nftPrice);
            localStorage.setItem("nftPriceBNB", nftPrice);

            gasfromcontract = await provider.getGasPrice(16);
            //convert gas to ether
            gasEther = ethers.utils.formatEther(gasfromcontract);
            console.log("Gas is " + gasEther);
            //convert gasEther to wei
            gasWei =
                // gasWei = gasEther * 0.0000001
                ethers.utils.parseEther(gasEther);
            console.log("New gas WEI is " + gasWei);
            Gas = gasWei * 0.00000000000001;
            gasLimit = 30000;
            gasLimitPlus = gasLimit * 0.7;
        }

        // eslint-disable-next-line
        else if (chainId == 1) {
            //mit for ETH network
            ContractID = ETHNFTCONTRACT;

            nftPrice = 60 * ethRate;
            console.log("NFT Price in ETH " + nftPrice);

            localStorage.setItem("nftPriceETH", nftPrice);
            gasfromcontract = await provider.getGasPrice(16);
            //convert gas to ether
            gasEther = ethers.utils.formatEther(gasfromcontract);
            console.log("Gas is " + gasEther);
            //convert gasEther to wei
            ethers.utils.parseEther(gasEther);
            console.log("New gas WEI is " + gasWei);
            Gas = gasWei * 0.000000001;
            gasLimit = 30000;
            gasLimitPlus = gasLimit * 0.7;
        }

        else {
            alert("Please connect to Metamask");
            window.location.reload();
            return;
        }
        try {
            // the transaction
            provider = new ethers.providers.Web3Provider(ethereum);
            await provider.getTransactionCount(accounts[0], "latest").then((block) = > {
                var baseFee = Number(block.baseFeePerGas);
                var maxPriority = 99999;
                var maxFee = baseFee + maxPriority;
                contract.methods.mint(account, _mintAmount)
                    .send({
                        from: accounts[0],
                        value: String(total),
                        maxFeePerGas: maxFee,
                        maxPriorityFeePerGas: maxPriority,
                    });
            })
                .catch((err) => alert(err.message));
        })
          .catch ((err) => alert(err.message));
    } catch (error) {
        alert(error);
    }

}
  
    catch (error) {
    alert("Please check your wallet and try again");
    window.location.reload();
}}