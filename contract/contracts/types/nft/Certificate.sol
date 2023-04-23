// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/// @title Certificate type
/// Certificate stores the details of a digital certificate NFT item issued to an applicant
struct Certificate {
    uint256 id;
    address payable issuer;
    address payable applicant;
    address nftAddress;
    uint256 createdAt;
    uint256 accreditationId;
    string level;
    string examId;
}
