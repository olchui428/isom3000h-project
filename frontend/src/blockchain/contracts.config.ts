/**
 * Stores necessary information regarding deployed and ready-for-use contracts for front-end to use
 */

type NetworkConfigType = {
  name: string;
  rpc: string;
};

// TODO: fill in addresses of deployed contracts

// Local network
enum LocalContractsAddresses {
  ISSUER_ENDPOINT = "",
  APPLICANT_ENDPOINT = "",
  ACCREDITATION_ENDPOINT = "",
  CERTIFICATE_ENDPOINT = "",
}
const localNet: NetworkConfigType = {
  name: "local",
  rpc: "http://localhost:7545",
};

// Test network
enum TestContractsAddresses {
  ISSUER_ENDPOINT = "",
  APPLICANT_ENDPOINT = "",
  ACCREDITATION_ENDPOINT = "",
  CERTIFICATE_ENDPOINT = "",
}
const testNet: NetworkConfigType = {
  name: "polygon",
  rpc: "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78",
};

// Prod network
enum ProdContractsAddresses {
  ISSUER_ENDPOINT = "",
  APPLICANT_ENDPOINT = "",
  ACCREDITATION_ENDPOINT = "",
  CERTIFICATE_ENDPOINT = "",
}
const prodNet: NetworkConfigType = {
  name: "etherdata",
  rpc: "http://rpc.debugchain.net",
};

// Depending on which environment, comment out the other 2
export { LocalContractsAddresses as ContractAddresses, localNet as networkConfig };
// export { TestContractsAddresses as ContractAddresses, TestNet as networkConfig };
// export { ProdContractsAddresses as ContractAddresses, ProdNet as networkConfig };
