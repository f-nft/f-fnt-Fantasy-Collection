async function main() {
    // Import the AlchemyWeb3 library. Filepath to functions: 
	// /@alch/alchemy-web3/dist/alchemyWeb3.js
	const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    
	// Initialize an alchemy-web3 instance:
	const web3 = createAlchemyWeb3(
	  `https://polygon-mainnet.g.alchemy.com/v2/qqfXh-S-3dEdCR-orpw_NY06qvD0EFKk`);
	
	// Query the blockchain (replace example parameters)
    	const fee = await web3.eth.maxPriorityFeePerGas(); 
    
	// Print the output to console
	console.log(fee);
   }

main();