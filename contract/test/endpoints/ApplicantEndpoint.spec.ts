import { expect } from "chai";
import { ethers } from "hardhat";

const CONTRACT_NAME = "ApplicantEndpoint";

describe(`Given ${CONTRACT_NAME}`, () => {
  it("Should store and retrieve applicant (registerApplicant, getApplicantByAddress)", async () => {
    const [owner, otherAddress, ...rest] = await ethers.getSigners();

    // Deploy ApplicantStorage
    const ApplicantStorage = await ethers.getContractFactory("ApplicantStorage");
    const applicantStorage = await ApplicantStorage.deploy();
    await applicantStorage.deployed();

    // Deploy ApplicantEndpoint
    const ApplicantEndpoint = await ethers.getContractFactory("ApplicantEndpoint");
    const applicantEndpoint = await ApplicantEndpoint.deploy(applicantStorage.address);
    await applicantEndpoint.deployed();

    await applicantStorage.setAddresses(applicantEndpoint.address, applicantEndpoint.address);

    // Create applicant
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
