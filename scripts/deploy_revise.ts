import { ethers } from "hardhat"
import { upgrades } from "hardhat"


async function main() {
    const CPToken = await ethers.getContractFactory("CPToken");
    console.log('Deploying CPToken...');
    const cpToken = await CPToken.deploy();
    await cpToken.deployed();
    console.log("cpToken deployed to:", cpToken.address);

    const MultiTransaction = await ethers.getContractFactory("MultiTransaction")
    console.log("Deploying MultiTransaction...")
    const multiTransaction = await upgrades.deployProxy(MultiTransaction,[],{unsafeAllowCustomTypes: true})
    console.log(multiTransaction.address," multiTransaction(proxy) address")
    console.log(await upgrades.erc1967.getImplementationAddress(multiTransaction.address)," getImplementationAddress")
    console.log(await upgrades.erc1967.getAdminAddress(multiTransaction.address)," getAdminAddress")    
  }
  
  main().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  
  