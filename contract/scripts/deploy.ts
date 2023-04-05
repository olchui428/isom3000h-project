import { Contract } from "ethers";
import { ethers } from "hardhat";

async function deploy() {
  // Search for contract in local directory
  const Contract = await ethers.getContractFactory("");
  const contract = await Contract.deploy();

  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
