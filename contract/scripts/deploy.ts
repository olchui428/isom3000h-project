import { Contract } from "ethers";
import { ethers } from "hardhat";

// TODO: add name of contracts to be deployed
// TODO: determine if contracts should be deployed in order
const contractsToDeploy: string[] = [
  // "",
];

async function deploy() {
  for (const contractName of contractsToDeploy) {
    const Contract = await ethers.getContractFactory(contractName);
    const contract = await Contract.deploy();
    await contract.deployed();

    console.log("Contract deployed to:", contract.address);
  }
}

deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
