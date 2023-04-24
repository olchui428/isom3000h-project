// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { Accreditation } from "./nft/Accreditation.sol";
import { Certificate } from "./nft/Certificate.sol";
import { Issuer } from "./users/Issuer.sol";
import { Applicant } from "./users/Applicant.sol";

/// @title Complete Certificate type
/// Contains the complete details of what users see on a cert
/// Only used when returning complete data to users
/// @dev use cases: Displaying single certificate info to Applicant web interface, generating certificates
struct CompleteCert {
    Certificate certificate;
    Accreditation accreditation;
    Issuer issuer;
    Applicant applicant;
}
