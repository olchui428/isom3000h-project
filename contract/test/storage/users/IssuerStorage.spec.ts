import { expect } from "chai";
import { ethers } from "hardhat";

const CONTRACT_NAME = "IssuerStorage";

describe.only(`Given ${CONTRACT_NAME}`, async () => {
  it("Should test registerIssuer, getIssuerByAddress, isExistingIssuer", async () => {
    // Deploy IssuerStorage Smart Contract
    const [owner, otherAddress, ...rest] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory(CONTRACT_NAME);
    const contract = await Contract.deploy();
    await contract.deployed();

    // Create issuer
    const _issuer = {
      name: "ABC Company",
      description: "It is a shitty company",
      logoUrl: "https://picsum.photos/200/300",
      issuerAddress: owner.address,
    };

    // Register issuer
    console.log("Using address ", _issuer.issuerAddress);
    await contract.registerIssuer(_issuer.name, _issuer.description, _issuer.logoUrl);
    console.log("Registered issuer with ", _issuer);

    // Checking if issuer exists in Storage
    const exists = await contract.isIssuerExists(_issuer.issuerAddress);
    console.log("Checking if issuer exists: ", exists);

    // Getting issuer
    const issuer = await contract.getIssuerByAddress(_issuer.issuerAddress);
    console.log(`Get issuer by address (${_issuer.issuerAddress}): ${issuer}`);

    // Assertions
    expect(issuer.name).to.equal(_issuer.name);
    expect(issuer.description).to.equal(_issuer.description);
    expect(issuer.logoUrl).to.equal(_issuer.logoUrl);
    expect(issuer.issuerAddress).to.equal(_issuer.issuerAddress);
  });
});
