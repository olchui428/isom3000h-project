import { expect } from "chai";
import { ethers, network } from "hardhat";
import { Contract, utils } from "ethers";
import { deployTest } from "../deploy";

const CONTRACT_NAME = "CertificateEndpoint";

describe(`Given ${CONTRACT_NAME}`, () => {
  it("Should raise error if not using Issuer address (issueCertificate)", async () => {
    // ========== Deploy ==========

    const [owner, applicantAcct, ...rest] = await ethers.getSigners();
    const { issuerEndpoint, applicantEndpoint, accreditationEndpoint, certificateEndpoint } =
      await deployTest();

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
    const _accreditation = {
      issuer: owner.address,
      title: "HKDSE",
      createdAt: 888,
      duration: 1,
      nature: "Exam",
      description: "It is a tough exam.",
    };
    const _certificate = {
      issuerAddress: _issuer.issuerAddress,
      applicantAddress: _applicant.applicantAddress,
      createdAt: 888,
      accreditationId: 0,
      level: "5**",
      eventId: "777",
      remarks: "Good",
    };

    // Register Issuer
    const txIssuer = await issuerEndpoint.registerIssuer(
      _issuer.name,
      _issuer.description,
      _issuer.logoUrl
    );
    txIssuer.wait();

    // Register applicant
    const txApplicant = await applicantEndpoint
      .connect(applicantAcct)
      .registerApplicant(_applicant.name);
    txApplicant.wait();

    // Launch Accreditation
    const txAccred = await accreditationEndpoint.launchAccreditation(
      _accreditation.title,
      _accreditation.createdAt,
      _accreditation.duration,
      _accreditation.nature,
      _accreditation.description
    );
    txAccred.wait();

    // Assertions: Issue Certificate
    await expect(
      certificateEndpoint
        .connect(applicantAcct)
        .issueCertificate(
          _certificate.applicantAddress,
          _certificate.createdAt,
          _certificate.accreditationId,
          _certificate.level,
          _certificate.eventId,
          _certificate.remarks
        )
    ).to.revertedWith("Provided Issuer address is not a registered Issuer.");
  });

  it("Should raise error if get by invalid certificate id (getCertificateById)", async () => {
    // ========== Deploy ==========

    const [owner, applicantAcct, ...rest] = await ethers.getSigners();
    const { issuerEndpoint, applicantEndpoint, accreditationEndpoint, certificateEndpoint } =
      await deployTest();

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
    const _accreditation = {
      issuer: owner.address,
      title: "HKDSE",
      createdAt: 888,
      duration: 1,
      nature: "Exam",
      description: "It is a tough exam.",
    };
    const _certificate = {
      issuerAddress: _issuer.issuerAddress,
      applicantAddress: _applicant.applicantAddress,
      createdAt: 888,
      accreditationId: 0,
      level: "5**",
      eventId: "777",
      remarks: "Good",
    };

    // Register Issuer
    const txIssuer = await issuerEndpoint.registerIssuer(
      _issuer.name,
      _issuer.description,
      _issuer.logoUrl
    );
    txIssuer.wait();

    // Register applicant
    const txApplicant = await applicantEndpoint
      .connect(applicantAcct)
      .registerApplicant(_applicant.name);
    txApplicant.wait();

    // Launch Accreditation
    const txAccred = await accreditationEndpoint.launchAccreditation(
      _accreditation.title,
      _accreditation.createdAt,
      _accreditation.duration,
      _accreditation.nature,
      _accreditation.description
    );
    txAccred.wait();

    // Issue Certificate
    const txCert = await certificateEndpoint.issueCertificate(
      _certificate.applicantAddress,
      _certificate.createdAt,
      _certificate.accreditationId,
      _certificate.level,
      _certificate.eventId,
      _certificate.remarks
    );
    const receipt = await txCert.wait();
    const data = receipt.logs[1].data;
    const decodedAbi = utils.defaultAbiCoder.decode(
      ["uint256", "uint256", "address", "address", "uint256", "string", "string", "string"],
      data
    );
    const [
      id,
      accreditationId,
      applicantAddress,
      issuerAddress,
      createdAt,
      level,
      eventId,
      remarks,
    ] = decodedAbi;

    // Assertions: Get Certificate by ID
    await expect(certificateEndpoint.getCertificateById(id + 1)).to.revertedWith(
      "Certificate with provided ID does not exist."
    );
  });

  it("Should raise error if get by invalid applicant address (getCertificatesByApplicantAddress)", async () => {
    // ========== Deploy ==========

    const [owner, applicantAcct, ...rest] = await ethers.getSigners();
    const { issuerEndpoint, applicantEndpoint, accreditationEndpoint, certificateEndpoint } =
      await deployTest();

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
    const _accreditation = {
      issuer: owner.address,
      title: "HKDSE",
      createdAt: 888,
      duration: 1,
      nature: "Exam",
      description: "It is a tough exam.",
    };
    const _certificate = {
      issuerAddress: _issuer.issuerAddress,
      applicantAddress: _applicant.applicantAddress,
      createdAt: 888,
      accreditationId: 0,
      level: "5**",
      eventId: "777",
      remarks: "Good",
    };

    // Register Issuer
    const txIssuer = await issuerEndpoint.registerIssuer(
      _issuer.name,
      _issuer.description,
      _issuer.logoUrl
    );
    txIssuer.wait();

    // Register applicant
    const txApplicant = await applicantEndpoint
      .connect(applicantAcct)
      .registerApplicant(_applicant.name);
    txApplicant.wait();

    // Launch Accreditation
    const txAccred = await accreditationEndpoint.launchAccreditation(
      _accreditation.title,
      _accreditation.createdAt,
      _accreditation.duration,
      _accreditation.nature,
      _accreditation.description
    );
    txAccred.wait();

    // Issue Certificate
    const txCert = await certificateEndpoint.issueCertificate(
      _certificate.applicantAddress,
      _certificate.createdAt,
      _certificate.accreditationId,
      _certificate.level,
      _certificate.eventId,
      _certificate.remarks
    );
    const receipt = await txCert.wait();
    const data = receipt.logs[1].data;
    const decodedAbi = utils.defaultAbiCoder.decode(
      ["uint256", "uint256", "address", "address", "uint256", "string", "string", "string"],
      data
    );
    const [
      id,
      accreditationId,
      applicantAddress,
      issuerAddress,
      createdAt,
      level,
      eventId,
      remarks,
    ] = decodedAbi;

    // Assertions: Get Certificate by ID
    await expect(
      certificateEndpoint.getCertificatesByApplicantAddress(_issuer.issuerAddress)
    ).to.revertedWith("Input Applicant address is not a registered Applicant.");
  });

  it("Should store Certificates correctly (issueCertificate, getCertificateById, getCertificatesByApplicantAddress, getCompleteCertById)", async () => {
    // ========== Deploy ==========

    const [owner, applicantAcct, ...rest] = await ethers.getSigners();
    const { issuerEndpoint, applicantEndpoint, accreditationEndpoint, certificateEndpoint } =
      await deployTest();

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
    const _accreditation = {
      issuer: owner.address,
      title: "HKDSE",
      createdAt: 888,
      duration: 1,
      nature: "Exam",
      description: "It is a tough exam.",
    };
    const _certificate = {
      issuerAddress: _issuer.issuerAddress,
      applicantAddress: _applicant.applicantAddress,
      createdAt: 888,
      accreditationId: 0,
      level: "5**",
      eventId: "777",
      remarks: "Good",
    };

    // Register Issuer
    const txIssuer = await issuerEndpoint.registerIssuer(
      _issuer.name,
      _issuer.description,
      _issuer.logoUrl
    );
    txIssuer.wait();

    // Register applicant
    const txApplicant = await applicantEndpoint
      .connect(applicantAcct)
      .registerApplicant(_applicant.name);
    txApplicant.wait();

    // Launch Accreditation
    const txAccred = await accreditationEndpoint.launchAccreditation(
      _accreditation.title,
      _accreditation.createdAt,
      _accreditation.duration,
      _accreditation.nature,
      _accreditation.description
    );
    txAccred.wait();

    // Issue Certificate
    const txCert = await certificateEndpoint.issueCertificate(
      _certificate.applicantAddress,
      _certificate.createdAt,
      _certificate.accreditationId,
      _certificate.level,
      _certificate.eventId,
      _certificate.remarks
    );
    const receipt = await txCert.wait();
    const data = receipt.logs[1].data;
    const decodedAbi = utils.defaultAbiCoder.decode(
      ["uint256", "uint256", "address", "address", "uint256", "string", "string", "string"],
      data
    );
    const [
      id,
      accreditationId,
      applicantAddress,
      issuerAddress,
      createdAt,
      level,
      eventId,
      remarks,
    ] = decodedAbi;

    // Get Certificate by ID
    const certificate = await certificateEndpoint.getCertificateById(id);

    // Assertions
    expect(certificate.issuer).to.equal(_certificate.issuerAddress);
    expect(certificate.applicant).to.equal(_certificate.applicantAddress);
    expect(certificate.createdAt).to.equal(_certificate.createdAt);
    expect(certificate.accreditationId).to.equal(_certificate.accreditationId);
    expect(certificate.level).to.equal(_certificate.level);
    expect(certificate.eventId).to.equal(_certificate.eventId);
    expect(certificate.remarks).to.equal(_certificate.remarks);

    // Get Certificates by Applicant address
    const certificates = await certificateEndpoint.getCertificatesByApplicantAddress(
      _applicant.applicantAddress
    );

    // Assertions
    expect(certificates.length).to.equal(1);
    const [cert] = certificates;
    expect(cert.issuer).to.equal(_certificate.issuerAddress);
    expect(cert.applicant).to.equal(_certificate.applicantAddress);
    expect(cert.createdAt).to.equal(_certificate.createdAt);
    expect(cert.accreditationId).to.equal(_certificate.accreditationId);
    expect(cert.level).to.equal(_certificate.level);
    expect(cert.eventId).to.equal(_certificate.eventId);
    expect(cert.remarks).to.equal(_certificate.remarks);

    // Get CompleteCert by ID
    const completeCert = await certificateEndpoint.getCompleteCertById(id);

    // Assertions
    expect(completeCert.issuer.name).to.equal(_issuer.name);
    expect(completeCert.issuer.issuerAddress).to.equal(_issuer.issuerAddress);
    expect(completeCert.applicant.name).to.equal(_applicant.name);
    expect(completeCert.applicant.applicantAddress).to.equal(_applicant.applicantAddress);
    expect(completeCert.accreditation.title).to.equal(_accreditation.title);
    expect(completeCert.accreditation.description).to.equal(_accreditation.description);
    expect(completeCert.certificate.accreditationId).to.equal(_certificate.accreditationId);
    expect(completeCert.certificate.eventId).to.equal(_certificate.eventId);
  });
});
