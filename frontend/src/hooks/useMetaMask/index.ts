import { UserType } from "@/types/UserType";
import { useState } from "react";

// TODO: write a hook for connecting to MetaMask and interacting with Smart Contract, so that front-end only need to call function from here
const useMetaMask = () => {
  const [userType, setUserType] = useState<UserType>(UserType.OUTSIDER);

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

  return { userType, login, logout };
};

export default useMetaMask;
