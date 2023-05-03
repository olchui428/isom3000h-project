import {
  ContractAddresses,
  accreditationEndpointABI,
  applicantEndpointABI,
  certificateEndpointABI,
  issuerEndpointABI,
} from "@/blockchain/contracts.config";
import { useAppContext } from "@/contexts/app";
import { UserType } from "@/types";
import axios from "axios";
import { ethers } from "ethers";
import { useCallback, useEffect, useMemo } from "react";

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

/**
 * Hook for managing MetaMask and interacting with Smart Contract endpoints.
 */
const useMetaMask = () => {
  const { address, setAddress, setUserType } = useAppContext();

  const connectToMetaMask = useCallback(async () => {
    // check if the browser has MetaMask installed
    if (!window.ethereum) {
      alert("Please install MetaMask first.");
      return;
    }
    // get the user's account address
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];
    setAddress(address);
    console.log(`Connected to MetaMask with address '${address}'`);
  }, [setAddress]);

  const provider = useMemo(() => {
    // only connect to the contract if the user has MetaMask installed
    if (typeof window === "undefined") return null;
    return new ethers.providers.Web3Provider(window.ethereum);
  }, []);

  const signer = useMemo(() => {
    if (!address || !provider) return null;
    return provider.getSigner();
  }, [provider, address]);

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

  const IssuerEndpoint = () => {
    const registerIssuer = async (name: string, description: string, logoUrl: string) => {
      if (!signer) return;
      try {
        const issuerEndpoint = new ethers.Contract(
          ContractAddresses.ISSUER_ENDPOINT,
          issuerEndpointABI,
          signer
        );
        const tx = await issuerEndpoint.registerIssuer(name, description, logoUrl, {
          // gasLimit: 300000,
        });
        // Add this line if it is a creation transaction // wait for the transaction to be mined
        const receipt = await tx.wait(LOW_SECURITY_NUM_CONFIRMS);

        console.log("receipt", receipt);
        console.log("events", receipt.events[0]);
        console.log("args", receipt.events[0].args);

        const registerResult = receipt.events[0].args;
        return {
          issuerAddress: registerResult.issuerAddress,
          createdAt: new Date(registerResult.createdAt),
        };
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


        const decodedAbi = ethers.utils.defaultAbiCoder.decode(
          ["address", "string", "uint256"],
          data
        );
        return {
          applicantAddress: decodedAbi[0] as string,
          createdAt: decodedAbi[2] as number,
        };
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
    connectToMetaMask,
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
