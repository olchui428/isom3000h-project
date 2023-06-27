# ISOM3000H (aka MSBD5017) Group Project

This repository contains the source code of a dApp designed for this HKUST blockchain course project (Spring 2023).  
Contributors (in alphabetical order):

> [CHUI, On Lam](https://github.com/olchui428)  
> [HEUNG, Kai Him](https://github.com/AnsonH)  
> [LEE, Ho Wan Owen](https://github.com/owen-hwlee)

Note that this course is actually MSBD5017, an MSc Big Data Technology masters level course, in disguise.

## Accreditation System

The goal of this project is to create a decentralized Accreditation system for different organizations (Issuers) to issue Certificates to Applicants.

The specific objectives are as follows:

- To allow Accreditation Issuers to mint certificate NFTs for applicants
- To allow Issuers to view (and alter) status of Certificates and Accreditations
- To allow outsiders (e.g. potential employers) to check Certificates obtained by each Applicant
- To provide a UI for such interactions

Note that all Certificates and Accreditations issued are public (obviously because it's on a blockchain, duh).

## UI Screenshots

![home page](https://github.com/olchui428/isom3000h-project/assets/57580593/9402a309-aa09-4d9d-8861-632c556d9d3e)

![issuer details](https://github.com/olchui428/isom3000h-project/assets/57580593/2410b10b-d443-40ba-b803-f058bd877c9f)

## Terminology

This accreditation system is rather complex for a beginner, and many terms seemingly convey similar concepts. As such, the terminology used in this project shall be explained in this section:

- **Issuer**: An organization that defines and announces Accreditations, and issues Certificates to Applicants
- **Applicant**: An individual/entity that applies for an Accreditation and can receive Certificates from Issuers
- **Accreditation**: a type of qualification that Applicants can apply for, e.g. public examinations such as HKDSE/IB/GCE and product quality standards such as ISO-XXXXX, an NFT is minted with the Issuer as owner
- **Certificate**: issued when an Applicant successfully qualifies for an Accreditation, equivalent to certificates issued on paper, e.g. public examination transcript and certificate of a product achieving a quality standard, an NFT is minted with the Applicant as owner

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

The smart contracts in this project adopt a modular design, meaning that each contract shall only serve one specific purpose, making it more scalable and easier to maintain and debug. Each "microservice" apart from the endpoint contracts have implemented access control such that only explicitly authorized contract addresses can call functions from and interact with each contract.

##### Part 1.1.1: Types

Types are defined in and imported from the [`contracts/types/`](contract/contracts/types) directory. 4 types are defined and used both internally, between contracts, and externally:

- [`Certificate`](contract/contracts/types/nft/Certificate.sol)
- [`Accreditation`](contract/contracts/types/nft/Accreditation.sol)
- [`Issuer`](contract/contracts/types/users/Issuer.sol)
- [`Applicant`](contract/contracts/types/users/Applicant.sol)

An additional type [`CompleteCert`](contract/contracts/types/CompleteCert.sol) has been implemented to facilitate end users to obtain complete Certificate information, along with the corresponding Accreditation info. Note that this type is only used to return data to end users, and is not used within Contracts.

##### Part 1.1.2: Storage

Storage of data is a vital part of the application. The data management system formed by the following 4 storage Contracts acts as a database. These Contracts should only return data if the requesting address is an authorized Contract address.

Each internally used type has its own Storage system:

- [`IssuerStorage`](contract/contracts/storage/users/IssuerStorage.sol)
- [`ApplicantStorage`](contract/contracts/storage/users/ApplicantStorage.sol)
- [`AccreditationStorage`](contract/contracts/storage/nft/AccreditationStorage.sol)
- [`CertificateStorage`](contract/contracts/storage/nft/CertificateStorage.sol)

The defined data structure is designed to mirror relational database paradigm to reduce storage costs and maintain data integrity.

##### Part 1.1.3: NFT

Since every Certificate and Accreditation is issued or established in form of an NFT, the NFT Contracts will be implemented based on the ERC721 token standard. Specifically, 2 smart Contracts will inherit the ERC721 token implemented by OpenZeppelin:

- [`CertificateNFT`](contract/contracts/nft/CertificateNFT.sol)
- [`AccreditationNFT`](contract/contracts/nft/AccrediationNFT.sol)

Note that despite both Certificates and Accreditations have NFT issued to their corresponding owners to signify ownership, Certificate NFTs are much more significant than Accreditation NFTs because the degree of accountability required for Certificate owners and handlers is much higher.

##### Part 1.1.4: Endpoints

To clearly segregate the responsibilities of each Contract, each Contract should only have one functionality. Hence, an endpoint Contract is created for each major use case. Functions in Contracts documented in above sections will not be callable by any addresses other than the explicitly authorized Contracts addresses. Instead, functions in these endpoint Contracts will serve as API endpoints or entry points to our system. The endpoint Contracts are as follows:

- [`IssuerEndpoint`](contract/contracts/endpoints/IssuerEndpoint.sol)
- [`ApplicantEndpoint`](contract/contracts/endpoints/ApplicantEndpoint.sol)
- [`AccreditationEndpoint`](contract/contracts/endpoints/AccreditationEndpoint.sol)
- [`CertificateEndpoint`](contract/contracts/endpoints/CertificateEndpoint.sol)

##### Part 1.1.5: Compilation

After writing the smart Contracts, the Contracts can be compiled to EVM bytecode using the command `npm start`. The unit test command `npm test`, coverage command `npm run coverage` and deployment command `npm run deploy:<insert environment>` will also compile the Contracts before performing the corresponding tasks.

After compilation, 3 directories `contract/artifacts/`, `contract/cache/` and `frontend/src/types/typechain-types/` will be automatically generated. Do not manually modify these files.

#### Part 1.2: Unit Testing with TypeScript

TypeScript is used for unit testing due to compatibility with hardhat and the fact that similar code can be preliminarily tested and later reused for [front-end development](#part-2-front-end-interaction).

The directory for this subsection is [`test/`](contract/test).

Unit tests are written for each Storage, NFT, and Endpoint Contract, testing the correctness of functions defined in the smart Contracts.

After writing the unit tests, they can be executed using the command `npm test`. A complete log of the testing process will be available in the terminal.

Alternatively, instead of directly running unit tests, coverage can be obtained with the command `npm run coverage`, and the generated files can be removed with the command `npm run clean:coverage`. Note that the course TA expects >80% coverage for our project.

Following the test-driven development pattern, test cases are written alongside Contract implementation to make sure of Contract feature correctness.

#### Part 1.3: Contract Deployment

A deployment script to a blockchain network is available at [`/scripts/deploy.ts`](contract/scripts/deploy.ts). For the purposes of our project, there are 3 possible networks to deploy to, each with description and corresponding commands below:

- `etherdata`: The test net provided by the course TA. Expected to be the "Production" environment for presentation demo of the group project
  - Deployment command: `npm run deploy:prod`
- `polygon`: Since it was difficult to request for tokens on the provided `etherdata` network, our group searched for another test net to perform development on, and we found that [Polygon Mumbai](https://mumbai.polygonscan.com) provides such a service
  - Deployment command: `npm run deploy:testnet`
- `local`: A local test net created using [Ganache](https://trufflesuite.com/ganache), a GUI software that can create one-click blockchain networks
  - Deployment command: `npm run deploy:local`

Network details are configured in [`/hardhat.config.ts`](contract/hardhat.config.ts). See [Instructions](#instructions) section for more details.

In case of errors or overwritten contracts, clean up of compiled files can be performed by the command `npm run clean:build`.

During deployment, logs are generated, printed to console and saved into a log file at `/scripts/logs/`. The command `npm run clean:logs` can be used to delete all log files.

A very simple "checking" script at [`/scripts/check.ts`](contract/scripts/check.ts) is created for easy and rudimentary testing on whether or not the smart contracts can be called and interacted with correctly from clients. The script simulates a simple live demo by calling Endpoint contract functions, and can be used as a seeding script with further fine-tuning. The command `npm run check:<insert environment>` can be used to execute this script.

The command `npm run clean` can be used to clean up all generated files.

### Part 2: Front-end Interaction

This Next.js project with TypeScript is initialized with the command `npx create-next-app@latest`, and is styled with the Material UI package.

The page contains several pages for registering, launching and viewing accreditations, and issuing and viewing certificates. The typical workflow is as follows:

- Issuer:
  1. Connect to MetaMask to login
  2. Register as an issuer
  3. Launch an accreditation
  4. Issue a certificate to an applicant
- Applicant:
  1. Connect to MetaMask to login
  2. Register as an applicant
  3. View certificates that he/she has received
- Outsider (Guest):
  - Search an accreditation, issuer, certificate, or applicant

An API endpoint is also designed to dynamically generate certificate image given a certificate ID.

### Part 3: Final Group Presentation

The deliverables include a set of presentation slides, a live group presentation where each member has 5 minutes, and a final project report. The materials have been uploaded to [`presentation/`](presentation).

## Repository structure

- [`README.md`](README.md): documentation for this course project
- [`contract/`](contract): directory that stores a hardhat project with smart contracts written in Solidity
  - [`contracts/`](contract/contracts): directory that stores a Solidity smart contract source files
    - [`types/`](contract/contracts/types): directory that stores Solidity types used in the project
      - [`nft/`](contract/contracts/types/nft): directory that stores Solidity types for NFT entities
        - [`Accreditation.sol`](contract/contracts/types/nft/Accreditation.sol): Accreditation type definition
        - [`Certificate.sol`](contract/contracts/types/nft/Certificate.sol): Certificate type definition
      - [`users/`](contract/contracts/types/users): directory that stores Solidity types for users
        - [`Issuer.sol`](contract/contracts/types/users/Issuer.sol): Issuer type definition
        - [`Applicant.sol`](contract/contracts/types/users/Applicant.sol): Applicant type definition
      - [`CompleteCert.sol`](contract/contracts/types/CompleteCert.sol): a helper type that contains entire details for a certificate
    - [`storage/`](contract/contracts/storage): directory that stores storage contracts
      - [`nft/`](contract/contracts/storage/nft): directory that stores NFT entities data
        - [`AccreditationStorage.sol`](contract/contracts/storage/nft/AccreditationStorage.sol): stores Accreditation data
        - [`CertificateStorage.sol`](contract/contracts/storage/nft/CertificateStorage.sol): stores Certificate data
      - [`users/`](contract/contracts/storage/users): directory that stores users data
        - [`IssuerStorage.sol`](contract/contracts/storage/users/IssuerStorage.sol): stores Issuer data
        - [`ApplicantStorage.sol`](contract/contracts/storage/users/ApplicantStorage.sol): stores Applicant data
    - [`nft/`](contract/contracts/nft): directory that stores NFT contracts
      - [`AccreditationNFT.sol`](contract/contracts/nft/AccreditationNFT.sol): Accreditation NFT contract compliant with the ERC721 standard
      - [`CertificateNFT.sol`](contract/contracts/nft/CertificateNFT.sol): Certificate NFT contract compliant with the ERC721 standard
    - [`endpoints/`](contract/contracts/endpoints): directory that stores endpoint contracts
      - [`IssuerEndpoint.sol`](contract/contracts/endpoints/IssuerEndpoint.sol): endpoint contract containing Issuer functions
      - [`ApplicantEndpoint.sol`](contract/contracts/endpoints/ApplicantEndpoint.sol): endpoint contract containing Applicant functions
      - [`AccreditationEndpoint.sol`](contract/contracts/endpoints/AccreditationEndpoint.sol): endpoint contract containing Accreditation functions
      - [`CertificateEndpoint.sol`](contract/contracts/endpoints/CertificateEndpoint.sol): endpoint contract containing Certificate functions
  - [`scripts/`](contract/scripts): directory that stores deployment and other miscellaneous scripts
    - [`deploy.ts`](contract/scripts/deploy.ts): script for deployment of contracts in [`contracts/`](contract/contracts) to blockchain
    - [`check.ts`](contract/scripts/check.ts): script to simulate a live demo, can be used for seeding purposes
  - [`test/`](contract/test): directory that stores unit tests (each test file is one-to-one for each contract in [`contracts/`](contract/contracts), with the exception of type definition files in [`contracts/types/`](contract/contracts/types))
  - `.env`: stores sensitive environment variables (not committed to GitHub)
    - Copy from [`.env.example`](contract/.env.example) and add variable values
  - [`hardhat.config.ts`](contract/hardhat.config.ts): stores environment settings and loads environment variables from `.env` for `hardhat` to use
- [`frontend/`](frontend): directory that stores a Next.js project containing a simple UI to interact with deployed contracts from [`contract/`](contract) directory
  - [`src/`](frontend/src): directory that stores source code for the project
    - [`components/`](frontend/src/components): directory that stores reusable component designs
    - [`pages/`](frontend/src/pages): directory that stores pages available in this Next.js app
    - [`blockchain/`](frontend/src/blockchain): directory that stores config data related to blockchain network and smart contract
      - [`abi/`](frontend/src/blockchain/abi): directory that stores ABI files copied from [`contract/`](contract)
        - [`IssuerEndpoint.json`](frontend/src/blockchain/abi/IssuerEndpoint.json): ABI for IssuerEndpoint
        - [`ApplicantEndpoint.json`](frontend/src/blockchain/abi/ApplicantEndpoint.json): ABI for ApplicantEndpoint
        - [`AccreditationEndpoint.json`](frontend/src/blockchain/abi/AccreditationEndpoint.json): ABI for AccreditationEndpoint
        - [`CertificateEndpoint.json`](frontend/src/blockchain/abi/CertificateEndpoint.json): ABI for CertificateEndpoint
      - [`contracts.config.ts`](frontend/src/blockchain/contracts.config.ts): stores blockchain name, RPC, deployed contract addresses
    - [`contexts/`](frontend/src/contexts): directory that stores React contexts
      - [`app.tsx`](frontend/src/contexts/app.tsx): context that saves user status
    - [`hooks/`](frontend/src/hooks): directory that stores React hooks
      - [`useMetaMask/`](frontend/src/hooks/useMetaMask): directory that stores the useMetaMask hook
        - [`index.ts`](frontend/src/hooks/useMetaMask/index.ts): implementation of the useMetaMask hook. Essentially all interactions with the MetaMask browser extension and the blockchain are implemented here, only exposing high level descriptive function names to the frontend developers
    - [`theme/`](frontend/src/theme): directory that stores MUI theme definition
      - [`muiTheme.ts`](frontend/src/theme/muiTheme.ts): defines the Material UI theme for this project
    - [`types/`](frontend/src/types): directory that stores types used in front-end
      - [`global.d.ts`](frontend/src/types/global.d.ts): defines ethereum in Window interface
      - [`index.ts`](frontend/src/types/index.ts): defines types and enums used in the project
    - [`utils/`](frontend/src/utils/): directory that stores utility functions
      - [`generateCertificate.ts`](frontend/src/utils/generateCertificate.ts): extracts the dynamic certificate generation process
  - [`public/`](frontend/public): directory that stores statically served files
    - [`img/`](frontend/public/img): directory that stores images used in the project
      - [`certificate_template.png`](frontend/public/img/certificate_template.png): certificate template image
      - [`certificate_template_smaller.png`](frontend/public/img/certificate_template_smaller.png): same certificate template image, but of smaller dimension
      - [`certificate_template_even_smaller.png`](frontend/public/img/certificate_template_even_smaller.png): same certificate template image, but of even smaller dimension. This version is currently used to in dynamic certificate generation due to size limitation of Vercel deployment
- [`presentation/`](presentation): directory that stores presentation slides & supplementary materials (if any) for the presentation, as well as the final report
  - [`ISOM3000H_Presentation.pptx`](presentation/ISOM3000H_Presentation.pptx): PPT slides used in the final presentation
  - [`ISOM3000H_Report.docx`](presentation/ISOM3000H_Report.docx): final report of the project

## Instructions

1. Install dependencies and other setup scripts:

   ```bash
   cd contract && npm install && npm start
   cd ../frontend && npm install
   ```

2. In [`contract/`](contract):

   1. Set up the provided etherdata network in MetaMask browser extension:
      1. Add the [_network_](https://docs.msbd5017.etdchain.net/Chapter1/rpc#network-details) on MetaMask according to the instructions in [this tutorial](https://docs.msbd5017.etdchain.net/Chapter1/rpc#network-details)
      2. Obtain the [account private key](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key) and place it in `contract/.env` file in the format `PROD_PK=0x<Obtained Private Key>`
         > **Note**: Remember to add `0x` in front of the private key
   2. _[Optional]_ Set up a test network in MetaMask
      1. Add the [_network_](https://mumbai.polygonscan.com) on MetaMask by scrolling to the bottom, finding the "Add Mumbai Network" button at the bottom right corner and clicking it
      2. Obtain the account private key and place it in `contract/.env` file in the format `TEST_PK=0x<Obtained Private Key>`
      3. To obtain test tokens, visit [Polygon Faucet](https://faucet.polygon.technology/).
   3. _[Optional]_ Set up a local test network on Ganache
      1. Create a quick local network on Ganache
      2. Obtain an account private key and place it in `contract/.env` file in the format `LOCAL_PK=0x<Obtained Private Key>`
      3. If the port number on Ganache is inconsistent with the default in the `contract/.env` file, replace the field with the number shown on Ganache
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
        "deploy:prod": "hardhat run scripts/deploy.ts --network etherdata",
        "deploy:testnet": "hardhat run scripts/deploy.ts --network polygon",
        "deploy:local": "hardhat run scripts/deploy.ts --network local"
      }
      ```

      - As mentioned in the previous step, `etherdata` is the network alias configured in [`/hardhat.config.ts`](contract/hardhat.config.ts)
      - For our project, the test networks `polygon` and `local` are also configured
      - To deploy to `etherdata`, use `npm run deploy:prod`
      - To deploy to `polygon`, use `npm run deploy:testnet`
      - To deploy to `local`, use `npm run deploy:local`

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
      - If a contract A calls functions from another contract B, first deploy contract B, and pass address of contract B as an argument when deploying contract A with the .deploy() function
        - On Solidity, add contract B address as a parameter in constructor of contract A
        - If contracts are codependent, create another setup function in contract A to store deployed address of contract B

   7. Deploy the smart contracts to a configured network using one of the npm commands specified in Step 5
   8. After deployment, the smart contract addresses will be printed in the terminal output, and in a log file at `/scripts/logs/`. Contract addresses can be obtained for further use
      - Note that the logs will not be committed to GitHub
   9. Details of deployed contracts can be viewed on:
      - `etherdata`: [this web UI](https://stats.debugchain.net/contract)
      - `polygon`: [this web UI](https://mumbai.polygonscan.com)
      - `local`: Ganache UI

3. In [`frontend/`](frontend):
   1. Fill in the blockchain network and deployed contract information in [`contracts.config.ts`](frontend/src/blockchain/contracts.config.ts)
   2. Copy the abi JSON files for Endpoint contracts from `contract/artitacts/contracts/*` to [`frontend/src/blockchain/abi/`](frontend/src/blockchain/abi)
   3. Start the frontend by the command `npm run dev` or `npm start` and go to the [dev URL](http://localhost:3000)

## Useful URLs

- ["Prod" RPC endpoint](https://rpc.debugchain.net)
- ["Prod" block explorer UI](https://stats.debugchain.net)
- ["Test" RPC endpoint](https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78)
- ["Test" block explorer UI](https://mumbai.polygonscan.com)

## References

- [ISOM3000H Tutorial Documentation](https://docs.msbd5017.etdchain.net)
- [ISOM3000H Lab Demo Repo (lottery system front-end)](https://github.com/sirily11/lottery-system-frontend)
- [ISOM3000H Lab Demo Repo (voting system)](https://github.com/etherdata-blockchain/simple-voting-system)
