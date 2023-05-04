import {
  ContractAddresses,
  accreditationEndpointABI,
  applicantEndpointABI,
  certificateEndpointABI,
  issuerEndpointABI,
  networkConfig,
} from "@/blockchain/contracts.config";
import { useAppContext } from "@/contexts/app";
import { UserType } from "@/types";
import { AccreditationStructOutput } from "@/types/typechain-types/contracts/endpoints/AccreditationEndpoint";
import { ApplicantStructOutput } from "@/types/typechain-types/contracts/endpoints/ApplicantEndpoint";
import {
  CertificateStructOutput,
  CompleteCertStructOutput,
} from "@/types/typechain-types/contracts/endpoints/CertificateEndpoint";
import { IssuerStructOutput } from "@/types/typechain-types/contracts/endpoints/IssuerEndpoint";
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
  const { address, setAddress, userTypes, setUserTypes } = useAppContext();

  /**
   * Connects to the MetaMask extension.
   * @returns The address, or `undefined` if failed to connect.
   */
  const connectToMetaMask = useCallback(async () => {
    // Check if the browser has MetaMask installed
    if (!window.ethereum) {
      alert("Please install MetaMask first.");
      return;
    }

    // Check if the connected network is the correct network with deployed contracts
    if (window.ethereum.networkVersion !== networkConfig.chainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: ethers.utils.hexValue(networkConfig.chainId) }],
        });
      } catch (err: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          // Add network to MetaMask
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: networkConfig.name,
                chainId: ethers.utils.hexValue(networkConfig.chainId),
                rpcUrls: [networkConfig.rpc],
              },
            ],
          });
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: ethers.utils.hexValue(networkConfig.chainId) }],
          });
        }
      }
    }

    // get the user's account address
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0] as string;
    console.log(`Connected to MetaMask with address '${address}'`);

    return address;
  }, []);

  const provider = useMemo(() => {
    // only connect to the contract if the user has MetaMask installed
    if (typeof window === "undefined" || !window.ethereum) return null;
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

  const login = async () => {
    const address = await connectToMetaMask();
    if (address) {
      setAddress(address);
      const userTypes = await getUserTypesByAddress(address);
      setUserTypes(userTypes);
    }
  };

  const logout = () => {
    setAddress("");
    setUserTypes([]);
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
        const tx = await issuerEndpoint.registerIssuer(name, description, logoUrl);
        const receipt = await tx.wait(LOW_SECURITY_NUM_CONFIRMS);
        console.log("registerIssuer receipt", receipt);

        const registerResult = receipt.events[0].args;
        const issuerAddress = registerResult.issuerAddress as string;
        const createdAt = new Date(
          (registerResult.createdAt as ethers.BigNumber).mul(1000).toNumber()
        );

        setUserTypes([...userTypes, UserType.ISSUER]);

        return {
          issuerAddress,
          createdAt,
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
        const issuer = (await issuerEndpoint.getIssuerByAddress(
          issuerAddress
        )) as IssuerStructOutput;
        return issuer.createdAt.isZero() ? undefined : issuer;
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
        const receipt = await tx.wait(LOW_SECURITY_NUM_CONFIRMS);
        console.log("registerApplicant receipt", receipt);

        const registerResult = receipt.events[0].args;
        const applicantAddress = registerResult.applicantAddress as string;
        const createdAt = new Date(
          (registerResult.createdAt as ethers.BigNumber).mul(1000).toNumber()
        );

        setUserTypes([...userTypes, UserType.APPLICANT]);

        return {
          applicantAddress,
          createdAt,
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
        const applicant = (await applicantEndpoint.getApplicantByAddress(
          applicantAddress
        )) as ApplicantStructOutput;
        return applicant.createdAt.isZero() ? undefined : applicant;
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
          Math.trunc(createdAt.getTime() / 1000),
          duration,
          nature,
          description
        );
        // Wait for `HIGH_SECURITY_NUM_CONFIRMS` blocks to be mined
        const receipt = await tx.wait(HIGH_SECURITY_NUM_CONFIRMS);
        console.log("launchAccreditation receipt", receipt);

        // Retrieve data from emitted event
        const launchEvent = receipt.events.find((e: any) => e.event === "LaunchAccreditation");
        if (!launchEvent) {
          throw new Error("No LaunchAccreditation event emitted");
        }

        const launchResult = launchEvent.args;
        const id = (launchResult.id as ethers.BigNumber).toNumber();
        return {
          id,
        };
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
        return (await accreditationEndpoint.getAccreditationById(id)) as AccreditationStructOutput;
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
        return (await accreditationEndpoint.getAccreditationsByIssuerAddress(
          address
        )) as AccreditationStructOutput[];
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
          Math.trunc(createdAt.getTime() / 1000),
          accreditationId,
          level,
          eventId,
          remarks
        );
        // Wait for `HIGH_SECURITY_NUM_CONFIRMS` blocks to be mined
        const receipt = await tx.wait(HIGH_SECURITY_NUM_CONFIRMS);
        console.log("issueCertificate receipt", receipt);

        // Retrieve data from emitted event
        const issueEvent = receipt.events.find((e: any) => e.event === "IssueCertificate");
        if (!issueEvent) {
          throw new Error("No IssueCertificate event emitted");
        }

        const issueResult = issueEvent.args;
        const id = (issueResult.id as ethers.BigNumber).toNumber();
        return { id };
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
        return (await certificateEndpoint.getCertificateById(id)) as CertificateStructOutput;
      } catch (error) {
        console.log(`Error at CertificateEndpoint::getCertificateById(): ${error}`);
        throw error;
      }
    };

    const getCertificatesByApplicantAddress = async (address: string) => {
      if (!provider) return;
      try {
        const certificateEndpoint = new ethers.Contract(
          ContractAddresses.CERTIFICATE_ENDPOINT,
          certificateEndpointABI,
          provider
        );
        return (await certificateEndpoint.getCertificatesByApplicantAddress(
          address
        )) as CertificateStructOutput[];
      } catch (error) {
        console.log(`Error at CertificateEndpoint::getCertificatesByApplicantAddress(): ${error}`);
        throw error;
      }
    };

    const getCompleteCertById = async (id: number) => {
      if (!provider) return;
      try {
        const certificateEndpoint = new ethers.Contract(
          ContractAddresses.CERTIFICATE_ENDPOINT,
          certificateEndpointABI,
          provider
        );
        return (await certificateEndpoint.getCompleteCertById(id)) as CompleteCertStructOutput;
      } catch (error) {
        console.log(`Error at CertificateEndpoint::getCompleteCertById(): ${error}`);
        throw error;
      }
    };

    return {
      issueCertificate,
      getCertificateById,
      getCertificatesByApplicantAddress,
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

  const getUserTypesByAddress = async (address: string | undefined): Promise<UserType[]> => {
    if (!address) return [];
    const userTypes: UserType[] = [];
    try {
      const issuer = await IssuerEndpoint().getIssuerByAddress(address);
      if (issuer) userTypes.push(UserType.ISSUER);

      const applicant = await ApplicantEndpoint().getApplicantByAddress(address);
      if (applicant) userTypes.push(UserType.APPLICANT);

      return userTypes;
    } catch (error: any) {
      console.log("Error while getting user type", error);
      return [];
    }
  };

  return {
    login,
    logout,
    issuerEndpoint: IssuerEndpoint(),
    applicantEndpoint: ApplicantEndpoint(),
    accreditationEndpoint: AccreditationEndpoint(),
    certificateEndpoint: CertificateEndpoint(),
    generateCertificate,
    getUserTypesByAddress,
  };
};

export default useMetaMask;
