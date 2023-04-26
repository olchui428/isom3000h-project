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
    /// @param someAddress TODO: think add what parameters, aka need to decide which contracts this contract will call
    constructor(address someAddress) {
        _deployerAddress = payable(msg.sender);
        someAddress;
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
}
