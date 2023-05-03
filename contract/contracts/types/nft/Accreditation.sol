// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/// @title Accreditation type
/// Accreditation stores the details of a type of digital certificate
/// i.e. multiple Certificates can be issued for the purpose of a single Accreditation to different users
struct Accreditation {
    /// @param id NFT token ID, globally unique
    uint256 id;
    /// @param issuer Address of Accreditation Issuer
    address payable issuer;
    /// @param title Title/name of Accreditation
    string title;
    /// @param createdAt The UTC time of creation of Accreditation / 1000 because Solidity
    uint256 createdAt;
    /// @param duration Duration of Accreditation before expiry, e.g. 2 years, stored in number of seconds. Input 0 if no expiry date
    uint256 duration;
    /// @param nature Nature of Accreditation, e.g. Participation, Award, Appreciation, Achievement, Completion, Graduation, Exam, etc.
    string nature;
    /// @param description Textual description of the Accreditation
    string description;
    /// @param isRevoked (Optional) Boolean to show if this Accreditation was revoked, default value false
    bool isRevoked;
    /// @param revokeReason (Optional) Reason why this Accreditation was revoked, if it is, otherwise stay blank
    string revokeReason;
    /// @param revokeTime (Optional) Timestamp when this Accreditation was revoked, if it is. Default value = 0
    uint256 revokeTime;
}
