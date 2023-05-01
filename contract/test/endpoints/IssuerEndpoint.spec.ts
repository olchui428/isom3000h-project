import { expect } from "chai";
import { ethers } from "hardhat";

const CONTRACT_NAME = "IssuerEndpoint";

describe(`Given ${CONTRACT_NAME}`, () => {
  it("Testing registerIssuer error", () => {
    it("Should raise error if Issuer address already registered", async () => {
      // TODO(Good to have): implement test
    });

    it("Should raise error if invalid params", async () => {
      // TODO(Good to have): implement test
    });
  });

  it("Testing getIssuerByAddress error", () => {
    it("Should raise error if invalid params", async () => {
      // TODO(Good to have): implement test
    });
  });

  it("Should store and retrieve issuer (registerIssuer, getIssuerByAddress)", async () => {
    const [owner, otherAddress, ...rest] = await ethers.getSigners();

    // Deploy IssuerStorage
    const IssuerStorage = await ethers.getContractFactory("IssuerStorage");
    const issuerStorage = await IssuerStorage.deploy();
    await issuerStorage.deployed();

    // Deploy AccreditationStorage
    const AccreditationStorage = await ethers.getContractFactory("AccreditationStorage");
    const accreditationStorage = await AccreditationStorage.deploy(issuerStorage.address);
    await accreditationStorage.deployed();

    // Deploy IssuerEndpoint
    const IssuerEndpoint = await ethers.getContractFactory("IssuerEndpoint");
    const issuerEndpoint = await IssuerEndpoint.deploy(issuerStorage.address);
    await issuerEndpoint.deployed();

    // Create issuer
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

    // Getting issuer
    await issuerStorage.setAddresses(accreditationStorage.address, issuerEndpoint.address)
    const issuer = await issuerEndpoint.getIssuerByAddress(_issuer.issuerAddress);

    // Assertions
    expect(issuer.name).to.equal(_issuer.name);
    expect(issuer.description).to.equal(_issuer.description);
    expect(issuer.logoUrl).to.equal(_issuer.logoUrl);
    expect(issuer.issuerAddress).to.equal(_issuer.issuerAddress);
  });
});
