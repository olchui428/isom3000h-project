// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/// @title Certificate type
/// Certificate stores the details of a digital certificate NFT item issued to an applicant
struct Certificate {
    /// @param id NFT token ID, globally unique
    uint256 id;
    /// @param issuer Address of Accreditation Issuer
    address payable issuer;
    /// @param applicant Address of Certificant recipient
    address payable applicant;
    /// @param createdAt The UTC time of creation of Certificate / 1000 because Solidity
    uint256 createdAt;
    /// @param accreditationId NFT token ID of the corresponding Accreditation, acts as foreign key
    uint256 accreditationId;
    /// @param level The level of achievement of this certificate, e.g. "Pass", "Distiction", "Listening - 9.0\nReading - 9.0\nWriting - 8.0\nSpeaking - 8.0", use '\n' to separate if multiple lines
    string level;
    /// @param eventId (Optional) if this is a certificate for repeated offerings of course or exams or other events, can input an ID to match that of the organization internal database
    string eventId;
    /// @param remarks (Optional) Remarks or words of encouragement, if the Issuer wishes to add any on the certificate
    string remarks;
    /// @param isRevoked (Optional) Boolean to show if this Certificate was revoked, default value false
    bool isRevoked;
    /// @param revokeReason (Optional) Reason why this Certificate was revoked, if it is, otherwise stay blank
    string revokeReason;
    /// @param revokeTime (Optional) Timestamp when this Certificate was revoked, if it is. Default value = -1
    uint256 revokeTime;
}
