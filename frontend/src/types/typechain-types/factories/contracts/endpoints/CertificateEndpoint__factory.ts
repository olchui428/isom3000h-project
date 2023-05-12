/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  CertificateEndpoint,
  CertificateEndpointInterface,
} from "../../../contracts/endpoints/CertificateEndpoint";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "issuerStorageAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "applicantStorageAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "accreditationStorageAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "certificateStorageAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "certificateNFTAddress",
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
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "accreditationId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address payable",
        name: "applicantAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address payable",
        name: "issuerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "level",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "eventId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "remarks",
        type: "string",
      },
    ],
    name: "IssueCertificate",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getCertificateById",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "issuer",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "applicant",
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
          {
            internalType: "bool",
            name: "isRevoked",
            type: "bool",
          },
          {
            internalType: "string",
            name: "revokeReason",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "revokeTime",
            type: "uint256",
          },
        ],
        internalType: "struct Certificate",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "inputAddress",
        type: "address",
      },
    ],
    name: "getCertificatesByApplicantAddress",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "issuer",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "applicant",
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
          {
            internalType: "bool",
            name: "isRevoked",
            type: "bool",
          },
          {
            internalType: "string",
            name: "revokeReason",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "revokeTime",
            type: "uint256",
          },
        ],
        internalType: "struct Certificate[]",
        name: "",
        type: "tuple[]",
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
    name: "getCompleteCertById",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "address payable",
                name: "issuerAddress",
                type: "address",
              },
              {
                internalType: "string",
                name: "description",
                type: "string",
              },
              {
                internalType: "string",
                name: "logoUrl",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "createdAt",
                type: "uint256",
              },
            ],
            internalType: "struct Issuer",
            name: "issuer",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "address",
                name: "applicantAddress",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "createdAt",
                type: "uint256",
              },
            ],
            internalType: "struct Applicant",
            name: "applicant",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
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
              {
                internalType: "bool",
                name: "isRevoked",
                type: "bool",
              },
              {
                internalType: "string",
                name: "revokeReason",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "revokeTime",
                type: "uint256",
              },
            ],
            internalType: "struct Accreditation",
            name: "accreditation",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                internalType: "address payable",
                name: "issuer",
                type: "address",
              },
              {
                internalType: "address payable",
                name: "applicant",
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
              {
                internalType: "bool",
                name: "isRevoked",
                type: "bool",
              },
              {
                internalType: "string",
                name: "revokeReason",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "revokeTime",
                type: "uint256",
              },
            ],
            internalType: "struct Certificate",
            name: "certificate",
            type: "tuple",
          },
        ],
        internalType: "struct CompleteCert",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
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
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200211d3803806200211d833981810160405281019062000037919062000376565b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555084600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555084600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600860006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050505050620003fe565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200033e8262000311565b9050919050565b620003508162000331565b81146200035c57600080fd5b50565b600081519050620003708162000345565b92915050565b600080600080600060a086880312156200039557620003946200030c565b5b6000620003a5888289016200035f565b9550506020620003b8888289016200035f565b9450506040620003cb888289016200035f565b9350506060620003de888289016200035f565b9250506080620003f1888289016200035f565b9150509295509295909350565b611d0f806200040e6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80631a145be8146100515780639d735caf146100815780639e55b027146100b1578063eb909fd7146100cd575b600080fd5b61006b600480360381019061006691906109a3565b6100fd565b6040516100789190610c72565b60405180910390f35b61009b60048036038101906100969190610cc0565b6101b6565b6040516100a89190610df1565b60405180910390f35b6100cb60048036038101906100c69190610f48565b610361565b005b6100e760048036038101906100e29190610cc0565b610472565b6040516100f49190611285565b60405180910390f35b6060600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631a145be8836040518263ffffffff1660e01b815260040161015a91906112b6565b60006040518083038186803b15801561017257600080fd5b505afa158015610186573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906101af9190611603565b9050919050565b6101be610782565b81600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639f2ac116826040518263ffffffff1660e01b815260040161021a919061165b565b60206040518083038186803b15801561023257600080fd5b505afa158015610246573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061026a9190611676565b6102a9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102a090611726565b60405180910390fd5b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639d735caf846040518263ffffffff1660e01b8152600401610304919061165b565b60006040518083038186803b15801561031c57600080fd5b505afa158015610330573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906103599190611746565b915050919050565b60003390506000600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166310ab14d5838a8a8a8a8a8a6040518863ffffffff1660e01b81526004016103cf97969594939291906117c8565b602060405180830381600087803b1580156103e957600080fd5b505af11580156103fd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610421919061184c565b90507f6cd04803621817b36c0c09a8c91a738cfd29c1625e9b8f54d98cbfe70325cc5b81878a858b8a8a8a604051610460989796959493929190611879565b60405180910390a15050505050505050565b61047a61080a565b6000600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639d735caf846040518263ffffffff1660e01b81526004016104d7919061165b565b60006040518083038186803b1580156104ef57600080fd5b505afa158015610503573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019061052c9190611746565b90506000600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166387dbedfd83600001516040518263ffffffff1660e01b815260040161058f919061165b565b60006040518083038186803b1580156105a757600080fd5b505afa1580156105bb573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906105e49190611a72565b90506000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663026ff3df84604001516040518263ffffffff1660e01b815260040161064791906112b6565b60006040518083038186803b15801561065f57600080fd5b505afa158015610673573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019061069c9190611b67565b90506000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16635f8818d085602001516040518263ffffffff1660e01b81526004016106ff91906112b6565b60006040518083038186803b15801561071757600080fd5b505afa15801561072b573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906107549190611c90565b9050604051806080016040528082815260200183815260200184815260200185815250945050505050919050565b60405180610160016040528060008152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600081526020016000815260200160608152602001606081526020016060815260200160001515815260200160608152602001600081525090565b604051806080016040528061081d61084a565b815260200161082a61088f565b81526020016108376108c6565b8152602001610844610782565b81525090565b6040518060a0016040528060608152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016060815260200160608152602001600081525090565b604051806060016040528060608152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600081525090565b60405180610140016040528060008152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001606081526020016000815260200160008152602001606081526020016060815260200160001515815260200160608152602001600081525090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061097082610945565b9050919050565b61098081610965565b811461098b57600080fd5b50565b60008135905061099d81610977565b92915050565b6000602082840312156109b9576109b861093b565b5b60006109c78482850161098e565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000819050919050565b610a0f816109fc565b82525050565b610a1e81610965565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610a5e578082015181840152602081019050610a43565b83811115610a6d576000848401525b50505050565b6000601f19601f8301169050919050565b6000610a8f82610a24565b610a998185610a2f565b9350610aa9818560208601610a40565b610ab281610a73565b840191505092915050565b60008115159050919050565b610ad281610abd565b82525050565b600061016083016000830151610af16000860182610a06565b506020830151610b046020860182610a15565b506040830151610b176040860182610a15565b506060830151610b2a6060860182610a06565b506080830151610b3d6080860182610a06565b5060a083015184820360a0860152610b558282610a84565b91505060c083015184820360c0860152610b6f8282610a84565b91505060e083015184820360e0860152610b898282610a84565b915050610100830151610ba0610100860182610ac9565b50610120830151848203610120860152610bba8282610a84565b915050610140830151610bd1610140860182610a06565b508091505092915050565b6000610be88383610ad8565b905092915050565b6000602082019050919050565b6000610c08826109d0565b610c1281856109db565b935083602082028501610c24856109ec565b8060005b85811015610c605784840389528151610c418582610bdc565b9450610c4c83610bf0565b925060208a01995050600181019050610c28565b50829750879550505050505092915050565b60006020820190508181036000830152610c8c8184610bfd565b905092915050565b610c9d816109fc565b8114610ca857600080fd5b50565b600081359050610cba81610c94565b92915050565b600060208284031215610cd657610cd561093b565b5b6000610ce484828501610cab565b91505092915050565b600061016083016000830151610d066000860182610a06565b506020830151610d196020860182610a15565b506040830151610d2c6040860182610a15565b506060830151610d3f6060860182610a06565b506080830151610d526080860182610a06565b5060a083015184820360a0860152610d6a8282610a84565b91505060c083015184820360c0860152610d848282610a84565b91505060e083015184820360e0860152610d9e8282610a84565b915050610100830151610db5610100860182610ac9565b50610120830151848203610120860152610dcf8282610a84565b915050610140830151610de6610140860182610a06565b508091505092915050565b60006020820190508181036000830152610e0b8184610ced565b905092915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610e5582610a73565b810181811067ffffffffffffffff82111715610e7457610e73610e1d565b5b80604052505050565b6000610e87610931565b9050610e938282610e4c565b919050565b600067ffffffffffffffff821115610eb357610eb2610e1d565b5b610ebc82610a73565b9050602081019050919050565b82818337600083830152505050565b6000610eeb610ee684610e98565b610e7d565b905082815260208101848484011115610f0757610f06610e18565b5b610f12848285610ec9565b509392505050565b600082601f830112610f2f57610f2e610e13565b5b8135610f3f848260208601610ed8565b91505092915050565b60008060008060008060c08789031215610f6557610f6461093b565b5b6000610f7389828a0161098e565b9650506020610f8489828a01610cab565b9550506040610f9589828a01610cab565b945050606087013567ffffffffffffffff811115610fb657610fb5610940565b5b610fc289828a01610f1a565b935050608087013567ffffffffffffffff811115610fe357610fe2610940565b5b610fef89828a01610f1a565b92505060a087013567ffffffffffffffff8111156110105761100f610940565b5b61101c89828a01610f1a565b9150509295509295509295565b600060a08301600083015184820360008601526110468282610a84565b915050602083015161105b6020860182610a15565b50604083015184820360408601526110738282610a84565b9150506060830151848203606086015261108d8282610a84565b91505060808301516110a26080860182610a06565b508091505092915050565b60006110b882610945565b9050919050565b6110c8816110ad565b82525050565b600060608301600083015184820360008601526110eb8282610a84565b915050602083015161110060208601826110bf565b5060408301516111136040860182610a06565b508091505092915050565b6000610140830160008301516111376000860182610a06565b50602083015161114a6020860182610a15565b50604083015184820360408601526111628282610a84565b91505060608301516111776060860182610a06565b50608083015161118a6080860182610a06565b5060a083015184820360a08601526111a28282610a84565b91505060c083015184820360c08601526111bc8282610a84565b91505060e08301516111d160e0860182610ac9565b506101008301518482036101008601526111eb8282610a84565b915050610120830151611202610120860182610a06565b508091505092915050565b6000608083016000830151848203600086015261122a8282611029565b9150506020830151848203602086015261124482826110ce565b9150506040830151848203604086015261125e828261111e565b915050606083015184820360608601526112788282610ad8565b9150508091505092915050565b6000602082019050818103600083015261129f818461120d565b905092915050565b6112b081610965565b82525050565b60006020820190506112cb60008301846112a7565b92915050565b600067ffffffffffffffff8211156112ec576112eb610e1d565b5b602082029050602081019050919050565b600080fd5b600080fd5b600080fd5b60008151905061131b81610c94565b92915050565b60008151905061133081610977565b92915050565b600061134961134484610e98565b610e7d565b90508281526020810184848401111561136557611364610e18565b5b611370848285610a40565b509392505050565b600082601f83011261138d5761138c610e13565b5b815161139d848260208601611336565b91505092915050565b6113af81610abd565b81146113ba57600080fd5b50565b6000815190506113cc816113a6565b92915050565b600061016082840312156113e9576113e8611302565b5b6113f4610160610e7d565b905060006114048482850161130c565b600083015250602061141884828501611321565b602083015250604061142c84828501611321565b60408301525060606114408482850161130c565b60608301525060806114548482850161130c565b60808301525060a082015167ffffffffffffffff81111561147857611477611307565b5b61148484828501611378565b60a08301525060c082015167ffffffffffffffff8111156114a8576114a7611307565b5b6114b484828501611378565b60c08301525060e082015167ffffffffffffffff8111156114d8576114d7611307565b5b6114e484828501611378565b60e0830152506101006114f9848285016113bd565b6101008301525061012082015167ffffffffffffffff81111561151f5761151e611307565b5b61152b84828501611378565b610120830152506101406115418482850161130c565b6101408301525092915050565b600061156161155c846112d1565b610e7d565b90508083825260208201905060208402830185811115611584576115836112fd565b5b835b818110156115cb57805167ffffffffffffffff8111156115a9576115a8610e13565b5b8086016115b689826113d2565b85526020850194505050602081019050611586565b5050509392505050565b600082601f8301126115ea576115e9610e13565b5b81516115fa84826020860161154e565b91505092915050565b6000602082840312156116195761161861093b565b5b600082015167ffffffffffffffff81111561163757611636610940565b5b611643848285016115d5565b91505092915050565b611655816109fc565b82525050565b6000602082019050611670600083018461164c565b92915050565b60006020828403121561168c5761168b61093b565b5b600061169a848285016113bd565b91505092915050565b600082825260208201905092915050565b7f436572746966696361746520776974682070726f766964656420494420646f6560008201527f73206e6f742065786973742e0000000000000000000000000000000000000000602082015250565b6000611710602c836116a3565b915061171b826116b4565b604082019050919050565b6000602082019050818103600083015261173f81611703565b9050919050565b60006020828403121561175c5761175b61093b565b5b600082015167ffffffffffffffff81111561177a57611779610940565b5b611786848285016113d2565b91505092915050565b600061179a82610a24565b6117a481856116a3565b93506117b4818560208601610a40565b6117bd81610a73565b840191505092915050565b600060e0820190506117dd600083018a6112a7565b6117ea60208301896112a7565b6117f7604083018861164c565b611804606083018761164c565b8181036080830152611816818661178f565b905081810360a083015261182a818561178f565b905081810360c083015261183e818461178f565b905098975050505050505050565b6000602082840312156118625761186161093b565b5b60006118708482850161130c565b91505092915050565b60006101008201905061188f600083018b61164c565b61189c602083018a61164c565b6118a960408301896112a7565b6118b660608301886112a7565b6118c3608083018761164c565b81810360a08301526118d5818661178f565b905081810360c08301526118e9818561178f565b905081810360e08301526118fd818461178f565b90509998505050505050505050565b6000610140828403121561192357611922611302565b5b61192e610140610e7d565b9050600061193e8482850161130c565b600083015250602061195284828501611321565b602083015250604082015167ffffffffffffffff81111561197657611975611307565b5b61198284828501611378565b60408301525060606119968482850161130c565b60608301525060806119aa8482850161130c565b60808301525060a082015167ffffffffffffffff8111156119ce576119cd611307565b5b6119da84828501611378565b60a08301525060c082015167ffffffffffffffff8111156119fe576119fd611307565b5b611a0a84828501611378565b60c08301525060e0611a1e848285016113bd565b60e08301525061010082015167ffffffffffffffff811115611a4357611a42611307565b5b611a4f84828501611378565b61010083015250610120611a658482850161130c565b6101208301525092915050565b600060208284031215611a8857611a8761093b565b5b600082015167ffffffffffffffff811115611aa657611aa5610940565b5b611ab28482850161190c565b91505092915050565b611ac4816110ad565b8114611acf57600080fd5b50565b600081519050611ae181611abb565b92915050565b600060608284031215611afd57611afc611302565b5b611b076060610e7d565b9050600082015167ffffffffffffffff811115611b2757611b26611307565b5b611b3384828501611378565b6000830152506020611b4784828501611ad2565b6020830152506040611b5b8482850161130c565b60408301525092915050565b600060208284031215611b7d57611b7c61093b565b5b600082015167ffffffffffffffff811115611b9b57611b9a610940565b5b611ba784828501611ae7565b91505092915050565b600060a08284031215611bc657611bc5611302565b5b611bd060a0610e7d565b9050600082015167ffffffffffffffff811115611bf057611bef611307565b5b611bfc84828501611378565b6000830152506020611c1084828501611321565b602083015250604082015167ffffffffffffffff811115611c3457611c33611307565b5b611c4084828501611378565b604083015250606082015167ffffffffffffffff811115611c6457611c63611307565b5b611c7084828501611378565b6060830152506080611c848482850161130c565b60808301525092915050565b600060208284031215611ca657611ca561093b565b5b600082015167ffffffffffffffff811115611cc457611cc3610940565b5b611cd084828501611bb0565b9150509291505056fea26469706673582212202ed22816d90b83779f8ad79cf0ddeea5f37f4b12d94c32931825be9ddb982ec164736f6c63430008090033";

type CertificateEndpointConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CertificateEndpointConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CertificateEndpoint__factory extends ContractFactory {
  constructor(...args: CertificateEndpointConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    issuerStorageAddress: PromiseOrValue<string>,
    applicantStorageAddress: PromiseOrValue<string>,
    accreditationStorageAddress: PromiseOrValue<string>,
    certificateStorageAddress: PromiseOrValue<string>,
    certificateNFTAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CertificateEndpoint> {
    return super.deploy(
      issuerStorageAddress,
      applicantStorageAddress,
      accreditationStorageAddress,
      certificateStorageAddress,
      certificateNFTAddress,
      overrides || {}
    ) as Promise<CertificateEndpoint>;
  }
  override getDeployTransaction(
    issuerStorageAddress: PromiseOrValue<string>,
    applicantStorageAddress: PromiseOrValue<string>,
    accreditationStorageAddress: PromiseOrValue<string>,
    certificateStorageAddress: PromiseOrValue<string>,
    certificateNFTAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      issuerStorageAddress,
      applicantStorageAddress,
      accreditationStorageAddress,
      certificateStorageAddress,
      certificateNFTAddress,
      overrides || {}
    );
  }
  override attach(address: string): CertificateEndpoint {
    return super.attach(address) as CertificateEndpoint;
  }
  override connect(signer: Signer): CertificateEndpoint__factory {
    return super.connect(signer) as CertificateEndpoint__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CertificateEndpointInterface {
    return new utils.Interface(_abi) as CertificateEndpointInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CertificateEndpoint {
    return new Contract(address, _abi, signerOrProvider) as CertificateEndpoint;
  }
}