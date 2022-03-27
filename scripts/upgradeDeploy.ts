const { ethers, upgrades } = require("hardhat");
import hre from "hardhat"

function sleep(ms:number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

async function main() {    
  ///  you will need to manually keep track of each deployment address,
  ///  to supply those to the upgrade function when needed.
  const MULTIV2_ADDRESS = 'V2_CONTRACT_ADDRESS'
  const MultiTransV2 = await ethers.getContractFactory("MultitransactionV2");
  const multiTransV2 = await upgrades.upgradeProxy(MULTIV2_ADDRESS, MultiTransV2);
  console.log("CPToken upgraded");

  console.log(multiTransV2.address, 'EquipmentV2 upgraded');

  await sleep(40000);

  await hre.run("verify:verify", {
    address: multiTransV2.address
  })
}


main();