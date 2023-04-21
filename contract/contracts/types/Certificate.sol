// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

struct Certificate {
    uint256 certId;
    address payable issuer;
    address payable applicant;
    address nftAddress;
    bool isTransfered;
    uint256 createdAt;
    uint256 dueAt;
}
