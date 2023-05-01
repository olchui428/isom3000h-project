import { expect } from "chai";
import { ethers } from "hardhat";
import _ from "lodash";

const CONTRACT_NAME = "AccreditationStorage";

describe(`Given ${CONTRACT_NAME}`, async () => {
  it("Should test createAccreditation, getAccreditationById", async () => {
    // Deploy IssuerStorage Smart Contract
    const IssuerStorage = await ethers.getContractFactory("IssuerStorage");
    const issuerStorage = await IssuerStorage.deploy();
    await issuerStorage.deployed();

    // Deploy AccreditationStorage Smart Contract
    const [owner, otherAddress, ...rest] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory(CONTRACT_NAME);
    const contract = await Contract.deploy(issuerStorage.address);
    await contract.deployed();

    // Create Issuer
    const _issuer = {
      name: "ABC Company",
      description: "It is a good company",
      logoUrl: "https://picsum.photos/200/300",
      issuerAddress: owner.address,
    };
    await issuerStorage.createIssuer(
      _issuer.issuerAddress,
      _issuer.name,
      _issuer.description,
      _issuer.logoUrl
    );

    // Create Accreditation
    const _accreditation = {
      newAccredId: 999, // Should be provided by AccreditationNFT
      issuer: owner.address,
      title: "HKDSE",
      createdAt: 888,
      duration: 1,
      nature: "Exam",
      description: "It is a tough exam.",
    };
    await contract.createAccreditation(
      _accreditation.newAccredId,
      _accreditation.issuer,
      _accreditation.title,
      _accreditation.createdAt,
      _accreditation.duration,
      _accreditation.nature,
      _accreditation.description
    );

    // Getting Accreditation by ID
    const accreditation = await contract.getAccreditationById(_accreditation.newAccredId);

    // Assertions
    expect(_accreditation.newAccredId).to.equal(accreditation.id);
    expect(_accreditation.issuer).to.equal(accreditation.issuer);
    expect(_accreditation.title).to.equal(accreditation.title);
    expect(_accreditation.createdAt).to.equal(accreditation.createdAt);
    expect(_accreditation.duration).to.equal(accreditation.duration);
    expect(_accreditation.nature).to.equal(accreditation.nature);
    expect(_accreditation.description).to.equal(accreditation.description);
  });
});
