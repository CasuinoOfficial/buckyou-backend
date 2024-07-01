import { HouseSigner } from "../lib/houseSigner";
import dotenv from "dotenv";
import { getFullnodeUrl } from "@mysten/sui.js/client";
dotenv.config();

export const TYPE_ID =
  "0x0b1bd3db2664e3d980fa8e6f2a5391cad98bc082f8fec3ed62459b3731983e5e";
export const PACKAGE_ID =
  "0xa7533ea37be167feede14b7a5bd6bd9e938e61dfe068ff8e61d707ffbef95fee";
export const MODULE_NAME = "lootbox";
export const RAFFLE_TARGET = `${PACKAGE_ID}::${MODULE_NAME}::raffle`;
export const SETTLE_TARGET = `${PACKAGE_ID}::${MODULE_NAME}::settle`;
export const DESTROY_TARGET = `${PACKAGE_ID}::${MODULE_NAME}::destroy`;

export const COIN_TYPES = [
  "0x2::sui::SUI",
  "0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK",
];

export const RAFFLE_CENTER_ID =
  "0xce8c9a36f726a89212a78700d5410033c343eed7d5ed4701a0e59e5eb1f54a12";

export const LOOTBOX_OBJ = {
  objectId:
    "0xf9f03c12e9090e1e35315921f1fcbe49f5142e655d6d055e6b1392074869fd75",
  initialSharedVersion: 103355762,
  mutable: true,
};

export const GAME_STATUS_OBJ = {
  objectId:
    "0x5c139f2f1bf1ed647326be94b57772a47ab52299eb7bff6577fc6d69387fec23",
  initialSharedVersion: 103355762,
  mutable: true,
};

export const TROVE_MANAGER_OBJ = {
  objectId:
    "0x2ee9b5a7b961163296860d0203fca169d585cafe8b7ac9c031b649fb05974651",
  initialSharedVersion: 103355762,
  mutable: true,
};

export const CLOCK_OBJ = {
  objectId: "0x6",
  initialSharedVersion: 1,
  mutable: false,
};

const START_TIME = 1715335200000;
const PERIOD = 7_200_000;

export function getRaffleEpoch(timestamp: number): number {
  if (timestamp < START_TIME) {
    return 0;
  } else {
    return Math.floor((timestamp - START_TIME) / PERIOD);
  }
}

export const houseSigner = new HouseSigner({
  suiSecretKey: process.env.SUI_SECRET_KEY ?? "",
  blsSecretKey: process.env.BLS_SECRET_KEY ?? "",
  // rpcEndpoint: "https://t.suiscan.xyz/api/sui/testnet-wave-3/",
  rpcEndpoint: getFullnodeUrl("mainnet"),
});

function main() {
  console.log(houseSigner.getSuiAddress());
  console.log(houseSigner.getBlsPublicKey());
  console.log(houseSigner.getBlsSecretKey());
}

if (require.main === module) {
  // test().catch(err => console.log(err));
  main();
}
