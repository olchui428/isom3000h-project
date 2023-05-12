import { expect } from "chai";
import { ethers } from "hardhat";
import { deployContract, deployTest, setContractAddresses } from "../../deploy";

const CONTRACT_NAME = "ApplicantStorage";

describe(`Given ${CONTRACT_NAME}`, () => {
  it("Should raise error if not called by ApplicantEndpoint (createApplicant)", async () => {
    // ========== Deploy ==========

    const [owner, applicantAcct, ...rest] = await ethers.getSigners();
    const {
      issuerEndpoint,
      issuerStorage,
      applicantStorage,
      applicantEndpoint,
      accreditationEndpoint,
      certificateEndpoint,
    } = await deployTest();

    // ========== Testing ==========

    // Testing variables
    const _issuer = {
      name: "ABC Company",
      description: "It is a good company",
      logoUrl: "https://picsum.photos/200/300",
      issuerAddress: owner.address,
    };
    const _applicant = {
      name: "Owen Lee",
      applicantAddress: applicantAcct.address,
    };

    // Register applicant
    await expect(
      applicantStorage.createApplicant(_applicant.applicantAddress, _applicant.name)
    ).to.be.revertedWith("Call is not initiated from Endpoint.");
  });

  it("Should raise error if not new applicant (createApplicant)", async () => {
    // ========== Deploy ==========

    const [owner, applicantAcct, ...rest] = await ethers.getSigners();
    const {
      issuerEndpoint,
      issuerStorage,
      applicantStorage,
      applicantEndpoint,
      accreditationEndpoint,
      certificateEndpoint,
    } = await deployTest();

    // ========== Testing ==========

    // Testing variables
    const _issuer = {
      name: "ABC Company",
      description: "It is a good company",
      logoUrl: "https://picsum.photos/200/300",
      issuerAddress: owner.address,
    };
    const _applicant = {
      name: "Owen Lee",
      applicantAddress: applicantAcct.address,
    };

    // Register applicant
    await applicantEndpoint.connect(applicantAcct).registerApplicant(_applicant.name);

    await expect(
      applicantEndpoint.connect(applicantAcct).registerApplicant(_applicant.name)
    ).to.be.revertedWith("This address has already been registered as an Applicant.");
  });

  it("Should raise error if not called by Endpoints (getApplicantByAddress)", async () => {
    // ========== Deploy ==========

    const [owner, applicantAcct, ...rest] = await ethers.getSigners();
    const {
      issuerEndpoint,
      issuerStorage,
      applicantStorage,
      applicantEndpoint,
      accreditationEndpoint,
      certificateEndpoint,
    } = await deployTest();

    // ========== Testing ==========

    // Testing variables
    const _issuer = {
      name: "ABC Company",
      description: "It is a good company",
      logoUrl: "https://picsum.photos/200/300",
      issuerAddress: owner.address,
    };
    const _applicant = {
      name: "Owen Lee",
      applicantAddress: applicantAcct.address,
    };

    // Register applicant
    await applicantEndpoint.connect(applicantAcct).registerApplicant(_applicant.name);

    await expect(
      applicantStorage.getApplicantByAddress(_applicant.applicantAddress)
    ).to.be.revertedWith("Call is not initiated from Endpoint.");
  });

  it("Should raise error if not called by Storage (isApplicantExists)", async () => {
    // ========== Deploy ==========

    const [owner, applicantAcct, ...rest] = await ethers.getSigners();
    const {
      issuerEndpoint,
      issuerStorage,
      applicantStorage,
      applicantEndpoint,
      accreditationEndpoint,
      certificateEndpoint,
    } = await deployTest();

    // ========== Testing ==========

    // Testing variables
    const _issuer = {
      name: "ABC Company",
      description: "It is a good company",
      logoUrl: "https://picsum.photos/200/300",
      issuerAddress: owner.address,
    };
    const _applicant = {
      name: "Owen Lee",
      applicantAddress: applicantAcct.address,
    };

    // Register applicant
    await applicantEndpoint.connect(applicantAcct).registerApplicant(_applicant.name);

    await expect(
      applicantStorage.isApplicantExists(_applicant.applicantAddress)
    ).to.be.revertedWith("Unauthorized function call.");
  });
});
