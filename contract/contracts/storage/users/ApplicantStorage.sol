// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { Applicant } from "../../types/users/Applicant.sol";

contract ApplicantStorage {
    // TODO: think data structure
    mapping(address => Applicant) private _applicants;

    // TODO: think add what parameters, aka need to which contracts this contract will call
    constructor() {}

    // TODO: add CRUD functions
}
