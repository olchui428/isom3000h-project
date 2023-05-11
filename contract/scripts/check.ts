import fs from "fs";
import { Contract, Wallet, utils } from "ethers";
import { ethers, network } from "hardhat";
import path from "path";
import * as dotenv from "dotenv";
import issuerEndpointJSON from "../artifacts/contracts/endpoints/IssuerEndpoint.sol/IssuerEndpoint.json";
import applicantEndpointJSON from "../artifacts/contracts/endpoints/ApplicantEndpoint.sol/ApplicantEndpoint.json";
import accreditationEndpointJSON from "../artifacts/contracts/endpoints/AccreditationEndpoint.sol/AccreditationEndpoint.json";
import certificateEndpointJSON from "../artifacts/contracts/endpoints/CertificateEndpoint.sol/CertificateEndpoint.json";

/*
 * If testing in local network (Ganache),
 * set ENV = "LOCAL",
 * replace LOCAL_ENDPOINTSs and LOCAL_PKs in .env file.
 *
 * If testing in testnet (Mumbai Testnet),
 * set ENV = "TESTNET",
 * replace TEST_ENDPOINTSs and TEST_PKs in .env file.
 */

// Environment now (LOCAL || TESTNET || PROD)
const ENV = "LOCAL";

// Addresses of deployed endpoint contracts
const ISSUER_ENDPOINT =
  ENV == "LOCAL" ? process.env.LOCAL_ISSUER_ENDPOINT : process.env.TEST_ISSUER_ENDPOINT;
const APPLICANT_ENDPOINT =
  ENV == "LOCAL" ? process.env.LOCAL_APPLICANT_ENDPOINT : process.env.TEST_APPLICANT_ENDPOINT;
const ACCREDITATION_ENDPOINT =
  ENV == "LOCAL"
    ? process.env.LOCAL_ACCREDITATION_ENDPOINT
    : process.env.TEST_ACCREDITATION_ENDPOINT;
const CERTIFICATE_ENDPOINT =
  ENV == "LOCAL" ? process.env.LOCAL_CERTIFICATE_ENDPOINT : process.env.TEST_CERTIFICATE_ENDPOINT;

// Import abis
const issuerEndpointAbi = issuerEndpointJSON.abi;
const applicantEndpointAbi = applicantEndpointJSON.abi;
const accreditationEndpointAbi = accreditationEndpointJSON.abi;
const certificateEndpointAbi = certificateEndpointJSON.abi;

// Local network private keys, copy over from Ganache || Testnet private keys
const issuerPK = ENV == "LOCAL" ? process.env.LOCAL_PK : process.env.TEST_PK;
const applicant1PK = ENV == "LOCAL" ? process.env.LOCAL_PK_1 : process.env.TEST_PK_1;
const applicant2PK = ENV == "LOCAL" ? process.env.LOCAL_PK_2 : process.env.TEST_PK_2;

// Dummy variables
const _issuer = {
  name: "ABC Company",
  description: "It is a good company",
  logoUrl: "https://picsum.photos/200/300",
};
const _applicant1 = {
  name: "Owen Lee",
};
const _applicant2 = {
  name: "Amy Chan",
};
const _accreditation = {
  id: -1,
  title: "HKDSE",
  createdAt: Date.now(),
  duration: 1,
  nature: "Exam",
  description: "It is a tough exam.",
};
const _certificate1 = {
  id: -1,
  createdAt: Date.now(),
  accreditationId: -1,
  level: "5**",
  eventId: "777",
  remarks: "Good",
};
const _certificate2 = {
  id: -1,
  createdAt: Date.now(),
  accreditationId: -1,
  level: "2",
  eventId: "778",
  remarks: "Poor",
};

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
 *
 * Note: this script should only be run after deploying contracts and copying contract addresses and other information to this file
 */
