import { expect } from "chai";
import { ethers } from "hardhat";

const CONTRACT_NAME = "AccreditationEndpoint";

describe(`Given ${CONTRACT_NAME}`, () => {
  it("Testing launchAccreditation", () => {
    it("Should raise error if not using Issuer address", async () => {
      // TODO
    });

    it("Should raise error if invalid params", async () => {
      // TODO
    });

    it("Should launch if using Issuer address and valid params", async () => {
      // TODO
    });
  });

  it("Testing getAccreditationById", () => {
    it("Should raise error if invalid params", async () => {
      // TODO
    });

    it("Should get Accreditation if valid params", async () => {
      // TODO
      const [owner, otherAddress, ...rest] = await ethers.getSigners();
      const Contract = await ethers.getContractFactory(CONTRACT_NAME);
      const contract = await Contract.deploy("", "");
      await contract.deployed();

      const accreditation = contract.getAccreditationById(0);
      // expect(accreditation).to.be.equal(null);
    });
  });

  it("Testing getAccreditationsByAddresses", () => {
    it("Should raise error if invalid params", async () => {
      // TODO
    });

    it("Should get Accreditations if valid params", async () => {
      // TODO
    });
  });
});
