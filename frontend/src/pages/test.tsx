import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
// const ethers = require("ethers");
import { MetaMaskInpageProvider } from '@metamask/providers';
import abi from '../abi/MyNFT.json';
import * as dotenv from 'dotenv';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const NFT_ADDRESS = '0xEAc8c31dC0Cf7eC246A24df8bF3434e83e42f38f';

export default function WalletApp(props) {
  // create states
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   getBlockchainInfo();
  // }, []);

  // const getBlockchainInfo = async () => {
  //   // making a JsonRpcProvider (protocol) to communicate with ETH blockchain
  //   const provider = new ethers.providers.JsonRpcProvider(
  //     'HTTP://127.0.0.1:7545'
  //   );

  //   // getting block number
  //   console.log('Current block number', await provider.getBlockNumber());
  // };

  const onClick = useCallback(async () => {
    // Connect to network, get provider and signer
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setLoading(true);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    console.log('signer:', signer);

    // create contract instance
    console.log('contract address:', process.env.NFTAddr);
    const contractAddress = NFT_ADDRESS!;
    const contract = new ethers.Contract(contractAddress, abi, signer);
    console.log('contract:', contract);

    // mint a new NFT
    console.log('awarding item...');
    const tx = await contract.awardItem(
      signer.getAddress(),
      'https://files.etdchain.net/mynft.png'
    );
    await tx.wait();

    // check balance
    const balance = await contract.balanceOf(await signer.getAddress());
    setBalance(JSON.stringify(balance));
    setLoading(false);
  }, []);

  return (
    <div>
      <div>
        <p>Balance: {loading ? 'Loading...' : balance}</p>
      </div>
      <button onClick={onClick}>Award Item</button>
    </div>
  );
}
