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
        string memory title,
        string memory nature,
        string memory description
    ) {
        require(keccak256(abi.encodePacked(title)) != keccak256(abi.encodePacked("")));
        require(keccak256(abi.encodePacked(nature)) != keccak256(abi.encodePacked("")));
        require(keccak256(abi.encodePacked(description)) != keccak256(abi.encodePacked("")));
        _;
    }

    function launchAccreditation(
        address payable issuer,
        string memory title,
        uint256 createdAt,
        uint256 duration,
        string memory nature,
        string memory description
    ) external validateAccredInput(title, nature, description) returns (uint256) {
        return
            _accreditationNFT.launchAccreditation(
                issuer,
                title,
                createdAt,
                duration,
                nature,
                description
            );
    }

    modifier isAccreditationExists(uint256 id) {
        _accreditationNFT.isAccreditationExists(id);
        _;
    }

    function getAccreditationById(
        uint256 id
    ) external view isAccreditationExists(id) returns (Accreditation memory) {
        return _accreditationStorage.getAccreditationById(id);
    }

    function getAccreditationsByAddress(
        address payable inputAddress
    ) external view returns (Accreditation[] memory) {
        return _accreditationStorage.getAccreditationsByAddress(inputAddress);
    }

    // /// @dev it is decided that NFTs issued will not be burned
    // function revokeAccreditationById(uint256 id) external pure nftValidator(id) returns (bool) {
    //     return _accreditationNFT.revokeAccreditationById(id);
    // }
}
