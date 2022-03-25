import ethers from 'ethers';
import fs = require('fs');
import * as path from "path";
import { parse } from 'csv-parse';

type TransectionInfo ={
    address : string;
    amount : number;
}






function _transection(_receiverAddress, _amount){
const NETWORK = process.env.RINKEBY_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
let provider = ethers.getDefaultProvider(NETWORK)
let privateKey = PRIVATE_KEY

// Create a wallet instance
let wallet = new ethers.Wallet(privateKey, provider)
// Create a transaction object
let tx = {
    to: _receiverAddress,
    // Convert currency unit from ether to wei
    value: _amount
}

wallet.sendTransaction(tx)
.then((txObj) => {
    console.log('txHash', txObj.hash)
})
}


function _getTransectionData(){
    const headers = ['address', 'amount']

    const csvFilePath = path.resolve(__dirname,'example.csv');

    const fileContent = fs.readFileSync(csvFilePath, { encoding:'utf-8'});

    parse(fileContent, {
        delimiter: ',',
        columns: headers,
    }, (error, result: TransectionInfo[]) => {
        if (error) {
        console.error(error);
        }
        console.log("result",result);
    });
};
