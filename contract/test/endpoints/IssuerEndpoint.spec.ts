import { expect } from "chai";
import { ethers } from "hardhat";

const CONTRACT_NAME = "IssuerEndpoint";

describe(`Given ${CONTRACT_NAME}`, () => {
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
      issuerAddress: otherAddress.address,
    };

    await issuerStorage.setAddresses(
      accreditationStorage.address,
      issuerEndpoint.address,
      issuerEndpoint.address // should be certificate endpoint address but whatever
    );

    const tx = await issuerEndpoint
      .connect(otherAddress)
      .registerIssuer(_issuer.name, _issuer.description, _issuer.logoUrl);
    const receipt = await tx.wait();
    const abiData = receipt.logs[0].data;

    const decodedAbi = ethers.utils.defaultAbiCoder.decode(
      ["address", "string", "string", "string", "uint256"],
      abiData
    );

    expect(decodedAbi[0]).to.equal(_issuer.issuerAddress);
    expect(decodedAbi[1]).to.equal(_issuer.name);
    expect(decodedAbi[2]).to.equal(_issuer.description);
    expect(decodedAbi[3]).to.equal(_issuer.logoUrl);

    // Getting issuer
    const issuer = await issuerEndpoint.getIssuerByAddress(_issuer.issuerAddress);

    // Assertions
    expect(issuer.name).to.equal(_issuer.name);
    expect(issuer.description).to.equal(_issuer.description);
    expect(issuer.logoUrl).to.equal(_issuer.logoUrl);
    expect(issuer.issuerAddress).to.equal(_issuer.issuerAddress);
  });
});
