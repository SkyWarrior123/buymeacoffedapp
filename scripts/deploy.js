const hre = require("hardhat")

// contract deployed to : 0x5FbDB2315678afecb367f032d93F642f64180aa3
// contract deployed to goerli : 0x94E9d5935eF9C265008fd3044Bd7Cd741CfAdCDe
async function main() {
    // We get the contracts to deploy
    const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee")
    const buyMeACoffee = await BuyMeACoffee.deploy()

    // waiting to get deployed
    await buyMeACoffee.deployed()

    console.log("BuyMeACoffee contract is deployed to :", buyMeACoffee.address )

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });