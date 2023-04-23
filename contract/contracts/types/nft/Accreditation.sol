// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/// @title Accreditation type
/// Accreditation stores the details of a type of digital certificate
/// i.e. multiple Certificates can be issued for the purpose of a single Accreditation to different users
struct Accreditation {
    uint256 id;
    address payable issuer;
    address nftAddress;
    string title;
    uint256 duration;
    string category;
    string description;
    string versionId;
}
