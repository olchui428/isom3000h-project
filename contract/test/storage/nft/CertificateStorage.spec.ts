import { expect } from "chai";
import { ethers } from "hardhat";

const CONTRACT_NAME = "CertificateStorage";

describe(`Given ${CONTRACT_NAME}`, () => {
  it("Testing createCertificate error", () => {
    it("Should raise error if not from ApplicantNFT or ApplicantEndpoint address", async () => {
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

  it("Testing createCertificate, getCertificateById, getCertificatesByApplicantAddresses", () => {
    it("Should store Accreditations correctly", async () => {
      const [owner, otherAddress, ...rest] = await ethers.getSigners();
      
      // TODO(Good to have): implement test
    });
  });
});
