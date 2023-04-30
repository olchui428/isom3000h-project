import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

// Helper function to parse PK from .env file to account array for config
const parseEnvPKToAccounts = (pk: string | undefined): string[] => {
  if (pk === undefined || pk === "") {
    return [];
  }
  // Check if the private key is a 32-byte aka length "0x" + 64 hexademical string
  if (!/^0x[0-9A-F]{64}$/i.test(pk)) {
    throw Error("Invalid private key. Please double check values input in .env file.");
  }
  return [pk];
};

/**
 * Exported config for blockchain networks to be deployed to
 */
const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    // etherdata: test net provided by TA, regarded as PROD env for our project
    etherdata: {
      url: "http://rpc.debugchain.net",
      accounts: parseEnvPKToAccounts(process.env.PROD_PK),
    },
    // polygon: test net we found ourselves, regarded as test env for our project
    polygon: {
      // SETUP
      url: "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78",
      accounts: parseEnvPKToAccounts(process.env.TEST_PK),
    },
    // local: local test network created using Ganache, regarded as dev env for our project, 7545 is default port number of Ganache test network
    local: {
      url: `http://127.0.0.1:${
        process.env.LOCAL_PORT !== undefined ? process.env.LOCAL_PORT : 7545
      }`,
      accounts: parseEnvPKToAccounts(process.env.LOCAL_PK),
    },
  },
};

export default config;
