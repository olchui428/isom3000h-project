import fs from "fs";
import { Contract, Wallet } from "ethers";
import { ethers, network } from "hardhat";
import path from "path";
import issuerEndpointJSON from "../artifacts/contracts/endpoints/IssuerEndpoint.sol/IssuerEndpoint.json";
import applicantEndpointJSON from "../artifacts/contracts/endpoints/ApplicantEndpoint.sol/ApplicantEndpoint.json";
import accreditationEndpointJSON from "../artifacts/contracts/endpoints/AccreditationEndpoint.sol/AccreditationEndpoint.json";
import certificateEndpointJSON from "../artifacts/contracts/endpoints/CertificateEndpoint.sol/CertificateEndpoint.json";

// Addresses of deployed endpoint contracts
const ISSUER_ENDPOINT = "0xB579a3D8B2F541c04ED575ED160F6Ca28D30DdE6";
const APPLICANT_ENDPOINT = "0x064a8093C5986A6d243C75795068BFfA2b6384A1";
const ACCREDITATION_ENDPOINT = "0x9844F3693997D1e4e4e52F8f507DeB7babBc97D5";
const CERTIFICATE_ENDPOINT = "0xe469C0a13D58c602f6117c7b553904aF5AF61330";

// Import abis
const issuerEndpointAbi = issuerEndpointJSON.abi;
const applicantEndpointAbi = applicantEndpointJSON.abi;
const accreditationEndpointAbi = accreditationEndpointJSON.abi;
const certificateEndpointAbi = certificateEndpointJSON.abi;

// Local network private keys
const issuerPK = "0x29d5d48921437ce41b7055334a2a39218e9ffd64ea4f57e9099957128cb86244";
const applicant1PK = "0x9f6e9baa3c42952325d2c9d723829423bb832f7f34faa51c51b9de662df3e7c7";
const applicant2PK = "0xe2dd591f223d0d7857f78be8f64aa8b8c8f10ce0bb26c5422fdad47ab467704c";

/**
 * This function checks the functionality of deployed contracts by simulating a workflow on the local chain
 * If further modified, it can also be used to seed data
 * - Executed in npm commands `check:prod`(for PROD), `check:testnet`(for test), `check:local`(for local)
 * - Blockchain network deployed to is chosen by the npm command executed
 * - Blockchain networks are configured in `hardhat.config.ts`
 *
 * Workflow:
 * 1. Register Issuer
 * 2. Register Applicant
 * 3. Launch Accreditation
 * 4. Issue Certificate
 */
async function check() {
  // Stores interaction logs
  const logs: string[] = [
    `Checking deployed contracts on network "${network.name}" at RPC URL ${network.config.url}`,
  ];

  // Helper function for logging, adds log to `logs` array and outputs it to console
  const createLog = (logStr: any) => {
    logs.push(logStr);
    console.log(logStr);
  };

  try {
    createLog("Setting up Contracts");

    // Create Provider
    const provider = new ethers.providers.JsonRpcProvider((network.config as any).url);

    // Create usable Contracts instances
    const issuerEndpointContract = new Contract(ISSUER_ENDPOINT, issuerEndpointAbi, provider);
    const applicantEndpointContract = new Contract(
      APPLICANT_ENDPOINT,
      applicantEndpointAbi,
      provider
    );
    const accreditationEndpointContract = new Contract(
      ACCREDITATION_ENDPOINT,
      accreditationEndpointAbi,
      provider
    );
    const certificateEndpointContract = new Contract(
      CERTIFICATE_ENDPOINT,
      certificateEndpointAbi,
      provider
    );

    createLog("Successfully set up Contracts");

    createLog("Setting up accounts");

    // Create Signers
    const issuer = new ethers.Wallet(issuerPK, provider);
    const applicant1 = new ethers.Wallet(applicant1PK, provider);
    const applicant2 = new ethers.Wallet(applicant2PK, provider);

    createLog("Successfully set up accounts");

    createLog("Start checking:");

    // Start checking
    createLog("Checking IssuerEndpoint::registerIssuer()");
    const registerIssuerTx = await issuerEndpointContract.connect(issuer).registerIssuer();
    const registerIssuerReceipt = await registerIssuerTx.wait();
    createLog("Successfully registered Issuer");

    createLog("Checking ApplicantEndpoint::registerApplicant()");
    const registerApplicant1Tx = await applicantEndpointContract
      .connect(applicant1)
      .registerApplicant();
    const registerApplicant1Receipt = await registerApplicant1Tx.wait();
    createLog("Successfully registered Applicant 1");
    const registerApplicant2Tx = await applicantEndpointContract
      .connect(applicant2)
      .registerApplicant();
    const registerApplicant2Receipt = await registerApplicant2Tx.wait();
    createLog("Successfully registered Applicant 2");

    createLog("Checking AccreditationEndpoint::launchAccreditation()");
    const launchAccreditationTx = await accreditationEndpointContract
      .connect(issuer)
      .launchAccreditation();
    const launchAccreditationReceipt = await launchAccreditationTx.wait();
    createLog("Successfully launched Accreditation");

    createLog("Checking CertificateEndpoint::issueCertificate()");
    const issueCertificate1Tx = await certificateEndpointContract
      .connect(issuer)
      .issueCertificate();
    const issueCertificate1Receipt = await issueCertificate1Tx.wait();
    createLog("Successfully issued Certificate 1 to Applicant 1");
    const issueCertificate2Tx = await certificateEndpointContract
      .connect(issuer)
      .issueCertificate();
    const issueCertificate2Receipt = await issueCertificate2Tx.wait();
    createLog("Successfully issued Certificate 2 to Applicant 2");

    const completeCert1 = await certificateEndpointContract.getCompleteCertById(
      issueCertificate1Receipt.events[0].args.id
    );
    createLog("CompleteCert1: " + completeCert1);
    const completeCert2 = await certificateEndpointContract.getCompleteCertById(
      issueCertificate2Receipt.events[0].args.id
    );
    createLog("CompleteCert2: " + completeCert2);

    createLog(`\nChecking complete at ${new Date().toUTCString()}!`);
  } catch (error) {
    createLog(error);
    createLog(`\nChecking failed at ${new Date().toUTCString()}.`);
  }

  // Save deployed addresses to local log files for reference
  const fileString: string = logs.join("\n");
  const fileDir: string = path.join(__dirname, "logs");
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir);
  }
  const filePath: string = path.join(fileDir, `check_${Date.now()}.log`);
  fs.writeFileSync(filePath, fileString, { flag: "w" });
  console.log("Checking logs written to", filePath);
}

check().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
