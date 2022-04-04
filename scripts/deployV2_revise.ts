import { ethers } from "hardhat";
import { upgrades } from "hardhat";

//This must be V1 contract address.
const proxyAddress = '0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44'

async function main() {
  console.log(proxyAddress," original MultiTransaction(proxy) address")
  const MultiTransactionV2 = await ethers.getContractFactory("MultiTransactionV2")
  console.log("upgrade to MultiTransactionV2...")
  const multiTransactionV2 = await upgrades.upgradeProxy(proxyAddress, MultiTransactionV2)
  console.log(multiTransactionV2.address," MultiTransactionV2 address(should remain the same)")
  console.log(await upgrades.erc1967.getImplementationAddress(multiTransactionV2.address)," getImplementationAddress")
  console.log(await upgrades.erc1967.getAdminAddress(multiTransactionV2.address), " getAdminAddress")    
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})