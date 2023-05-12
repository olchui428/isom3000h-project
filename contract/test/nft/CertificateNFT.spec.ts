import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, utils } from "ethers";
import { deployContract, deployTest, setContractAddresses } from "../deploy";

const CONTRACT_NAME = "CertificateNFT";
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
  it("Should raise error if not called by CertificateEndpoint (issueCertificate)", async () => {
    // ========== Deploy ==========

    const [owner, applicantAcct, ...rest] = await ethers.getSigners();
    const {
      issuerEndpoint,
      applicantEndpoint,
      accreditationEndpoint,
      certificateEndpoint,
      certificateNFT,
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
      id: -1,
      issuer: owner.address,
      title: "HKDSE",
      createdAt: Date.now(),
      duration: 1,
      nature: "Exam",
      description: "It is a tough exam.",
    };
    const _certificate = {
      issuerAddress: _issuer.issuerAddress,
      applicantAddress: _applicant.applicantAddress,
      createdAt: 888,
      accreditationId: 0,
      level: "5**",
      eventId: "777",
      remarks: "Good",
    };

    // Register Issuer
    const txIssuer = await issuerEndpoint.registerIssuer(
      _issuer.name,
      _issuer.description,
      _issuer.logoUrl
    );
    txIssuer.wait();

    // Register applicant
    const txApplicant = await applicantEndpoint
      .connect(applicantAcct)
      .registerApplicant(_applicant.name);
    txApplicant.wait();

    // Launch Accreditation
    const txAccred = await accreditationEndpoint.launchAccreditation(
      _accreditation.title,
      _accreditation.createdAt,
      _accreditation.duration,
      _accreditation.nature,
      _accreditation.description
    );
    const receipt = await txAccred.wait();
    const data = utils.defaultAbiCoder.decode(
      ["uint256", "address", " string", "uint256", "uint256", "string", "string"],
      receipt.logs[1].data
    );
    _accreditation.id = data[0];

    await expect(
      certificateNFT.issueCertificate(
        _certificate.issuerAddress,
        _certificate.applicantAddress,
        _certificate.createdAt,
        _certificate.accreditationId,
        _certificate.level,
        _certificate.eventId,
        _certificate.remarks
      )
    ).to.be.revertedWith("Call is not initiated from Endpoint.");
  });

  it("Should raise error if not called by CertificateEndpoint (isCertificateValid)", async () => {
    // ========== Deploy ==========

    const [owner, otherAddress, ...rest] = await ethers.getSigners();
    const { issuerEndpoint, accreditationEndpoint, certificateEndpoint, certificateNFT } =
      await deployTest();

    // ========== Testing ==========

    // Testing variables
    const _issuer = {
      name: "ABC Company",
      description: "It is a good company",
      logoUrl: "https://picsum.photos/200/300",
      issuerAddress: owner.address,
    };
    const _accreditation = {
      id: -1,
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

    // Launch Accreditation
    const txAccred = await accreditationEndpoint.launchAccreditation(
      _accreditation.title,
      _accreditation.createdAt,
      _accreditation.duration,
      _accreditation.nature,
      _accreditation.description
    );
    const receipt = await txAccred.wait();
    const data = utils.defaultAbiCoder.decode(
      ["uint256", "address", " string", "uint256", "uint256", "string", "string"],
      receipt.logs[1].data
    );
    _accreditation.id = data[0];

    await expect(certificateNFT.isCertificateValid(0)).to.be.revertedWith(
      "Call is not initiated from Endpoint."
    );
  });

  it("Should return false if id doesnt exist (isCertificateValid)", async () => {
    // ========== Deploy ==========

    const [owner, otherAddress, ...rest] = await ethers.getSigners();
    const { issuerEndpoint, accreditationEndpoint, certificateEndpoint, certificateNFT } =
      await deployTest();

    // ========== Testing ==========

    // Testing variables
    const _issuer = {
      name: "ABC Company",
      description: "It is a good company",
      logoUrl: "https://picsum.photos/200/300",
      issuerAddress: owner.address,
    };
    const _accreditation = {
      id: -1,
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

    // Launch Accreditation
    const txAccred = await accreditationEndpoint.launchAccreditation(
      _accreditation.title,
      _accreditation.createdAt,
      _accreditation.duration,
      _accreditation.nature,
      _accreditation.description
    );
    const receipt = await txAccred.wait();
    const data = utils.defaultAbiCoder.decode(
      ["uint256", "address", " string", "uint256", "uint256", "string", "string"],
      receipt.logs[1].data
    );
    _accreditation.id = data[0];

    const isValid = await certificateNFT.connect(certificateEndpoint.address).isCertificateValid(2);
    expect(isValid).to.be.false;
  });

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
    await setContractAddresses(ACCREDITATION_STORAGE, accreditationStorage, [
      accreditationNFT.address,
      accreditationEndpoint.address,
      certificateEndpoint.address,
    ]);
    await setContractAddresses(CERTIFICATE_STORAGE, certificateStorage, [
      certificateNFT.address,
      certificateEndpoint.address,
    ]);

    // ========== Testing ==========

    await expect(
      certificateNFT.connect(otherAddress).setAddresses(certificateEndpoint.address)
    ).to.be.revertedWith("Caller is not the deployer.");
  });
});
