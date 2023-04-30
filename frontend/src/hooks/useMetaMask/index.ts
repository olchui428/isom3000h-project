import { UserType } from "@/types/UserType";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import { ContractAddresses, issuerEndpointABI, applicantEndpointABI, accreditationEndpointABI, certificateEndpointABI } from "@/blockchain/contracts.config";
import axios from "axios";

// TODO: add finalized ABI

// TODO: write a hook for connecting to MetaMask and interacting with Smart Contract, so that front-end only need to call function from here
const useMetaMask = () => {
  const [userType, setUserType] = useState<UserType>(UserType.OUTSIDER);
  const [address, setAddress] = useState<string>();

  const connectToTheMetaMask = useCallback(async () => {
    // check if the browser has MetaMask installed
    if (!window.ethereum) {
      alert("Please install MetaMask first.");
      return;
    }
    // get the user's account address
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAddress(accounts[0]);
  }, []);

  const signer = useMemo(() => {
    if (!address) return null;
    return new ethers.providers.Web3Provider(window.ethereum).getSigner();
  }, [address]);

  const provider = useMemo(() => {
    // only connect to the contract if the user has MetaMask installed
    if (typeof window === "undefined") return null;
    return new ethers.providers.Web3Provider(window.ethereum);
  }, []);

  // function will be called whenever the address changed
  useEffect(() => {
    if (provider) {
      (async () => {
        // // get latest candidate names
        // const ballotContract = new ethers.Contract(
        //   CONTRACT_ADDRESS,
        //   abi,
        //   provider
        // );
        // // get the list of candidates
        // const results = await ballotContract.getResults();
        // const endTime = ethers.utils.formatUnits(
        //   await ballotContract.endTime(),
        //   0
        // );
        // setEndTime(dayjs.unix(parseInt(endTime)).format("YYYY-MM-DD HH:mm:ss"));
        // setCandidateResults(results);
      })();
    }
  }, [provider /*, loading */]);

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
    // TODO: replace with actual endpoint functions
    const fakeFunction = async () => {
      if (!signer) return;
      try {
        const issuerEndpoint = new ethers.Contract(
          ContractAddresses.ISSUER_ENDPOINT,
          issuerEndpointABI,
          signer
        );
        // Add this line if it is a creation transaction // wait for the transaction to be mined
        // await tx.wait();
      } catch (error) {
        alert(`Error at IssuerEndpoint: ${error}`);
      }
      // TODO: complete implementation
    };

    // TODO: add endpoint functions

    return {
      // TODO: add endpoint functions
    };
  };

  const ApplicantEndpoint = () => {
    // TODO: replace with actual endpoint functions
    const fakeFunction = async () => {
      if (!signer) return;
      try {
        const applicantEndpoint = new ethers.Contract(
          ContractAddresses.APPLICANT_ENDPOINT,
          applicantEndpointABI,
          signer
        );
        // Add this line if it is a creation transaction // wait for the transaction to be mined
        // await tx.wait();
      } catch (error) {
        alert(`Error at ApplicantEndpoint: ${error}`);
      }
      // TODO: complete implementation
    };

    // TODO: add endpoint functions

    return {
      // TODO: add endpoint functions
    };
  };

  const AccreditationEndpoint = () => {
    const launchAccreditation = async () =>
      // TODO: add params
      {
        if (!signer) return;
        try {
          const accreditationEndpoint = new ethers.Contract(
            ContractAddresses.ACCREDITATION_ENDPOINT,
            accreditationEndpointABI,
            signer
          );
          const tx = await accreditationEndpoint
            .launchAccreditation
            // TODO: add params
            ();
          await tx.wait();
        } catch (error) {
          alert(`Error at AccreditationEndpoint.launchAccreditation: ${error}`);
        }
      };

    const getAccreditationById = async (id: number) => {
      if (!signer) return;
      try {
        const accreditationEndpoint = new ethers.Contract(
          ContractAddresses.ACCREDITATION_ENDPOINT,
          accreditationEndpointABI,
          signer
        );
        return await accreditationEndpoint.getAccreditationById(id);
      } catch (error) {
        alert(`Error at AccreditationEndpoint.getAccreditationById: ${error}`);
      }
    };

    const getAccreditationsByAddress = async (address: number) => {
      if (!signer) return;
      try {
        const accreditationEndpoint = new ethers.Contract(
          ContractAddresses.ACCREDITATION_ENDPOINT,
          accreditationEndpointABI,
          signer
        );
        return await accreditationEndpoint.getAccreditationsByAddress(address);
      } catch (error) {
        alert(`Error at AccreditationEndpoint.getAccreditationsByAddress: ${error}`);
      }
    };

    return {
      launchAccreditation,
      getAccreditationById,
      getAccreditationsByAddress,
    };
  };

  const CertificateEndpoint = () => {
    // TODO: replace with actual endpoint functions
    const fakeFunction = async () => {
      if (!signer) return;
      try {
        const certificateEndpoint = new ethers.Contract(
          ContractAddresses.CERTIFICATE_ENDPOINT,
          certificateEndpointABI,
          signer
        );
        // Add this line if it is a creation transaction // wait for the transaction to be mined
        // await tx.wait();
      } catch (error) {
        alert(`Error at CertificateEndpoint: ${error}`);
      }
      // TODO: complete implementation
    };

    // TODO: add endpoint functions

    return {
      // TODO: add endpoint functions
    };
  };

  const generateCertificate = async (certificateId: number) => {
    // TODO: refine
    return await axios.get(`/api/certificate/${certificateId}`);
  };

  return {
    userType,
    login,
    logout,
    issuerEndpoint: IssuerEndpoint(),
    applicantEndpoint: ApplicantEndpoint(),
    accreditationEndpoint: AccreditationEndpoint(),
    certificateEndpoint: CertificateEndpoint(),
    generateCertificate,
  };
};

export default useMetaMask;
