import { expect } from "chai";
import { ethers, network } from "hardhat";
import { Contract, utils } from "ethers";

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

describe(`Given ${CONTRACT_NAME}`, () => {
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
    const receipt = await txAccred.wait();
    const data = receipt.logs[1].data;
    const [id, issuer, title, createdAt, duration, nature, description] =
      utils.defaultAbiCoder.decode(
        ["uint256", "address", " string", "uint256", "uint256", "string", "string"],
        data
      );

    // Get Accreditation by ID
    const accreditation = await accreditationEndpoint.getAccreditationById(id);

    // Assertions
    expect(accreditation.issuer).to.equal(_accreditation.issuer);
    expect(accreditation.title).to.equal(_accreditation.title);
    expect(accreditation.createdAt).to.equal(_accreditation.createdAt);
    expect(accreditation.duration).to.equal(_accreditation.duration);
    expect(accreditation.nature).to.equal(_accreditation.nature);
    expect(accreditation.description).to.equal(_accreditation.description);

    // Get Accreditations by Issuer address
    const accreditations = await accreditationEndpoint.getAccreditationsByIssuerAddress(
      _accreditation.issuer
    );

    // Assertions
    expect(accreditations.length).to.equal(1);
    const [acc] = accreditations;
    expect(acc.issuer).to.equal(_accreditation.issuer);
    expect(acc.title).to.equal(_accreditation.title);
    expect(acc.createdAt).to.equal(_accreditation.createdAt);
    expect(acc.duration).to.equal(_accreditation.duration);
    expect(acc.nature).to.equal(_accreditation.nature);
    expect(acc.description).to.equal(_accreditation.description);
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
