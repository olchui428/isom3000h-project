// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { Issuer } from "../types/users/Issuer.sol";
import { Accreditation } from "../types/nft/Accreditation.sol";
import { Certificate } from "../types/nft/Certificate.sol";
import { IssuerStorage } from "../storage/users/IssuerStorage.sol";

contract IssuerEndpoint {
    // ========================= Variables =========================

    // -------------------- Contract addresses --------------------

    /// @dev Wallet address of deployer, similar to admin address
    address payable private _deployerAddress;

    /// @dev Address of deployed IssuerStorage contract
    address private _issuerStorageAddress;

    // /// @dev Address of deployed ApplicantStorage contract
    // address private _applicantStorageAddress;

    // -------------------- Variables --------------------

    // -------------------- Contracts --------------------

    /// @dev Storage contract for Issuers
    IssuerStorage private _issuerStorage;

    // /// @dev Storage contract for Applicants
    // ApplicantStorage applicantStorage;

    // TODO(MVP): add Contracts

    // ========================= Functions & Modifiers =========================

    // -------------------- Setting up contracts --------------------

    /// @notice Deploys a storage contract for Accreditation
    /// @param issuerStorageAddress: think add what parameters, aka need to which contracts this contract will call
    constructor(address issuerStorageAddress) {
        // Store addresses
        _deployerAddress = payable(msg.sender);
        _issuerStorageAddress = issuerStorageAddress;

        // Create Contract variables
        _issuerStorage = IssuerStorage(issuerStorageAddress);
    }

    // -------------------- Functions --------------------

    function registerIssuer(
        address payable issuerAddress,
        string calldata name,
        string calldata description,
        string calldata logoUrl
    ) external returns (bool) {
        return _issuerStorage.registerIssuer(issuerAddress, name, description, logoUrl);
    }

    function getIssuerByAddress(
        address payable issuerAddress
    ) external view returns (Issuer memory) {
        return _issuerStorage.getIssuerByAddress(issuerAddress);
    }

    // TODO(Good to have): add endpoint functions
}
