// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

struct Issuer {
    string name;
    address payable issuerAddress;
    string description;
    string logoUrl;
    uint256 createdAt;
    // TODO(Good to have): add more fields
}
