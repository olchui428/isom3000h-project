import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('test', function () {
  it('is testing', async function () {
    // Deploy NFT Smart Contract
    const [acct1, acct2, ...acctRest] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory('MyNFT');
    const myToken = await MyToken.deploy();
    await myToken.deployed();

    console.log('acct1 address:', acct1.address);
  });
});
