import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Given MyNFT', function () {
  it('Should be able to award', async function () {
    // Deploy NFT Smart Contract
    const [owner, otherAddress, ...rest] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory('MyNFT');
    const myToken = await MyToken.deploy();
    await myToken.deployed();

    // Award item to owner
    let tx = await myToken.awardItem(owner.address, 'https://www.google.com');
    await tx.wait();

    // Check
    let tokenOwner = await myToken.ownerOf(0);
    expect(tokenOwner).to.equal(owner.address);

    let tokenURI = await myToken.tokenURI(0);
    expect(tokenURI).to.equal('https://www.google.com');

    // Award item to otherAddress
    tx = await myToken.awardItem(
      otherAddress.address,
      'https://www.google.com/hk'
    );
    await tx.wait();

    // Check
    tokenOwner = await myToken.ownerOf(1);
    expect(tokenOwner).to.equal(otherAddress.address);

    tokenURI = await myToken.tokenURI(1);
    expect(tokenURI).to.equal('https://www.google.com/hk');
  });
});
