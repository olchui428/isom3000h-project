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

    // TODO: add addresses
    // /// @dev Address of deployed ApplicantStorage contract
    // address private _applicantStorageAddress;

    // -------------------- Variables --------------------

    /// @dev Get Applicant by Applicant address
    mapping(address => Applicant) private _applicants;

    /// @dev Get Applicant[] by Issuer address
    mapping(address => Applicant[]) private _appliByIssuer;

    // -------------------- Contracts --------------------

    // TODO: add Contracts

    // ========================= Functions & Modifiers =========================

    // -------------------- Setting up contracts --------------------

    /// @notice Deploys a storage contract for Applicant
    // /// @param someAddress TODO: think add what parameters, aka need to decide which contracts this contract will call
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

    function setAddresses() external onlyDeployer addressesHaveNotBeenInitialized {
        _areAddressesFilled = true;
        // TODO: add required addresses + initialize Contract variables
    }

    // -------------------- Functions --------------------

    // TODO: add CRUD functions

    /// @dev Verify the address does not exist in the `_applicants` mapping
    /// @dev This is equivalent to checking if all the fields of the obtained mapping object have 0-values
    modifier newApplicant() {
        Applicant memory i = _applicants[msg.sender];
        // If possible check all fields of the struct, but this is enough because a payable address cannot be 0-value
        require(i.applicantAddress == address(0));
        _;
    }

    /// @notice Registers an Applicant into the system
    /// @notice This is a possible entry point from end users
    /// @notice Possible use cases include a new Wallet trying to register itself as a new Applicant
    /// @dev Add an Applicant to mapping
    /// @param name: Name of the company
    // TODO: add params
    /// @return Status of the registration process, returns true if success, otherwise throw error
    function registerApplicant(string memory name) external newApplicant returns (bool) {
        address payable applicantAddress = payable(msg.sender);
        _applicants[applicantAddress] = Applicant(name, applicantAddress, block.timestamp);
        return true;
    }

    // // TODO
    // modifier verifyGettingAddress(address payable inputAddress) {
    //     require(msg.sender == );
    //     require(inputAddress)
    //     _;
    // }
    /// @param inputAddress If the address is valid, it is used to search for an Applicant instance
    /// @return Applicant instance obtained by querying the inputAddress
    function getApplicantByAddress(
        address payable inputAddress
    ) external view returns (Applicant memory) {
        return _applicants[inputAddress];
    }

    // modifier validateCallFromAccreditationStorage() {
    //     require(msg.sender == _accreditationStorageAddress);
    //     _;
    // }

    /// @param inputAddress If the address is valid, it is used to search for an Applicant instance
    /// @return Whether the input address exists as an applicant
    function isApplicantExists(address payable inputAddress) external view returns (bool) {
        return _applicants[inputAddress].applicantAddress == inputAddress;
    }
}
