// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { Certificate } from "../../types/nft/Certificate.sol";
import { ApplicantStorage } from "../users/ApplicantStorage.sol";

contract CertificateStorage {
    // ========================= Variables =========================

    // -------------------- Contract addresses --------------------

    /// @dev Boolean flag to see if contracts have been fully deployed
    bool private _areAddressesFilled = false;

    /// @dev Wallet address of deployer, similar to admin address
    address payable private _deployerAddress;

    /// @dev Address of deployed ApplicantStorage contract
    address private _applicantStorageAddress;

    // -------------------- Variables --------------------

    /// @dev Get Certificate by its NFT Token ID
    mapping(uint256 => Certificate) private _certificates;

    /// @dev Get Certificate[] by Applicant address
    mapping(address => Certificate[]) private _certsByApplicant;

    /// @dev Get Certificate[] by Accreditation ID
    mapping(uint256 => Certificate[]) private _certsByAccred;

    // -------------------- Contracts --------------------

    // /// @dev Storage contract for Issuers
    // IssuerStorage issuerStorage;

    /// @dev Storage contract for Applicants
    ApplicantStorage private _applicantStorage;

    // TODO(MVP): add Contracts

    // ========================= Functions & Modifiers =========================

    // -------------------- Setting up contracts --------------------

    /// @notice Deploys a storage contract for Certificate
    /// @param applicantStorageAddress address of deployed ApplicantStorage contract
    constructor(address applicantStorageAddress) {
        // Store addresses
        _deployerAddress = payable(msg.sender);
        _applicantStorageAddress = applicantStorageAddress;

        // Create Contract variables
        _applicantStorage = ApplicantStorage(applicantStorageAddress);
    }

    modifier onlyDeployer() {
        require(msg.sender == _deployerAddress);
        _;
    }
    modifier addressesHaveNotBeenInitialized() {
        require(!_areAddressesFilled);
        _;
    }

    function setAddresses() external onlyDeployer addressesHaveNotBeenInitialized {
        _areAddressesFilled = true;
        // TODO(MVP): add required addresses
    }

    // -------------------- Functions --------------------

    // TODO(MVP): createCertificate modifier

    function createCertificate(
        uint256 newCertId,
        address payable issuerAddress,
        address payable applicantAddress,
        uint256 createdAt,
        uint256 accreditationId,
        string memory level,
        string memory eventId,
        string memory remarks
    ) external returns (bool) {
        Certificate memory certificate = Certificate(
            newCertId,
            issuerAddress,
            applicantAddress,
            createdAt,
            accreditationId,
            level,
            eventId,
            remarks,
            false,
            "",
            0
        );
        _certificates[newCertId] = certificate;
        _certsByApplicant[applicantAddress].push(certificate);
        _certsByAccred[accreditationId].push(certificate);
        return true;
    }

    // TODO(MVP): getCertificateById modifier

    function getCertificateById(uint256 id) external view returns (Certificate memory) {
        return _certificates[id];
    }

    // TODO(MVP): getCertificatesByApplicantAddress modifier

    function getCertificatesByApplicantAddress(
        address payable inputAddress
    ) external view returns (Certificate[] memory) {
        return _certsByApplicant[inputAddress];
    }

    // TODO(MVP): add CRUD functions

    // Should only be created when minting NFT
    // Individual Certificate can be accessed by everyone
    // Array view requires privilege

    // Map Certificate[] to Issuer address[]
    // Map Certificate[] to Applicant address[]
}
