
import { ethers, upgrades } from "hardhat";
import hre from "hardhat"


function sleep(ms:number) {
  return new Promise((resolve) => {
      setTimeout(resolve, ms)
  })
}

async function main() {
  const CPToken = await ethers.getContractFactory("CPToken");

  let network = process.env.NETWORK ? process.env.NETWORK : "rinkeby"

  console.log(">-> Network is set to " + network)
  const cpToken = await upgrades.deployProxy(CPToken, ["CPToken","CPT"]);
  await cpToken.deployed();

  console.log("CPToken deployed to:", cpToken.address);

  await sleep(40000);

  await hre.run("verify:verify", {
    address: cpToken.address
})
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
