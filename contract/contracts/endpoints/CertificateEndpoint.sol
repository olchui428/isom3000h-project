// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { Issuer } from "../types/users/Issuer.sol";
import { Applicant } from "../types/users/Applicant.sol";
import { Accreditation } from "../types/nft/Accreditation.sol";
import { Certificate } from "../types/nft/Certificate.sol";
import { CompleteCert } from "../types/CompleteCert.sol";
import { IssuerStorage } from "../storage/users/IssuerStorage.sol";
import { ApplicantStorage } from "../storage/users/ApplicantStorage.sol";
import { AccreditationStorage } from "../storage/nft/AccreditationStorage.sol";
import { CertificateStorage } from "../storage/nft/CertificateStorage.sol";
import { CertificateNFT } from "../nft/CertificateNFT.sol";

contract CertificateEndpoint {
    // ========================= Variables =========================

    // -------------------- Contract addresses --------------------

    /// @dev Wallet address of deployer, similar to admin address
    address payable private _deployerAddress;

    /// @dev Address of deployed IssuerStorage contract
    address private _issuerStorageAddress;

    /// @dev Address of deployed ApplicantStorage contract
    address private _applicantStorageAddress;

    /// @dev Address of deployed AccreditationStorage contract
    address private _accreditationStorageAddress;

    /// @dev Address of deployed CertificateStorage contract
    address private _certificateStorageAddress;

    /// @dev Address of deployed CertificateNFT contract
    address private _certificateNFTAddress;

    // -------------------- Variables --------------------

    // -------------------- Contracts --------------------

    /// @dev Storage contract for Issuers
    IssuerStorage private _issuerStorage;

    /// @dev Storage contract for Applicants
    ApplicantStorage private _applicantStorage;

    /// @dev Storage contract for Accreditations
    AccreditationStorage private _accreditationStorage;

    /// @dev Storage contract for Certificates
    CertificateStorage private _certificateStorage;

    /// @dev NFT contract for Certificates
    CertificateNFT private _certificateNFT;

    // TODO(MVP): add Contracts

    // ========================= Functions & Modifiers =========================

    // -------------------- Setting up contracts --------------------

    /// @notice Deploys a storage contract for Accreditation
    /// @param issuerStorageAddress address of deployed IssuerStorage contract
    /// @param applicantStorageAddress address of deployed ApplicantStorage contract
    /// @param accreditationStorageAddress address of deployed AcccreditationStorage contract
    /// @param certificateStorageAddress address of deployed CertificateStorage contract
    /// @param certificateNFTAddress address of deployed CertificateNFT contract
    constructor(
        address issuerStorageAddress,
        address applicantStorageAddress,
        address accreditationStorageAddress,
        address certificateStorageAddress,
        address certificateNFTAddress
    ) {
        // Store addresses
        _deployerAddress = payable(msg.sender);
        _issuerStorageAddress = issuerStorageAddress;
        _applicantStorageAddress = applicantStorageAddress;
        _accreditationStorageAddress = accreditationStorageAddress;
        _certificateStorageAddress = certificateStorageAddress;
        _certificateNFTAddress = certificateNFTAddress;

        // Create Contract variables
        _issuerStorage = IssuerStorage(issuerStorageAddress);
        _applicantStorage = ApplicantStorage(applicantStorageAddress);
        _accreditationStorage = AccreditationStorage(accreditationStorageAddress);
        _certificateStorage = CertificateStorage(certificateStorageAddress);
        _certificateNFT = CertificateNFT(certificateNFTAddress);
    }

    // -------------------- Functions --------------------

    // TODO(MVP): issueCertificate modifier

    function issueCertificate(address payable applicantAddress) external returns (uint256) {
        return _certificateNFT.issueCertificate(applicantAddress);
    }

    // TODO(MVP): getCertificateById modifier

    function getCertificateById(uint256 id) external view returns (Certificate memory) {
        return _certificateStorage.getCertificateById(id);
    }

    // TODO(Good to have): getCertificatesByApplicantAddress & modifier

    function getCompleteCertById(uint256 id) external view returns (CompleteCert memory) {
        Certificate memory certificate = _certificateStorage.getCertificateById(id);
        Accreditation memory accreditation = _accreditationStorage.getAccreditationById(
            certificate.id
        );
        Applicant memory applicant = _applicantStorage.getApplicantByAddress(certificate.applicant);
        Issuer memory issuer = _issuerStorage.getIssuerByAddress(certificate.issuer);
        return CompleteCert(issuer, applicant, accreditation, certificate);
    }

    // TODO(Good to have): add endpoint functions
}
