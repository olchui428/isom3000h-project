//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.9;

import '../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '../node_modules/@openzeppelin/contracts/utils/Counters.sol';
import '../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol';

contract Accreditation is ReentrancyGuard {
  // struct Issuer {
  //   string name;
  //   address addr;
  // }

  // struct Applicant {
  //   address addr;
  // }

  struct Certificate {
    uint256 certId;
    address payable issuer;
    address payable applicant;
    address nftAddress;
    bool isTransfered;
    uint256 createdAt;
  }

  using Counters for Counters.Counter;

  // ------ Variables

  Counters.Counter private _certIds;
  mapping(uint256 => Certificate) private certificates;

  // ------ Methods

  function createCertificate(address _nftAddress) public payable {
    _certIds.increment();
    uint256 certId = _certIds.current();

    // Make new certificate object and add to storage (mapping)
    certificates[certId] = Certificate({
      certId: certId,
      issuer: payable(msg.sender),
      applicant: payable(address(0)), // Create new NFT
      nftAddress: _nftAddress,
      isTransfered: false,
      createdAt: block.timestamp
    });
  }

  function transferCertificate(uint256 _certId, address _applicantAddr) public payable {
    // Find the certificate from mapping of 'certificates' using _certId
    // Transfer the ownership of that certificate from issuer to applicant
    // Update this certificate's information in local storage (mapping) about the transferred ownership
  }

  function verifyCertificate(uint256 _ownerAddress, address _nftAddress) public returns (bool) {
    // Find the certificate from mapping of 'certificates' using _nftAddress
    // Check whether this certificate is transferred to/ has an applicant that matches _ownerAddress
  }

  function viewCertificate(uint256 _applicantAddress) public view returns (Certificate[] memory) {
    // Find all certificates with applicant that matches the _applicantAddress
  }
}
