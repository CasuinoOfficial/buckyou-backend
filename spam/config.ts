import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import dotenv from "dotenv";
dotenv.config();

export const REFERRER_ADDRESS =
  process.env.REFERRER ??
  "0x95b0ce9775382b88a4e698d31a0a7fd796922c91bb80de66e940bd4cae5a9916";

export const SIGNER = Ed25519Keypair.deriveKeypair(
  process.env.PASSPHRASE ?? "",
);

export const CLIENT = new SuiClient({
  url: process.env.RPC_URL ?? getFullnodeUrl("mainnet"),
});

function main() {
  console.log("signer address:", SIGNER.toSuiAddress());
  console.log("referrer address:", REFERRER_ADDRESS);
}

if (require.main === module) {
  main();
}