async function check() {
  // Stores interaction logs
  const logs: string[] = [
    `Checking deployed contracts on network "${network.name}" at RPC URL ${
      (network.config as any).url
    }`,
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
    const registerIssuerTx = await issuerEndpointContract
      .connect(issuer)
      .registerIssuer(_issuer.name, _issuer.description, _issuer.logoUrl);
    const registerIssuerReceipt = await registerIssuerTx.wait();
    createLog("Successfully registered Issuer");
    createLog(
      "Registered Issuer: " + (await issuerEndpointContract.getIssuerByAddress(issuer.address))
    );

    createLog("Checking ApplicantEndpoint::registerApplicant()");
    const registerApplicant1Tx = await applicantEndpointContract
      .connect(applicant1)
      .registerApplicant(_applicant1.name);
    const registerApplicant1Receipt = await registerApplicant1Tx.wait();
    createLog("Successfully registered Applicant 1");
    const registerApplicant2Tx = await applicantEndpointContract
      .connect(applicant2)
      .registerApplicant(_applicant2.name);
    const registerApplicant2Receipt = await registerApplicant2Tx.wait();
    createLog("Successfully registered Applicant 2");
    createLog(
      "Registered Applicant 1: " +
        (await applicantEndpointContract.getApplicantByAddress(applicant1.address))
    );
    createLog(
      "Registered Applicant 2: " +
        (await applicantEndpointContract.getApplicantByAddress(applicant2.address))
    );

    createLog("Checking AccreditationEndpoint::launchAccreditation()");
    const launchAccreditationTx = await accreditationEndpointContract
      .connect(issuer)
      .launchAccreditation(
        _accreditation.title,
        _accreditation.createdAt,
        _accreditation.duration,
        _accreditation.nature,
        _accreditation.description
      );
    const launchAccreditationReceipt = await launchAccreditationTx.wait();
    createLog("Successfully launched Accreditation");
    const launchAccreditationReceiptData = utils.defaultAbiCoder.decode(
      ["uint256", "address", " string", "uint256", "uint256", "string", "string"],
      launchAccreditationReceipt.logs[1].data
    );
    _accreditation.id = launchAccreditationReceiptData[0];
    _certificate1.accreditationId = _accreditation.id;
    _certificate2.accreditationId = _accreditation.id;
    createLog(
      "Launched Accreditation: " +
        (await accreditationEndpointContract.getAccreditationById(_accreditation.id))
    );

    createLog("Checking CertificateEndpoint::issueCertificate()");
    const issueCertificate1Tx = await certificateEndpointContract
      .connect(issuer)
      .issueCertificate(
        applicant1.address,
        _certificate1.createdAt,
        _certificate1.accreditationId,
        _certificate1.level,
        _certificate1.eventId,
        _certificate1.remarks
      );
    const issueCertificate1Receipt = await issueCertificate1Tx.wait();
    const issueCertificate1ReceiptData = utils.defaultAbiCoder.decode(
      ["uint256", "uint256", "address", "address", "uint256", "string", "string", "string"],
      issueCertificate1Receipt.logs[1].data
    );
    _certificate1.id = issueCertificate1ReceiptData[0];
    createLog("Successfully issued Certificate 1 to Applicant 1");
    const issueCertificate2Tx = await certificateEndpointContract
      .connect(issuer)
      .issueCertificate(
        applicant2.address,
        _certificate2.createdAt,
        _certificate2.accreditationId,
        _certificate2.level,
        _certificate2.eventId,
        _certificate2.remarks
      );
    const issueCertificate2Receipt = await issueCertificate2Tx.wait();
    const issueCertificate2ReceiptData = utils.defaultAbiCoder.decode(
      ["uint256", "uint256", "address", "address", "uint256", "string", "string", "string"],
      issueCertificate2Receipt.logs[1].data
    );
    _certificate2.id = issueCertificate2ReceiptData[0];
    createLog("Successfully issued Certificate 2 to Applicant 2");

    const completeCert1 = await certificateEndpointContract.getCompleteCertById(_certificate1.id);
    createLog("CompleteCert 1: " + completeCert1);
    const completeCert2 = await certificateEndpointContract.getCompleteCertById(_certificate2.id);
    createLog("CompleteCert 2: " + completeCert2);

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
