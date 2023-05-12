import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, utils } from "ethers";
import { deployTest } from "../deploy";

const CONTRACT_NAME = "IssuerEndpoint";

describe(`Given ${CONTRACT_NAME}`, () => {
  it("Should store and retrieve issuer (registerIssuer, getIssuerByAddress)", async () => {
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

    const tx = await issuerEndpoint
      .connect(owner)
      .registerIssuer(_issuer.name, _issuer.description, _issuer.logoUrl);
    const receipt = await tx.wait();
    const [issuerAddress, name, description, logoUrl] = utils.defaultAbiCoder.decode(
      ["address", "string", "string", "string", "uint256"],
      receipt.logs[0].data
    );
    
    // Assertions
    expect(issuerAddress).to.equal(_issuer.issuerAddress);
    expect(name).to.equal(_issuer.name);
    expect(description).to.equal(_issuer.description);
    expect(logoUrl).to.equal(_issuer.logoUrl);

    // Getting issuer
    const issuer = await issuerEndpoint.getIssuerByAddress(_issuer.issuerAddress);

    // Assertions
    expect(issuer.name).to.equal(_issuer.name);
    expect(issuer.description).to.equal(_issuer.description);
    expect(issuer.logoUrl).to.equal(_issuer.logoUrl);
    expect(issuer.issuerAddress).to.equal(_issuer.issuerAddress);
  });
});
