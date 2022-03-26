import { BigNumber, ethers } from 'ethers';
import fs = require('fs');
import * as path from "path";
import { parse } from 'csv-parse';
import TRANSECTION_CONTRACT_ABI from '../artifacts/contracts/multiTransection.sol/MultiTransection.json';
import TOKEN_CONTRACT_ABI from '../artifacts/contracts/cptoken.sol/CPToken.json';
import * as dotenv from 'dotenv';
import getRevertReason from 'eth-revert-reason';

dotenv.config();

type TransectionInfo ={
    address : string;
    amount : number;
}


const NETWORK=process.env.RINKEBY_URL;
const PROVIDER = ethers.getDefaultProvider(NETWORK);

const SIGNER = new ethers.Wallet(process.env.PRIVATE_KEY as string, PROVIDER);
const transectionContract = new ethers.Contract(process.env.TOKEN_CONTRACT_ADDRESS as string,TRANSECTION_CONTRACT_ABI.abi,SIGNER);
const tokenContract = new ethers.Contract(process.env.TOKEN_CONTRACT_ADDRESS as string,TOKEN_CONTRACT_ABI.abi,SIGNER);


function inputData(){
    const headers = ['address', 'amount']
    const csvFilePath = path.resolve(__dirname,'example.csv');
    const transectionRecord:TransectionInfo[] = [];
    const addressList:string[] =[];
    const amountList:BigNumber[] =[];
    
    fs.createReadStream(csvFilePath)
    .pipe(parse({columns: headers}))
    .on('data',(data) => transectionRecord.push(data))
    .on('end', ()=>{
        for(var i = 0; i<transectionRecord.length; i++){
            addressList.push(transectionRecord[i].address);
            let a  = transectionRecord[i].amount
            let dividor = 1000000000000;
            let transformBigNumber = BigNumber.from(a/dividor);
            amountList.push(transformBigNumber);
        }
        _transection(addressList,amountList);
    })
};

function _transection(_receiverAddress:string[], _amount:BigNumber[]){
    const amountApprove:BigNumber = BigNumber.from(10).pow(18);
    const gaslimit:BigNumber = BigNumber.from(66000);
    // approve 
    (async function(){
        //currently full amount will be approved
        try{
        const allowance = await tokenContract.allowance(process.env.TOKEN_CONTRACT_ADDRESS,process.env.TRANSECTION_CONTRACT_ADDRESS,{ gasLimit : gaslimit});
        console.log("Checking if the multiToken contract still have approval from CPToken address");
        console.log(allowance)
        if(allowance>0){
            try{
                console.log("Approved! Sending multiTransfer");
                let tx = await transectionContract.multiTransfer(process.env.TOKEN_CONTRACT_ADDRESS,_receiverAddress,_amount,{ gasLimit : gaslimit});
                console.log("The message is: ", tx);
            }catch(error){
                console.log(error);
            }
        }else{
            try{
            console.log("Not Approved! Getting Approval");
            await tokenContract.approve(process.env.TRANSECTION_CONTRACT_ADDRESS, amountApprove,{ gasLimit : gaslimit});
            console.log("Approval succeeded! Sending multiTransfer")
            let tx = await transectionContract.multiTransfer(process.env.TOKEN_CONTRACT_ADDRESS,_receiverAddress,_amount,{ gasLimit : gaslimit});
                console.log("The message is: ", tx);
            }
            catch(error){
                console.log(error);
            }
        }
    }catch(error){
        console.log(error);
    }
    })();
}
inputData()

