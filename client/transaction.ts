import { BigNumber, ethers } from 'ethers';
import { parseUnits } from "@ethersproject/units";
import fs from 'fs';
import * as path from "path";
import { parse } from 'csv-parse';
import TRANSACTION_CONTRACT_ABI from '../artifacts/contracts/multiTransaction.sol/MultiTransaction.json';
import TOKEN_CONTRACT_ABI from '../artifacts/contracts/cptoken.sol/CPToken.json';
import * as dotenv from 'dotenv';


dotenv.config();

type TransectionInfo ={
    address : string;
    amount : number;
}

//global variable setting
const NETWORK=process.env.RINKEBY_URL;
const PROVIDER = ethers.getDefaultProvider(NETWORK);

const SIGNER = new ethers.Wallet(process.env.PRIVATE_KEY as string, PROVIDER);

const transactionContract = new ethers.Contract(process.env.TRANSACTION_CONTRACT_ADDRESS as string,
                                                TRANSACTION_CONTRACT_ABI.abi,
                                                SIGNER);

const tokenContract = new ethers.Contract(process.env.TOKEN_CONTRACT_ADDRESS as string,
                                        TOKEN_CONTRACT_ABI.abi,
                                        SIGNER);

function inputData(){
    const headers = ['address', 'amount']
    const csvFilePath = path.resolve(__dirname,'example.csv');
    const transactionRecord:TransectionInfo[] = [];
    const addressList:string[] =[];
    const amountList:BigNumber[] =[];
    
    //read CSV file
    fs.createReadStream(csvFilePath)
    .pipe(parse({columns: headers}))
    .on('data',(data) => transactionRecord.push(data))
    .on('end', ()=>{
        for(var i = 0; i<transactionRecord.length; i++){
            addressList.push(transactionRecord[i].address);     
            //conversion from string to bigNumber.            
            
            //need to consider alternative way.
            let stringAmount = transactionRecord[i].amount;
            let dividor = 10000000000000000;
            let bigDecimals = BigNumber.from(10).pow(18);
            let parsedToEthUnit = BigNumber.from(stringAmount/dividor);

            amountList.push(parsedToEthUnit.mul(bigDecimals));
        }
        _transaction(addressList,amountList);
    })
};

function _transaction(_receiverAddress:string[], _amount:BigNumber[]){
    const amountApprove:BigNumber = BigNumber.from(10).pow(21);
    const amountMint:BigNumber = BigNumber.from(15).pow(22);
    const gaslimit:BigNumber = BigNumber.from(217880);
    // approve 
    (async function(){
        //currently full amount will be approved        
        await tokenContract.mint(SIGNER.address, amountMint)
        const allowance = await tokenContract.allowance(SIGNER.address,
                                                        process.env.TRANSACTION_CONTRACT_ADDRESS,
                                                        { gasLimit : gaslimit});
        console.log("Checking if the multiToken contract still have approval from CPToken address");
        if(allowance>amountApprove){
            try{
                console.log("You have enough allowance. We are proceeding to multiTransaction");
                let tx = await transactionContract.multiTransfer(process.env.TOKEN_CONTRACT_ADDRESS
                                                                ,_receiverAddress
                                                                ,_amount
                                                                ,{ gasLimit : gaslimit});
                console.log("The message is: ", tx);
            }catch(error){
                console.log(error);
            }
        }else{
            try{
            console.log("You don't have enough allowance, let's approve first");
            await tokenContract.approve(process.env.TRANSACTION_CONTRACT_ADDRESS, 
                                        amountApprove,
                                        { gasLimit : gaslimit});
            console.log("Approval succeeded! Sending multiTransfer")
            let tx = await transactionContract.multiTransfer(process.env.TOKEN_CONTRACT_ADDRESS, 
                                                            _receiverAddress, 
                                                            _amount,
                                                            { gasLimit : gaslimit});
                console.log("The message is: ", tx);
            }
            catch(error){
                console.log(error);
            }
        } 
    })();
}

inputData()

