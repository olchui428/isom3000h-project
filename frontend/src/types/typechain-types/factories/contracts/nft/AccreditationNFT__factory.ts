/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  AccreditationNFT,
  AccreditationNFTInterface,
} from "../../../contracts/nft/AccreditationNFT";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "accreditationStorageAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "isAccreditationValid",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "issuer",
        type: "address",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "nature",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "launchAccreditation",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "accreditationEndpointAddress",
        type: "address",
      },
    ],
    name: "setAddresses",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040526000600660006101000a81548160ff0219169083151502179055503480156200002c57600080fd5b50604051620038be380380620038be833981810160405281019062000052919062000349565b6040518060400160405280601081526020017f41636372656469746174696f6e4e4654000000000000000000000000000000008152506040518060400160405280600681526020017f41434352454400000000000000000000000000000000000000000000000000008152508160009080519060200190620000d69291906200022f565b508060019080519060200190620000ef9291906200022f565b5050506200010e67b0ee9a35346609af60c01b6200022c60201b60201c565b6200012a675353fcc887ec015160c01b6200022c60201b60201c565b33600660016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506200018767a7b75f911377f09960c01b6200022c60201b60201c565b80600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620001e467defbe25a44a0d0b060c01b6200022c60201b60201c565b80600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050620003e0565b50565b8280546200023d90620003aa565b90600052602060002090601f016020900481019282620002615760008555620002ad565b82601f106200027c57805160ff1916838001178555620002ad565b82800160010185558215620002ad579182015b82811115620002ac5782518255916020019190600101906200028f565b5b509050620002bc9190620002c0565b5090565b5b80821115620002db576000816000905550600101620002c1565b5090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200031182620002e4565b9050919050565b620003238162000304565b81146200032f57600080fd5b50565b600081519050620003438162000318565b92915050565b600060208284031215620003625762000361620002df565b5b6000620003728482850162000332565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620003c357607f821691505b60208210811415620003da57620003d96200037b565b5b50919050565b6134ce80620003f06000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c80636352211e11610097578063a22cb46511610066578063a22cb465146102d1578063b88d4fde146102ed578063c87b56dd14610309578063e985e9c51461033957610100565b80636352211e1461023757806370a082311461026757806381d3c4351461029757806395d89b41146102b357610100565b806323b872dd116100d357806323b872dd1461019f57806329251252146101bb57806334c64161146101eb57806342842e0e1461021b57610100565b806301ffc9a71461010557806306fdde0314610135578063081812fc14610153578063095ea7b314610183575b600080fd5b61011f600480360381019061011a91906121da565b610369565b60405161012c9190612222565b60405180910390f35b61013d61044b565b60405161014a91906122d6565b60405180910390f35b61016d6004803603810190610168919061232e565b6104dd565b60405161017a919061239c565b60405180910390f35b61019d600480360381019061019891906123e3565b610523565b005b6101b960048036038101906101b49190612423565b61063b565b005b6101d560048036038101906101d091906125e9565b61069b565b6040516101e291906126d9565b60405180910390f35b6102056004803603810190610200919061232e565b610993565b6040516102129190612222565b60405180910390f35b61023560048036038101906102309190612423565b610d73565b005b610251600480360381019061024c919061232e565b610d93565b60405161025e919061239c565b60405180910390f35b610281600480360381019061027c91906126f4565b610e1a565b60405161028e91906126d9565b60405180910390f35b6102b160048036038101906102ac91906126f4565b610ed2565b005b6102bb611156565b6040516102c891906122d6565b60405180910390f35b6102eb60048036038101906102e6919061274d565b6111e8565b005b6103076004803603810190610302919061282e565b6111fe565b005b610323600480360381019061031e919061232e565b611260565b60405161033091906122d6565b60405180910390f35b610353600480360381019061034e91906128b1565b6112c8565b6040516103609190612222565b60405180910390f35b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061043457507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8061044457506104438261135c565b5b9050919050565b60606000805461045a90612920565b80601f016020809104026020016040519081016040528092919081815260200182805461048690612920565b80156104d35780601f106104a8576101008083540402835291602001916104d3565b820191906000526020600020905b8154815290600101906020018083116104b657829003601f168201915b5050505050905090565b60006104e8826113c6565b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600061052e82610d93565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561059f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610596906129c4565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166105be611411565b73ffffffffffffffffffffffffffffffffffffffff1614806105ed57506105ec816105e7611411565b6112c8565b5b61062c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161062390612a56565b60405180910390fd5b6106368383611419565b505050565b61064c610646611411565b826114d2565b61068b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161068290612ae8565b60405180910390fd5b610696838383611567565b505050565b60006106b167bc13e27e69ec7a4f60c01b611861565b6106c5672bbc11eec92b299060c01b611861565b6106d9679916b9e53d31f18960c01b611861565b6106ed67aaf71892346abab760c01b611861565b610701673d0a8e13e1095cfc60c01b611861565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610791576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078890612b7a565b60405180910390fd5b6107a5679bcd835872c7b19f60c01b611861565b6107b9672c89d83f9f0ef64860c01b611861565b6107cd67db3cb34ad821e60c60c01b611861565b6107e167492567dda4f09f5a60c01b611861565b6107f5678bbc32a6076fc41160c01b611861565b610809677a97283d98dd232060c01b611861565b60006108156009611864565b905061082b6762bb98977b4a1a5560c01b611861565b61083f67a855a213ebd52bc160c01b611861565b600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ae2b1b8f828a8a8a8a8a8a6040518863ffffffff1660e01b81526004016108a69796959493929190612ba9565b602060405180830381600087803b1580156108c057600080fd5b505af11580156108d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108f89190612c42565b5061090d67dc5b6b8420948d5460c01b611861565b610921670a9d02e1e8ac6c2560c01b611861565b61092b8882611872565b61093f67b14f5a04c7ddc0c060c01b611861565b61095367618448c12d84262760c01b611861565b61095d6009611890565b610971676fba4810de55fc4960c01b611861565b61098567f21ebf6dca4128de60c01b611861565b809150509695505050505050565b60006109a9670cb029a78e754b7f60c01b611861565b6109bd672bbc11eec92b299060c01b611861565b6109d1679916b9e53d31f18960c01b611861565b6109e567aaf71892346abab760c01b611861565b6109f9673d0a8e13e1095cfc60c01b611861565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a89576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a8090612b7a565b60405180910390fd5b610a9d679bcd835872c7b19f60c01b611861565b610ab1672c89d83f9f0ef64860c01b611861565b610ac5677b33286c9342a83c60c01b611861565b610ad967ceed3572658d798560c01b611861565b610aed67263bf733d801b02860c01b611861565b610b016732c5d07d0d88ee7160c01b611861565b610b0a826118a6565b8015610bbd5750600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633c0b9c78836040518263ffffffff1660e01b8152600401610b6c91906126d9565b60206040518083038186803b158015610b8457600080fd5b505afa158015610b98573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bbc9190612c42565b5b8015610caf5750600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166387dbedfd836040518263ffffffff1660e01b8152600401610c1f91906126d9565b60006040518083038186803b158015610c3757600080fd5b505afa158015610c4b573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610c749190612e79565b6020015173ffffffffffffffffffffffffffffffffffffffff16610c9783610d93565b73ffffffffffffffffffffffffffffffffffffffff16145b8015610d6c5750600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166387dbedfd836040518263ffffffff1660e01b8152600401610d1191906126d9565b60006040518083038186803b158015610d2957600080fd5b505afa158015610d3d573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610d669190612e79565b60e00151155b9050919050565b610d8e838383604051806020016040528060008152506111fe565b505050565b600080610d9f836118e7565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610e11576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e0890612f0e565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610e8b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e8290612fa0565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b610ee66741c06fd5ff17fc1c60c01b611861565b610efa678fac9864dd4eca1360c01b611861565b610f0e675dd0ac77fa59acd260c01b611861565b610f2267121ce38528cc241960c01b611861565b610f366728d4d747e8d77cf460c01b611861565b600660019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610fc6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fbd9061300c565b60405180910390fd5b610fda67d5753e35519f9d3d60c01b611861565b610fee6785e7f4e50d90933460c01b611861565b6110026779f7165e3bf6027460c01b611861565b61101667335d674d88947b0960c01b611861565b61102a6788102eae5a47917560c01b611861565b61103e67f66b44aa33067fb560c01b611861565b611052673d7ac423359e0c0860c01b611861565b61106566dd79acdeee924c60c01b611861565b600660009054906101000a900460ff161561107f57600080fd5b6110936740eefe9249a89c7560c01b611861565b6110a76735dc67e6460a5eb560c01b611861565b6110bb676ab3e26de606d93a60c01b611861565b6110cf6729a99061dc35a48c60c01b611861565b6110e36763fbe3765e49301b60c01b611861565b6001600660006101000a81548160ff02191690831515021790555061111267b22336db22816b5260c01b611861565b80600860006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60606001805461116590612920565b80601f016020809104026020016040519081016040528092919081815260200182805461119190612920565b80156111de5780601f106111b3576101008083540402835291602001916111de565b820191906000526020600020905b8154815290600101906020018083116111c157829003601f168201915b5050505050905090565b6111fa6111f3611411565b8383611924565b5050565b61120f611209611411565b836114d2565b61124e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161124590612ae8565b60405180910390fd5b61125a84848484611a91565b50505050565b606061126b826113c6565b6000611275611aed565b9050600081511161129557604051806020016040528060008152506112c0565b8061129f84611b04565b6040516020016112b0929190613068565b6040516020818303038152906040525b915050919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b6113cf816118a6565b61140e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161140590612f0e565b60405180910390fd5b50565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff1661148c83610d93565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000806114de83610d93565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480611520575061151f81856112c8565b5b8061155e57508373ffffffffffffffffffffffffffffffffffffffff16611546846104dd565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff1661158782610d93565b73ffffffffffffffffffffffffffffffffffffffff16146115dd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115d4906130fe565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561164d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161164490613190565b60405180910390fd5b61165a8383836001611bdc565b8273ffffffffffffffffffffffffffffffffffffffff1661167a82610d93565b73ffffffffffffffffffffffffffffffffffffffff16146116d0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116c7906130fe565b60405180910390fd5b6004600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a461185c8383836001611be2565b505050565b50565b600081600001549050919050565b61188c828260405180602001604052806000815250611be8565b5050565b6001816000016000828254019250508190555050565b60008073ffffffffffffffffffffffffffffffffffffffff166118c8836118e7565b73ffffffffffffffffffffffffffffffffffffffff1614159050919050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611993576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161198a906131fc565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051611a849190612222565b60405180910390a3505050565b611a9c848484611567565b611aa884848484611c43565b611ae7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ade9061328e565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b606060006001611b1384611dda565b01905060008167ffffffffffffffff811115611b3257611b316124be565b5b6040519080825280601f01601f191660200182016040528015611b645781602001600182028036833780820191505090505b509050600082602001820190505b600115611bd1578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a8581611bbb57611bba6132ae565b5b0494506000851415611bcc57611bd1565b611b72565b819350505050919050565b50505050565b50505050565b611bf28383611f2d565b611bff6000848484611c43565b611c3e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c359061328e565b60405180910390fd5b505050565b6000611c648473ffffffffffffffffffffffffffffffffffffffff1661214b565b15611dcd578373ffffffffffffffffffffffffffffffffffffffff1663150b7a02611c8d611411565b8786866040518563ffffffff1660e01b8152600401611caf9493929190613332565b602060405180830381600087803b158015611cc957600080fd5b505af1925050508015611cfa57506040513d601f19601f82011682018060405250810190611cf79190613393565b60015b611d7d573d8060008114611d2a576040519150601f19603f3d011682016040523d82523d6000602084013e611d2f565b606091505b50600081511415611d75576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d6c9061328e565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614915050611dd2565b600190505b949350505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310611e38577a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008381611e2e57611e2d6132ae565b5b0492506040810190505b6d04ee2d6d415b85acef81000000008310611e75576d04ee2d6d415b85acef81000000008381611e6b57611e6a6132ae565b5b0492506020810190505b662386f26fc100008310611ea457662386f26fc100008381611e9a57611e996132ae565b5b0492506010810190505b6305f5e1008310611ecd576305f5e1008381611ec357611ec26132ae565b5b0492506008810190505b6127108310611ef2576127108381611ee857611ee76132ae565b5b0492506004810190505b60648310611f155760648381611f0b57611f0a6132ae565b5b0492506002810190505b600a8310611f24576001810190505b80915050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611f9d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611f949061340c565b60405180910390fd5b611fa6816118a6565b15611fe6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611fdd90613478565b60405180910390fd5b611ff4600083836001611bdc565b611ffd816118a6565b1561203d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161203490613478565b60405180910390fd5b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4612147600083836001611be2565b5050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6121b781612182565b81146121c257600080fd5b50565b6000813590506121d4816121ae565b92915050565b6000602082840312156121f0576121ef612178565b5b60006121fe848285016121c5565b91505092915050565b60008115159050919050565b61221c81612207565b82525050565b60006020820190506122376000830184612213565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561227757808201518184015260208101905061225c565b83811115612286576000848401525b50505050565b6000601f19601f8301169050919050565b60006122a88261223d565b6122b28185612248565b93506122c2818560208601612259565b6122cb8161228c565b840191505092915050565b600060208201905081810360008301526122f0818461229d565b905092915050565b6000819050919050565b61230b816122f8565b811461231657600080fd5b50565b60008135905061232881612302565b92915050565b60006020828403121561234457612343612178565b5b600061235284828501612319565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006123868261235b565b9050919050565b6123968161237b565b82525050565b60006020820190506123b1600083018461238d565b92915050565b6123c08161237b565b81146123cb57600080fd5b50565b6000813590506123dd816123b7565b92915050565b600080604083850312156123fa576123f9612178565b5b6000612408858286016123ce565b925050602061241985828601612319565b9150509250929050565b60008060006060848603121561243c5761243b612178565b5b600061244a868287016123ce565b935050602061245b868287016123ce565b925050604061246c86828701612319565b9150509250925092565b60006124818261235b565b9050919050565b61249181612476565b811461249c57600080fd5b50565b6000813590506124ae81612488565b92915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6124f68261228c565b810181811067ffffffffffffffff82111715612515576125146124be565b5b80604052505050565b600061252861216e565b905061253482826124ed565b919050565b600067ffffffffffffffff821115612554576125536124be565b5b61255d8261228c565b9050602081019050919050565b82818337600083830152505050565b600061258c61258784612539565b61251e565b9050828152602081018484840111156125a8576125a76124b9565b5b6125b384828561256a565b509392505050565b600082601f8301126125d0576125cf6124b4565b5b81356125e0848260208601612579565b91505092915050565b60008060008060008060c0878903121561260657612605612178565b5b600061261489828a0161249f565b965050602087013567ffffffffffffffff8111156126355761263461217d565b5b61264189828a016125bb565b955050604061265289828a01612319565b945050606061266389828a01612319565b935050608087013567ffffffffffffffff8111156126845761268361217d565b5b61269089828a016125bb565b92505060a087013567ffffffffffffffff8111156126b1576126b061217d565b5b6126bd89828a016125bb565b9150509295509295509295565b6126d3816122f8565b82525050565b60006020820190506126ee60008301846126ca565b92915050565b60006020828403121561270a57612709612178565b5b6000612718848285016123ce565b91505092915050565b61272a81612207565b811461273557600080fd5b50565b60008135905061274781612721565b92915050565b6000806040838503121561276457612763612178565b5b6000612772858286016123ce565b925050602061278385828601612738565b9150509250929050565b600067ffffffffffffffff8211156127a8576127a76124be565b5b6127b18261228c565b9050602081019050919050565b60006127d16127cc8461278d565b61251e565b9050828152602081018484840111156127ed576127ec6124b9565b5b6127f884828561256a565b509392505050565b600082601f830112612815576128146124b4565b5b81356128258482602086016127be565b91505092915050565b6000806000806080858703121561284857612847612178565b5b6000612856878288016123ce565b9450506020612867878288016123ce565b935050604061287887828801612319565b925050606085013567ffffffffffffffff8111156128995761289861217d565b5b6128a587828801612800565b91505092959194509250565b600080604083850312156128c8576128c7612178565b5b60006128d6858286016123ce565b92505060206128e7858286016123ce565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061293857607f821691505b6020821081141561294c5761294b6128f1565b5b50919050565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b60006129ae602183612248565b91506129b982612952565b604082019050919050565b600060208201905081810360008301526129dd816129a1565b9050919050565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60008201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c000000602082015250565b6000612a40603d83612248565b9150612a4b826129e4565b604082019050919050565b60006020820190508181036000830152612a6f81612a33565b9050919050565b7f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560008201527f72206f7220617070726f76656400000000000000000000000000000000000000602082015250565b6000612ad2602d83612248565b9150612add82612a76565b604082019050919050565b60006020820190508181036000830152612b0181612ac5565b9050919050565b7f43616c6c206973206e6f7420696e697469617465642066726f6d20456e64706f60008201527f696e742e00000000000000000000000000000000000000000000000000000000602082015250565b6000612b64602483612248565b9150612b6f82612b08565b604082019050919050565b60006020820190508181036000830152612b9381612b57565b9050919050565b612ba381612476565b82525050565b600060e082019050612bbe600083018a6126ca565b612bcb6020830189612b9a565b8181036040830152612bdd818861229d565b9050612bec60608301876126ca565b612bf960808301866126ca565b81810360a0830152612c0b818561229d565b905081810360c0830152612c1f818461229d565b905098975050505050505050565b600081519050612c3c81612721565b92915050565b600060208284031215612c5857612c57612178565b5b6000612c6684828501612c2d565b91505092915050565b600080fd5b600080fd5b600081519050612c8881612302565b92915050565b600081519050612c9d81612488565b92915050565b6000612cb6612cb184612539565b61251e565b905082815260208101848484011115612cd257612cd16124b9565b5b612cdd848285612259565b509392505050565b600082601f830112612cfa57612cf96124b4565b5b8151612d0a848260208601612ca3565b91505092915050565b60006101408284031215612d2a57612d29612c6f565b5b612d3561014061251e565b90506000612d4584828501612c79565b6000830152506020612d5984828501612c8e565b602083015250604082015167ffffffffffffffff811115612d7d57612d7c612c74565b5b612d8984828501612ce5565b6040830152506060612d9d84828501612c79565b6060830152506080612db184828501612c79565b60808301525060a082015167ffffffffffffffff811115612dd557612dd4612c74565b5b612de184828501612ce5565b60a08301525060c082015167ffffffffffffffff811115612e0557612e04612c74565b5b612e1184828501612ce5565b60c08301525060e0612e2584828501612c2d565b60e08301525061010082015167ffffffffffffffff811115612e4a57612e49612c74565b5b612e5684828501612ce5565b61010083015250610120612e6c84828501612c79565b6101208301525092915050565b600060208284031215612e8f57612e8e612178565b5b600082015167ffffffffffffffff811115612ead57612eac61217d565b5b612eb984828501612d13565b91505092915050565b7f4552433732313a20696e76616c696420746f6b656e2049440000000000000000600082015250565b6000612ef8601883612248565b9150612f0382612ec2565b602082019050919050565b60006020820190508181036000830152612f2781612eeb565b9050919050565b7f4552433732313a2061646472657373207a65726f206973206e6f74206120766160008201527f6c6964206f776e65720000000000000000000000000000000000000000000000602082015250565b6000612f8a602983612248565b9150612f9582612f2e565b604082019050919050565b60006020820190508181036000830152612fb981612f7d565b9050919050565b7f43616c6c6572206973206e6f7420746865206465706c6f7965722e0000000000600082015250565b6000612ff6601b83612248565b915061300182612fc0565b602082019050919050565b6000602082019050818103600083015261302581612fe9565b9050919050565b600081905092915050565b60006130428261223d565b61304c818561302c565b935061305c818560208601612259565b80840191505092915050565b60006130748285613037565b91506130808284613037565b91508190509392505050565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b60006130e8602583612248565b91506130f38261308c565b604082019050919050565b60006020820190508181036000830152613117816130db565b9050919050565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b600061317a602483612248565b91506131858261311e565b604082019050919050565b600060208201905081810360008301526131a98161316d565b9050919050565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b60006131e6601983612248565b91506131f1826131b0565b602082019050919050565b60006020820190508181036000830152613215816131d9565b9050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b6000613278603283612248565b91506132838261321c565b604082019050919050565b600060208201905081810360008301526132a78161326b565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600081519050919050565b600082825260208201905092915050565b6000613304826132dd565b61330e81856132e8565b935061331e818560208601612259565b6133278161228c565b840191505092915050565b6000608082019050613347600083018761238d565b613354602083018661238d565b61336160408301856126ca565b818103606083015261337381846132f9565b905095945050505050565b60008151905061338d816121ae565b92915050565b6000602082840312156133a9576133a8612178565b5b60006133b78482850161337e565b91505092915050565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b60006133f6602083612248565b9150613401826133c0565b602082019050919050565b60006020820190508181036000830152613425816133e9565b9050919050565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b6000613462601c83612248565b915061346d8261342c565b602082019050919050565b6000602082019050818103600083015261349181613455565b905091905056fea2646970667358221220d7b16644710b130e6afced157755a0c1140316b4553b64a9bcc0309aa033363e64736f6c63430008090033";

type AccreditationNFTConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AccreditationNFTConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AccreditationNFT__factory extends ContractFactory {
  constructor(...args: AccreditationNFTConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    accreditationStorageAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<AccreditationNFT> {
    return super.deploy(
      accreditationStorageAddress,
      overrides || {}
    ) as Promise<AccreditationNFT>;
  }
  override getDeployTransaction(
    accreditationStorageAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      accreditationStorageAddress,
      overrides || {}
    );
  }
  override attach(address: string): AccreditationNFT {
    return super.attach(address) as AccreditationNFT;
  }
  override connect(signer: Signer): AccreditationNFT__factory {
    return super.connect(signer) as AccreditationNFT__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AccreditationNFTInterface {
    return new utils.Interface(_abi) as AccreditationNFTInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AccreditationNFT {
    return new Contract(address, _abi, signerOrProvider) as AccreditationNFT;
  }
}
