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

This project adopts <TODO: add description>
<!-- classical data mining and machine learning models, specifically focusing on supervised learning as our objective is to predict potential defaultees.  
This project uses the programming language Python, due to its widespread popularity and collection of powerful open-source packages. Python libraries such as `numpy`, `pandas` and `scikit-learn` are utilized to perform data preprocessing, model training, prediction and evaluation.  
The entire project is split into 2 parts: data preprocessing and models analysis. Our team recommends that readers examine project code by following the order described in this documentation. -->

### Part 1: Smart Contract Programming

<TODO: add description>
<!-- One distinct characteristic of our dataset is that it is not divided into train or test sets. Therefore, extra steps are taken to manually divide and preprocess our dataset.  
Our general data preprocessing workflow is as follows:

1. Explore features and characteristics of dataset
2. Drop columns of low data quality (e.g. large amounts of empty values)
3. Determine k columns to keep in the dataset (feature selection)
   - Performing elementary Lasso regression as a method of feature selection
4. Split into training and testing sets
5. Perform data cleaning
   - Dealing with missing values
6. Perform one-hot encoding on categorical values
7. Perform data standardization / normalization on continuous numerical values
8. Export preprocessed data to .csv files -->

#### Part 1.1: Solidity Contracts

#### Part 1.2: Unit Testing with TypeScript

### Part 2: Front-end Interaction

<TODO: add description>

This Next.js project is initialized with the command `npx create-next-app@latest`.
<!-- In this project, we utilize 3 supervised classification models. The order of model implementation and analysis is based on the sequence of teaching in ISOM3360 course syllabus. -->

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
  - [`src/`](frontend/src): d
    - [`pages/`](frontend/src/pages): directory that stores pages available in this Next.js app
      - <TODO: add description about different .tsx files>
    - [`abi/`](frontend/src/abi): directory that stores abi files copied from [`contract/`](contract)
      - <TODO: add description about abi JSON files>
  - `.env`: stores sensitive environment variables (not committed to GitHub)
- [`presentation/`](presentation): directory that stores presentation slides & supplementary materials (if any) for the presentation
  - <TODO: add when presentation slides are finalized>

## Instructions

1. In [`contract/`](contract):
   1. Run [`/scripts/deploy.ts`](contract/scripts/deploy.ts) using `npm` command (to be set up)
   2. <TODO: add instructions about viewing contract status and obtaining contracts addresses>
2. In `frontend/`(frontend):
   1. In `.env`, add <TODO>
   2. <TODO: add instructions regarding abi>

## Reference

- [ISOM3000H Tutorial Documentation](https://docs.msbd5017.etdchain.net)

## This is the end of documentation for ISOM3000H Group Project
