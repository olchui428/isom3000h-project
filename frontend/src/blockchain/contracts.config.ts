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
  USERS_CONTRACT = "",
  ACCREDITATION_NFT = "",
  CERTIFICATE_NFT = "",
}
const localNet: NetworkConfigType = {
  name: "local",
  rpc: "http://localhost:7545",
};

// Test network
enum TestContractsAddresses {
  USERS_CONTRACT = "",
  ACCREDITATION_NFT = "",
  CERTIFICATE_NFT = "",
}
const testNet: NetworkConfigType = {
  name: "polygon",
  rpc: "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78",
};

// Prod network
enum ProdContractsAddresses {
  USERS_CONTRACT = "",
  ACCREDITATION_NFT = "",
  CERTIFICATE_NFT = "",
}
const prodNet: NetworkConfigType = {
  name: "etherdata",
  rpc: "http://rpc.debugchain.net",
};

// Comment 2, leave 1
export { LocalContractsAddresses as ContractAddresses, localNet as networkConfig };
// export { TestContractsAddresses as ContractAddresses, TestNet as networkConfig };
// export { ProdContractsAddresses as ContractAddresses, ProdNet as networkConfig };
