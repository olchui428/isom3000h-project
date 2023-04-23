# ISOM3000H Group Project

This repository contains the source code of a dApp designed for this HKUST blockchain course project (Spring 2023).  
Contributors (in alphabetical order):

> [CHUI, On Lam](https://github.com/olchui428)

> [HEUNG, Kai Him](https://github.com/AnsonH)

> [LEE, Ho Wan Owen](https://github.com/owen-hwlee)

## Accreditation System

The goal of this project is to create a decentralized Accreditation system for different organizations to issue Certificates to Applicants.

The specific objectives are as follows:

- To allow Accreditation Issuers to mint certificate NFTs for applicants
- To allow Issuers to view (and alter) status of Certificates and Accreditations
- To allow outsiders (e.g. potential employers) to check Certificates obtained by each Applicant
- To provide a UI for such interactions

Note that all Certificates and Accreditations issued are public (obviously because it's on a blockchain, duh).

## Terminology

This accreditation system is rather complex for a beginner, and many terms seemingly convey similar concepts. As such, the terminology used in this project shall be explained in this section:

- Issuer: An organization that defines and announces Accreditations, and issues Certificates to Applicants
- Applicant: An individual/entity that applies for an Accreditation and can receive Certificates from Issuers
- Accreditation: a type of qualification that Applicants can apply for, e.g. public examination such as HKDSE/IB/GCE and product quality standards such as ISO-XXXXX, an NFT is minted with the Issuer as owner
- Certificate: issued when an Applicant successfully qualifies for an Accreditation, equivalent to certificates issued on paper, e.g. public examination transcript and certificate of a product achieving a quality standard, an NFT is minted with the Applicant as owner

## Methodology

The scope of this project is developing a simple yet production-ready dApp that consist of smart contracts deployed to a provided test blockchain network and a UI working on a web browser with MetaMask extension activated. All blockchain interactions shall be conducted via MetaMask.

The entire project is split into 3 parts: [Smart Contract Programming](#part-1-smart-contract-programming), [Front-end Interaction](#part-2-front-end-interaction), and [Final Group Presentation](#part-3-final-group-presentation). Our team recommends that readers examine project code by following the order described in this documentation.

Steps of project setup are detailed in the [Instructions](#instructions) section.

### Part 1: Smart Contract Programming

In this part, the open-source [Hardhat framework](https://hardhat.org/docs) is adopted due to its production-readiness and flexibility.

The directory for this section is [`contract/`](contract).

This hardhat project was initialized with the command `npx hardhat`.

#### Part 1.1: Solidity Contracts

The Solidity language is used to draft smart contracts, due to its widespread popularity and availability of powerful open-source libraries such as base class contracts and tokens developed by [OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x).

The directory for this subsection is [`contracts/`](contract/contracts).

##### Part 1.1.1: Types

Types are defined in and imported from the [`contracts/types/`](contract/contracts/types) directory. 4 types are defined and used both internally, between contracts, and externally:

<TODO: add descriptions for each types>

- [`Certificate`](contract/contracts/types/nft/Certificate.sol):
- [`Accreditation`](contract/contracts/types/nft/Accreditation.sol):
- [`Issuer`](contract/contracts/types/users/Issuer.sol):
- [`Applicant`](contract/contracts/types/users/Applicant.sol):

An additional type [`CompleteCert`](contract/contracts/types/nft/Certificate.sol) has been implemented to facilitate end users to obtain complete Certificate information, along with the corresponding Accreditation info. Note that this type is only used to return data to end users, and is not used within contracts.

##### Part 1.1.2: Storage

Storage of data is a vital part of the application. The data management system should not expose mutator functions to unauthorized addresses, and should only return data if the requesting address is authorized.

Each internally used type has its own Storage system:

<TODO: add descriptions for each contract>

- [`CertificateStorage`](contract/contracts/storage/nft/CertificateStorage.sol):
- [`AccreditationStorage`](contract/contracts/storage/nft/AccreditationStorage.sol):
- [`IssuerStorage`](contract/contracts/storage/users/IssuerStorage.sol):
- [`ApplicantStorage`](contract/contracts/storage/users/ApplicantStorage.sol):

A utility library [`Set.sol`](contract/contracts/utils/Set.sol) to facilitate storage functionalities has also been implemented.

##### Part 1.1.3: NFT

Since every Certificate and Accreditation is issued or established in form of an NFT, the NFT contracts will be implemented based on the ERC721 token standard. Specifically, 2 smart contracts will inherit the ERC721 token implemented by OpenZeppelin:

<TODO: add descriptions for each contract>

- [`CertificateNFT`](contract/contracts/nft/CertificateNFT.sol):
- [`AccreditationNFT`](contract/contracts/nft/AccrediationNFT.sol):

Note that despite both Certificates and Accreditations have NFT issued to their corresponding owners to signify ownership, Certificate NFTs are much more significant than Accreditation NFTs because the degree of accountability required for Certificate owners and handlers is much higher.

After writing the smart contracts, the contracts can be compiled to EVM bytecode using the command `npm start`. After compilation, 3 directories `artifacts/`, `cache/` and `typechain-types/` will be automatically generated. Do not manually modify these files.

#### Part 1.2: Unit Testing with TypeScript

TypeScript is used for unit testing due to compatibility with hardhat and the fact that similar code can be preliminarily tested and later reused for [front-end development](#part-2-front-end-interaction).

Unit tests are written for each Storage and NFT contract, testing the correctness of functions defined in the smart contracts.

After writing the unit tests, they can be executed using the command `npm test`. A complete log of the testing process will be available in the terminal.

Alternatively, instead of directly running unit tests, coverage can be obtained with the command `npm run coverage`. Note that the course TA expects >80% coverage for our project.

Following the test-driven development pattern, test cases are written alongside contract implementation to make sure of contract feature correctness.

#### Part 1.3: Contract Deployment

A deployment script to a blockchain network is available at [`/scripts/deploy.ts`](contract/scripts/deploy.ts). For the purposes of our project, there are 3 possible networks to deploy to, each with description and corresponding commands below:

- `etherdata`: The test net provided by the course TA. Expected to be the "Production" environment for presentation demo of the group project
  - Deployment command: `npm run deploy`
- `polygon`: Since it was difficult to request for tokens on the provided `etherdata` network, our group searched for another test net to perform development on, and we found that [Polygon Mumbai](https://mumbai.polygonscan.com) provides such a service
  - Deployment command: `npm run testnet`
- `local`: A local test net created using [Ganache](https://trufflesuite.com/ganache), a GUI software that can create one-click blockchain networks
  - Deployment command: `npm run local`

Network details are configured in [`/hardhat.config.ts`](contract/hardhat.config.ts). See [Instructions](#instructions) section for more details.

### Part 2: Front-end Interaction

<TODO: add description>
<!-- This project uses the programming language Python, due to its widespread popularity and collection of powerful open-source packages. Python libraries such as `numpy`, `pandas` and `scikit-learn` are utilized to perform data preprocessing, model training, prediction and evaluation. -->

This Next.js project with TypeScript is initialized with the command `npx create-next-app@latest`.

### Part 3: Final Group Presentation

The deliverables include a set of presentation slides, a group presentation where each member has 5 minutes, and a final project report. Upon completion of the project, the materials will be uploaded to [`presentation/`](presentation).

## Repository structure

- [`README.md`](README.md): documentation for this course project
- [`.github.yml`](.github.yml): deployment scripts on GitHub (only to be added if time allows)
- [`contract/`](contract): directory that stores a hardhat project with smart contracts written in Solidity
  - [`contracts/`](contract/contracts): directory that stores a Solidity smart contract source files
    - [`types/`](contract/contracts/types): directory that stores Soldity types used in the project
      - <TODO: add descriptions>
    - [`storage/`](contract/contracts/storage): directory that stores storage contracts
      - <TODO: add descriptions>
    - [`nft/`](contract/contracts/nft): directory that stores NFT contracts
      - <TODO: add descriptions>
    - [`utils/`](contract/contracts/utils): directory that stores Soldity utility libraries and functions used in the project
      - [`Set.sol`](contract/contracts/utils/Set.sol): contains helper library to facilitate data management in storage contracts
  - [`scripts/`](contract/scripts): directory that stores deployment and other miscellaneous scripts
    - [`deploy.ts`](contract/scripts/deploy.ts): script for deployment of contracts in [`contracts/`](contract/contracts) to blockchain
  - [`test/`](contract/test): directory that stores unit tests (each test file is one-to-one for each contract in [`contracts/`](contract/contracts), with the exception of type definition files in [`contracts/types/`](contract/contracts/types))
  - `.env`: stores sensitive environment variables (not committed to GitHub)
    - Copy from [`.env.example`](contract/.env.example) and add variable values
- [`frontend/`](frontend): directory that stores a Next.js project containing a simple UI to interact with deployed contracts from [`contract/`](contract) directory
  - [`src/`](frontend/src): directory that stores source code for the project
    - [`pages/`](frontend/src/pages): directory that stores pages available in this Next.js app
      - <TODO: add description about different .tsx files and API for cert>
    - [`blockchain`](frontend/src/blockchain): directory that stores config data related to blockchain network and smart contract
      - [`abi/`](frontend/src/blockchain/abi): directory that stores abi files copied from [`contract/`](contract)
        - <TODO: add description about abi JSON files>
      - [`contracts.config.ts`](frontend/src/blockchain/contracts.config.ts): stores blockchain name, RPC, deployed contract addresses
    - [`types`](frontend/src/types): directory that stores types used in front-end
      - [`global.d.ts`](frontend/src/types/global.d.ts): defines ethereum in Window interface
  - `.env.local`: stores sensitive environment variables (not committed to GitHub)
    - Copy from [`.env.local.example`](frontend/.env.local.example) and add variable values
- [`presentation/`](presentation): directory that stores presentation slides & supplementary materials (if any) for the presentation, as well as the final report
  - <TODO: add when presentation slides are finalized>

## Instructions

1. In [`contract/`](contract):
   1. Set up the provided etherdata network in MetaMask browser extension:
      1. Add the [*network*](https://docs.msbd5017.etdchain.net/Chapter1/rpc#network-details) on MetaMask according to the instructions in [this tutorial](https://docs.msbd5017.etdchain.net/Chapter1/rpc#network-details)
      2. Obtain the account private key and place it in `.env` file in the format `PROD_PK=<Obtained Private Key>`
   2. *[Optional]* Set up a test network in MetaMask
      1. Add the [*network*](https://mumbai.polygonscan.com) on MetaMask by scrolling to the bottom, finding the MetaMask icon and clicking it
      2. Obtain the account private key and place it in `.env` file in the format `TEST_PK=<Obtained Private Key>`
   3. *[Optional]* Set up a local test network on Ganache
      1. Create a quick local network on Ganache
      2. Obtain an account private key and place it in `.env` file in the format `LOCAL_PK=<Obtained Private Key>`
      3. If the port number on Ganache is inconsistent with the default in the `.env` file, replace the field with the number shown on Ganache
   4. In [`/hardhat.config.ts`](contract/hardhat.config.ts), set up the target deployment network:

      ```typescript
      const config: HardhatUserConfig = {
        solidity: "0.8.9",
        networks: {
          etherdata: {
            url: "http://rpc.debugchain.net",
            accounts: process.env.PROD_PK !== undefined ? [process.env.PROD_PK] : [],
          },
        },
      };
      ```

      - `etherdata` is the alias of the network to be used in the deployment command (see next step)
        - Can be renamed (preferrably to your network name)
        - Other networks are set up similarly
      - `url` field stores the RPC endpoint
      - `accounts` field scrapes the account private key from the `.env` file and passes it as part of the deployment information
      - More networks are configured for project use
   5. In [`/package.json`](contract/package.json), configure the deployment command:

      ```json
      "scripts": {
        "deploy": "hardhat run scripts/deploy.ts --network etherdata",
        "testnet": "hardhat run scripts/deploy.ts --network polygon",
        "local": "hardhat run scripts/deploy.ts --network local"
      }
      ```

      - As mentioned in the previous step, `etherdata` is the network alias configured in [`/hardhat.config.ts`](contract/hardhat.config.ts)
      - For our project, the networks `polygon` and `local` are also configured
      - To deploy to `etherdata`, use `npm run deploy`
      - To deploy to `polygon`, use `npm run testnet`
      - To deploy to `local`, use `npm run local`
   6. In [`/scripts/deploy.ts`](contract/scripts/deploy.ts), configure the smart contracts to be deployed:

      ```typescript
      const Contract = await ethers.getContractFactory("ContractName");
      const contract = await Contract.deploy();
      await contract.deployed();

      console.log("Contract deployed to:", contract.address);
      ```

      - The `ethers.getContractFactory()` method takes a string argument of the contract name (i.e. the title of a Solidity contract)
        - e.g. if a `SampleContract.sol` containing `contract SampleContract {}` is to be deployed, pass `"SampleContract"` into this method
      - Add the names of all contracts to be deployed to this file
      - If a contract A calls functions from another contract B, first deploy contract B, and pass address fo contract B as an argument when deploying contract A with the .deploy() function
        - On Solidity, add contract B address as a parameter in constructor of contract A
   7. Deploy the smart contracts to a configured network using one of the npm commands specified in Step 5
   8. After successful deployment, the smart contract addresses will be printed in the terminal output, and in a log file at `/scripts/logs/`. Contract addresses can be obtained for further use
      - Note that the logs will not be committed to GitHub
   9. Details of deployed contracts can be viewed on:
      - `etherdata`: [this web UI](https://stats.debugchain.net/contract)
      - `polygon`: [this web UI](https://mumbai.polygonscan.com)
      - `local`: Ganache UI
2. In [`frontend/`](frontend):
   1. In `.env.local`, add <TODO: add variables if any>
   2. Fill in the blockchain network and deployed contract information in [`contracts.config.ts`](frontend/src/blockchain/contracts.config.ts)
   3. Copy the abi JSON files from `contract/artitacts/contracts/*`
   4. Start the frontend by the command `npm run dev` or `npm start` and go to the [dev URL](http://localhost:3000)

## Useful URLs

- ["Prod" RPC endpoint](https://rpc.debugchain.net)
- ["Prod" block explorer UI](https://stats.debugchain.net)
- ["Test" RPC endpoint](https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78)
- ["Test" block explorer UI](https://mumbai.polygonscan.com)

## Reference

- [ISOM3000H Tutorial Documentation](https://docs.msbd5017.etdchain.net)
- [ISOM3000H Lab Demo Repo (lottery system front-end)](https://github.com/sirily11/lottery-system-frontend)
- [ISOM3000H Lab Demo Repo (voting system)](https://github.com/etherdata-blockchain/simple-voting-system)

## This is the end of documentation for ISOM3000H Group Project
