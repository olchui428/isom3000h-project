import { UserType } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import {
  ContractAddresses,
  issuerEndpointABI,
  applicantEndpointABI,
  accreditationEndpointABI,
  certificateEndpointABI,
} from "@/blockchain/contracts.config";
import axios from "axios";

// TODO: add finalized ABI

/**
 * Number of confirmed mined blocks to wait for for low security operations
 * Set to 1 because faster response time in sacrifice of security
 */
const LOW_SECURITY_NUM_CONFIRMS = 1;
/**
 * Number of confirmed mined blocks to wait for for high security operations
 * The number should be much more than 1 to prevent double spend attack
 * Set to 1 only for demo purposes
 */
const HIGH_SECURITY_NUM_CONFIRMS = 1;

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
    const registerIssuer = async (name: string, description: string, logoUrl: string) => {
      if (!signer) return;
      try {
        const issuerEndpoint = new ethers.Contract(
          ContractAddresses.ISSUER_ENDPOINT,
          issuerEndpointABI,
          signer
        );
        const tx = await issuerEndpoint.registerIssuer(name, description, logoUrl);
        // Add this line if it is a creation transaction // wait for the transaction to be mined
        const receipt = await tx.wait(LOW_SECURITY_NUM_CONFIRMS);
        const data = receipt.logs[receipt.logs.length - 1].data;

        // // TODO(MVP): decide return what
        // const [issuerAddress, name, description, logoUrl, createdAt] =
        //   ethers.utils.defaultAbiCoder.decode(
        //     ["address", "string", "string", "string", "uint256"],
        //     data
        //   );
      } catch (error) {
        console.log(`Error at IssuerEndpoint::registerIssuer(): ${error}`);
        throw error;
      }
    };

    const getIssuerByAddress = async (issuerAddress: string) => {
      if (!provider) return;
      try {
        const issuerEndpoint = new ethers.Contract(
          ContractAddresses.ISSUER_ENDPOINT,
          issuerEndpointABI,
          provider
        );
        return await issuerEndpoint.getIssuerByAddress(issuerAddress);
      } catch (error) {
        console.log(`Error at IssuerEndpoint::getIssuerByAddress(): ${error}`);
        throw error;
      }
    };

    return {
      registerIssuer,
      getIssuerByAddress,
    };
  };

  const ApplicantEndpoint = () => {
    const registerApplicant = async (name: string) => {
      if (!signer) return;
      try {
        const applicantEndpoint = new ethers.Contract(
          ContractAddresses.APPLICANT_ENDPOINT,
          applicantEndpointABI,
          signer
        );
        const tx = await applicantEndpoint.registerApplicant(name);
        // Add this line if it is a creation transaction // wait for the transaction to be mined
        const receipt = await tx.wait(LOW_SECURITY_NUM_CONFIRMS);
        const data = receipt.logs[receipt.logs.length - 1].data;

        // // TODO(MVP): decide return what
        // const [applicantAddress, name, createdAt] = ethers.utils.defaultAbiCoder.decode(
        //   ["address", "string", "uint256"],
        //   data
        // );
      } catch (error) {
        console.log(`Error at ApplicantEndpoint::registerApplicant(): ${error}`);
        throw error;
      }
    };

    const getApplicantByAddress = async (applicantAddress: string) => {
      if (!provider) return;
      try {
        const applicantEndpoint = new ethers.Contract(
          ContractAddresses.APPLICANT_ENDPOINT,
          applicantEndpointABI,
          provider
        );
        return await applicantEndpoint.getApplicantByAddress(applicantAddress);
      } catch (error) {
        console.log(`Error at ApplicantEndpoint::getApplicantByAddress(): ${error}`);
        throw error;
      }
    };

    return {
      registerApplicant,
      getApplicantByAddress,
    };
  };

  const AccreditationEndpoint = () => {
    const launchAccreditation = async (
      title: string,
      createdAt: Date,
      /** Duration of Accreditation before expiry, e.g. 2 years, stored in number of seconds. Input -1 if no expiry date. */
      duration: number,
      nature: string,
      description: string
    ) => {
      // FIXME(Owen): `connectToTheMetaMask()` is unused, causing `signer` to always empty
      if (!signer) return;
      try {
        const accreditationEndpoint = new ethers.Contract(
          ContractAddresses.ACCREDITATION_ENDPOINT,
          accreditationEndpointABI,
          signer
        );
        const tx = await accreditationEndpoint.launchAccreditation(
          title,
          createdAt,
          duration,
          nature,
          description
        );
        // Wait for `HIGH_SECURITY_NUM_CONFIRMS` blocks to be mined
        const receipt = await tx.wait(HIGH_SECURITY_NUM_CONFIRMS);
        // Retrieve data from emitted event
        const data = receipt.logs[receipt.logs.length - 1].data;
        const [id, ...eventData] = ethers.utils.defaultAbiCoder.decode(
          ["uint256", "address", "string", "uint256", "uint256", "string", "string"],
          data
        );
        return id;
      } catch (error) {
        console.log(`Error at AccreditationEndpoint::launchAccreditation(): ${error}`);
        throw error;
      }
    };

    const getAccreditationById = async (id: number) => {
      if (!provider) return;
      try {
        const accreditationEndpoint = new ethers.Contract(
          ContractAddresses.ACCREDITATION_ENDPOINT,
          accreditationEndpointABI,
          provider
        );
        return await accreditationEndpoint.getAccreditationById(id);
      } catch (error) {
        console.log(`Error at AccreditationEndpoint::getAccreditationById(): ${error}`);
        throw error;
      }
    };

    const getAccreditationsByIssuerAddress = async (address: string) => {
      if (!provider) return;
      try {
        const accreditationEndpoint = new ethers.Contract(
          ContractAddresses.ACCREDITATION_ENDPOINT,
          accreditationEndpointABI,
          provider
        );
        return await accreditationEndpoint.getAccreditationsByIssuerAddress(address);
      } catch (error) {
        console.log(`Error at AccreditationEndpoint::getAccreditationsByIssuerAddress(): ${error}`);
        throw error;
      }
    };

    return {
      launchAccreditation,
      getAccreditationById,
      getAccreditationsByIssuerAddress,
    };
  };

  const CertificateEndpoint = () => {
    const issueCertificate = async (
      applicantAddress: string,
      createdAt: Date,
      accreditationId: number,
      level: string,
      eventId: string,
      remarks: string
    ) => {
      // FIXME(Owen): `connectToTheMetaMask()` is unused, causing `signer` to always empty
      if (!signer) return;
      try {
        const certificateEndpoint = new ethers.Contract(
          ContractAddresses.CERTIFICATE_ENDPOINT,
          certificateEndpointABI,
          signer
        );
        const tx = await certificateEndpoint.issueCertificate(
          applicantAddress,
          createdAt,
          accreditationId,
          level,
          eventId,
          remarks
        );
        // Wait for `HIGH_SECURITY_NUM_CONFIRMS` blocks to be mined
        const receipt = await tx.wait(HIGH_SECURITY_NUM_CONFIRMS);
        // Retrieve data from emitted event
        const data = receipt.logs[receipt.logs.length - 1].data;
        const [id, ...eventData] = ethers.utils.defaultAbiCoder.decode(
          ["uint256", "uint256", "address", "address", "uint256", "string", "string", "string"],
          data
        );
        return id;
      } catch (error) {
        console.log(`Error at CertificateEndpoint::issueCertificate(): ${error}`);
        throw error;
      }
    };

    const getCertificateById = async (id: number) => {
      if (!provider) return;
      try {
        const certificateEndpoint = new ethers.Contract(
          ContractAddresses.CERTIFICATE_ENDPOINT,
          certificateEndpointABI,
          provider
        );
        return await certificateEndpoint.getCertificateById(id);
      } catch (error) {
        console.log(`Error at CertificateEndpoint::getCertificateById(): ${error}`);
        throw error;
      }
    };

    // TODO(Good to have): implement in endpoint contract then here
    // const getCertificatesByApplicantAddress = async (address: string) => {
    //   if (!signer) return;
    //   try {
    //     const certificateEndpoint = new ethers.Contract(
    //       ContractAddresses.CERTIFICATE_ENDPOINT,
    //       certificateEndpointABI,
    //       signer
    //     );
    //     return await certificateEndpoint.getCertificatesByApplicantAddress(address);
    //   } catch (error) {
    //     console.log(`Error at CertificateEndpoint::getCertificatesByApplicantAddress(): ${error}`);
    //     throw error;
    //   }
    // };

    const getCompleteCertById = async (id: number) => {
      if (!provider) return;
      try {
        const certificateEndpoint = new ethers.Contract(
          ContractAddresses.CERTIFICATE_ENDPOINT,
          certificateEndpointABI,
          provider
        );
        return await certificateEndpoint.getCompleteCertById(id);
      } catch (error) {
        console.log(`Error at CertificateEndpoint::getCompleteCertById(): ${error}`);
        throw error;
      }
    };

    return {
      issueCertificate,
      getCertificateById,
      // getCertificatesByApplicantAddress,
      getCompleteCertById,
    };
  };

  const generateCertificate = async (certificateId: number) => {
    // TODO: refine
    try {
      return await axios.get(`/api/certificate/${certificateId}`);
    } catch (error) {
      console.log(`Error at generateCertificate(): ${error}`);
      throw error;
    }
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
