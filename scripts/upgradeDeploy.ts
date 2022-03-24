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
  const CPTokenADDRESS = ''
  const CPTokenV2 = await ethers.getContractFactory("CPTokenV2");
  const cpTokenV2 = await upgrades.upgradeProxy(CPTokenADDRESS, CPTokenV2);
  console.log("CPToken upgraded");

  console.log(cpTokenV2.address, 'EquipmentV2 upgraded');

  await sleep(40000);

  await hre.run("verify:verify", {
    address: cpTokenV2.address
  })
}


main();