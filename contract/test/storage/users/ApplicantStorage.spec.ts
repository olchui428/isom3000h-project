import { expect } from "chai";
import { ethers } from "hardhat";

const CONTRACT_NAME = "ApplicantStorage";

describe.only(`Given ${CONTRACT_NAME}`, () => {
  it("Should test registerApplicant, isApplicantExists, getApplicantByAddress", async () => {
    // Deploy ApplicantStorage Smart Contract
    const [owner, otherAddress, ...rest] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory(CONTRACT_NAME);
    const contract = await Contract.deploy();
    await contract.deployed();

    // Create applicant
    const _applicant = {
      name: "Owen Lee",
      applicantAddress: owner.address,
    };

    // Register applicant
    console.log("Using address ", _applicant.applicantAddress);
    await contract.registerApplicant(_applicant.name);
    console.log("Registered applicant with ", _applicant);

    // Checking if applicant exists in Storage
    const exists = await contract.isApplicantExists(_applicant.applicantAddress);
    console.log("Checking if applicant exists: ", exists);

    // Getting applicant
    const applicant = await contract.getApplicantByAddress(_applicant.applicantAddress);
    console.log(`Get applicant by address (${_applicant.applicantAddress}): ${applicant}`);

    // Assertions
    expect(applicant.name).to.equal(_applicant.name);
    expect(applicant.applicantAddress).to.equal(_applicant.applicantAddress);
  });
});
