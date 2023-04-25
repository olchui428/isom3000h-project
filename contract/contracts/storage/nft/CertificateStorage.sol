// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { Certificate } from "../../types/nft/Certificate.sol";

contract CertificateStorage {
    // ========================= Variables =========================

    // -------------------- Contract addresses --------------------
    
    /// @dev Boolean flag to see if contracts have been fully deployed
    bool private _areAddressesFilled = false;

    /// @dev Wallet address of deployer, similar to admin address
    address payable private _deployerAddress;

    // /// @dev Address of deployed ApplicantStorage contract
    // address private _applicantStorageAddress;
    
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
    // /// @dev Storage contract for Applicants
    // ApplicantStorage applicantStorage;

    // TODO: add Contracts

    // ========================= Functions & Modifiers =========================

    // -------------------- Setting up contracts --------------------

    /// @notice Deploys a storage contract for Certificate
    /// @param someAddress TODO: think add what parameters, aka need to which contracts this contract will call
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

    // Should only be created when minting NFT
    // Individual Certificate can be accessed by everyone
    // Array view requires privilege
    // Include an expiry date related burn method to be called from CertificateNFT

    // Map Certificate[] to Issuer address[]
    // Map Certificate[] to Applicant address[]
}
