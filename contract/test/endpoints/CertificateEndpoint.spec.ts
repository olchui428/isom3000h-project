import { expect } from "chai";
import { ethers } from "hardhat";

const CONTRACT_NAME = "CertificateEndpoint";

describe(`Given ${CONTRACT_NAME}`, () => {
  it("Testing issueCertificate error", () => {
    it("Should raise error if not using Applicant address", async () => {
      // TODO(Good to have): implement test
    });

    it("Should raise error if invalid params", async () => {
      // TODO(Good to have): implement test
    });
  });

  it("Testing getCertificateById error", () => {
    it("Should raise error if invalid params", async () => {
      // TODO(Good to have): implement test
    });
  });

  it("Testing getCertificatesByApplicantAddresses error", () => {
    it("Should raise error if invalid params", async () => {
      // TODO(Good to have): implement test
    });
  });

  it("Testing issueCertificate, getCertificateById, getCertificatesByApplicantAddresses, getCompleteCertById", () => {
    it("Should store Accreditations correctly", async () => {
      const [owner, otherAddress, ...rest] = await ethers.getSigners();
      const Contract = await ethers.getContractFactory(CONTRACT_NAME);
      const contract = await Contract.deploy();
      await contract.deployed();
      // TODO(Good to have): implement test
    });
  });
});
