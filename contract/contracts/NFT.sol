//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.9;

import '../node_modules/hardhat/console.sol';
import '../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '../node_modules/@openzeppelin/contracts/utils/Counters.sol';

contract MyNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor() ERC721('MyNFT', 'NFT') {}

  function awardItem(address player, string memory tokenURI) public returns (uint256) {
    uint256 newItemId = _tokenIds.current();
    _mint(player, newItemId);
    _setTokenURI(newItemId, tokenURI);

    _tokenIds.increment();
    return newItemId;
  }
}