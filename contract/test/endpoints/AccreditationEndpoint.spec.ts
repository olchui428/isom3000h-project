import { expect } from "chai";
import { ethers } from "hardhat";

const CONTRACT_NAME = "AccreditationEndpoint";

describe(`Given ${CONTRACT_NAME}`, () => {
  it("Testing launchAccreditation error", () => {
    it("Should raise error if not using Issuer address", async () => {
      // TODO(Good to have): implement test
    });

    it("Should raise error if invalid params", async () => {
      // TODO(Good to have): implement test
    });
  });

  it("Testing getAccreditationById error", () => {
    it("Should raise error if invalid params", async () => {
      // TODO(Good to have): implement test
    });
  });

  it("Testing getAccreditationsByIssuerAddresses error", () => {
    it("Should raise error if invalid params", async () => {
      // TODO(Good to have): implement test
    });
  });

  it("Testing launchAccreditation, getAccreditationById, getAccreditationsByIssuerAddresses", () => {
    it("Should store Accreditations correctly", async () => {
      const [owner, otherAddress, ...rest] = await ethers.getSigners();
      const Contract = await ethers.getContractFactory(CONTRACT_NAME);
      const contract = await Contract.deploy();
      await contract.deployed();
      // TODO(Good to have): implement test
    });
  });
});
