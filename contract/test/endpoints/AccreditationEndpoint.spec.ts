import { expect } from "chai";
import { ethers, network } from "hardhat";
import { Contract } from "ethers";
import { add } from "lodash";

const CONTRACT_NAME = "AccreditationEndpoint";

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

describe.only(`Given ${CONTRACT_NAME}`, () => {
  it("Testing launchAccreditation error", () => {
    it("Should raise error if not using Issuer address", async () => {
      // TODO(Good to have): implement test
    });

    it("Should raise error if invalid params", async () => {
      // TODO(Good to have): implement test
    });
  });

  it("Testing getAccreditationById error", () => {
    it("Should raise error if invalid params", async () => {
      // TODO(Good to have): implement test
    });
  });

  it("Testing getAccreditationsByIssuerAddresses error", () => {
    it("Should raise error if invalid params", async () => {
      // TODO(Good to have): implement test
    });
  });

  it("Should store Accreditations correctly (launchAccreditation, getAccreditationById, getAccreditationsByIssuerAddresses)", async () => {
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
    ]);
    await setContractAddresses(APPLICANT_STORAGE, applicantStorage, [applicantEndpoint.address]);
    await setContractAddresses(ACCREDITATION_STORAGE, accreditationStorage, [
      accreditationNFT.address,
      accreditationEndpoint.address,
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
    await issuerEndpoint.registerIssuer(
      _issuer.issuerAddress,
      _issuer.name,
      _issuer.description,
      _issuer.logoUrl
    );

    // Create Accreditation
    const _accreditation = {
      issuer: owner.address,
      title: "HKDSE",
      createdAt: 888,
      duration: 1,
      nature: "Exam",
      description: "It is a tough exam.",
    };
    await accreditationEndpoint.launchAccreditation(
      _accreditation.issuer,
      _accreditation.title,
      _accreditation.createdAt,
      _accreditation.duration,
      _accreditation.nature,
      _accreditation.description
    );

    // Get Accreditation by ID
    const accreditation = await accreditationEndpoint.getAccreditationById(0);

    // Assertions
    expect(_accreditation.issuer).to.equal(accreditation.issuer);
    expect(_accreditation.title).to.equal(accreditation.title);
    expect(_accreditation.createdAt).to.equal(accreditation.createdAt);
    expect(_accreditation.duration).to.equal(accreditation.duration);
    expect(_accreditation.nature).to.equal(accreditation.nature);
    expect(_accreditation.description).to.equal(accreditation.description);
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
