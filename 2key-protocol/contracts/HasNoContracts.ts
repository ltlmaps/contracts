/* GENERATED BY TYPECHAIN VER. 0.2.6 */
/* tslint:disable */

import { BigNumber } from "bignumber.js";
import * as TC from "./typechain-runtime";

export class HasNoContracts extends TC.TypeChainContract {
  public readonly rawWeb3Contract: any;

  public constructor(web3: any, address: string | BigNumber) {
    const abi = [
      {
        constant: false,
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "owner",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ name: "_newOwner", type: "address" }],
        name: "transferOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        anonymous: false,
        inputs: [{ indexed: true, name: "previousOwner", type: "address" }],
        name: "OwnershipRenounced",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "previousOwner", type: "address" },
          { indexed: true, name: "newOwner", type: "address" }
        ],
        name: "OwnershipTransferred",
        type: "event"
      },
      {
        constant: false,
        inputs: [{ name: "_contractAddr", type: "address" }],
        name: "reclaimContract",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      }
    ];
    super(web3, address, abi);
  }

  static async createAndValidate(
    web3: any,
    address: string | BigNumber
  ): Promise<HasNoContracts> {
    const contract = new HasNoContracts(web3, address);
    const code = await TC.promisify(web3.eth.getCode, [address]);

    // in case of missing smartcontract, code can be equal to "0x0" or "0x" depending on exact web3 implementation
    // to cover all these cases we just check against the source code length — there won't be any meaningful EVM program in less then 3 chars
    if (code.length < 4) {
      throw new Error(`Contract at ${address} doesn't exist!`);
    }
    return contract;
  }

  public get owner(): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.owner, []);
  }

  public renounceOwnershipTx(): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "renounceOwnership",
      []
    );
  }
  public transferOwnershipTx(
    _newOwner: BigNumber | string
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "transferOwnership",
      [_newOwner.toString()]
    );
  }
  public reclaimContractTx(
    _contractAddr: BigNumber | string
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "reclaimContract",
      [_contractAddr.toString()]
    );
  }

  public OwnershipRenouncedEvent(eventFilter: {
    previousOwner?: BigNumber | string | Array<BigNumber | string>;
  }): TC.DeferredEventWrapper<
    { previousOwner: BigNumber | string },
    { previousOwner?: BigNumber | string | Array<BigNumber | string> }
  > {
    return new TC.DeferredEventWrapper<
      { previousOwner: BigNumber | string },
      { previousOwner?: BigNumber | string | Array<BigNumber | string> }
    >(this, "OwnershipRenounced", eventFilter);
  }
  public OwnershipTransferredEvent(eventFilter: {
    previousOwner?: BigNumber | string | Array<BigNumber | string>;
    newOwner?: BigNumber | string | Array<BigNumber | string>;
  }): TC.DeferredEventWrapper<
    { previousOwner: BigNumber | string; newOwner: BigNumber | string },
    {
      previousOwner?: BigNumber | string | Array<BigNumber | string>;
      newOwner?: BigNumber | string | Array<BigNumber | string>;
    }
  > {
    return new TC.DeferredEventWrapper<
      { previousOwner: BigNumber | string; newOwner: BigNumber | string },
      {
        previousOwner?: BigNumber | string | Array<BigNumber | string>;
        newOwner?: BigNumber | string | Array<BigNumber | string>;
      }
    >(this, "OwnershipTransferred", eventFilter);
  }
}
