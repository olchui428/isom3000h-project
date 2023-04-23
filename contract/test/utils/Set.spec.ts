import { expect } from "chai";
import { ethers } from "hardhat";

const CONTRACT_NAME = "Set";

describe(`Given ${CONTRACT_NAME}`, function () {
  // TODO
  it("Should be able to award", async function () {
    // Deploy NFT Smart Contract
    const [owner, otherAddress, ...rest] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory(CONTRACT_NAME);
    const contract = await Contract.deploy();
    await contract.deployed();

    // Award item to owner
    let tx = await contract.awardItem(owner.address, "https://www.google.com");
    await tx.wait();

    // Check
    let tokenOwner = await contract.ownerOf(0);
    expect(tokenOwner).to.equal(owner.address);

    let tokenURI = await contract.tokenURI(0);
    expect(tokenURI).to.equal("https://www.google.com");

    // Award item to otherAddress
    tx = await contract.awardItem(otherAddress.address, "https://www.google.com/hk");
    await tx.wait();

    // Check
    tokenOwner = await contract.ownerOf(1);
    expect(tokenOwner).to.equal(otherAddress.address);

    tokenURI = await contract.tokenURI(1);
    expect(tokenURI).to.equal("https://www.google.com/hk");
  });
});
