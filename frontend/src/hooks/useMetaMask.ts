import { useState } from "react";

// TODO: write a hook for connecting to MetaMask
const useMetaMask = () => {
  const [userType, setUserType] = useState<UserType>(UserType.OUTSIDER);

  // TODO: add hook content
  // Reference: https://github.com/mdtanrikulu/use-metamask/blob/main/src/useMetamask.js

  return { userType };
};

export default useMetaMask;
