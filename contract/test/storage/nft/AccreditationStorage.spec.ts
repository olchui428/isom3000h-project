import { expect } from "chai";
import { ethers } from "hardhat";
import { deployContract, deployTest, setContractAddresses } from "../../deploy";

const CONTRACT_NAME = "AccreditationStorage";
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

describe(`Given ${CONTRACT_NAME}`, async () => {
  it("Should raise error if not deployer (setAddresses)", async () => {
    // ========== Deploy ==========

    const [owner, otherAddress, ...rest] = await ethers.getSigners();

    // Storage Contracts
    const issuerStorage = await deployContract(ISSUER_STORAGE);
    const applicantStorage = await deployContract(APPLICANT_STORAGE);
    const accreditationStorage = await deployContract(ACCREDITATION_STORAGE, [
      issuerStorage.address,
    ]);
    const certificateStorage = await deployContract(CERTIFICATE_STORAGE, [
      issuerStorage.address,
      applicantStorage.address,
    ]);

    // NFT Contracts
    const accreditationNFT = await deployContract(ACCREDITATION_NFT, [
      accreditationStorage.address,
    ]);
    const certificateNFT = await deployContract(CERTIFICATE_NFT, [certificateStorage.address]);

    // Endpoint Contracts
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
    await setContractAddresses(ISSUER_STORAGE, issuerStorage, [
      accreditationStorage.address,
      certificateStorage.address,
      issuerEndpoint.address,
      certificateEndpoint.address,
    ]);
    await setContractAddresses(APPLICANT_STORAGE, applicantStorage, [
      certificateStorage.address,
      applicantEndpoint.address,
      certificateEndpoint.address,
    ]);

    // ========== Testing ==========

    await expect(
      accreditationStorage
        .connect(otherAddress)
        .setAddresses(
          accreditationNFT.address,
          accreditationEndpoint.address,
          certificateEndpoint.address
        )
    ).to.be.revertedWith("Caller is not the deployer.");
  });

  it("Should raise error if not called by AccreditationNFT (createAccreditation)", async () => {
    // ========== Deploy ==========

    const [owner, applicantAcct, ...rest] = await ethers.getSigners();
    const {
      issuerEndpoint,
      issuerStorage,
      applicantStorage,
      applicantEndpoint,
      accreditationEndpoint,
      accreditationStorage,
      certificateEndpoint,
    } = await deployTest();

    // ========== Testing ==========

    // Testing variables
    const _issuer = {
      name: "ABC Company",
      description: "It is a good company",
      logoUrl: "https://picsum.photos/200/300",
      issuerAddress: owner.address,
    };
    const _applicant = {
      name: "Owen Lee",
      applicantAddress: applicantAcct.address,
    };
    const _accreditation = {
      id: 0,
      issuer: owner.address,
      title: "HKDSE",
      createdAt: Date.now(),
      duration: 1,
      nature: "Exam",
      description: "It is a tough exam.",
    };

    // Register Issuer
    const txIssuer = await issuerEndpoint.registerIssuer(
      _issuer.name,
      _issuer.description,
      _issuer.logoUrl
    );
    txIssuer.wait();

    // Assertions
    await expect(
      accreditationStorage.createAccreditation(
        _accreditation.id,
        _accreditation.issuer,
        _accreditation.title,
        _accreditation.createdAt,
        _accreditation.duration,
        _accreditation.nature,
        _accreditation.description
      )
    ).to.be.revertedWith("Unauthorized function call.");
  });

  it("Should raise error if call is not from NFT (revokeAccreditationById)", async () => {
    // ========== Deploy ==========

    const [owner, applicantAcct, ...rest] = await ethers.getSigners();
    const {
      issuerEndpoint,
      issuerStorage,
      applicantStorage,
      applicantEndpoint,
      accreditationNFT,
      accreditationEndpoint,
      accreditationStorage,
      certificateEndpoint,
    } = await deployTest();

    // ========== Testing ==========

    // Testing variables
    const _issuer = {
      name: "ABC Company",
      description: "It is a good company",
      logoUrl: "https://picsum.photos/200/300",
      issuerAddress: owner.address,
    };
    const _applicant = {
      name: "Owen Lee",
      applicantAddress: applicantAcct.address,
    };
    const _accreditation = {
      id: 0,
      issuer: owner.address,
      title: "HKDSE",
      createdAt: Date.now(),
      duration: 1,
      nature: "Exam",
      description: "It is a tough exam.",
    };

    // // Register Issuer
    // const txIssuer = await issuerEndpoint.registerIssuer(
    //   _issuer.name,
    //   _issuer.description,
    //   _issuer.logoUrl
    // );
    // txIssuer.wait();

    // Assertions
    await expect(
      accreditationStorage.revokeAccreditationById(_accreditation.id, "", 0)
    ).to.be.revertedWith("Unauthorized function call.");
  });

  it("Should raise error if call is not from NFT or endpoints (isAccreditationExists)", async () => {
    // ========== Deploy ==========

    const [owner, applicantAcct, ...rest] = await ethers.getSigners();
    const {
      issuerEndpoint,
      issuerStorage,
      applicantStorage,
      applicantEndpoint,
      accreditationNFT,
      accreditationEndpoint,
      accreditationStorage,
      certificateEndpoint,
    } = await deployTest();

    // ========== Testing ==========

    // Testing variables
    const _issuer = {
      name: "ABC Company",
      description: "It is a good company",
      logoUrl: "https://picsum.photos/200/300",
      issuerAddress: owner.address,
    };
    const _applicant = {
      name: "Owen Lee",
      applicantAddress: applicantAcct.address,
    };
    const _accreditation = {
      id: 0,
      issuer: owner.address,
      title: "HKDSE",
      createdAt: Date.now(),
      duration: 1,
      nature: "Exam",
      description: "It is a tough exam.",
    };

    // // Register Issuer
    // const txIssuer = await issuerEndpoint.registerIssuer(
    //   _issuer.name,
    //   _issuer.description,
    //   _issuer.logoUrl
    // );
    // txIssuer.wait();

    // Assertions
    await expect(accreditationStorage.isAccreditationExists(_accreditation.id)).to.be.revertedWith(
      "Unauthorized function call."
    );
  });

  it("Should raise error if call is not from endpoints (getAccreditationsByIssuerAddress)", async () => {
    // ========== Deploy ==========

    const [owner, applicantAcct, ...rest] = await ethers.getSigners();
    const {
      issuerEndpoint,
      issuerStorage,
      applicantStorage,
      applicantEndpoint,
      accreditationNFT,
      accreditationEndpoint,
      accreditationStorage,
      certificateEndpoint,
    } = await deployTest();

    // ========== Testing ==========

    // Testing variables
    const _issuer = {
      name: "ABC Company",
      description: "It is a good company",
      logoUrl: "https://picsum.photos/200/300",
      issuerAddress: owner.address,
    };
    const _applicant = {
      name: "Owen Lee",
      applicantAddress: applicantAcct.address,
    };
    const _accreditation = {
      id: 0,
      issuer: owner.address,
      title: "HKDSE",
      createdAt: Date.now(),
      duration: 1,
      nature: "Exam",
      description: "It is a tough exam.",
    };

    // // Register Issuer
    // const txIssuer = await issuerEndpoint.registerIssuer(
    //   _issuer.name,
    //   _issuer.description,
    //   _issuer.logoUrl
    // );
    // txIssuer.wait();

    // Assertions
    await expect(
      accreditationStorage.getAccreditationsByIssuerAddress(_accreditation.issuer)
    ).to.be.revertedWith("Unauthorized function call.");
  });

});
