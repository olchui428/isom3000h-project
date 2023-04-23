// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { Accreditation } from "../../types/nft/Accreditation.sol";
import { Certificate } from "../../types/nft/Certificate.sol";

contract AccreditationStorage {
    // ========================= Variables =========================

    // -------------------- Contract addresses --------------------
    
    /// @dev Boolean flag to see if contracts have been fully deployed
    bool private _areAddressesFilled = false;

    /// @dev Wallet address of deployer, similar to admin address
    address payable private _deployerAddress;

    // /// @dev Address of deployed ApplicantStorage contract
    // address private _applicantStorageAddress;
    
    // -------------------- Variables --------------------

    /// @dev Get Accreditation by its NFT Token ID
    mapping(uint256 => Accreditation) private _accreditations;

    /// @dev Get Accreditation[] by Issuer address
    mapping(address => Accreditation[]) private _accredsByIssuer;

    // -------------------- Contracts --------------------

    // /// @dev Storage contract for Issuers
    // IssuerStorage issuerStorage;
    // /// @dev Storage contract for Applicants
    // ApplicantStorage applicantStorage;

    // TODO: add Contracts

    // ========================= Functions & Modifiers =========================

    // -------------------- Setting up contracts --------------------

    /// @notice Deploys a storage contract for Accreditation
    /// @param issuerStorageAddress: think add what parameters, aka need to which contracts this contract will call
    constructor(string memory issuerStorageAddress) {
        _deployerAddress = payable(msg.sender);
        issuerStorageAddress;
    }

    modifier onlyDeployer() {
        require(msg.sender == _deployerAddress);
        _;
    }
    modifier addressHasNotBeenInitialized() {
        require(!_areAddressesFilled);
        _;
    }
    function setAddresses() external onlyDeployer addressHasNotBeenInitialized {
        _areAddressesFilled = true;
        // TODO: add required addresses + initialize Contract variables
    }

    // -------------------- Functions --------------------

    // TODO: add CRUD functions

    // Should only be created when minting NFT
    // Accreditations can be accessed by everyone
    // If have time, think about versioning
}
