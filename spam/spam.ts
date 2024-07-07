import {
  TYPE_ID,
  RAFFLE_CENTER_ID,
  LOOTBOX_POOL,
  TROVE_MANAGER,
  GAME_STATUS,
  CLOCK,
} from "../contract/deployments";
import { COIN_TYPES } from "../contract/settings";
import { TransactionBlock } from "@mysten/sui.js/transactions";

async function buyAndOpen() {}

async function main() {
  buyAndOpen();
  setInterval(buyAndOpen, 30_000);
}
