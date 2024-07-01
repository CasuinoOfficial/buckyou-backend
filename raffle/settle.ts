import {
  TYPE_ID,
  RAFFLE_CENTER_ID,
  SETTLE_TARGET,
  LOOTBOX_OBJ,
  TROVE_MANAGER_OBJ,
  getRaffleEpoch,
  RAFFLE_TARGET,
  GAME_STATUS_OBJ,
  CLOCK_OBJ,
  COIN_TYPES,
  DESTROY_TARGET,
  houseSigner,
} from "./config";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import dotenv from "dotenv";
dotenv.config();

async function settle() {
  console.log(new Date());
  const currentEpoch = getRaffleEpoch(new Date().valueOf());
  const epochesRes = await houseSigner.suiClient.getDynamicFields({
    parentId: RAFFLE_CENTER_ID,
  });
  // console.log(epochesRes.data);
  const unsettledEpoches = epochesRes.data
    .filter((epochData) => Number(epochData.name.value) < currentEpoch)
    .sort((e1, e2) => Number(e1.name.value) - Number(e2.name.value));
  if (unsettledEpoches.length === 0) {
    console.log("nothing to settle");
    return;
  }
  const tx = new TransactionBlock();
  tx.setGasBudget(500_000_000);
  tx.setGasOwner(houseSigner.getSuiAddress());
  tx.setGasPrice(1_000);
  tx.setSender(houseSigner.getSuiAddress());
  await Promise.all(
    unsettledEpoches.map(async (epochData) => {
      const epoch = Number(epochData.name.value);
      const blsSig = await houseSigner.blsSign(
        Buffer.from(epochData.objectId.slice(2), "hex").toString("hex"),
      );
      tx.moveCall({
        target: RAFFLE_TARGET,
        arguments: [
          tx.sharedObjectRef(LOOTBOX_OBJ),
          tx.sharedObjectRef(GAME_STATUS_OBJ),
          tx.sharedObjectRef(CLOCK_OBJ),
          tx.pure.u64(epoch),
          tx.pure(Array.from(blsSig), "vector<u8>"),
        ],
      });
      COIN_TYPES.map((coinType) =>
        tx.moveCall({
          target: SETTLE_TARGET,
          typeArguments: [coinType],
          arguments: [
            tx.sharedObjectRef(LOOTBOX_OBJ),
            tx.sharedObjectRef(TROVE_MANAGER_OBJ),
            tx.pure.u64(epoch),
          ],
        }),
      );
      tx.moveCall({
        target: DESTROY_TARGET,
        arguments: [tx.sharedObjectRef(LOOTBOX_OBJ), tx.pure.u64(epoch)],
      });
    }),
  );

  const txRes = await houseSigner.signAndExecuteTransactionBlock({
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
}

async function main() {
  settle();
  setInterval(settle, 60_000 * 5);
}

main().catch((err) => console.log(err));
