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

    // /// @dev Address of deployed ApplicantStorage contract
    // address private _applicantStorageAddress;
    
    // -------------------- Variables --------------------

    /// @dev Get Issuer by Issuer address
    mapping(address => Issuer) private _issuers;

    // -------------------- Contracts --------------------

    // /// @dev Storage contract for Applicants
    // ApplicantStorage applicantStorage;

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
    modifier addressHasNotBeenInitialized() {
        require(!_areAddressesFilled);
        _;
    }
    function setContractsAddresses() external onlyDeployer addressHasNotBeenInitialized {
        _areAddressesFilled = true;
        // TODO: add required addresses + initialize Contract variables
        // applicantStorage = ApplicantStorage(address(0));
    }

    // -------------------- Functions --------------------

    // TODO: add CRUD functions

    /// @dev Verify the address does not exist in the `_issuers` mapping
    /// @dev This is equivalent to checking if all the fields of the obtained mapping object have 0-values
    modifier newIssuer() {
        Issuer memory i = _issuers[msg.sender];
        // If possible check all fields of the struct, but this is enough because a payable address cannot be 0-value
        require((i.issuerAddress != address(0)));
        _;
    }
    /// @notice Registers an Issuer into the system
    /// @notice This is a possible entry point from end users
    /// @notice Possible use cases include a new Wallet trying to register itself as a new Issuer
    /// @dev Add an Issuer to mapping
    /// @param name: Name of the company
    // TODO: add params
    /// @return Status of the registration process, returns true if success, otherwise throw error
    function registerIssuer(string memory name) external newIssuer returns (bool) {
        address payable issuerAddress = payable(msg.sender);
        _issuers[issuerAddress] = Issuer(name, issuerAddress, "", "");
        return true;
    }

    // // TODO
    // modifier verifyGettingAddress(address payable targetAddress) {
    //     require(msg.sender == );
    //     require(targetAddress)
    //     _;
    // }
    // /// @notice This is a possible entry point from end users
    // /// @notice Possible use cases include obtaining account data when the Issuer itself logs in
    // /// @param targetAddress If the address is valid, it is used to search for an Issuer instance
    // /// @return Issuer instance obtained by querying the targetAddress
    // function getIssuerByAddress(address payable targetAddress) external verifyGettingAddress(targetAddress) returns (Issuer) {
    //     return _issuers[targetAddress];
    // }
}
