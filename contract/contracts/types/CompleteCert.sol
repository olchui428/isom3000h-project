// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/// @title Complete Certificate type
/// Contains the complete details of what users might expect to see on a cert
/// Only used when returning complete data to users
struct CompleteCert {
    uint256 id;
    address payable issuer;
    address payable applicant;
    address nftAddress;
    uint256 createdAt;
    string level;
    uint256 accreditationId;
    // TODO: replace accreditationId with the contents of corresponding accreditation
}
