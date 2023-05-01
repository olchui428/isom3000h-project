import { expect } from "chai";
import { ethers } from "hardhat";

const CONTRACT_NAME = "ApplicantEndpoint";

describe.only(`Given ${CONTRACT_NAME}`, () => {
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

  it("Testing store and retrieve applicant (registerApplicant, getApplicantByAddress)", async () => {
    const [owner, otherAddress, ...rest] = await ethers.getSigners();

    // Deploy ApplicantStorage
    const ApplicantStorage = await ethers.getContractFactory("ApplicantStorage");
    const applicantStorage = await ApplicantStorage.deploy();
    await applicantStorage.deployed();

    // Deploy ApplicantEndpoint
    const ApplicantEndpoint = await ethers.getContractFactory("ApplicantEndpoint");
    const applicantEndpoint = await ApplicantEndpoint.deploy(applicantStorage.address);
    await applicantEndpoint.deployed();

    // Create applicant
    const _applicant = {
      name: "Owen Lee",
      applicantAddress: owner.address,
    };
    await applicantEndpoint.registerApplicant(_applicant.applicantAddress, _applicant.name);

    // Getting applicant
    await applicantStorage.setAddresses(applicantEndpoint.address)
    const applicant = await applicantEndpoint.getApplicantByAddress(_applicant.applicantAddress);

    // Assertions
    expect(applicant.name).to.equal(_applicant.name);
    expect(applicant.applicantAddress).to.equal(_applicant.applicantAddress);
  });
});
