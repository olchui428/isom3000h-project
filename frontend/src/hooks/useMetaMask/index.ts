import { UserType } from "@/types/UserType";
import { useState } from "react";
import { abi as issuerEndpointABI } from "@/blockchain/abi/IssuerEndpoint.json";
import { abi as applicantEndpointABI } from "@/blockchain/abi/ApplicantEndpoint.json";
import { abi as accreditationEndpointABI } from "@/blockchain/abi/AccreditationEndpoint.json";
import { abi as certificateEndpointABI } from "@/blockchain/abi/CertificateEndpoint.json";

// TODO: add finalized ABI

// TODO: write a hook for connecting to MetaMask and interacting with Smart Contract, so that front-end only need to call function from here
const useMetaMask = () => {
  const [userType, setUserType] = useState<UserType>(UserType.OUTSIDER);
  const provider = null;
  const signer = null;

  const login = async (loginUserType: UserType) => {
    // TODO: connect to MetaMask wallet
    if (loginUserType === UserType.APPLICANT) {
      // TODO: validate with ApplicantEndpoint contract
    }
    if (loginUserType === UserType.ISSUER) {
      // TODO: validate with IssuerEndpoint contract
    }
    // TODO: add session content
    setUserType(loginUserType);
  };

  const logout = () => {
    // TODO: clear session content
    setUserType(UserType.OUTSIDER);
  };

  // TODO: add hook content
  // Reference: https://github.com/mdtanrikulu/use-metamask/blob/main/src/useMetamask.js

  const IssuerEndpoint = () => {
    // TODO: add endpoint functions
    return {
      // TODO: add endpoint functions
    };
  };

  const ApplicantEndpoint = () => {
    // TODO: add endpoint functions
    return {
      // TODO: add endpoint functions
    };
  };

  const AccreditationEndpoint = () => {
    const getAccreditationById = (id: number) => {};
    const getAccreditationsByAddress = (address: number) => {};
    // TODO: add endpoint functions
    return {
      getAccreditationById,
      getAccreditationsByAddress,
      // TODO: add endpoint functions
    };
  };

  const CertificateEndpoint = () => {
    // TODO: add endpoint functions
    return {
      // TODO: add endpoint functions
    };
  };

  return {
    userType,
    login,
    logout,
    IssuerEndpoint,
    ApplicantEndpoint,
    AccreditationEndpoint,
    CertificateEndpoint,
  };
};

export default useMetaMask;
