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

  it("Testing registerIssuer, getIssuerByAddress", () => {
    it("Should store Issuers correctly", async () => {
      const [owner, otherAddress, ...rest] = await ethers.getSigners();
      const Contract = await ethers.getContractFactory(CONTRACT_NAME);
      const contract = await Contract.deploy();
      await contract.deployed();
      // TODO(Good to have): implement test
    });
  });
});
