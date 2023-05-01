import { expect } from "chai";
import { ethers } from "hardhat";

const CONTRACT_NAME = "IssuerStorage";

describe(`Given ${CONTRACT_NAME}`, async () => {
  it("Should test registerIssuer, getIssuerByAddress, isExistingIssuer", async () => {
    const [owner, otherAddress, ...rest] = await ethers.getSigners();

    // Deploy IssuerStorage Smart Contract
    const Contract = await ethers.getContractFactory(CONTRACT_NAME);
    const contract = await Contract.deploy();
    await contract.deployed();

    // Deploy AccreditationStorage Smart Contract
    const AccreditationStorage = await ethers.getContractFactory("AccreditationStorage");
    const accreditationStorage = await AccreditationStorage.deploy(contract.address);
    await accreditationStorage.deployed();

    // Deploy IssuerEndpoint Smart Contract
    const IssuerEndpoint = await ethers.getContractFactory("IssuerEndpoint");
    const issuerEndpoint = await IssuerEndpoint.deploy(contract.address);
    await issuerEndpoint.deployed();

    // Set Addresses
    await contract.setAddresses(accreditationStorage.address, issuerEndpoint.address);

    // Create issuer
    const _issuer = {
      name: "ABC Company",
      description: "It is a good company",
      logoUrl: "https://picsum.photos/200/300",
      issuerAddress: owner.address,
    };

    // Register issuer
    console.log("Using address ", _issuer.issuerAddress);
    await contract.createIssuer(
      _issuer.issuerAddress,
      _issuer.name,
      _issuer.description,
      _issuer.logoUrl
    );
    console.log("Registered issuer with ", _issuer);

    // Checking if issuer exists in Storage
    const exists = await contract.isIssuerExists(_issuer.issuerAddress);
    console.log("Checking if issuer exists: ", exists);

    // Getting issuer
    const issuer = await contract.connect(issuerEndpoint.address).getIssuerByAddress(_issuer.issuerAddress);
    console.log(`Get issuer by address (${_issuer.issuerAddress}): ${issuer}`);

    // Assertions
    expect(issuer.name).to.equal(_issuer.name);
    expect(issuer.description).to.equal(_issuer.description);
    expect(issuer.logoUrl).to.equal(_issuer.logoUrl);
    expect(issuer.issuerAddress).to.equal(_issuer.issuerAddress);
  });
});
