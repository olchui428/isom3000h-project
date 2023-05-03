// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { Accreditation } from "../../types/nft/Accreditation.sol";
import { Certificate } from "../../types/nft/Certificate.sol";
import { IssuerStorage } from "../users/IssuerStorage.sol";

contract AccreditationStorage {
    // ========================= Variables =========================

    // -------------------- Contract addresses --------------------

    /// @dev Boolean flag to see if contracts have been fully deployed
    bool private _areAddressesFilled = false;

    /// @dev Wallet address of deployer, similar to admin address
    address payable private _deployerAddress;

    /// @dev Address of deployed IssuerStorage contract
    address private _issuerStorageAddress;

    // /// @dev Address of deployed ApplicantStorage contract
    // address private _applicantStorageAddress;

    /// @dev Address of deployed AccreditationNFT contract
    address private _accreditationNFTAddress;

    /// @dev Address of deployed AccreditationEndpoint contract
    address private _accreditationEndpointAddress;

    /// @dev Address of deployed CertificateEndpoint contract
    address private _certificateEndpointAddress;

    // -------------------- Variables --------------------

    /// @dev Get Accreditation by its NFT Token ID
    mapping(uint256 => Accreditation) private _accreditations;

    /// @dev Get Accreditation[] by Issuer address
    mapping(address => Accreditation[]) private _accredsByIssuer;

    // -------------------- Contracts --------------------

    /// @dev Storage contract for Issuers
    IssuerStorage private _issuerStorage;

    // ========================= Functions & Modifiers =========================

    // -------------------- Setting up contracts --------------------

    /// @notice Deploys a storage contract for Accreditation
    /// @param issuerStorageAddress address of deployed IssuerStorage contract
    constructor(address issuerStorageAddress) {
        // Store addresses
        _deployerAddress = payable(msg.sender);
        _issuerStorageAddress = issuerStorageAddress;

        // Create Contract variables
        _issuerStorage = IssuerStorage(issuerStorageAddress);
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
    /// @param accreditationNFTAddress address of deployed AccreditationNFT contract
    function setAddresses(
        address accreditationNFTAddress,
        address accreditationEndpointAddress,
        address certificateEndpointAddress
    ) external onlyDeployer addressesHaveNotBeenInitialized {
        _areAddressesFilled = true;
        _accreditationNFTAddress = accreditationNFTAddress;
        _accreditationEndpointAddress = accreditationEndpointAddress;
        _certificateEndpointAddress = certificateEndpointAddress;
    }

    // -------------------- Functions --------------------

    /// @dev Makes sure only the NFT contract address can call this function
    modifier validateCallFromNFT() {
        require(msg.sender == _accreditationNFTAddress);
        _;
    }
    /// @dev Makes sure only the Endpoint contract address can call this function
    modifier validateCallFromEndpoint() {
        require(
            msg.sender == _accreditationEndpointAddress || msg.sender == _certificateEndpointAddress
        );
        _;
    }
    /// @dev Makes sure the Issuer address exists in IssuerStorage
    modifier issuerExists(address payable inputAddress) {
        _issuerStorage.isIssuerExists(inputAddress);
        _;
    }

    function createAccreditation(
        uint256 newAccredId,
        address payable issuer,
        string calldata title,
        uint256 createdAt,
        uint256 duration,
        string calldata nature,
        string calldata description
    ) external validateCallFromNFT issuerExists(issuer) returns (bool) {
        Accreditation memory newAccreditation = Accreditation(
            newAccredId,
            issuer,
            title,
            createdAt,
            duration,
            nature,
            description,
            false,
            "",
            0
        );
        _accreditations[newAccredId] = newAccreditation;
        _accredsByIssuer[issuer].push(newAccreditation);
        return true;
    }

    function getAccreditationById(
        uint256 id
    ) external view validateCallFromEndpoint returns (Accreditation memory) {
        return _accreditations[id];
    }

    function getAccreditationsByIssuerAddress(
        address payable inputAddress
    )
        external
        view
        validateCallFromEndpoint
        issuerExists(inputAddress)
        returns (Accreditation[] memory)
    {
        return _accredsByIssuer[inputAddress];
    }

    function revokeAccreditationById(
        uint256 id,
        string calldata revokeReason,
        uint256 revokeTime
    ) external validateCallFromNFT returns (bool) {
        Accreditation storage accred = _accreditations[id];
        accred.isRevoked = true;
        accred.revokeReason = revokeReason;
        accred.revokeTime = revokeTime;
        return true;
    }

    function isAccreditationExists(uint256 id) external view validateCallFromNFT returns (bool) {
        return _accreditations[id].issuer != address(0);
    }
}
