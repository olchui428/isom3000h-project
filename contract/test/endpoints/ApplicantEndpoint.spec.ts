import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, utils } from "ethers";
import { deployTest } from "../deploy";

const CONTRACT_NAME = "ApplicantEndpoint";

describe(`Given ${CONTRACT_NAME}`, () => {
  it("Should store and retrieve applicant (registerApplicant, getApplicantByAddress)", async () => {
    // ========== Deploy ==========

    const [owner, otherAddress, ...rest] = await ethers.getSigners();
    const { issuerEndpoint, applicantEndpoint, accreditationEndpoint, certificateEndpoint } =
      await deployTest();

    // ========== Testing ==========

    // Testing variables
    const _applicant = {
      name: "Owen Lee",
      applicantAddress: otherAddress.address,
    };

    const tx = await applicantEndpoint.connect(otherAddress).registerApplicant(_applicant.name);
    await tx.wait();

    // Getting applicant
    const applicant = await applicantEndpoint.getApplicantByAddress(_applicant.applicantAddress);

    // Assertions
    expect(applicant.name).to.equal(_applicant.name);
    expect(applicant.applicantAddress).to.equal(_applicant.applicantAddress);
  });
});
