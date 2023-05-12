import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, utils } from "ethers";
import { deployContract, deployTest, setContractAddresses } from "../../deploy";

const CONTRACT_NAME = "IssuerStorage";

describe(`Given ${CONTRACT_NAME}`, async () => {
  it("Should raise error if not called by IssuerEndpoint (createIssuer)", async () => {
    // ========== Deploy ==========

    const [owner, otherAddress, ...rest] = await ethers.getSigners();
    const {
      issuerEndpoint,
      issuerStorage,
      applicantEndpoint,
      accreditationEndpoint,
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

    // Register issuer
    await expect(
      issuerStorage.createIssuer(
        _issuer.issuerAddress,
        _issuer.name,
        _issuer.description,
        _issuer.logoUrl
      )
    ).to.be.revertedWith("Call is not initiated from Endpoint.");
  });

  it("Should raise error if not new issuer (createIssuer)", async () => {
    // ========== Deploy ==========

    const [owner, otherAddress, ...rest] = await ethers.getSigners();
    const {
      issuerEndpoint,
      issuerStorage,
      applicantEndpoint,
      accreditationEndpoint,
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

    // Register issuer
    const txIssuer = await issuerEndpoint.registerIssuer(
      _issuer.name,
      _issuer.description,
      _issuer.logoUrl
    );
    txIssuer.wait();

    await expect(
      issuerEndpoint.registerIssuer(_issuer.name, _issuer.description, _issuer.logoUrl)
    ).to.be.revertedWith("This address has already been registered as an Issuer.");
  });

  it("Should raise error if not called by Endpoints (getIssuerByAddress)", async () => {
    // ========== Deploy ==========

    const [owner, otherAddress, ...rest] = await ethers.getSigners();
    const {
      issuerEndpoint,
      issuerStorage,
      applicantEndpoint,
      accreditationEndpoint,
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

    // Register issuer
    const txIssuer = await issuerEndpoint.registerIssuer(
      _issuer.name,
      _issuer.description,
      _issuer.logoUrl
    );
    txIssuer.wait();

    await expect(issuerStorage.getIssuerByAddress(_issuer.issuerAddress)).to.be.revertedWith(
      "Call is not initiated from Endpoint."
    );
  });

  it("Should raise error if not called by Storage (isIssuerExists)", async () => {
    // ========== Deploy ==========

    const [owner, otherAddress, ...rest] = await ethers.getSigners();
    const {
      issuerEndpoint,
      issuerStorage,
      applicantEndpoint,
      accreditationEndpoint,
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

    // Register issuer
    const txIssuer = await issuerEndpoint.registerIssuer(
      _issuer.name,
      _issuer.description,
      _issuer.logoUrl
    );
    txIssuer.wait();

    await expect(issuerStorage.isIssuerExists(_issuer.issuerAddress)).to.be.revertedWith(
      "Unauthorized function call."
    );
  });
});
