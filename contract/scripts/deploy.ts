import fs from "fs";
import { ethers, network } from "hardhat";
import path from "path";

// Name of contracts to deploy
const ISSUER_STORAGE = "IssuerStorage";
const APPLICANT_STORAGE = "ApplicantStorage";
const ACCREDITATION_STORAGE = "AccreditationStorage";
const CERTIFICATE_STORAGE = "CertificateStorage";
const ACCREDITATION_NFT = "AccreditationNFT";
const CERTIFICATE_NFT = "CertificateNFT";

/**
 * This function deploys the contracts to blockchain for use
 * - Executed in npm commands `deploy`(for PROD), `testnet`(for test), `local`(for local)
 * - Blockchain network deployed to is chosen by the npm command executed
 * - Blockchain networks are configured in `hardhat.config.ts`
 * 
 * TODO: Update this
 * Flow of deployment:
 * 1. Deploy storage contracts
 *   - IssuerStorage.sol
 *   - ApplicantStorage.sol
 *   - AccreditationStorage.sol
 *     - Dependent on IssuerStorage.sol
 *     - May be dependent on Set.sol
 *   - CertificateStorage.sol
 *     - Dependent on IssuerStorage.sol, ApplicantStorage.sol, AccreditationStorage.sol
 *     - May be dependent on Set.sol
 * 2. Deploy NFT contracts
 *   - AccreditationNFT.sol
 *     - Dependent on AccreditationStorage.sol, CertificateStorage.sol
 *   - CertificateNFT.sol
 *     - Dependent on AccreditationStorage.sol, CertificateStorage.sol
 *
 * Note: deployment of types and libraries are not required
 */
async function deploy() {
  // Stores deployment logs
  const logs: string[] = [
    `Deploying on network "${network.name}" at RPC URL ${network.config.url}`,
  ];

  // Helper function to deploy a contract and return deployment address
  const deployContractGetAddress = async (contractName: string, ...deployArgs: string[]) => {
    console.log("Deploying:", contractName);
    const Contract = await ethers.getContractFactory(contractName);
    const contract = await Contract.deploy(...deployArgs);
    await contract.deployed();

    const address = contract.address;
    // Add deployment log to `logs` array
    const log = `Contract ${contractName} deployed to address ${address} at ${new Date().toUTCString()}`;
    logs.push(log);
    console.log(log);
    return address;
  };

  // Deploy contracts sequentially, input dependent contract addresses as argument
  // TODO: decide which addresses to input as argument
  const issuerStorageAddress = await deployContractGetAddress(ISSUER_STORAGE);
  const applicantStorageAddress = await deployContractGetAddress(APPLICANT_STORAGE);
  const accreditationStorageAddress = await deployContractGetAddress(ACCREDITATION_STORAGE);
  const certificateStorageAddress = await deployContractGetAddress(CERTIFICATE_STORAGE);
  const accreditationNFTAddress = await deployContractGetAddress(ACCREDITATION_NFT);
  const certificateNFTAddress = await deployContractGetAddress(CERTIFICATE_NFT);

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
