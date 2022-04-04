import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers,upgrades } from "hardhat";
import { expect } from "chai";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { Contract,BigNumber } from "ethers";

chai.use(solidity);

describe("ProxyTest", function () {
  let cptoken: Contract;
  let multiTrans: Contract;
  let multiTransV2: Contract;
  let signers: SignerWithAddress[];
  let acc1: SignerWithAddress;
  let acc2: SignerWithAddress;
  let acc3: SignerWithAddress;

  before(async function () {
    signers = await ethers.getSigners();
    acc1 = signers[0];
    acc2 = signers[1];
    acc3 = signers[2];
  });

  beforeEach(async function(){
    const CPTOKEN = await ethers.getContractFactory("CPToken");
    const MULTITRANSACTION = await ethers.getContractFactory("MultiTransaction");
    const MULTITRANSACTIONV2 = await ethers.getContractFactory("MultiTransactionV2");
    
    cptoken = await CPTOKEN.deploy();
    await cptoken.deployed();
    multiTrans = await upgrades.deployProxy(MULTITRANSACTION,[],{unsafeAllowCustomTypes: true})
    multiTransV2 = await upgrades.upgradeProxy(multiTrans.address, MULTITRANSACTIONV2);
  })

  it("the first transaction must be ignored", async function(){
    await cptoken.mint(acc1.address, '10000000');

    const accArray = [acc2.address, acc3.address];
    const amountArray:BigNumber[] = [BigNumber.from(0x64),BigNumber.from(0xc8)];
    const amountApprove:BigNumber = BigNumber.from(10).pow(18);
    await cptoken.approve(multiTrans.address, amountApprove);
    await multiTransV2.multiTransfer(cptoken.address,accArray, amountArray);

    let acc2Val = await cptoken.balanceOf(acc2.address);
    let acc3Val = await cptoken.balanceOf(acc3.address);

    expect(acc2Val, '0');
    expect(acc3Val, '200');
  })
});
