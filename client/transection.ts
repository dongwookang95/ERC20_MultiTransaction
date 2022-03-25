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
        value: _amount
    }
    wallet.sendTransaction(tx)
    .then((txObj) => {
    console.log('txHash', txObj.hash)
    })
}

function executeTransection(){
    const headers = ['address', 'amount']
    const csvFilePath = path.resolve(__dirname,'example.csv');
    const transectionRecord:TransectionInfo[] = [];

    fs.createReadStream(csvFilePath)
    .pipe(parse({columns: headers}))
    .on('data',(data) => transectionRecord.push(data))
    .on('end', ()=>{
        for(var i = 0; i<transectionRecord.length; i++){
            _transection(transectionRecord[i].address,transectionRecord[i].amount);
        }
    })
};
