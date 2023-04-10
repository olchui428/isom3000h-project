# ISOM3000H Group Project

This repository contains the source code of a dApp designed for this HKUST blockchain course project (Spring 2023).  
Contributors (in alphabetical order):

> [CHUI, On Lam](https://github.com/olchui428)

> [HEUNG, Kai Him](https://github.com/AnsonH)

> [LEE, Ho Wan Owen](https://github.com/owen-hwlee)

## <TODO: add project topic and goals>

The goal of this project is to <TODO: add description>.

The specific objectives are as follows:

- <TODO: add objectives>

## Methodology

The scope of this project is developing a simple yet production-ready dApp that consist of smart contracts deployed a provided test blockchain network and a UI working on a web browser with MetaMask extension activated. All blockchain interactions shall be conducted via MetaMask.

The entire project is split into 3 parts: [Smart Contract Programming](#part-1-smart-contract-programming), [Front-end Interaction](#part-2-front-end-interaction), and [Final Group Presentation](#part-3-final-group-presentation). Our team recommends that readers examine project code by following the order described in this documentation.

Steps of project setup are detailed in the [Instructions](#instructions) section.

### Part 1: Smart Contract Programming

In this part, the open-source [Hardhat framework](https://hardhat.org/docs) is adopted due to its production-readiness and flexibility.

The directory for this section is [`contract/`](contract).

This hardhat project was initialized with the command `npx hardhat`.

#### Part 1.1: Solidity Contracts

The Solidity language is used to draft smart contracts, due to its widespread popularity and availability of powerful open-source libraries such as base class contracts and tokens developed by [OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/).

The directory for this subsection is [`contracts/`](contract/contracts).

<TODO: add description>

<TODO: if use Tokens, include description about ERC20 or ERC721>

Types are defined in and imported from the [`contracts/types/`](contract/contracts/types) directory.

After writing the smart contracts, the contracts can be compiled to EVM bytecode using the command `npm start`. After compilation, 2 directories `artifacts/` and `cache/` will be automatically generated. Do not manually modify these files.

#### Part 1.2: Unit Testing with TypeScript

TypeScript is used for unit testing due to compatibility with hardhat and the fact that similar code can be preliminarily tested and later reused for [front-end development](#part-2-front-end-interaction).

<TODO: add description>
<!-- This project uses the programming language Python, due to its widespread popularity and collection of powerful open-source packages. Python libraries such as `numpy`, `pandas` and `scikit-learn` are utilized to perform data preprocessing, model training, prediction and evaluation. -->

After writing the unit tests, they can be executed using the command `npm test`. A complete log of the testing process will be available in the terminal.

Alternatively, instead of directly running unit tests, coverage can be obtained with the command `npm run coverage`. Note that the TA expects >80% coverage for our project.

#### Part 1.3: Contract Deployment

A deployment script to the provided test network is available at [`/scripts/deploy.ts`](contract/scripts/deploy.ts), and can be executed using the command `npm run deploy`. Network details are configured in [`/hardhat.config.ts`](contract/hardhat.config.ts). See [Instructions](#instructions) section for more details.

### Part 2: Front-end Interaction

<TODO: add description>
<!-- This project uses the programming language Python, due to its widespread popularity and collection of powerful open-source packages. Python libraries such as `numpy`, `pandas` and `scikit-learn` are utilized to perform data preprocessing, model training, prediction and evaluation. -->

This Next.js project is initialized with the command `npx create-next-app@latest`.

### Part 3: Final Group Presentation

The deliverables include a set of presentation slides, a group presentation where each member has 5 minutes, and a final project report. Upon completion of the project, the materials will be uploaded to [`presentation/`](presentation).

## Repository structure

- [`README.md`](README.md): documentation for this course project
- [`.github.yml`](.github.yml): deployment scripts on GitHub (only to be added if time allows)
- [`contract/`](contract): directory that stores a hardhat project with smart contracts written in Solidity
  - [`contracts/`](contract/contracts): directory that stores a Solidity smart contract source files
    - [`types/`](contract/contracts/types): directory that stores Soldity types used in the project
      - <TODO: add descriptions>
    - [`Storage.sol`](contract/contracts/Storage.sol): Solidity smart contract that handles storage
    - <TODO: add descriptions>
  - [`scripts/`](contract/scripts): directory that stores deployment and other miscellaneous scripts
    - [`deploy.ts`](contract/scripts/deploy.ts): script for deployment of contracts in [`contracts/`](contract/contracts) to blockchain
  - [`test/`](contract/test): directory that stores unit tests (each test file is one-to-one for each contract in [`contracts/`](contract/contracts))
  - `.env`: stores sensitive environment variables (not committed to GitHub)
- [`frontend/`](frontend): directory that stores a Next.js project containing a simple UI to interact with deployed contracts from [`contract/`](contract) directory
  - [`src/`](frontend/src): directory that stores source code for the project
    - [`pages/`](frontend/src/pages): directory that stores pages available in this Next.js app
      - <TODO: add description about different .tsx files>
    - [`abi/`](frontend/src/abi): directory that stores abi files copied from [`contract/`](contract)
      - <TODO: add description about abi JSON files>
  - `.env.local`: stores sensitive environment variables (not committed to GitHub)
- [`presentation/`](presentation): directory that stores presentation slides & supplementary materials (if any) for the presentation, as well as the final report
  - <TODO: add when presentation slides are finalized>

## Instructions

1. In [`contract/`](contract):
   1. Set up the provided etherdata network in MetaMask browser extension:
      1. Add the [*Test endpoint*](https://docs.msbd5017.etdchain.net/Chapter1/rpc#network-details) on MetaMask according to the instructions in [this tutorial](https://docs.msbd5017.etdchain.net/Chapter1/rpc#network-details)
      2. Obtain the account private key and place it in `.env` file in the format `PK=<Obtained Private Key>`
   2. In [`/hardhat.config.ts`](contract/hardhat.config.ts), set up the target deployment network:

      ```typescript
      const config: HardhatUserConfig = {
        solidity: "0.8.9",
        networks: {
          etherdata: {
            url: "http://rpc.debugchain.net",
            accounts: process.env.PK !== undefined ? [process.env.PK] : [],
          },
        },
      };
      ```

      - `etherdata` is the alias of the network to be used in the deployment command (see next step)
        - Can be renamed (preferrably to your network name)
      - `url` field stores the RPC test endpoint
      - `accounts` field scrapes the account private key from the `.env` file and passes it as part of the deployment information
   3. In [`/package.json`](contract/package.json), configure the deployment command:

      ```json
      "scripts": {
        "deploy": "hardhat run scripts/deploy.ts --network etherdata"
      }
      ```

      - As mentioned in the previous step, `etherdata` is the network alias configured in [`/hardhat.config.ts`](contract/hardhat.config.ts)
   4. In [`/scripts/deploy.ts`](contract/scripts/deploy.ts), configure the smart contracts to be deployed:

      ```typescript
      const Contract = await ethers.getContractFactory("ContractName");
      const contract = await Contract.deploy();
      await contract.deployed();

      console.log("Contract deployed to:", contract.address);
      ```

      - The `ethers.getContractFactory()` method takes a string argument of the contract name (i.e. the title of a Solidity contract)
        - e.g. if a `SampleContract.sol` containing `contract SampleContract {}` is to be deployed, pass `"SampleContract"` into this method
      - Add the names of all contracts to be deployed to this file
   5. Deploy the smart contracts to the test network using the command `npm run deploy`
   6. After successful deployment, the smart contract addresses will be printed in the terminal output. Store the contract addresses for further use
   7. Details of deployed contracts can be viewed in [this web UI](https://stats.debugchain.net/contract)
2. In [`frontend/`](frontend):
   1. In `.env`, add <TODO: add instructions regarding storing contract address, either in `.env` or another file e.g. `config.ts`>
   2. Copy the abi files from <TODO: add instructions regarding abi and types>
   3. Start the frontend by the command `npm run dev` or `npm start` and go to the [dev website](http://localhost:3000)

## Useful URLs

- [Test RPC endpoint](https://rpc.debugchain.net)
- [Test block explorer UI](https://stats.debugchain.net/)

## Reference

- [ISOM3000H Tutorial Documentation](https://docs.msbd5017.etdchain.net)
- [ISOM3000H Lab Demo Repo](https://github.com/etherdata-blockchain/simple-voting-system)

## This is the end of documentation for ISOM3000H Group Project
