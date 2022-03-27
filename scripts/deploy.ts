
import { ethers } from "hardhat";
import hre from "hardhat"


function sleep(ms:number) {
  return new Promise((resolve) => {
      setTimeout(resolve, ms)
  })
}

async function main() {
  let network = process.env.NETWORK ? process.env.NETWORK : "rinkeby"

  console.log(">-> Network is set to " + network)

  //Generate ERC20 token
  const CPToken = await ethers.getContractFactory("CPToken");
  console.log('Deploying CPToken...');
  const cpToken = await CPToken.deploy();
  await cpToken.deployed();
  console.log("cpToken deployed to:", cpToken.address);

  //adding proxy contract
  const Proxy = await ethers.getContractFactory("ERC1967Proxy");
  console.log('Deploying ERC1967Proxy...');
  let proxyContract = await Proxy.deploy(cpToken.address,"0x")
  await proxyContract.deployed();
  console.log("proxyContract deployed to:", proxyContract.address);

  // multi-transection contract
  const MultiTrans = await ethers.getContractFactory("MultiTransection");
  console.log('Deploying multiTrans...');
  const multiTrans = await MultiTrans.deploy();
  await multiTrans.deployed();
  console.log("multiTrans deployed to:", multiTrans.address);

  // sleep is required as 
  // await sleep(40000);
  // await hre.run("verify:verify", {
  //     address: cpToken.address
  // })
  // await sleep(40000);
  // await hre.run("verify:verify",{
  //     address: multiTrans.address
  // })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
