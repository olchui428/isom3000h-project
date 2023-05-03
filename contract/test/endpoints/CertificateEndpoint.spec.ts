import { expect } from "chai";
import { ethers, network } from "hardhat";
import { Contract, utils } from "ethers";

const CONTRACT_NAME = "CertificateEndpoint";

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

describe(`Given ${CONTRACT_NAME}`, () => {
  it("Should store Certificates correctly (issueCertificate, getCertificateById, getCertificatesByApplicantAddresses, getCompleteCertById)", async () => {
    const [owner, otherAddress, ...rest] = await ethers.getSigners();

    // ========== Deploy ==========

    // Storage Contracts
    createLog("Storage Contracts deployment:");
    const issuerStorage = await deployContract(ISSUER_STORAGE);
    const applicantStorage = await deployContract(APPLICANT_STORAGE);
    const accreditationStorage = await deployContract(ACCREDITATION_STORAGE, [
      issuerStorage.address,
    ]);
    const certificateStorage = await deployContract(CERTIFICATE_STORAGE, [
      applicantStorage.address,
    ]);

    // NFT Contracts
    createLog("NFT Contracts deployment:");
    const accreditationNFT = await deployContract(ACCREDITATION_NFT, [
      accreditationStorage.address,
    ]);
    const certificateNFT = await deployContract(CERTIFICATE_NFT, [certificateStorage.address]);

    // Endpoint Contracts
    createLog("Endpoint Contracts deployment:");
    const issuerEndpoint = await deployContract(ISSUER_ENDPOINT, [issuerStorage.address]);
    const applicantEndpoint = await deployContract(APPLICANT_ENDPOINT, [applicantStorage.address]);
    const accreditationEndpoint = await deployContract(ACCREDITATION_ENDPOINT, [
      accreditationStorage.address,
      accreditationNFT.address,
    ]);
    const certificateEndpoint = await deployContract(CERTIFICATE_ENDPOINT, [
      issuerStorage.address,
      applicantStorage.address,
      accreditationStorage.address,
      certificateStorage.address,
      certificateNFT.address,
    ]);

    // Initialize Contracts (aka set addresses of earlier deployed Contracts for each deployed Contract)

    // Storage Contracts
    createLog("Storage Contracts initialization:");
    await setContractAddresses(ISSUER_STORAGE, issuerStorage, [
      accreditationStorage.address,
      issuerEndpoint.address,
      certificateEndpoint.address,
    ]);
    await setContractAddresses(APPLICANT_STORAGE, applicantStorage, [
      applicantEndpoint.address,
      certificateEndpoint.address,
    ]);
    await setContractAddresses(ACCREDITATION_STORAGE, accreditationStorage, [
      accreditationNFT.address,
      accreditationEndpoint.address,
      certificateEndpoint.address,
    ]);
    await setContractAddresses(CERTIFICATE_STORAGE, certificateStorage, [
      certificateNFT.address,
      certificateEndpoint.address,
    ]);

    // NFT Contracts
    createLog("NFT Contracts initialization:");
    await setContractAddresses(ACCREDITATION_NFT, accreditationNFT, [
      accreditationEndpoint.address,
    ]);
    await setContractAddresses(CERTIFICATE_NFT, certificateNFT, [certificateEndpoint.address]);

    // No need to initialize Endpoint Contracts

    createLog(`\nDeployment success at ${new Date().toUTCString()}!`);

    // ========== Testing ==========

    // Create Issuer
    const _issuer = {
      name: "ABC Company",
      description: "It is a good company",
      logoUrl: "https://picsum.photos/200/300",
      issuerAddress: owner.address,
    };
    const txIssuer = await issuerEndpoint.registerIssuer(
      _issuer.name,
      _issuer.description,
      _issuer.logoUrl
    );
    txIssuer.wait();

    // Create applicant
    const _applicant = {
      name: "Owen Lee",
      applicantAddress: otherAddress.address,
    };
    const txApplicant = await applicantEndpoint.registerApplicant(_applicant.name);
    txApplicant.wait();

    // Create Accreditation
    const _accreditation = {
      issuer: owner.address,
      title: "HKDSE",
      createdAt: 888,
      duration: 1,
      nature: "Exam",
      description: "It is a tough exam.",
    };
    const txAccred = await accreditationEndpoint.launchAccreditation(
      _accreditation.title,
      _accreditation.createdAt,
      _accreditation.duration,
      _accreditation.nature,
      _accreditation.description
    );
    txAccred.wait();

    // Create Certificate
    const _certificate = {
      issuerAddress: _issuer.issuerAddress,
      applicantAddress: _applicant.applicantAddress,
      createdAt: 888,
      accreditationId: 0,
      level: "5**",
      eventId: "777",
      remarks: "Good",
    };
    const txCert = await certificateEndpoint.issueCertificate(
      _certificate.applicantAddress,
      _certificate.createdAt,
      _certificate.accreditationId,
      _certificate.level,
      _certificate.eventId,
      _certificate.remarks
    );
    const receipt = await txCert.wait();
    const data = receipt.logs[1].data;
    const [
      id,
      issuerAddress,
      applicantAddress,
      createdAt,
      accreditationId,
      level,
      eventId,
      remarks,
    ] = utils.defaultAbiCoder.decode(
      ["uint256", "address", "address", "uint256", "uint256", "string", "string", "string"],
      data
    );

    // Get Certificate by ID
    const certificate = await certificateEndpoint.getCertificateById(id);

    // Assertions
    expect(certificate.issuer).to.equal(_certificate.issuerAddress);
    expect(certificate.applicant).to.equal(_certificate.applicantAddress);
    expect(certificate.createdAt).to.equal(_certificate.createdAt);
    expect(certificate.accreditationId).to.equal(_certificate.accreditationId);
    expect(certificate.level).to.equal(_certificate.level);
    expect(certificate.eventId).to.equal(_certificate.eventId);
    expect(certificate.remarks).to.equal(_certificate.remarks);

    // // TODO(MVP): Get Certificates by Applicant address
    // const certificates = await certificateEndpoint.getCertificatesByApplicantAddress(
    //   _applicant.applicantAddress
    // );

    // Get CompleteCert by ID
    const {
      issuer,
      applicant,
      accreditation,
      certificate: cert,
    } = await certificateEndpoint.getCompleteCertById(id);

    // TODO(Good to have): implement all expects
    // expect(issuer.).to.equal(_issuer.);
    // expect(applicant.).to.equal(_applicant.);
    // expect(accreditation.).to.equal(_accreditation.);
    // expect(cert.).to.equal(_certificate.);
  });
});

