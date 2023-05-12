/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  CertificateNFT,
  CertificateNFTInterface,
} from "../../../contracts/nft/CertificateNFT";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "certificateStorageAddress",
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
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "isCertificateValid",
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
        name: "issuerAddress",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "applicantAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "accreditationId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "level",
        type: "string",
      },
      {
        internalType: "string",
        name: "eventId",
        type: "string",
      },
      {
        internalType: "string",
        name: "remarks",
        type: "string",
      },
    ],
    name: "issueCertificate",
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
        name: "certificateEndpointAddress",
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
  "0x60806040526000600660006101000a81548160ff0219169083151502179055503480156200002c57600080fd5b5060405162003313380380620033138339818101604052810190620000529190620002d6565b6040518060400160405280600e81526020017f43657274696669636174654e46540000000000000000000000000000000000008152506040518060400160405280600481526020017f43455254000000000000000000000000000000000000000000000000000000008152508160009080519060200190620000d6929190620001bc565b508060019080519060200190620000ef929190620001bc565b50505033600660016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506200036d565b828054620001ca9062000337565b90600052602060002090601f016020900481019282620001ee57600085556200023a565b82601f106200020957805160ff19168380011785556200023a565b828001600101855582156200023a579182015b82811115620002395782518255916020019190600101906200021c565b5b5090506200024991906200024d565b5090565b5b80821115620002685760008160009055506001016200024e565b5090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200029e8262000271565b9050919050565b620002b08162000291565b8114620002bc57600080fd5b50565b600081519050620002d081620002a5565b92915050565b600060208284031215620002ef57620002ee6200026c565b5b6000620002ff84828501620002bf565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200035057607f821691505b6020821081141562000367576200036662000308565b5b50919050565b612f96806200037d6000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c806370a0823111610097578063a5ce413a11610066578063a5ce413a146102bd578063b88d4fde146102ed578063c87b56dd14610309578063e985e9c51461033957610100565b806370a082311461023757806381d3c4351461026757806395d89b4114610283578063a22cb465146102a157610100565b806310ab14d5116100d357806310ab14d51461019f57806323b872dd146101cf57806342842e0e146101eb5780636352211e1461020757610100565b806301ffc9a71461010557806306fdde0314610135578063081812fc14610153578063095ea7b314610183575b600080fd5b61011f600480360381019061011a9190611d66565b610369565b60405161012c9190611dae565b60405180910390f35b61013d61044b565b60405161014a9190611e62565b60405180910390f35b61016d60048036038101906101689190611eba565b6104dd565b60405161017a9190611f28565b60405180910390f35b61019d60048036038101906101989190611f6f565b610523565b005b6101b960048036038101906101b49190612122565b61063b565b6040516101c69190612227565b60405180910390f35b6101e960048036038101906101e49190612242565b610784565b005b61020560048036038101906102009190612242565b6107e4565b005b610221600480360381019061021c9190611eba565b610804565b60405161022e9190611f28565b60405180910390f35b610251600480360381019061024c9190612295565b61088b565b60405161025e9190612227565b60405180910390f35b610281600480360381019061027c9190612295565b610943565b005b61028b610a16565b6040516102989190611e62565b60405180910390f35b6102bb60048036038101906102b691906122ee565b610aa8565b005b6102d760048036038101906102d29190611eba565b610abe565b6040516102e49190611dae565b60405180910390f35b610307600480360381019061030291906123cf565b610d8d565b005b610323600480360381019061031e9190611eba565b610def565b6040516103309190611e62565b60405180910390f35b610353600480360381019061034e9190612452565b610e57565b6040516103609190611dae565b60405180910390f35b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061043457507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610444575061044382610eeb565b5b9050919050565b60606000805461045a906124c1565b80601f0160208091040260200160405190810160405280929190818152602001828054610486906124c1565b80156104d35780601f106104a8576101008083540402835291602001916104d3565b820191906000526020600020905b8154815290600101906020018083116104b657829003601f168201915b5050505050905090565b60006104e882610f55565b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600061052e82610804565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561059f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161059690612565565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166105be610fa0565b73ffffffffffffffffffffffffffffffffffffffff1614806105ed57506105ec816105e7610fa0565b610e57565b5b61062c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610623906125f7565b60405180910390fd5b6106368383610fa8565b505050565b6000600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461069757600080fd5b60006106a36009611061565b9050600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663365ed50a828b8b8b8b8b8b8b6040518963ffffffff1660e01b815260040161070e989796959493929190612626565b602060405180830381600087803b15801561072857600080fd5b505af115801561073c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061076091906126ce565b5061076b888261106f565b610775600961108d565b80915050979650505050505050565b61079561078f610fa0565b826110a3565b6107d4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107cb9061276d565b60405180910390fd5b6107df838383611138565b505050565b6107ff83838360405180602001604052806000815250610d8d565b505050565b60008061081083611432565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610882576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610879906127d9565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156108fc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108f39061286b565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600660019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461099d57600080fd5b600660009054906101000a900460ff16156109b757600080fd5b6001600660006101000a81548160ff02191690831515021790555080600860006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b606060018054610a25906124c1565b80601f0160208091040260200160405190810160405280929190818152602001828054610a51906124c1565b8015610a9e5780601f10610a7357610100808354040283529160200191610a9e565b820191906000526020600020905b815481529060010190602001808311610a8157829003601f168201915b5050505050905090565b610aba610ab3610fa0565b838361146f565b5050565b6000600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610b1a57600080fd5b610b23826115dc565b8015610bd65750600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639f2ac116836040518263ffffffff1660e01b8152600401610b859190612227565b60206040518083038186803b158015610b9d57600080fd5b505afa158015610bb1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bd591906126ce565b5b8015610cc85750600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639d735caf836040518263ffffffff1660e01b8152600401610c389190612227565b60006040518083038186803b158015610c5057600080fd5b505afa158015610c64573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610c8d9190612aab565b6040015173ffffffffffffffffffffffffffffffffffffffff16610cb083610804565b73ffffffffffffffffffffffffffffffffffffffff16145b8015610d865750600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639d735caf836040518263ffffffff1660e01b8152600401610d2a9190612227565b60006040518083038186803b158015610d4257600080fd5b505afa158015610d56573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610d7f9190612aab565b6101000151155b9050919050565b610d9e610d98610fa0565b836110a3565b610ddd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dd49061276d565b60405180910390fd5b610de98484848461161d565b50505050565b6060610dfa82610f55565b6000610e04611679565b90506000815111610e245760405180602001604052806000815250610e4f565b80610e2e84611690565b604051602001610e3f929190612b30565b6040516020818303038152906040525b915050919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b610f5e816115dc565b610f9d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f94906127d9565b60405180910390fd5b50565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff1661101b83610804565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600081600001549050919050565b611089828260405180602001604052806000815250611768565b5050565b6001816000016000828254019250508190555050565b6000806110af83610804565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614806110f157506110f08185610e57565b5b8061112f57508373ffffffffffffffffffffffffffffffffffffffff16611117846104dd565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff1661115882610804565b73ffffffffffffffffffffffffffffffffffffffff16146111ae576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111a590612bc6565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561121e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161121590612c58565b60405180910390fd5b61122b83838360016117c3565b8273ffffffffffffffffffffffffffffffffffffffff1661124b82610804565b73ffffffffffffffffffffffffffffffffffffffff16146112a1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161129890612bc6565b60405180910390fd5b6004600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a461142d83838360016117c9565b505050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156114de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114d590612cc4565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516115cf9190611dae565b60405180910390a3505050565b60008073ffffffffffffffffffffffffffffffffffffffff166115fe83611432565b73ffffffffffffffffffffffffffffffffffffffff1614159050919050565b611628848484611138565b611634848484846117cf565b611673576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161166a90612d56565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b60606000600161169f84611966565b01905060008167ffffffffffffffff8111156116be576116bd611ff7565b5b6040519080825280601f01601f1916602001820160405280156116f05781602001600182028036833780820191505090505b509050600082602001820190505b60011561175d578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a858161174757611746612d76565b5b04945060008514156117585761175d565b6116fe565b819350505050919050565b6117728383611ab9565b61177f60008484846117cf565b6117be576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117b590612d56565b60405180910390fd5b505050565b50505050565b50505050565b60006117f08473ffffffffffffffffffffffffffffffffffffffff16611cd7565b15611959578373ffffffffffffffffffffffffffffffffffffffff1663150b7a02611819610fa0565b8786866040518563ffffffff1660e01b815260040161183b9493929190612dfa565b602060405180830381600087803b15801561185557600080fd5b505af192505050801561188657506040513d601f19601f820116820180604052508101906118839190612e5b565b60015b611909573d80600081146118b6576040519150601f19603f3d011682016040523d82523d6000602084013e6118bb565b606091505b50600081511415611901576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118f890612d56565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161491505061195e565b600190505b949350505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083106119c4577a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083816119ba576119b9612d76565b5b0492506040810190505b6d04ee2d6d415b85acef81000000008310611a01576d04ee2d6d415b85acef810000000083816119f7576119f6612d76565b5b0492506020810190505b662386f26fc100008310611a3057662386f26fc100008381611a2657611a25612d76565b5b0492506010810190505b6305f5e1008310611a59576305f5e1008381611a4f57611a4e612d76565b5b0492506008810190505b6127108310611a7e576127108381611a7457611a73612d76565b5b0492506004810190505b60648310611aa15760648381611a9757611a96612d76565b5b0492506002810190505b600a8310611ab0576001810190505b80915050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611b29576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b2090612ed4565b60405180910390fd5b611b32816115dc565b15611b72576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b6990612f40565b60405180910390fd5b611b806000838360016117c3565b611b89816115dc565b15611bc9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611bc090612f40565b60405180910390fd5b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4611cd36000838360016117c9565b5050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611d4381611d0e565b8114611d4e57600080fd5b50565b600081359050611d6081611d3a565b92915050565b600060208284031215611d7c57611d7b611d04565b5b6000611d8a84828501611d51565b91505092915050565b60008115159050919050565b611da881611d93565b82525050565b6000602082019050611dc36000830184611d9f565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611e03578082015181840152602081019050611de8565b83811115611e12576000848401525b50505050565b6000601f19601f8301169050919050565b6000611e3482611dc9565b611e3e8185611dd4565b9350611e4e818560208601611de5565b611e5781611e18565b840191505092915050565b60006020820190508181036000830152611e7c8184611e29565b905092915050565b6000819050919050565b611e9781611e84565b8114611ea257600080fd5b50565b600081359050611eb481611e8e565b92915050565b600060208284031215611ed057611ecf611d04565b5b6000611ede84828501611ea5565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611f1282611ee7565b9050919050565b611f2281611f07565b82525050565b6000602082019050611f3d6000830184611f19565b92915050565b611f4c81611f07565b8114611f5757600080fd5b50565b600081359050611f6981611f43565b92915050565b60008060408385031215611f8657611f85611d04565b5b6000611f9485828601611f5a565b9250506020611fa585828601611ea5565b9150509250929050565b6000611fba82611ee7565b9050919050565b611fca81611faf565b8114611fd557600080fd5b50565b600081359050611fe781611fc1565b92915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61202f82611e18565b810181811067ffffffffffffffff8211171561204e5761204d611ff7565b5b80604052505050565b6000612061611cfa565b905061206d8282612026565b919050565b600067ffffffffffffffff82111561208d5761208c611ff7565b5b61209682611e18565b9050602081019050919050565b82818337600083830152505050565b60006120c56120c084612072565b612057565b9050828152602081018484840111156120e1576120e0611ff2565b5b6120ec8482856120a3565b509392505050565b600082601f83011261210957612108611fed565b5b81356121198482602086016120b2565b91505092915050565b600080600080600080600060e0888a03121561214157612140611d04565b5b600061214f8a828b01611fd8565b97505060206121608a828b01611fd8565b96505060406121718a828b01611ea5565b95505060606121828a828b01611ea5565b945050608088013567ffffffffffffffff8111156121a3576121a2611d09565b5b6121af8a828b016120f4565b93505060a088013567ffffffffffffffff8111156121d0576121cf611d09565b5b6121dc8a828b016120f4565b92505060c088013567ffffffffffffffff8111156121fd576121fc611d09565b5b6122098a828b016120f4565b91505092959891949750929550565b61222181611e84565b82525050565b600060208201905061223c6000830184612218565b92915050565b60008060006060848603121561225b5761225a611d04565b5b600061226986828701611f5a565b935050602061227a86828701611f5a565b925050604061228b86828701611ea5565b9150509250925092565b6000602082840312156122ab576122aa611d04565b5b60006122b984828501611f5a565b91505092915050565b6122cb81611d93565b81146122d657600080fd5b50565b6000813590506122e8816122c2565b92915050565b6000806040838503121561230557612304611d04565b5b600061231385828601611f5a565b9250506020612324858286016122d9565b9150509250929050565b600067ffffffffffffffff82111561234957612348611ff7565b5b61235282611e18565b9050602081019050919050565b600061237261236d8461232e565b612057565b90508281526020810184848401111561238e5761238d611ff2565b5b6123998482856120a3565b509392505050565b600082601f8301126123b6576123b5611fed565b5b81356123c684826020860161235f565b91505092915050565b600080600080608085870312156123e9576123e8611d04565b5b60006123f787828801611f5a565b945050602061240887828801611f5a565b935050604061241987828801611ea5565b925050606085013567ffffffffffffffff81111561243a57612439611d09565b5b612446878288016123a1565b91505092959194509250565b6000806040838503121561246957612468611d04565b5b600061247785828601611f5a565b925050602061248885828601611f5a565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806124d957607f821691505b602082108114156124ed576124ec612492565b5b50919050565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b600061254f602183611dd4565b915061255a826124f3565b604082019050919050565b6000602082019050818103600083015261257e81612542565b9050919050565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60008201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c000000602082015250565b60006125e1603d83611dd4565b91506125ec82612585565b604082019050919050565b60006020820190508181036000830152612610816125d4565b9050919050565b61262081611faf565b82525050565b60006101008201905061263c600083018b612218565b612649602083018a612617565b6126566040830189612617565b6126636060830188612218565b6126706080830187612218565b81810360a08301526126828186611e29565b905081810360c08301526126968185611e29565b905081810360e08301526126aa8184611e29565b90509998505050505050505050565b6000815190506126c8816122c2565b92915050565b6000602082840312156126e4576126e3611d04565b5b60006126f2848285016126b9565b91505092915050565b7f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560008201527f72206f7220617070726f76656400000000000000000000000000000000000000602082015250565b6000612757602d83611dd4565b9150612762826126fb565b604082019050919050565b600060208201905081810360008301526127868161274a565b9050919050565b7f4552433732313a20696e76616c696420746f6b656e2049440000000000000000600082015250565b60006127c3601883611dd4565b91506127ce8261278d565b602082019050919050565b600060208201905081810360008301526127f2816127b6565b9050919050565b7f4552433732313a2061646472657373207a65726f206973206e6f74206120766160008201527f6c6964206f776e65720000000000000000000000000000000000000000000000602082015250565b6000612855602983611dd4565b9150612860826127f9565b604082019050919050565b6000602082019050818103600083015261288481612848565b9050919050565b600080fd5b600080fd5b6000815190506128a481611e8e565b92915050565b6000815190506128b981611fc1565b92915050565b60006128d26128cd84612072565b612057565b9050828152602081018484840111156128ee576128ed611ff2565b5b6128f9848285611de5565b509392505050565b600082601f83011261291657612915611fed565b5b81516129268482602086016128bf565b91505092915050565b600061016082840312156129465761294561288b565b5b612951610160612057565b9050600061296184828501612895565b6000830152506020612975848285016128aa565b6020830152506040612989848285016128aa565b604083015250606061299d84828501612895565b60608301525060806129b184828501612895565b60808301525060a082015167ffffffffffffffff8111156129d5576129d4612890565b5b6129e184828501612901565b60a08301525060c082015167ffffffffffffffff811115612a0557612a04612890565b5b612a1184828501612901565b60c08301525060e082015167ffffffffffffffff811115612a3557612a34612890565b5b612a4184828501612901565b60e083015250610100612a56848285016126b9565b6101008301525061012082015167ffffffffffffffff811115612a7c57612a7b612890565b5b612a8884828501612901565b61012083015250610140612a9e84828501612895565b6101408301525092915050565b600060208284031215612ac157612ac0611d04565b5b600082015167ffffffffffffffff811115612adf57612ade611d09565b5b612aeb8482850161292f565b91505092915050565b600081905092915050565b6000612b0a82611dc9565b612b148185612af4565b9350612b24818560208601611de5565b80840191505092915050565b6000612b3c8285612aff565b9150612b488284612aff565b91508190509392505050565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b6000612bb0602583611dd4565b9150612bbb82612b54565b604082019050919050565b60006020820190508181036000830152612bdf81612ba3565b9050919050565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000612c42602483611dd4565b9150612c4d82612be6565b604082019050919050565b60006020820190508181036000830152612c7181612c35565b9050919050565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b6000612cae601983611dd4565b9150612cb982612c78565b602082019050919050565b60006020820190508181036000830152612cdd81612ca1565b9050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b6000612d40603283611dd4565b9150612d4b82612ce4565b604082019050919050565b60006020820190508181036000830152612d6f81612d33565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600081519050919050565b600082825260208201905092915050565b6000612dcc82612da5565b612dd68185612db0565b9350612de6818560208601611de5565b612def81611e18565b840191505092915050565b6000608082019050612e0f6000830187611f19565b612e1c6020830186611f19565b612e296040830185612218565b8181036060830152612e3b8184612dc1565b905095945050505050565b600081519050612e5581611d3a565b92915050565b600060208284031215612e7157612e70611d04565b5b6000612e7f84828501612e46565b91505092915050565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b6000612ebe602083611dd4565b9150612ec982612e88565b602082019050919050565b60006020820190508181036000830152612eed81612eb1565b9050919050565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b6000612f2a601c83611dd4565b9150612f3582612ef4565b602082019050919050565b60006020820190508181036000830152612f5981612f1d565b905091905056fea26469706673582212200a0d478bd0638762e6c05595ff52b7bf72f05ebe14cb2119db2e8bf996d42a2464736f6c63430008090033";

type CertificateNFTConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CertificateNFTConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CertificateNFT__factory extends ContractFactory {
  constructor(...args: CertificateNFTConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    certificateStorageAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CertificateNFT> {
    return super.deploy(
      certificateStorageAddress,
      overrides || {}
    ) as Promise<CertificateNFT>;
  }
  override getDeployTransaction(
    certificateStorageAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      certificateStorageAddress,
      overrides || {}
    );
  }
  override attach(address: string): CertificateNFT {
    return super.attach(address) as CertificateNFT;
  }
  override connect(signer: Signer): CertificateNFT__factory {
    return super.connect(signer) as CertificateNFT__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CertificateNFTInterface {
    return new utils.Interface(_abi) as CertificateNFTInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CertificateNFT {
    return new Contract(address, _abi, signerOrProvider) as CertificateNFT;
  }
}