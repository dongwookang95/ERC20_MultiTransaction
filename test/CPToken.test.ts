import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, upgrades } from 'hardhat';
import { expect, use } from "chai";
import chai from "chai"
import { Contract } from "ethers";
import { deployContract, MockProvider, solidity } from "ethereum-waffle";

import { CPToken } from "../typechain";

chai.use(solidity);

describe("CPTokenTest", function () {
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

  it('should have correct name and symbol and decimal', async function () {
    const name = await cptoken.name();
    const symbol = await cptoken.symbol();
    const decimals = await cptoken.decimals();
    expect(name).to.be.equal( 'CPToken');
    expect(symbol).to.be.equal( 'CPT');
    expect(decimals).to.be.equal( 18);
  });

  it("mint test...", async function(){
    
    await cptoken.mint(acc1.address,1000);
    await cptoken.mint(acc2.address,100000);

    await expect(cptoken.connect(acc2).mint(acc3.address, '1000', { from: acc2.address })).to.be.revertedWith(
      'Ownable: caller is not the owner',
    );
    const totalSupply = await cptoken.totalSupply();
    const acc1Bal = await cptoken.balanceOf(acc1.address);
    const acc2Bal = await cptoken.balanceOf(acc2.address);
    const acc3Bal = await cptoken.balanceOf(acc3.address);
    expect(totalSupply).to.equal('1100');
    expect(acc1Bal).to.equal('100');
    expect(acc2Bal).to.equal('1000');
    expect(acc3Bal).to.equal('0');
    


  })

  it('should only allow owner to burn token', async function () {
    await cptoken.mint(acc1.address, '100');
    await cptoken.mint(acc2.address, '1000');

    await cptoken.burn(acc2.address, '1000');
    await expect(cptoken.connect(acc2).burn(acc1.address, '1000', { from: acc2.address })).to.be.revertedWith(
      'Ownable: caller is not the owner',
    );

    const totalSupply = await cptoken.totalSupply();
    const acc1Bal = await cptoken.balanceOf(acc1.address);
    const acc2Bal = await cptoken.balanceOf(acc2.address);
    expect(totalSupply).to.equal('100');
    expect(acc1Bal).to.equal('100');
    expect(acc2Bal).to.equal('0');
  });

  it('should supply token transfers properly', async function () {
    await cptoken.mint(acc1.address, '100');
    await cptoken.mint(acc2.address, '1000');
    await cptoken.transfer(acc3.address, '10');
    await cptoken.connect(acc2).transfer(acc3.address, '100', {
      from: acc2.address,
    });
    const totalSupply = await cptoken.totalSupply();
    const acc1Bal = await cptoken.balanceOf(acc1.address);
    const acc2Bal = await cptoken.balanceOf(acc2.address);
    const acc3Bal = await cptoken.balanceOf(acc3.address);
    expect(totalSupply, '1100');
    expect(acc1Bal, '90');
    expect(acc2Bal, '900');
    expect(acc3Bal, '110');
  });

  it('should fail if you try to do bad transfers', async function () {
    await cptoken.mint(acc1.address, '100');
    await expect(cptoken.transfer(acc3.address, '110')).to.be.revertedWith('ERC20: transfer amount exceeds balance');
    await expect(cptoken.connect(acc2).transfer(acc3.address, '1', { from: acc2.address })).to.be.revertedWith(
      'ERC20: transfer amount exceeds balance',
    );
  });
});
  it("totalSupply test...", async function(){

  })

  it("balanceOf test...", async function(){
    
  })

  it("transfer test...", async function(){
    
  })

  it("approve test...", async function(){
    
  })

  it("allowance test...", async function(){
    
  })