const logs: string[] = [`Deploying on network "${network.name}" at RPC URL ${network.config.url}`];

// Helper function for logging, adds log to `logs` array and outputs it to console
const createLog = (logStr: any) => {
  logs.push(logStr);
  console.log(logStr);
};

/**
 * Helper function to deploy a contract and return deployment address
 * @param contractName Name of Contract to be deployed
 * @param deployArgs (Optional) Array of Contract addresses. Only required if the Contract requires other Contract addresses to deploy.
 * @returns A deployed Contract object
 */
const deployContract = async (
  contractName: string,
  deployArgs: string[] = []
): Promise<Contract> => {
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
    createLog(`ERROR when deploying Contract ${contractName} at ${new Date().toUTCString()}`);
    createLog(error);
    throw error;
  }
};

/**
 * Helper function to help set addresses to a deployed Contract
 * @param contractName Name of Contract, only passed for logging purposes
 * @param contract Contract to add addresses to
 * @param addresses Array of deployed Contract addresses to add to `contract`
 */
const setContractAddresses = async (
  contractName: string,
  contract: Contract,
  addresses: string[]
) => {
  try {
    createLog("Initializing: " + contractName);
    await contract.setAddresses(...addresses);
    createLog(`Contract ${contractName} initialized at ${new Date().toUTCString()}`);
  } catch (error) {
    createLog(`ERROR when initializing Contract ${contractName} at ${new Date().toUTCString()}`);
    createLog(error);
    throw error;
  }
};
