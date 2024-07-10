import {
  TYPE_ID,
  LOOTBOX_POOL,
  TROVE_MANAGER,
  GAME_STATUS,
  CLOCK,
  PACKAGE_ID,
  FINAL_POOL,
  REFERRAL_MANAGER,
  COIN_TYPE_WHITELIST,
  ORACLE,
} from "../contract/deployments";
import { COIN_TYPES, START_TIME } from "../contract/settings";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { CLIENT, REFERRER_ADDRESS, SIGNER } from "./config";
import { SuiObjectRef } from "@mysten/sui.js/client";
import { SUI_TYPE_ARG } from "@mysten/sui.js/utils";
import { getFirstLayerGenerics } from "../lib/utils";

type Ticket = SuiObjectRef & { coinType: string };

const CLIFF_TIME = START_TIME + 72 * 60 * 60_000;

async function getEndTime(): Promise<number> {
  const res = await CLIENT.getObject({
    id: GAME_STATUS.objectId,
    options: {
      showContent: true,
    },
  });
  return Number((res.data?.content as any).fields.end_time);
}

async function getTicket(owner: string): Promise<Ticket | undefined> {
  const res = await CLIENT.getOwnedObjects({
    owner,
    options: {
      showType: true,
    },
  });
  if (res.data[0].data) {
    const ticketRef = res.data[0].data;
    const [coinType] = getFirstLayerGenerics(ticketRef.type ?? "");
    return {
      ...ticketRef,
      coinType,
    };
  }
}

async function claimSeat() {
  const currentTime = new Date().valueOf();
  const endTime = await getEndTime();
  const signerAddr = SIGNER.toSuiAddress();
  const ticket = await getTicket(signerAddr);
  const tx = new TransactionBlock();
  const clockObj = tx.sharedObjectRef(CLOCK);
  const finalPoolObj = tx.sharedObjectRef(FINAL_POOL);
  const gameStatusObj = tx.sharedObjectRef(GAME_STATUS);
  const profileManagerObj = tx.sharedObjectRef(REFERRAL_MANAGER);
  if (currentTime < endTime) {
    if (endTime - currentTime > 30_000) return;
    if (ticket) {
      tx.moveCall({
        target: `${PACKAGE_ID}::ticket::open`,
        typeArguments: [ticket.coinType],
        arguments: [
          tx.sharedObjectRef(CLOCK),
          tx.sharedObjectRef(GAME_STATUS),
          tx.sharedObjectRef(REFERRAL_MANAGER),
          tx.sharedObjectRef(FINAL_POOL),
          tx.objectRef(ticket),
        ],
      });
    } else {
      const ticketVec = tx.moveCall({
        target: `${PACKAGE_ID}::ticket::buy`,
        typeArguments: [SUI_TYPE_ARG],
        arguments: [
          tx.sharedObjectRef(CLOCK),
          tx.sharedObjectRef(COIN_TYPE_WHITELIST),
          tx.sharedObjectRef(ORACLE),
          tx.sharedObjectRef(GAME_STATUS),
          tx.sharedObjectRef(REFERRAL_MANAGER),
          tx.sharedObjectRef(TROVE_MANAGER),
          tx.sharedObjectRef(FINAL_POOL),
          tx.sharedObjectRef(LOOTBOX_POOL),
          tx.gas,
          tx.pure.u64(1),
          tx.pure([REFERRER_ADDRESS]),
          tx.pure.address(signerAddr),
        ],
      });
      const newTicket = tx.moveCall({
        target: "0x1::vector::pop_back",
        typeArguments: [`${TYPE_ID}::ticket::Ticket<${SUI_TYPE_ARG}>`],
        arguments: [ticketVec],
      });
      tx.moveCall({
        target: `${PACKAGE_ID}::ticket::open`,
        typeArguments: [SUI_TYPE_ARG],
        arguments: [
          tx.sharedObjectRef(CLOCK),
          tx.sharedObjectRef(GAME_STATUS),
          tx.sharedObjectRef(REFERRAL_MANAGER),
          tx.sharedObjectRef(FINAL_POOL),
          newTicket,
        ],
      });
      tx.moveCall({
        target: "0x1::vector::destroy_empty",
        typeArguments: [`${TYPE_ID}::ticket::Ticket<${SUI_TYPE_ARG}>`],
        arguments: [ticketVec],
      });
    }
  } else {
    COIN_TYPES.map((coinType) => {
      tx.moveCall({
        target: `${PACKAGE_ID}::final::split_final_pool_after_game_ended`,
        typeArguments: [coinType],
        arguments: [finalPoolObj, gameStatusObj, profileManagerObj, clockObj],
      });
    });
  }
  const txRes = await CLIENT.signAndExecuteTransactionBlock({
    transactionBlock: tx,
    signer: SIGNER,
    options: {
      showEvents: true,
      showBalanceChanges: true,
    },
  });
  if (currentTime < endTime) {
    const [event] =
      txRes.events?.filter(
        (e) => e.type === `${TYPE_ID}::game_status::NewEndTime`,
      ) ?? [];
    if (event) {
      console.log(
        "end time:",
        new Date((event.parsedJson as any).ms).toLocaleString(),
      );
    } else {
      console.log("end time:", new Date(endTime).toLocaleString());
    }
  } else {
    txRes.balanceChanges?.map((change) => {
      const amount = Number(change.amount);
      if (amount > 0) {
        console.log(change.owner, change.coinType.split("::")[2], amount);
      }
    });
  }
}

function main() {
  console.log(SIGNER.toSuiAddress());
  claimSeat();
  setInterval(claimSeat, 25_000);
}

main();
