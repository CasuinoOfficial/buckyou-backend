import { PACKAGE_ID } from "../contract/deployments";
import { HouseSigner } from "../lib/house";
import dotenv from "dotenv";
dotenv.config();

export const RAFFLE_TARGET: `${string}::${string}::${string}` = `${PACKAGE_ID}::lootbox::raffle`;
export const SETTLE_TARGET: `${string}::${string}::${string}` = `${PACKAGE_ID}::lootbox::settle`;
export const DESTROY_TARGET: `${string}::${string}::${string}` = `${PACKAGE_ID}::lootbox::destroy`;

export const HOUSE_SIGNER = new HouseSigner({
  suiSecretKey: process.env.SUI_SECRET_KEY ?? "",
  blsSecretKey: process.env.BLS_SECRET_KEY ?? "",
});

export const LOOP_PERIOD = 10 * 60_000; // 10 mins

function main() {
  console.log(HOUSE_SIGNER.getSuiAddress());
  console.log(HOUSE_SIGNER.getBlsPublicKey());
  console.log(HOUSE_SIGNER.getBlsSecretKey());
}

if (require.main === module) {
  main();
}
