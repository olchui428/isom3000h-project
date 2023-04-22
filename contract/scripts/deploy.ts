import { Contract } from "ethers";
import fs from "fs";
import { ethers, network } from "hardhat";
import path from "path";

// Name of contracts to deploy
const USERS_CONTRACT = "Users";
const ACCREDITATION_NFT = "AccreditationNFT";
const CERTIFICATE_NFT = "CertificateNFT";

/**
 * This function deploys the contracts to blockchain for use
 * - Executed in npm commands `deploy`(for PROD), `testnet`(for test), `local`(for local)
 */
async function deploy() {
  // Stores deployment logs
  const logs: string[] = [
    `Deploying on network "${network.name}" at RPC URL ${network.config.url}`,
  ];
  // Helper function to add a deployment log to `logs`
  const createDeployLog = (contractName: string, address: string) => {
    const log = `Contract ${contractName} deployed to address ${address} at ${new Date().toUTCString()}`;
    logs.push(log);
    console.log(log);
  };

  // 1. Deploy User contract
  console.log("Deploying:", USERS_CONTRACT);
  const UsersContract = await ethers.getContractFactory(USERS_CONTRACT);
  const usersContract = await UsersContract.deploy();
  await usersContract.deployed();

  // Get deployed users contract address
  const usersAddress = usersContract.address;
  createDeployLog(USERS_CONTRACT, usersAddress);

  // 2. Deploy Accreditation contract after obtaining User contract address
  console.log("Deploying:", ACCREDITATION_NFT);
  const AccreditationContract = await ethers.getContractFactory(
    ACCREDITATION_NFT,
  );
  const accreditationContract = await AccreditationContract.deploy(usersAddress);
  await accreditationContract.deployed();

  // Get deployed accreditation contract address
  const accreditationAddress = accreditationContract.address;
  createDeployLog(ACCREDITATION_NFT, accreditationAddress);

  // 3. Deploy Certificate contract after obtaining Accreditation contract address
  const CertificateContract = await ethers.getContractFactory(CERTIFICATE_NFT);
  const certificateContract = await CertificateContract.deploy(accreditationAddress);
  await certificateContract.deployed();

  // Get deployed certificate contract address
  const certificateAddress = certificateContract.address;
  createDeployLog(CERTIFICATE_NFT, certificateAddress);
  console.log(CERTIFICATE_NFT, "contract deployed to:", certificateAddress);

  // Save deployed addresses to local log files for reference
  const fileString: string = logs.join("\n");
  const fileDir: string = path.join(__dirname, "logs");
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir);
  }
  const filePath: string = path.join(fileDir, `${Date.now()}.log`);
  fs.writeFileSync(filePath, fileString, { flag: "w" });
  console.log("Deployment logs written to", filePath);
}

deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
