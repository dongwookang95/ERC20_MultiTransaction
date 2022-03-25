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
  const CPTokenADDRESS = '0x9056FdD2869d0c684B5B17B676D82693360d43Da'
  const CPTokenV1 = await ethers.getContractFactory("CPToken");
  const cpTokenV1 = await upgrades.upgradeProxy(CPTokenADDRESS, CPTokenV1);
  console.log("CPToken upgraded");

  console.log(cpTokenV1.address, 'EquipmentV2 upgraded');

  await sleep(40000);

  await hre.run("verify:verify", {
    address: cpTokenV1.address
  })
}


main();