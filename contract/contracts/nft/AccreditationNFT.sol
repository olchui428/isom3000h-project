// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import { Accreditation } from "../types/nft/Accreditation.sol";
import { Certificate } from "../types/nft/Certificate.sol";
import { AccreditationStorage } from "../storage/nft/AccreditationStorage.sol";
import { CertificateStorage } from "../storage/nft/CertificateStorage.sol";

/// @title An NFT smart contract for defining and announcing Accreditations
/// This smart contract inherits ERC721 token and can launch Accreditations in the form of NFTs
contract AccreditationNFT is ERC721 {
    using Counters for Counters.Counter;
    // ========================= Variables =========================

    // -------------------- Contract addresses --------------------

    /// @dev Boolean flag to see if contracts have been fully deployed
    bool private _areAddressesFilled = false;

    /// @dev Wallet address of deployer, similar to admin address
    address payable private _deployerAddress;

    // /// @dev Address of deployed ApplicantStorage contract
    // address private _applicantStorageAddress;

    /// @dev Address of deployed AccreditationStorage contract
    address private _accreditationStorageAddress;

    /// @dev Address of deployed AccreditationEndpoint contract
    address private _accreditationEndpointAddress;

    // -------------------- Variables --------------------

    /// @dev Iterator to generate unique token IDs
    Counters.Counter private _tokenIds;

    // -------------------- Contracts --------------------

    /// @dev Storage contract for Accreditations
    AccreditationStorage private _accreditationStorage;

    // ========================= Functions & Modifiers =========================

    // -------------------- Setting up contracts --------------------

    /// @notice Deploys an NFT contract for Certificates
    /// @param accreditationStorageAddress address of deployed AccreditationStorage contract
    constructor(address accreditationStorageAddress) ERC721("AccreditationNFT", "ACCRED") {
        // Store addresses
        _deployerAddress = payable(msg.sender);
        _accreditationStorageAddress = accreditationStorageAddress;
        // Create Contract variables
        _accreditationStorage = AccreditationStorage(accreditationStorageAddress);
    }

    /// @dev Makes sure only the deployer address can call this function
    modifier onlyDeployer() {
        require(msg.sender == _deployerAddress);
        _;
    }
    /// @dev Makes sure the function `setAddresses()` can only be called once
    modifier addressesHaveNotBeenInitialized() {
        require(!_areAddressesFilled);
        _;
    }

    /// @notice Adds addresses of deployed Contracts
    /// @param accreditationEndpointAddress address of deployed AccreditationEndpoint contract
    function setAddresses(
        address accreditationEndpointAddress
    ) external onlyDeployer addressesHaveNotBeenInitialized {
        _areAddressesFilled = true;
        _accreditationEndpointAddress = accreditationEndpointAddress;
    }

    // -------------------- Functions --------------------

    modifier validateCallFromEndpoint() {
        require(msg.sender == _accreditationEndpointAddress);
        _;
    }

    /// Creates Accreditation and mints NFT
    /// @return TokenID Accreditation NFT Token ID
    function launchAccreditation(
        address payable issuer,
        string calldata title,
        uint256 createdAt,
        uint256 duration,
        string calldata nature,
        string calldata description
    ) external validateCallFromEndpoint returns (uint256) {
        uint256 newAccredId = _tokenIds.current();

        _accreditationStorage.createAccreditation(
            newAccredId,
            issuer,
            title,
            createdAt,
            duration,
            nature,
            description
        );

        _safeMint(issuer, newAccredId);

        _tokenIds.increment();

        return newAccredId;
    }

    function isAccreditationExists(
        uint256 id
    ) external view validateCallFromEndpoint returns (bool) {
        return _exists(id) && _accreditationStorage.isAccreditationExists(id);
    }

    /// @dev Likely will not burn any NFTs because it does not make sense to deprive ownership of expired or revoked entities, implementation will hence not pass through NFT contract
    // function revokeAccreditationById(uint256 id) external returns (bool) {}
}
