// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { Accreditation } from "../types/nft/Accreditation.sol";
import { AccreditationStorage } from "../storage/nft/AccreditationStorage.sol";
import { AccreditationNFT } from "../nft/AccreditationNFT.sol";

contract AccreditationEndpoint {
    // ========================= Variables =========================

    // -------------------- Contract addresses --------------------

    /// @dev Wallet address of deployer, similar to admin address
    address payable private _deployerAddress;

    /// @dev Address of deployed AccreditationStorage contract
    address private _accreditationStorageAddress;

    /// @dev Address of deployed AccreditationNFT contract
    address private _accreditationNFTAddress;

    // -------------------- Variables --------------------

    // -------------------- Contracts --------------------

    /// @dev Storage contract for Accreditations
    AccreditationStorage private _accreditationStorage;

    /// @dev NFT contract for Accreditations
    AccreditationNFT private _accreditationNFT;

    // ========================= Functions & Modifiers =========================

    // -------------------- Setting up contracts --------------------

    /// @notice Deploys a storage contract for Accreditation
    /// @param accreditationStorageAddress address of deployed AccreditationStorage contract
    /// @param accreditationNFTAddress address of deployed AccreditationNFT contract
    constructor(address accreditationStorageAddress, address accreditationNFTAddress) {
        // Store addresses
        _deployerAddress = payable(msg.sender);
        _accreditationStorageAddress = accreditationStorageAddress;
        _accreditationNFTAddress = accreditationNFTAddress;

        // Create Contract variables
        _accreditationStorage = AccreditationStorage(accreditationStorageAddress);
        _accreditationNFT = AccreditationNFT(accreditationNFTAddress);
    }

    // -------------------- Functions --------------------

    modifier validateAccredInput(
        string calldata title,
        string calldata nature,
        string calldata description
    ) {
        require(title != "");
        require(nature != "");
        require(description != "");
        _;
    }

    function createAccreditation(
        address payable issuer,
        string calldata title,
        uint256 createdAt,
        uint256 duration,
        string calldata nature,
        string calldata description,
        string calldata versionId
    ) external pure validateAccredInput returns (uint256) {
        return _accreditationNFT.launchAccreditation();
    }

    modifier isAccreditationExists(uint256 id) {
        _accreditationNFT.isAccreditationExists(id);
    }

    function getAccreditationById(
        uint256 id
    ) external pure isAccreditionExists(id) returns (Accreditation calldata) {
        return _accreditationStorage.getAccreditationById(id);
    }

    function getAccreditationsByAddress(
        address payable inputAddress
    ) external pure returns (Accreditation[] calldata) {
        return _accreditationStorage.getAccreditationsByAddress(inputAddress);
    }

    // // TODO: investigate if revoking Accred means revoking Certs as well
    // function revokeAccreditationById(uint256 id) external pure nftValidator(id) returns (bool) {
    //     // return _accreditationNFT.revokeAccreditationById(id);
    // }
}
