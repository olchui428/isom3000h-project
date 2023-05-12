/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export type CertificateStruct = {
  id: PromiseOrValue<BigNumberish>;
  issuer: PromiseOrValue<string>;
  applicant: PromiseOrValue<string>;
  createdAt: PromiseOrValue<BigNumberish>;
  accreditationId: PromiseOrValue<BigNumberish>;
  level: PromiseOrValue<string>;
  eventId: PromiseOrValue<string>;
  remarks: PromiseOrValue<string>;
  isRevoked: PromiseOrValue<boolean>;
  revokeReason: PromiseOrValue<string>;
  revokeTime: PromiseOrValue<BigNumberish>;
};

export type CertificateStructOutput = [
  BigNumber,
  string,
  string,
  BigNumber,
  BigNumber,
  string,
  string,
  string,
  boolean,
  string,
  BigNumber
] & {
  id: BigNumber;
  issuer: string;
  applicant: string;
  createdAt: BigNumber;
  accreditationId: BigNumber;
  level: string;
  eventId: string;
  remarks: string;
  isRevoked: boolean;
  revokeReason: string;
  revokeTime: BigNumber;
};

export interface CertificateStorageInterface extends utils.Interface {
  functions: {
    "createCertificate(uint256,address,address,uint256,uint256,string,string,string)": FunctionFragment;
    "getCertificateById(uint256)": FunctionFragment;
    "getCertificatesByApplicantAddress(address)": FunctionFragment;
    "isCertificateExists(uint256)": FunctionFragment;
    "setAddresses(address,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createCertificate"
      | "getCertificateById"
      | "getCertificatesByApplicantAddress"
      | "isCertificateExists"
      | "setAddresses"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createCertificate",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getCertificateById",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getCertificatesByApplicantAddress",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isCertificateExists",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setAddresses",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "createCertificate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCertificateById",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCertificatesByApplicantAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isCertificateExists",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAddresses",
    data: BytesLike
  ): Result;

  events: {};
}

export interface CertificateStorage extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CertificateStorageInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    createCertificate(
      newCertId: PromiseOrValue<BigNumberish>,
      issuerAddress: PromiseOrValue<string>,
      applicantAddress: PromiseOrValue<string>,
      createdAt: PromiseOrValue<BigNumberish>,
      accreditationId: PromiseOrValue<BigNumberish>,
      level: PromiseOrValue<string>,
      eventId: PromiseOrValue<string>,
      remarks: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getCertificateById(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[CertificateStructOutput]>;

    getCertificatesByApplicantAddress(
      inputAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[CertificateStructOutput[]]>;

    isCertificateExists(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    setAddresses(
      certificateNFTAddress: PromiseOrValue<string>,
      certificateEndpointAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  createCertificate(
    newCertId: PromiseOrValue<BigNumberish>,
    issuerAddress: PromiseOrValue<string>,
    applicantAddress: PromiseOrValue<string>,
    createdAt: PromiseOrValue<BigNumberish>,
    accreditationId: PromiseOrValue<BigNumberish>,
    level: PromiseOrValue<string>,
    eventId: PromiseOrValue<string>,
    remarks: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getCertificateById(
    id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<CertificateStructOutput>;

  getCertificatesByApplicantAddress(
    inputAddress: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<CertificateStructOutput[]>;

  isCertificateExists(
    id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  setAddresses(
    certificateNFTAddress: PromiseOrValue<string>,
    certificateEndpointAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createCertificate(
      newCertId: PromiseOrValue<BigNumberish>,
      issuerAddress: PromiseOrValue<string>,
      applicantAddress: PromiseOrValue<string>,
      createdAt: PromiseOrValue<BigNumberish>,
      accreditationId: PromiseOrValue<BigNumberish>,
      level: PromiseOrValue<string>,
      eventId: PromiseOrValue<string>,
      remarks: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getCertificateById(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<CertificateStructOutput>;

    getCertificatesByApplicantAddress(
      inputAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<CertificateStructOutput[]>;

    isCertificateExists(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setAddresses(
      certificateNFTAddress: PromiseOrValue<string>,
      certificateEndpointAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    createCertificate(
      newCertId: PromiseOrValue<BigNumberish>,
      issuerAddress: PromiseOrValue<string>,
      applicantAddress: PromiseOrValue<string>,
      createdAt: PromiseOrValue<BigNumberish>,
      accreditationId: PromiseOrValue<BigNumberish>,
      level: PromiseOrValue<string>,
      eventId: PromiseOrValue<string>,
      remarks: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getCertificateById(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCertificatesByApplicantAddress(
      inputAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isCertificateExists(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setAddresses(
      certificateNFTAddress: PromiseOrValue<string>,
      certificateEndpointAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createCertificate(
      newCertId: PromiseOrValue<BigNumberish>,
      issuerAddress: PromiseOrValue<string>,
      applicantAddress: PromiseOrValue<string>,
      createdAt: PromiseOrValue<BigNumberish>,
      accreditationId: PromiseOrValue<BigNumberish>,
      level: PromiseOrValue<string>,
      eventId: PromiseOrValue<string>,
      remarks: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getCertificateById(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCertificatesByApplicantAddress(
      inputAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isCertificateExists(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setAddresses(
      certificateNFTAddress: PromiseOrValue<string>,
      certificateEndpointAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
