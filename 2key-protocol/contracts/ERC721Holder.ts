/* GENERATED BY TYPECHAIN VER. 0.2.6 */
/* tslint:disable */

import { BigNumber } from "bignumber.js";
import * as TC from "./typechain-runtime";

export class ERC721Holder extends TC.TypeChainContract {
  public readonly rawWeb3Contract: any;

  public constructor(web3: any, address: string | BigNumber) {
    const abi = [
      {
        constant: false,
        inputs: [
          { name: "", type: "address" },
          { name: "", type: "address" },
          { name: "", type: "uint256" },
          { name: "", type: "bytes" }
        ],
        name: "onERC721Received",
        outputs: [{ name: "", type: "bytes4" }],
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
  ): Promise<ERC721Holder> {
    const contract = new ERC721Holder(web3, address);
    const code = await TC.promisify(web3.eth.getCode, [address]);

    // in case of missing smartcontract, code can be equal to "0x0" or "0x" depending on exact web3 implementation
    // to cover all these cases we just check against the source code length — there won't be any meaningful EVM program in less then 3 chars
    if (code.length < 4) {
      throw new Error(`Contract at ${address} doesn't exist!`);
    }
    return contract;
  }

  public onERC721ReceivedTx(
    arg0: BigNumber | string,
    arg1: BigNumber | string,
    arg2: BigNumber | number,
    arg3: string[]
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "onERC721Received",
      [
        arg0.toString(),
        arg1.toString(),
        arg2.toString(),
        arg3.map(val => val.toString())
      ]
    );
  }
}
