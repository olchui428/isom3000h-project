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
  chainId: number;
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
  chainId: 1337,
};

// Test network
enum TestContractsAddresses {
  // SETUP
  // Last contract change: Commit f7fc8c8f66d286f0c8d133b9389f0354035c501f
  ISSUER_ENDPOINT = "0xb2C60Af8e0A6B7607845708C219D1e4733998877",
  APPLICANT_ENDPOINT = "0xc6F208422A3F70dD9e4dc9B257597Ac40E739D72",
  ACCREDITATION_ENDPOINT = "0x1E430a2bC3c3c5eFf0d94820B819a43d87753d4D",
  CERTIFICATE_ENDPOINT = "0xfa333F2dE4461875eEBb427109a252705e57DbFB",
}
const testNet: NetworkConfigType = {
  // SETUP
  name: "polygon",
  rpc: "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78",
  chainId: 80001,
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
  chainId: 8348,
};

// SETUP: Depending on which environment, comment out the other 2
// export { LocalContractsAddresses as ContractAddresses, localNet as networkConfig };
export { TestContractsAddresses as ContractAddresses, testNet as networkConfig };
// export { ProdContractsAddresses as ContractAddresses, prodNet as networkConfig };
