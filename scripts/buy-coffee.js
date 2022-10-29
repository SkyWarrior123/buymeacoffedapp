const hre = require("hardhat");
const { ethers, waffle} = require("hardhat");


// Returns the balance of ether
async function getBalance(address) {
  const balanceBigInt = await ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

// Logs the Ether balances for a list of addresses.
async function printBalances(addresses) {
  let idx = 0
  for (const address of addresses) {
    console.log(`Address ${idx} balance : ` , await getBalance(address));
    idx++;
  }
}

// Logs the memos stored on-chain for coffee purchases
async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp
    const tipper = memo.name
    const tipperAddress = memo.address
    const message = memo.message
    console.log(` At ${timestamp}, ${tipper} ${tipperAddress} said : ${message}`)
  }
}

async function main() {
  // Fetching example account's to work with from ethers
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  // We get the contract to deploy
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee")
  const buyMeACoffee = await BuyMeACoffee.deploy()

  // deploy the contract
  await buyMeACoffee.deployed()
  console.log("BuyMeACoffee deployed to : ", buyMeACoffee.address);

  // Check balances before buying coffee
  const addresses = [owner.address, tipper.address, buyMeACoffee.address]
  console.log("==start==")
  await printBalances(addresses)

  // buying a coffee
  const tip = { value: hre.ethers.utils.parseEther("1")}
  await buyMeACoffee.connect(tipper).buyCoffee("Sahbaaz", "Wake up from your dream", tip)
  await buyMeACoffee.connect(tipper2).buyCoffee("Sahbaaz", "Work for your dream", tip)
  await buyMeACoffee.connect(tipper3).buyCoffee("Sahbaaz", "You'll be successfull one day for sure!!!", tip)

  // check balances after coffee purchases
  console.log("==boughtCoffee==")
  await printBalances(addresses)

  // Withdraw
  await buyMeACoffee.connect(owner).withdrawTips();

  // Balance after withdawal
  await printBalances(addresses)

  // check out the memos
  console.log("==memos==")
  const memos = await buyMeACoffee.getMemos();
  printMemos(memos)
}




// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
