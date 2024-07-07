import {
  TYPE_ID,
  RAFFLE_CENTER_ID,
  LOOTBOX_POOL,
  TROVE_MANAGER,
  GAME_STATUS,
  CLOCK,
} from "../contract/deployments";
import { COIN_TYPES } from "../contract/settings";
import { getRaffleEpoch } from "../lib/utils";
import {
  DESTROY_TARGET,
  RAFFLE_TARGET,
  SETTLE_TARGET,
  HOUSE_SIGNER,
  LOOP_PERIOD,
} from "./config";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import dotenv from "dotenv";
dotenv.config();

async function raffle() {
  const curretTime = new Date();
  console.log(curretTime);
  const currentEpoch = getRaffleEpoch(curretTime.valueOf());
  const epochesRes = await HOUSE_SIGNER.suiClient.getDynamicFields({
    parentId: RAFFLE_CENTER_ID,
  });
  const unsettledEpoches = epochesRes.data
    .filter((epochData) => Number(epochData.name.value) < currentEpoch)
    .sort((e1, e2) => Number(e1.name.value) - Number(e2.name.value));
  if (unsettledEpoches.length === 0) {
    console.log("nothing to settle");
    return;
  }
  const tx = new TransactionBlock();
  await Promise.all(
    unsettledEpoches.map(async (epochData) => {
      const epoch = Number(epochData.name.value);
      const blsSig = await HOUSE_SIGNER.blsSign(
        Buffer.from(epochData.objectId.slice(2), "hex").toString("hex"),
      );
      tx.moveCall({
        target: RAFFLE_TARGET,
        arguments: [
          tx.sharedObjectRef(LOOTBOX_POOL),
          tx.sharedObjectRef(GAME_STATUS),
          tx.sharedObjectRef(CLOCK),
          tx.pure.u64(epoch),
          tx.pure(Array.from(blsSig), "vector<u8>"),
        ],
      });
      COIN_TYPES.map((coinType) =>
        tx.moveCall({
          target: SETTLE_TARGET,
          typeArguments: [coinType],
          arguments: [
            tx.sharedObjectRef(LOOTBOX_POOL),
            tx.sharedObjectRef(TROVE_MANAGER),
            tx.pure.u64(epoch),
          ],
        }),
      );
      tx.moveCall({
        target: DESTROY_TARGET,
        arguments: [tx.sharedObjectRef(LOOTBOX_POOL), tx.pure.u64(epoch)],
      });
    }),
  );

  try {
    const txRes = await HOUSE_SIGNER.signAndExecuteTransactionBlock({
      transactionBlock: tx,
      options: {
        showEvents: true,
      },
    });
    const resultEvents =
      txRes.events?.filter(
        (e) => e.type === `${TYPE_ID}::lootbox::RaffleResult`,
      ) ?? [];
    console.log(`settle ${resultEvents.length} epoches`);
  } catch (err) {
    console.log(err);
  }
}

function main() {
  raffle();
  setInterval(raffle, LOOP_PERIOD);
}

main();
// main().catch((err) => console.log(err));
