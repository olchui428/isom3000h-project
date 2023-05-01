/**
 * Stores necessary information regarding deployed and ready-for-use contracts for front-end to use
 */

import accreditationEndpoint from "@/blockchain/abi/AccreditationEndpoint.json";
import applicantEndpoint from "@/blockchain/abi/ApplicantEndpoint.json";
import certificateEndpoint from "@/blockchain/abi/CertificateEndpoint.json";
import issuerEndpoint from "@/blockchain/abi/IssuerEndpoint.json";

// Import and abstractionize endpoint contract ABIs
export const issuerEndpointABI = issuerEndpoint.abi;
export const applicantEndpointABI = applicantEndpoint.abi;
export const accreditationEndpointABI = accreditationEndpoint.abi;
export const certificateEndpointABI = certificateEndpoint.abi;

type NetworkConfigType = {
  name: string;
  rpc: string;
};

// TODO: fill in addresses of deployed contracts

/**
 * Local network.
 *
 * To obtain the addresses, run `npm run deploy:local` in `contract/` folder.
 */
enum LocalContractsAddresses {
  // SETUP
  ISSUER_ENDPOINT = "",
  APPLICANT_ENDPOINT = "",
  ACCREDITATION_ENDPOINT = "",
  CERTIFICATE_ENDPOINT = "",
}
const localNet: NetworkConfigType = {
  // SETUP
  name: "local",
  rpc: "http://localhost:7545",
};

// Test network
enum TestContractsAddresses {
  // SETUP
  ISSUER_ENDPOINT = "",
  APPLICANT_ENDPOINT = "",
  ACCREDITATION_ENDPOINT = "",
  CERTIFICATE_ENDPOINT = "",
}
const testNet: NetworkConfigType = {
  // SETUP
  name: "polygon",
  rpc: "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78",
};

// Prod network
enum ProdContractsAddresses {
  // SETUP
  ISSUER_ENDPOINT = "",
  APPLICANT_ENDPOINT = "",
  ACCREDITATION_ENDPOINT = "",
  CERTIFICATE_ENDPOINT = "",
}
const prodNet: NetworkConfigType = {
  // SETUP
  name: "etherdata",
  rpc: "http://rpc.debugchain.net",
};

// SETUP: Depending on which environment, comment out the other 2
export { LocalContractsAddresses as ContractAddresses, localNet as networkConfig };
// export { TestContractsAddresses as ContractAddresses, TestNet as networkConfig };
// export { ProdContractsAddresses as ContractAddresses, ProdNet as networkConfig };
