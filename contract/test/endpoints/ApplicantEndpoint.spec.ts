import { expect } from "chai";
import { ethers } from "hardhat";

const CONTRACT_NAME = "ApplicantEndpoint";

describe(`Given ${CONTRACT_NAME}`, () => {
  it("Testing registerApplicant error", () => {
    it("Should raise error if Applicant address already registered", async () => {
      // TODO(Good to have): implement test
    });

    it("Should raise error if invalid params", async () => {
      // TODO(Good to have): implement test
    });
  });

  it("Testing getApplicantByAddress error", () => {
    it("Should raise error if invalid params", async () => {
      // TODO(Good to have): implement test
    });
  });

  it("Testing registerApplicant, getApplicantByAddress", () => {
    it("Should store Applicants correctly", async () => {
      const [owner, otherAddress, ...rest] = await ethers.getSigners();
      const Contract = await ethers.getContractFactory(CONTRACT_NAME);
      const contract = await Contract.deploy();
      await contract.deployed();
      // TODO(Good to have): implement test
    });
  });
});
