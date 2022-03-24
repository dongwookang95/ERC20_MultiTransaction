import ethers from 'ethers';

var fs = require('fs');
var parse = require('csv-parse');

const NETWORK = process.env.RINKEBY_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
// provider: Infura or Etherscan will be automatically chosen
let provider = ethers.getDefaultProvider(NETWORK)
// Sender private key: 
// correspondence address 0xb985d345c4bb8121cE2d18583b2a28e98D56d04b
let privateKey = PRIVATE_KEY

// Create a wallet instance
let wallet = new ethers.Wallet(privateKey, provider)
// Receiver Address which receives Ether
let receiverAddress = '0xF02c1c8e6114b1Dbe8937a39260b5b0a374432bB'
// Ether amount to send
let amountInEther = '0.01'
// Create a transaction object
let tx = {
    to: receiverAddress,
    // Convert currency unit from ether to wei
    value: ethers.utils.parseEther(amountInEther)
}

// Send a transaction
wallet.sendTransaction(tx)
.then((txObj) => {
    console.log('txHash', txObj.hash)
})