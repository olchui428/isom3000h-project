import { expect } from "chai";
import { ethers, network } from "hardhat";
import { Contract, utils } from "ethers";
import { deployTest } from "../deploy";

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

describe.only(`Given ${CONTRACT_NAME}`, async () => {

  it("Should raise error if not using Issuer address (launchAccreditation)", async () => {
    // ========== Deploy ==========

    const [owner, otherAddress, ...rest] = await ethers.getSigners();
    const { issuerEndpoint, applicantEndpoint, accreditationEndpoint, certificateEndpoint } =
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

    // Create Issuer
    const txIssuer = await issuerEndpoint.registerIssuer(
      _issuer.name,
      _issuer.description,
      _issuer.logoUrl
    );
    txIssuer.wait();

    // Assertion: Create Accreditation
    await expect(
      accreditationEndpoint
        .connect(otherAddress)
        .launchAccreditation(
          _accreditation.title,
          _accreditation.createdAt,
          _accreditation.duration,
          _accreditation.nature,
          _accreditation.description
        )
    ).to.revertedWith("Provided Issuer address is not a registered Issuer.");
  });

  it("Should raise error if invalid params (launchAccreditation)", async () => {
    // ========== Deploy ==========

    const [owner, otherAddress, ...rest] = await ethers.getSigners();
    const { issuerEndpoint, applicantEndpoint, accreditationEndpoint, certificateEndpoint } =
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

    // Create Issuer
    const txIssuer = await issuerEndpoint.registerIssuer(
      _issuer.name,
      _issuer.description,
      _issuer.logoUrl
    );
    txIssuer.wait();

    // Assertion: Create Accreditation
    await expect(
      accreditationEndpoint.launchAccreditation(
        "",
        _accreditation.createdAt,
        _accreditation.duration,
        _accreditation.nature,
        _accreditation.description
      )
    ).to.revertedWith("Title should not be empty.");
  });

  it("Should raise error if get by invalid id (getAccreditationById)", async () => {
    // ========== Deploy ==========

    const [owner, otherAddress, ...rest] = await ethers.getSigners();
    const { issuerEndpoint, applicantEndpoint, accreditationEndpoint, certificateEndpoint } =
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

    // Create Issuer
    const txIssuer = await issuerEndpoint.registerIssuer(
      _issuer.name,
      _issuer.description,
      _issuer.logoUrl
    );
    txIssuer.wait();

    // Create Accreditation
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

    // Assertions
    await expect(accreditationEndpoint.getAccreditationById(_accreditation.id + 1)).to.revertedWith(
      "Accreditation with provided ID does not exist."
    );
  });

  it("Should raise error if get by invalid issuer address (getAccreditationsByIssuerAddresses)", async () => {
    // ========== Deploy ==========

    const [owner, otherAddress, ...rest] = await ethers.getSigners();
    const { issuerEndpoint, applicantEndpoint, accreditationEndpoint, certificateEndpoint } =
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

    // Create Issuer
    const txIssuer = await issuerEndpoint.registerIssuer(
      _issuer.name,
      _issuer.description,
      _issuer.logoUrl
    );
    txIssuer.wait();

    // Create Accreditation
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

    // Get Accreditation by ID
    const accreditation = await accreditationEndpoint.getAccreditationById(_accreditation.id);

    // Assertions
    expect(accreditation.issuer).to.equal(_accreditation.issuer);
    expect(accreditation.title).to.equal(_accreditation.title);
    expect(accreditation.createdAt).to.equal(_accreditation.createdAt);
    expect(accreditation.duration).to.equal(_accreditation.duration);
    expect(accreditation.nature).to.equal(_accreditation.nature);
    expect(accreditation.description).to.equal(_accreditation.description);

    // Assertions
    await expect(
      accreditationEndpoint.getAccreditationsByIssuerAddress(otherAddress.address)
    ).to.be.revertedWith("Provided Issuer address is not a registered Issuer.");
  });

  it("Should store Accreditations correctly (launchAccreditation, getAccreditationById, getAccreditationsByIssuerAddresses)", async () => {
    // ========== Deploy ==========

    const [owner, otherAddress, ...rest] = await ethers.getSigners();
    const { issuerEndpoint, applicantEndpoint, accreditationEndpoint, certificateEndpoint } =
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

    // Create Issuer
    const txIssuer = await issuerEndpoint.registerIssuer(
      _issuer.name,
      _issuer.description,
      _issuer.logoUrl
    );
    txIssuer.wait();

    // Create Accreditation
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

    // Get Accreditation by ID
    const accreditation = await accreditationEndpoint.getAccreditationById(_accreditation.id);

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
