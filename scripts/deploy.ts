
import { ethers } from "hardhat";

async function main() {
  const CPToken = await ethers.getContractFactory("CPToken");
  const cpToken = await CPToken.deploy("Hello, Hardhat!");

  await cpToken.deployed();

  console.log("Greeter deployed to:", cpToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
