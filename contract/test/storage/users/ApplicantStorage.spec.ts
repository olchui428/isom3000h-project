import { expect } from "chai";
import { ethers } from "hardhat";

const CONTRACT_NAME = "ApplicantStorage";

describe(`Given ${CONTRACT_NAME}`, () => {
  it("Should test registerApplicant, isApplicantExists, getApplicantByAddress", async () => {
    const [owner, otherAddress, ...rest] = await ethers.getSigners();
    
    // Deploy ApplicantStorage Smart Contract
    const Contract = await ethers.getContractFactory(CONTRACT_NAME);
    const contract = await Contract.deploy();
    await contract.deployed();

    // Deploy ApplicantEndpoint Smart Contract
    const ApplicantEndpoint = await ethers.getContractFactory("ApplicantEndpoint");
    const applicantEndpoint = await ApplicantEndpoint.deploy(contract.address);
    await applicantEndpoint.deployed();

    // Set Addresses
    await contract.setAddresses(applicantEndpoint.address)

    // Create applicant
    const _applicant = {
      name: "Owen Lee",
      applicantAddress: owner.address,
    };

    // Register applicant
    console.log("Using address ", _applicant.applicantAddress);
    await contract.createApplicant(_applicant.applicantAddress, _applicant.name);
    console.log("Registered applicant with ", _applicant);

    // Checking if applicant exists in Storage
    const exists = await contract.isApplicantExists(_applicant.applicantAddress);
    console.log("Checking if applicant exists: ", exists);

    // Getting applicant
    const applicant = await contract.connect(applicantEndpoint.address).getApplicantByAddress(_applicant.applicantAddress);
    console.log(`Get applicant by address (${_applicant.applicantAddress}): ${applicant}`);

    // Assertions
    expect(applicant.name).to.equal(_applicant.name);
    expect(applicant.applicantAddress).to.equal(_applicant.applicantAddress);
  });
});
