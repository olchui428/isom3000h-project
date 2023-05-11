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

    event RegisterIssuer(
        address payable issuerAddress,
        string name,
        string description,
        string logoUrl,
        uint256 createdAt
    );

    // -------------------- Contracts --------------------

    /// @dev Storage contract for Issuers
    IssuerStorage private _issuerStorage;

    // /// @dev Storage contract for Applicants
    // ApplicantStorage applicantStorage;

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
        string memory name,
        string memory description,
        string memory logoUrl
    ) external {
        address payable issuerAddress = payable(msg.sender);
        Issuer memory issuer = _issuerStorage.createIssuer(
            issuerAddress,
            name,
            description,
            logoUrl
        );
        emit RegisterIssuer(issuerAddress, name, description, logoUrl, issuer.createdAt);
    }

    function getIssuerByAddress(
        address payable issuerAddress
    ) external view returns (Issuer memory) {
        return _issuerStorage.getIssuerByAddress(issuerAddress);
    }
}
