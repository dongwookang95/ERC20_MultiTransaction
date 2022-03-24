import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, upgrades } from 'hardhat';
import { expect, use } from "chai";
import chai from "chai"
import { Contract } from "ethers";
import { deployContract, MockProvider, solidity } from "ethereum-waffle";

import { CPToken } from "../typechain";

chai.use(solidity);

describe("CPTokenTest", function () {
  const [wallet, walletTo] = new MockProvider().getWallets()
  let cptoken: CPToken;
  
  let signers: SignerWithAddress[];
  let acc1: SignerWithAddress;
  let acc2: SignerWithAddress;
  let acc3: SignerWithAddress;
  before(async function () {

    this.CPToken = await ethers.getContractFactory('CPToken');

    signers = await ethers.getSigners();
    acc1 = signers[0];
    acc2 = signers[1];
    acc3 = signers[2];
  });

  beforeEach(async function(){
    cptoken = await this.CPToken.deploy();
    // this.cptoken = await upgrades.deployProxy(await ethers.getContractFactory("CPToken"));
    await cptoken.deployed();
    await cptoken.initialize("CPToken","CPT")
  });
  it("Simple test...", async function () {
    const name = await cptoken.name();
    const symbol = await cptoken.symbol();
    const decimals = await cptoken.decimals();
    expect(name).to.be.equal( 'CPToken');
    expect(symbol).to.be.equal( 'CPT');
    expect(decimals).to.be.equal(18);

  })
});
