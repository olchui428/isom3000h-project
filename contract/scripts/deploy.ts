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
const ISSUER_ENDPOINT = "IssuerEndpoint";
const APPLICANT_ENDPOINT = "ApplicantEndpoint";
const ACCREDITATION_ENDPOINT = "AccreditationEndpoint";
const CERTIFICATE_ENDPOINT = "CertificateEndpoint";

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
 * 3. Deploy Endpoint contracts
 * TODO: update this
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

  // Helper function for logging, adds log to `logs` array and outputs it to console
  const createLog = (logStr: any) => {
    logs.push(logStr);
    console.log(logStr);
  };

  /**
   * Helper function to deploy a contract and return deployment address
   * @param contractName Name of Contract to be deployed
   * @param deployArgs (Optional) Array of Contract addresses. Only required if the Contract requires other Contract addresses to deploy.
   * @returns Contract - returns a deployed Contract object
   */
  const deployContract = async (contractName: string, deployArgs: string[] = []) => {
    try {
      createLog("Deploying: " + contractName);
      const Contract = await ethers.getContractFactory(contractName);
      const contract = await Contract.deploy(...deployArgs);
      await contract.deployed();

      createLog(
        `Contract ${contractName} deployed to address ${
          contract.address
        } at ${new Date().toUTCString()}`
      );
      return contract;
    } catch (error) {
      const errorLog = `ERROR when deploying Contract ${contractName} at ${new Date().toUTCString()}`;
      createLog(errorLog);
      createLog(error);
      throw error;
    }
  };

  // Deploy contracts sequentially, input dependent contract addresses as argument
  try {
    // Storage Contracts
    createLog("Storage Contracts deployment:");
    const issuerStorage = await deployContract(ISSUER_STORAGE);
    const applicantStorage = await deployContract(APPLICANT_STORAGE, [
      // TODO: decide which addresses to input as argument
    ]);
    const accreditationStorage = await deployContract(ACCREDITATION_STORAGE, [
      // TODO: decide which addresses to input as argument
    ]);
    const certificateStorage = await deployContract(CERTIFICATE_STORAGE, [
      // TODO: decide which addresses to input as argument
    ]);

    // NFT Contracts
    createLog("NFT Contracts deployment:");
    const accreditationNFT = await deployContract(ACCREDITATION_NFT, [
      // TODO: decide which addresses to input as argument
    ]);
    const certificateNFT = await deployContract(CERTIFICATE_NFT, [
      // TODO: decide which addresses to input as argument
    ]);

    // Endpoint Contracts
    createLog("Endpoint Contracts deployment:");
    const issuerEndpoint = await deployContract(ISSUER_ENDPOINT, [
      // TODO: decide which addresses to input as argument
      issuerStorage!.address,
    ]);
    const applicantEndpoint = await deployContract(APPLICANT_ENDPOINT, [
      // TODO: decide which addresses to input as argument
    ]);
    const accreditationEndpoint = await deployContract(ACCREDITATION_ENDPOINT, [
      // TODO: decide which addresses to input as argument
    ]);
    const certificateEndpoint = await deployContract(CERTIFICATE_ENDPOINT, [
      // TODO: decide which addresses to input as argument
    ]);

    // TODO: figure out any Contracts deployed earlier will need the later deployed Contract addresses

    createLog(`\nDeployment success at ${new Date().toUTCString()}!`);
  } catch (error) {
    createLog(`\nDeployment failed at ${new Date().toUTCString()}.`);
  }

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
