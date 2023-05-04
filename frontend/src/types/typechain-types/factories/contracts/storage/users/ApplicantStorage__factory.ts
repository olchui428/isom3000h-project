/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  ApplicantStorage,
  ApplicantStorageInterface,
} from "../../../../contracts/storage/users/ApplicantStorage";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "applicantAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "createApplicant",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
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
    name: "getApplicantByAddress",
    outputs: [
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
    name: "isApplicantExists",
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
        name: "applicantEndpointAddress",
        type: "address",
      },
    ],
    name: "setAddresses",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405260008060006101000a81548160ff02191690831515021790555034801561002a57600080fd5b50610045679d686b0ad466633260c01b6100a560201b60201c565b61005f67817ed9743208a98f60c01b6100a560201b60201c565b33600060016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506100a8565b50565b610f9d806100b76000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063026ff3df146100515780634bd555191461008157806381d3c435146100b1578063fbe2dfb9146100cd575b600080fd5b61006b60048036038101906100669190610b74565b6100fd565b6040516100789190610cc4565b60405180910390f35b61009b60048036038101906100969190610e1b565b61037e565b6040516100a89190610e92565b60405180910390f35b6100cb60048036038101906100c69190610ed9565b610703565b005b6100e760048036038101906100e29190610b74565b61094f565b6040516100f49190610e92565b60405180910390f35b610105610a28565b61011967b8a98c8c01efa5b360c01b610a25565b61012d6710cb18a7522ec9ad60c01b610a25565b610141670bcf925703ee0dd760c01b610a25565b61015567a324fe07ad410f5a60c01b610a25565b61016967573a65e2bd3d367860c01b610a25565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146101c357600080fd5b6101d7672be896707a4f3f9160c01b610a25565b6101eb674e3c1c095c26b0d560c01b610a25565b6101ff67a6184950499f70d560c01b610a25565b61021367a7793ac158d4be5c60c01b610a25565b61022767a6b033ddc66847cf60c01b610a25565b61023b6714caa9d2067da49a60c01b610a25565b600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060405180606001604052908160008201805461029590610f35565b80601f01602080910402602001604051908101604052809291908181526020018280546102c190610f35565b801561030e5780601f106102e35761010080835404028352916020019161030e565b820191906000526020600020905b8154815290600101906020018083116102f157829003601f168201915b505050505081526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820154815250509050919050565b600061039467212939aeac8f0dde60c01b610a25565b826103a967f26e95648fcf44ed60c01b610a25565b6103bd67e78af84375d70b1160c01b610a25565b6103d1674cdb442970d5da8460c01b610a25565b6000600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060405180606001604052908160008201805461042d90610f35565b80601f016020809104026020016040519081016040528092919081815260200182805461045990610f35565b80156104a65780601f1061047b576101008083540402835291602001916104a6565b820191906000526020600020905b81548152906001019060200180831161048957829003601f168201915b505050505081526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481525050905061052567ae890ef34cc8bfd660c01b610a25565b61053967243986e026c086a060c01b610a25565b61054d6727335e985fc4582960c01b610a25565b600073ffffffffffffffffffffffffffffffffffffffff16816020015173ffffffffffffffffffffffffffffffffffffffff161461058a57600080fd5b61059e67651f76bf623e4f3360c01b610a25565b6105b2677dc542d1f6fc01f460c01b610a25565b6105c66758e9b827c8ac601f60c01b610a25565b6105da670d1a483645d97f3160c01b610a25565b6105ee67bf9cb9124dd5f7ad60c01b610a25565b60405180606001604052808581526020018673ffffffffffffffffffffffffffffffffffffffff16815260200142815250600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082015181600001908051906020019061067a929190610a5f565b5060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550604082015181600201559050506106e3674f6c71f5e1f3af3660c01b610a25565b6106f767935bbbaee79e6de960c01b610a25565b60019250505092915050565b61071767d703c0fc521994be60c01b610a25565b61072b67927256e18e1e07e660c01b610a25565b61073f67b5fe7a9f8030cff360c01b610a25565b61075367baf243506f2c6c2a60c01b610a25565b61076767ab46f5d44b33a5eb60c01b610a25565b600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146107c157600080fd5b6107d567619a68522b7bce2b60c01b610a25565b6107e9675db854eb37058b2060c01b610a25565b6107fd676c0b12a91fcbb35f60c01b610a25565b61081167fb2213072aba0b1d60c01b610a25565b6108256768f4935d66f3827960c01b610a25565b610839670d8ef07d78e54d3060c01b610a25565b61084d67ba9bb60ad1e896c460c01b610a25565b61086167df48221672bad76c60c01b610a25565b60008054906101000a900460ff161561087957600080fd5b61088d67c23ca1e51f919e4060c01b610a25565b6108a1671db4ed6e2531ddb760c01b610a25565b6108b567ba8af0c979c69d0760c01b610a25565b6108c967727a37c62240a38160c01b610a25565b6108dd67d5d4bfdccde67b9a60c01b610a25565b60016000806101000a81548160ff02191690831515021790555061090b67af7ad0e59189455960c01b610a25565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60006109656767e11d5ab78c391f60c01b610a25565b610979678bb5c77068d6a54260c01b610a25565b61098d673c964a6eda0ef47b60c01b610a25565b8173ffffffffffffffffffffffffffffffffffffffff16600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16149050919050565b50565b604051806060016040528060608152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600081525090565b828054610a6b90610f35565b90600052602060002090601f016020900481019282610a8d5760008555610ad4565b82601f10610aa657805160ff1916838001178555610ad4565b82800160010185558215610ad4579182015b82811115610ad3578251825591602001919060010190610ab8565b5b509050610ae19190610ae5565b5090565b5b80821115610afe576000816000905550600101610ae6565b5090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610b4182610b16565b9050919050565b610b5181610b36565b8114610b5c57600080fd5b50565b600081359050610b6e81610b48565b92915050565b600060208284031215610b8a57610b89610b0c565b5b6000610b9884828501610b5f565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610bdb578082015181840152602081019050610bc0565b83811115610bea576000848401525b50505050565b6000601f19601f8301169050919050565b6000610c0c82610ba1565b610c168185610bac565b9350610c26818560208601610bbd565b610c2f81610bf0565b840191505092915050565b6000610c4582610b16565b9050919050565b610c5581610c3a565b82525050565b6000819050919050565b610c6e81610c5b565b82525050565b60006060830160008301518482036000860152610c918282610c01565b9150506020830151610ca66020860182610c4c565b506040830151610cb96040860182610c65565b508091505092915050565b60006020820190508181036000830152610cde8184610c74565b905092915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610d2882610bf0565b810181811067ffffffffffffffff82111715610d4757610d46610cf0565b5b80604052505050565b6000610d5a610b02565b9050610d668282610d1f565b919050565b600067ffffffffffffffff821115610d8657610d85610cf0565b5b610d8f82610bf0565b9050602081019050919050565b82818337600083830152505050565b6000610dbe610db984610d6b565b610d50565b905082815260208101848484011115610dda57610dd9610ceb565b5b610de5848285610d9c565b509392505050565b600082601f830112610e0257610e01610ce6565b5b8135610e12848260208601610dab565b91505092915050565b60008060408385031215610e3257610e31610b0c565b5b6000610e4085828601610b5f565b925050602083013567ffffffffffffffff811115610e6157610e60610b11565b5b610e6d85828601610ded565b9150509250929050565b60008115159050919050565b610e8c81610e77565b82525050565b6000602082019050610ea76000830184610e83565b92915050565b610eb681610c3a565b8114610ec157600080fd5b50565b600081359050610ed381610ead565b92915050565b600060208284031215610eef57610eee610b0c565b5b6000610efd84828501610ec4565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610f4d57607f821691505b60208210811415610f6157610f60610f06565b5b5091905056fea2646970667358221220fb094e1fad9fea79b2ca563a7662f88f7ae029337dd56b1841203fa4f4879a7264736f6c63430008090033";

type ApplicantStorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ApplicantStorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ApplicantStorage__factory extends ContractFactory {
  constructor(...args: ApplicantStorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ApplicantStorage> {
    return super.deploy(overrides || {}) as Promise<ApplicantStorage>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ApplicantStorage {
    return super.attach(address) as ApplicantStorage;
  }
  override connect(signer: Signer): ApplicantStorage__factory {
    return super.connect(signer) as ApplicantStorage__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ApplicantStorageInterface {
    return new utils.Interface(_abi) as ApplicantStorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ApplicantStorage {
    return new Contract(address, _abi, signerOrProvider) as ApplicantStorage;
  }
}