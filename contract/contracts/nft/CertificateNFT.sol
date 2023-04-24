// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import { Accreditation } from "../types/nft/Accreditation.sol";
import { Certificate } from "../types/nft/Certificate.sol";
import { AccreditationStorage } from "../storage/nft/AccreditationStorage.sol";
import { CertificateStorage } from "../storage/nft/CertificateStorage.sol";

/// @title An NFT smart contract for issuing Certificates
/// This smart contract inherits ERC721 token and can issue Certificates in the form of NFTs
contract CertificateNFT is ERC721 {
    using Counters for Counters.Counter;
    // ========================= Variables =========================

    // -------------------- Contract addresses --------------------
    
    /// @dev Boolean flag to see if contracts have been fully deployed
    bool private _areAddressesFilled = false;

    /// @dev Wallet address of deployer, similar to admin address
    address payable private _deployerAddress;

    // /// @dev Address of deployed ApplicantStorage contract
    // address private _applicantStorageAddress;
    
    // -------------------- Variables --------------------

    /// @dev Iterator to generate unique token IDs
    Counters.Counter private _tokenIds;

    // -------------------- Contracts --------------------

    // /// @dev Storage contract for Issuers
    // IssuerStorage issuerStorage;
    // /// @dev Storage contract for Applicants
    // ApplicantStorage applicantStorage;

    // TODO: add Contracts

    // ========================= Functions & Modifiers =========================

    // -------------------- Setting up contracts --------------------

    /// @notice Deploys an NFT contract for Certificates
    /// @param accreditationContractAddress TODO: think add what parameters, aka need to which contracts this contract will call
    constructor(string memory accreditationContractAddress) ERC721("CertificateNFT", "CERT") {
        _deployerAddress = payable(msg.sender);
        accreditationContractAddress;
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

    // TODO: add validation
    /// @dev Only Issuers can issue Certificates, validate if msg.sender === Issuer.address
    modifier validateBeforeIssue() {
        _;
    }
    // TODO: add verification
    // TODO: add arguments
    /// @notice Mints an new NFT as a certificate, stores Certificate data
    /// @dev Mints a new NFT, then calls CertificateStorage to store data
    function issueCertificate(
        address payable applicantAddress
        // TODO: add arguments
    ) 
        public
        validateBeforeIssue()
        returns (uint256)
    {
        uint256 newCertId = _tokenIds.current();
        // TODO: create new Cert and assign to mapping
        
        _safeMint(applicantAddress, newCertId);

        _tokenIds.increment();
    }
    
    // TODO: add validation before burning
    modifier validateBurn() {
        _;
    }
    function _burnCert(uint256 certId) internal returns (bool) {
        // TODO: delete Cert entry from mapping
        _burn(certId);
    }
}
