// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { Issuer } from "../../types/users/Issuer.sol";
import { ApplicantStorage } from "./ApplicantStorage.sol";

contract IssuerStorage {
    // ========================= Variables =========================

    // -------------------- Contract addresses --------------------

    /// @dev Boolean flag to see if contracts have been fully deployed
    bool private _areAddressesFilled = false;

    /// @dev Wallet address of deployer, similar to admin address
    address payable private _deployerAddress;

    /// @dev Address of deployed AccreditationStorage contract
    address private _accreditationStorageAddress;

    /// @dev Address of deployed CertificateStorage contract
    address private _certificateStorageAddress;

    /// @dev Address of deployed IssuerEndpoint contract
    address private _issuerEndpointAddress;

    /// @dev Address of deployed CertificateEndpoint contract
    address private _certificateEndpointAddress;

    // /// @dev Address of deployed ApplicantStorage contract
    // address private _applicantStorageAddress;

    // -------------------- Variables --------------------

    /// @dev Get Issuer by Issuer address
    mapping(address => Issuer) private _issuers;

    // -------------------- Contracts --------------------

    // ========================= Functions & Modifiers =========================

    // -------------------- Setting up contracts --------------------

    /// @notice Deploys a storage contract for Issuer
    constructor() {
        _deployerAddress = payable(msg.sender);
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
        address accreditationStorageAddress,
        address certificateStorageAddress,
        address issuerEndpointAddress,
        address certificateEndpointAddress
    ) external onlyDeployer addressesHaveNotBeenInitialized {
        _areAddressesFilled = true;
        _accreditationStorageAddress = accreditationStorageAddress;
        _certificateStorageAddress = certificateStorageAddress;
        _issuerEndpointAddress = issuerEndpointAddress;
        _certificateEndpointAddress = certificateEndpointAddress;
    }

    // -------------------- Functions --------------------

    /// @dev Verify the address does not exist in the `_issuers` mapping
    /// @dev This is equivalent to checking if all the fields of the obtained mapping object have 0-values
    modifier newIssuer(address payable inputAddress) {
        Issuer storage i = _issuers[inputAddress];
        // If possible check all fields of the struct, but this is enough because a payable address cannot be 0-value
        require(
            i.issuerAddress == address(0),
            "This address has already been registered as an Issuer."
        );
        _;
    }

    modifier validateFromIssuerEndpoint() {
        require(msg.sender == _issuerEndpointAddress, "Call is not initiated from Endpoint.");
        _;
    }

    /// @notice Registers an Issuer into the system
    /// @notice This is a possible entry point from end users
    /// @notice Possible use cases include a new Wallet trying to register itself as a new Issuer
    /// @dev Add an Issuer to mapping
    /// @param name Name of the company
    // TODO(Good to have): add params
    /// @return Status of the registration process, returns true if success, otherwise throw error
    function createIssuer(
        address payable inputAddress,
        string memory name,
        string memory description,
        string memory logoUrl
    ) external validateFromIssuerEndpoint newIssuer(inputAddress) returns (Issuer memory) {
        Issuer memory issuer = Issuer(name, inputAddress, description, logoUrl, block.timestamp);
        _issuers[inputAddress] = issuer;
        return issuer;
    }

    modifier verifyGettingAddress() {
        require(
            msg.sender == _issuerEndpointAddress || msg.sender == _certificateEndpointAddress,
            "Call is not initiated from Endpoint."
        );
        _;
    }

    /// @param inputAddress If the address is valid, it is used to search for an Issuer instance
    /// @return Issuer instance obtained by querying the inputAddress
    function getIssuerByAddress(
        address payable inputAddress
    ) external view verifyGettingAddress returns (Issuer memory) {
        return _issuers[inputAddress];
    }

    modifier validateCallFromAccreditationStorageOrCertificateStorage() {
        require(
            msg.sender == _accreditationStorageAddress || msg.sender == _certificateStorageAddress,
            "Unauthorized function call."
        );
        _;
    }

    /// @param inputAddress If the address is valid, it is used to search for an Issuer instance
    /// @return Whether the input address exists as an issuer
    function isIssuerExists(
        address payable inputAddress
    ) external view validateCallFromAccreditationStorageOrCertificateStorage returns (bool) {
        return _issuers[inputAddress].issuerAddress == inputAddress;
    }
}
