/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  IssuerEndpoint,
  IssuerEndpointInterface,
} from "../../../contracts/endpoints/IssuerEndpoint";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "issuerStorageAddress",
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
        internalType: "address payable",
        name: "issuerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "logoUrl",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
    ],
    name: "RegisterIssuer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "issuerAddress",
        type: "address",
      },
    ],
    name: "getIssuerByAddress",
    outputs: [
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
        internalType: "string",
        name: "name",
        type: "string",
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
    ],
    name: "registerIssuer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610b70380380610b708339818101604052810190610032919061015d565b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505061018a565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061012a826100ff565b9050919050565b61013a8161011f565b811461014557600080fd5b50565b60008151905061015781610131565b92915050565b600060208284031215610173576101726100fa565b5b600061018184828501610148565b91505092915050565b6109d7806101996000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80635f8818d01461003b5780638096373e1461006b575b600080fd5b61005560048036038101906100509190610308565b610087565b604051610062919061047a565b60405180910390f35b610085600480360381019061008091906105d1565b610146565b005b61008f610251565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16635f8818d0836040518263ffffffff1660e01b81526004016100ea9190610687565b60006040518083038186803b15801561010257600080fd5b505afa158015610116573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019061013f919061083d565b9050919050565b60003390506000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b88ece3e838787876040518563ffffffff1660e01b81526004016101ae94939291906108d0565b600060405180830381600087803b1580156101c857600080fd5b505af11580156101dc573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610205919061083d565b90507f4094cf4c43c0a91e40dd2472e4ddbab69379a61eb8194598c1cf02493700d44f828686868560800151604051610242959493929190610939565b60405180910390a15050505050565b6040518060a0016040528060608152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016060815260200160608152602001600081525090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006102d5826102aa565b9050919050565b6102e5816102ca565b81146102f057600080fd5b50565b600081359050610302816102dc565b92915050565b60006020828403121561031e5761031d6102a0565b5b600061032c848285016102f3565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561036f578082015181840152602081019050610354565b8381111561037e576000848401525b50505050565b6000601f19601f8301169050919050565b60006103a082610335565b6103aa8185610340565b93506103ba818560208601610351565b6103c381610384565b840191505092915050565b6103d7816102ca565b82525050565b6000819050919050565b6103f0816103dd565b82525050565b600060a08301600083015184820360008601526104138282610395565b915050602083015161042860208601826103ce565b50604083015184820360408601526104408282610395565b9150506060830151848203606086015261045a8282610395565b915050608083015161046f60808601826103e7565b508091505092915050565b6000602082019050818103600083015261049481846103f6565b905092915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6104de82610384565b810181811067ffffffffffffffff821117156104fd576104fc6104a6565b5b80604052505050565b6000610510610296565b905061051c82826104d5565b919050565b600067ffffffffffffffff82111561053c5761053b6104a6565b5b61054582610384565b9050602081019050919050565b82818337600083830152505050565b600061057461056f84610521565b610506565b9050828152602081018484840111156105905761058f6104a1565b5b61059b848285610552565b509392505050565b600082601f8301126105b8576105b761049c565b5b81356105c8848260208601610561565b91505092915050565b6000806000606084860312156105ea576105e96102a0565b5b600084013567ffffffffffffffff811115610608576106076102a5565b5b610614868287016105a3565b935050602084013567ffffffffffffffff811115610635576106346102a5565b5b610641868287016105a3565b925050604084013567ffffffffffffffff811115610662576106616102a5565b5b61066e868287016105a3565b9150509250925092565b610681816102ca565b82525050565b600060208201905061069c6000830184610678565b92915050565b600080fd5b600080fd5b60006106bf6106ba84610521565b610506565b9050828152602081018484840111156106db576106da6104a1565b5b6106e6848285610351565b509392505050565b600082601f8301126107035761070261049c565b5b81516107138482602086016106ac565b91505092915050565b60008151905061072b816102dc565b92915050565b61073a816103dd565b811461074557600080fd5b50565b60008151905061075781610731565b92915050565b600060a08284031215610773576107726106a2565b5b61077d60a0610506565b9050600082015167ffffffffffffffff81111561079d5761079c6106a7565b5b6107a9848285016106ee565b60008301525060206107bd8482850161071c565b602083015250604082015167ffffffffffffffff8111156107e1576107e06106a7565b5b6107ed848285016106ee565b604083015250606082015167ffffffffffffffff811115610811576108106106a7565b5b61081d848285016106ee565b606083015250608061083184828501610748565b60808301525092915050565b600060208284031215610853576108526102a0565b5b600082015167ffffffffffffffff811115610871576108706102a5565b5b61087d8482850161075d565b91505092915050565b600082825260208201905092915050565b60006108a282610335565b6108ac8185610886565b93506108bc818560208601610351565b6108c581610384565b840191505092915050565b60006080820190506108e56000830187610678565b81810360208301526108f78186610897565b9050818103604083015261090b8185610897565b9050818103606083015261091f8184610897565b905095945050505050565b610933816103dd565b82525050565b600060a08201905061094e6000830188610678565b81810360208301526109608187610897565b905081810360408301526109748186610897565b905081810360608301526109888185610897565b9050610997608083018461092a565b969550505050505056fea2646970667358221220de435f65f2a37c65acc809db7316b202c96a097e896711c698976aa2e475c78864736f6c63430008090033";

type IssuerEndpointConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: IssuerEndpointConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class IssuerEndpoint__factory extends ContractFactory {
  constructor(...args: IssuerEndpointConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    issuerStorageAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<IssuerEndpoint> {
    return super.deploy(
      issuerStorageAddress,
      overrides || {}
    ) as Promise<IssuerEndpoint>;
  }
  override getDeployTransaction(
    issuerStorageAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(issuerStorageAddress, overrides || {});
  }
  override attach(address: string): IssuerEndpoint {
    return super.attach(address) as IssuerEndpoint;
  }
  override connect(signer: Signer): IssuerEndpoint__factory {
    return super.connect(signer) as IssuerEndpoint__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): IssuerEndpointInterface {
    return new utils.Interface(_abi) as IssuerEndpointInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IssuerEndpoint {
    return new Contract(address, _abi, signerOrProvider) as IssuerEndpoint;
  }
}