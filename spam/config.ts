import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import dotenv from "dotenv";
dotenv.config();

export const REFERRER_ADDRESS =
  process.env.REFERRER ??
  "0x95b0ce9775382b88a4e698d31a0a7fd796922c91bb80de66e940bd4cae5a9916";

export const SIGNER =
  (process.env.PASSPHRASE?.split(" ").length ?? 0) === 12
    ? Ed25519Keypair.deriveKeypair(process.env.PASSPHRASE ?? "")
    : Ed25519Keypair.fromSecretKey(
        Buffer.from(process.env.PASSPHRASE ?? "", "hex"),
      );

export const CLIENT = new SuiClient({
  url: process.env.RPC_URL ?? getFullnodeUrl("mainnet"),
});

export const CREW = process.env.CREW
  ? process.env.CREW.split(",")
  : [REFERRER_ADDRESS, SIGNER.toSuiAddress()];

export const THRESHOLD = Number(process.env.THRESHOLD ?? 20);

export const LOOP_PERIOD = Number(process.env.LOOP_PERIOD ?? 17_000);

export const LOG = Boolean(process.env.LOG ?? false);

function main() {
  console.log("signer address:", SIGNER.toSuiAddress());
  console.log("referrer address:", REFERRER_ADDRESS);
}

if (require.main === module) {
  main();
}
