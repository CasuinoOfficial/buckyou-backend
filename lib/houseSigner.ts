import { TransactionBlock } from "@mysten/sui.js/transactions";
import {
  SuiClient,
  SuiTransactionBlockResponse,
  SuiTransactionBlockResponseOptions,
  getFullnodeUrl,
} from "@mysten/sui.js/client";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { getPublicKey, sign as blsSign } from "@noble/bls12-381";

export class HouseSigner {
  private suiKeypair: Ed25519Keypair;
  private blsSecretKey: Buffer;
  public suiClient: SuiClient;

  constructor(inputs: {
    suiSecretKey: string;
    blsSecretKey: string;
    rpcEndpoint?: string;
  }) {
    const { suiSecretKey, blsSecretKey, rpcEndpoint } = inputs;
    this.suiKeypair = Ed25519Keypair.fromSecretKey(
      new Uint8Array(Buffer.from(suiSecretKey, "hex")),
    );
    this.blsSecretKey = Buffer.from(blsSecretKey, "hex");

    if (rpcEndpoint) this.suiClient = new SuiClient({ url: rpcEndpoint });
    else this.suiClient = new SuiClient({ url: getFullnodeUrl("mainnet") });
  }

  getSuiAddress(): string {
    return this.suiKeypair.getPublicKey().toSuiAddress();
  }

  getBlsPublicKey(): Uint8Array {
    return getPublicKey(this.blsSecretKey);
  }

  getBlsSecretKey(): string {
    return this.blsSecretKey.toString("hex");
  }

  async blsSign(msg: string): Promise<Uint8Array> {
    return blsSign(msg, this.blsSecretKey);
  }

  async signAndExecuteTransactionBlock(txInput: {
    transactionBlock: TransactionBlock;
    options?: SuiTransactionBlockResponseOptions;
  }): Promise<SuiTransactionBlockResponse> {
    return this.suiClient.signAndExecuteTransactionBlock({
      transactionBlock: txInput.transactionBlock,
      signer: this.suiKeypair,
      options: txInput.options,
    });
  }
}
