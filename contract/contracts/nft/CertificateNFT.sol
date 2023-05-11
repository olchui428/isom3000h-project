// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import { Accreditation } from "../types/nft/Accreditation.sol";
import { Certificate } from "../types/nft/Certificate.sol";
import { AccreditationStorage } from "../storage/nft/AccreditationStorage.sol";
import { CertificateStorage } from "../storage/nft/CertificateStorage.sol";

/// @title An NFT smart contract for issuing Certificates
/// This smart contract inherits ERC721 token and can issue Certificates in the form of NFTs
contract CertificateNFT is ERC721 {
    using Counters for Counters.Counter;
    // ========================= Variables =========================

    // -------------------- Contract addresses --------------------

    /// @dev Boolean flag to see if contracts have been fully deployed
    bool private _areAddressesFilled = false;

    /// @dev Wallet address of deployer, similar to admin address
    address payable private _deployerAddress;

    /// @dev Address of deployed CertificateStorage contract
    address private _certificateStorageAddress;

    // /// @dev Address of deployed ApplicantStorage contract
    // address private _applicantStorageAddress;

    /// @dev Address of deployed CertificateEndpoint contract
    address private _certificateEndpointAddress;

    // -------------------- Variables --------------------

    /// @dev Iterator to generate unique token IDs
    Counters.Counter private _tokenIds;

    // -------------------- Contracts --------------------

    // /// @dev Storage contract for Issuers
    // IssuerStorage issuerStorage;
    // /// @dev Storage contract for Applicants
    // ApplicantStorage applicantStorage;

    /// @dev Storage contract for Certificates
    CertificateStorage private _certificateStorage;

    // ========================= Functions & Modifiers =========================

    // -------------------- Setting up contracts --------------------

    /// @notice Deploys an NFT contract for Certificates
    // /// @param accreditationStorageAddress address of deployed AcccreditationStorage contract
    /// @param certificateStorageAddress address of deployed CertificateStorage contract
    constructor(
        // address accreditationStorageAddress,
        address certificateStorageAddress
    ) ERC721("CertificateNFT", "CERT") {
        // Store addresses
        _deployerAddress = payable(msg.sender);
        // _accreditationStorageAddress = accreditationStorageAddress;
        _certificateStorageAddress = certificateStorageAddress;

        // Create Contract variables
        // _accreditationStorage = AccreditationStorage(accreditationStorageAddress);
        _certificateStorage = CertificateStorage(certificateStorageAddress);
    }

    modifier onlyDeployer() {
        require(msg.sender == _deployerAddress);
        _;
    }
    modifier addressesHaveNotBeenInitialized() {
        require(!_areAddressesFilled);
        _;
    }

    function setAddresses(
        address certificateEndpointAddress
    ) external onlyDeployer addressesHaveNotBeenInitialized {
        _areAddressesFilled = true;
        _certificateEndpointAddress = certificateEndpointAddress;
    }

    // -------------------- Functions --------------------

    modifier validateCallFromEndpoint() {
        require(msg.sender == _certificateEndpointAddress);
        _;
    }

    /// @notice Mints an new NFT as a certificate, stores Certificate data
    /// @dev Mints a new NFT, then calls CertificateStorage to store data
    function issueCertificate(
        address payable issuerAddress,
        address payable applicantAddress,
        uint256 createdAt,
        uint256 accreditationId,
        string memory level,
        string memory eventId,
        string memory remarks
    ) external validateCallFromEndpoint returns (uint256) {
        uint256 newCertId = _tokenIds.current();

        _certificateStorage.createCertificate(
            newCertId,
            issuerAddress,
            applicantAddress,
            createdAt,
            accreditationId,
            level,
            eventId,
            remarks
        );

        _safeMint(applicantAddress, newCertId);

        _tokenIds.increment();

        return newCertId;
    }

    function isCertificateValid(uint256 id) external view validateCallFromEndpoint returns (bool) {
        return
            _exists(id) &&
            _certificateStorage.isCertificateExists(id) &&
            ownerOf(id) == _certificateStorage.getCertificateById(id).applicant &&
            !_certificateStorage.getCertificateById(id).isRevoked;
    }

    // // TODO(Good to have): add validation before burning
    // modifier validateBurn() {
    //     _;
    // }

    // function _burnCert(uint256 certId) internal returns (bool) {
    //     // TODO(Good to have): delete Cert entry from mapping
    //     _burn(certId);
    // }
}