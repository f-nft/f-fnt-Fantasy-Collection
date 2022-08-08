import contract from "../../config/contract.json";
var ContractID = "ContractID";

let chainId = await ethereum.request({ method: 'eth_chainId' });
console.log("Connected to chain " + chainId);

// String, hex code of the chainId of the Rinkebey test network
if (chainId !== "56") {
	alert("You are not connected to BSC Network!");
}
else if (chainId !== "1") {
    alert("You are not connected to ETH Network!");
}
else if (chainId !== "137") {
    alert("You are not connected to Polygon Network!");
}

const mintNft = async () => {
    const [mint, setMint] = useState(1);
    try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const connectedContract = new ethers.Contract(ContractID, contract.abi, signer);

            console.log("Going to pop wallet now to pay gas...")
            let nftTxn = await connectedContract.mint();

            console.log("Mining...please wait.")
            await nftTxn.wait();

            console.log(`Mined, see transaction: ${"Network"}${nftTxn.hash}`);

        } else {
            console.log("Ethereum object doesn't exist!");
        }
    } catch (error) {
        console.log(error)
    }

}

{
        "method": "eth_signTransaction",
        "params": [{
            "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
            "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
            "gas": "0x76c0",
            "gasPrice": "0x9184e72a000",
            "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
            "value": "0x9184e72a"
        }]
} '
// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}