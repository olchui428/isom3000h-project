// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { Issuer } from "../types/users/Issuer.sol";
import { Applicant } from "../types/users/Applicant.sol";
import { Accreditation } from "../types/nft/Accreditation.sol";
import { Certificate } from "../types/nft/Certificate.sol";
import { ApplicantStorage } from "../storage/users/ApplicantStorage.sol";

contract ApplicantEndpoint {
    // ========================= Variables =========================

    // -------------------- Contract addresses --------------------

    /// @dev Wallet address of deployer, similar to admin address
    address payable private _deployerAddress;

    /// @dev Address of deployed ApplicantStorage contract
    address private _applicantStorageAddress;

    // -------------------- Variables --------------------

    event RegisterApplicant(address payable applicantAddress, string name, uint256 createdAt);

    // -------------------- Contracts --------------------

    // /// @dev Storage contract for Issuers
    // IssuerStorage private _issuerStorage;

    /// @dev Storage contract for Applicants
    ApplicantStorage private _applicantStorage;

    // ========================= Functions & Modifiers =========================

    // -------------------- Setting up contracts --------------------

    /// @notice Deploys a storage contract for Applicant
    /// @param applicantStorageAddress address of deployed ApplicantStorage contract
    constructor(address applicantStorageAddress) {
        // Store addresses
        _deployerAddress = payable(msg.sender);
        _applicantStorageAddress = applicantStorageAddress;

        // Create Contract variables
        _applicantStorage = ApplicantStorage(applicantStorageAddress);
    }

    // -------------------- Functions --------------------

    function registerApplicant(string memory name) external {
        address payable applicantAddress = payable(msg.sender);
        Applicant memory applicant = _applicantStorage.createApplicant(applicantAddress, name);
        emit RegisterApplicant(applicantAddress, name, applicant.createdAt);
    }

    function getApplicantByAddress(
        address payable applicantAddress
    ) external view returns (Applicant memory) {
        return _applicantStorage.getApplicantByAddress(applicantAddress);
    }
}
