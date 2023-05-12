// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { Applicant } from "../../types/users/Applicant.sol";

contract ApplicantStorage {
    // ========================= Variables =========================

    // -------------------- Contract addresses --------------------

    /// @dev Boolean flag to see if contracts have been fully deployed
    bool private _areAddressesFilled = false;

    /// @dev Wallet address of deployer, similar to admin address
    address payable private _deployerAddress;

    /// @dev Address of deployed CertificateStorage contract
    address private _certificateStorageAddress;

    /// @dev Address of deployed ApplicantEndpoint contract
    address private _applicantEndpointAddress;

    /// @dev Address of deployed CertificateEndpoint contract
    address private _certificateEndpointAddress;

    // TODO(MVP): add addresses

    // -------------------- Variables --------------------

    /// @dev Get Applicant by Applicant address
    mapping(address => Applicant) private _applicants;

    /// @dev Get Applicant[] by Issuer address
    mapping(address => Applicant[]) private _appliByIssuer;

    // -------------------- Contracts --------------------

    // TODO(MVP): add Contracts

    // ========================= Functions & Modifiers =========================

    // -------------------- Setting up contracts --------------------

    /// @notice Deploys a storage contract for Applicant
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
        address certificateStorageAddress,
        address applicantEndpointAddress,
        address certificateEndpointAddress
    ) external onlyDeployer addressesHaveNotBeenInitialized {
        _areAddressesFilled = true;
        _certificateStorageAddress = certificateStorageAddress;
        _applicantEndpointAddress = applicantEndpointAddress;
        _certificateEndpointAddress = certificateEndpointAddress;
        // TODO(MVP): add required addresses
    }

    // -------------------- Functions --------------------

    /// @dev Verify the address does not exist in the `_applicants` mapping
    /// @dev This is equivalent to checking if all the fields of the obtained mapping object have 0-values
    modifier newApplicant(address payable applicantAddress) {
        Applicant storage i = _applicants[applicantAddress];
        // If possible check all fields of the struct, but this is enough because a payable address cannot be 0-value
        require(
            i.applicantAddress == address(0),
            "This address has already been registered as an Applicant."
        );
        _;
    }

    modifier validateFromApplicantEndpoint() {
        require(msg.sender == _applicantEndpointAddress, "Call is not initiated from Endpoint.");
        _;
    }

    /// @notice Registers an Applicant into the system
    /// @notice This is a possible entry point from end users
    /// @notice Possible use cases include a new Wallet trying to register itself as a new Applicant
    /// @dev Add an Applicant to mapping
    /// @param applicantAddress Wallet address of Applicant
    /// @param name Name of the Applicant
    /// @return Status of the registration process, returns true if success, otherwise throw error
    function createApplicant(
        address payable applicantAddress,
        string memory name
    )
        external
        validateFromApplicantEndpoint
        newApplicant(applicantAddress)
        returns (Applicant memory)
    {
        Applicant memory applicant = Applicant(name, applicantAddress, block.timestamp);
        _applicants[applicantAddress] = applicant;
        return applicant;
    }

    modifier verifyGettingAddress() {
        require(
            msg.sender == _applicantEndpointAddress || msg.sender == _certificateEndpointAddress,
            "Call is not initiated from Endpoint."
        );
        _;
    }

    /// @param inputAddress If the address is valid, it is used to search for an Applicant instance
    /// @return Applicant instance obtained by querying the inputAddress
    function getApplicantByAddress(
        address payable inputAddress
    ) external view verifyGettingAddress returns (Applicant memory) {
        return _applicants[inputAddress];
    }

    modifier validateCallFromCertificateStorage() {
        require(msg.sender == _certificateStorageAddress, "Unauthorized function call.");
        _;
    }

    /// @param inputAddress If the address is valid, it is used to search for an Applicant instance
    /// @return Whether the input address exists as an applicant
    function isApplicantExists(
        address payable inputAddress
    ) external view validateCallFromCertificateStorage returns (bool) {
        return _applicants[inputAddress].applicantAddress == inputAddress;
    }

    // TODO(MVP): add CRUD functions
}
