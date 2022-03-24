
import { ethers, upgrades } from "hardhat";

async function main() {
  const CPToken = await ethers.getContractFactory("CPToken");
  const cpToken = await upgrades.deployProxy(CPToken, ["CPToken","CPT"]);

  await cpToken.deployed();

  console.log("CPToken deployed to:", cpToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
