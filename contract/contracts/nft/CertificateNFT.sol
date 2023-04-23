// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "../types/nft/Certificate.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CertificateNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // TODO: think add what parameters, aka need to which contracts this contract will call
    constructor(string memory accreditationContractAddress) ERC721("CertificateNFT", "CERT") {}

    // TODO: add validation
    modifier validateBeforeIssue() {
        _;
    }

    // TODO: add verification
    // TODO: add arguments
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
