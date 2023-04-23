// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { Issuer } from "../../types/users/Issuer.sol";

contract IssuerStorage {
    // TODO: think data structure
    mapping(address => Issuer) private _issuers;

    // Empty constructor, receive no arguments
    constructor() {}

    // TODO: add CRUD functions
}
