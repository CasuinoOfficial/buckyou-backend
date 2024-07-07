import { SharedObjectRef } from "@mysten/sui.js/bcs";

export const TYPE_ID =
  "0x80fe74322a141e1a4de653c7ed7f8341c457fb91c7415347ba5475cda8c40faf";

export const PACKAGE_ID =
  "0x80fe74322a141e1a4de653c7ed7f8341c457fb91c7415347ba5475cda8c40faf";

export const COIN_TYPE_WHITELIST: SharedObjectRef = {
  objectId:
    "0x67c8acccf220318d0779244bdbe4e65f0560697bfd1e0ea203bd7e2d380ecfaa",
  initialSharedVersion: 296783179,
  mutable: true,
};

export const OBJECT_TYPE_WHITELIST: SharedObjectRef = {
  objectId:
    "0x0a7730403f7654b5934e7e064d3cd58fc4d4b7f77d4505905fe7b4e3f14fdfb0",
  initialSharedVersion: 296783179,
  mutable: true,
};

export const ORACLE: SharedObjectRef = {
  objectId:
    "0xa9a4abea7c952ed74b80489dc606c0ff236479f2ad88ee09a761e3c63e8fb337",
  initialSharedVersion: 296783179,
  mutable: false,
};

export const ORACLE_MUT: SharedObjectRef = {
  objectId: ORACLE.objectId,
  initialSharedVersion: 296783179,
  mutable: true,
};

export const TROVE_MANAGER: SharedObjectRef = {
  objectId:
    "0x9eff4a695dc7d149aee2611e922ceb269b88ddf45c6f29ab4b071be14fb31375",
  initialSharedVersion: 296783179,
  mutable: true,
};

export const REFERRAL_MANAGER: SharedObjectRef = {
  objectId:
    "0x4d44f7f6f4be38487c6bb16cf3635e1e0b81338b10aaa982de726683720489e8",
  initialSharedVersion: 296783179,
  mutable: true,
};

export const FINAL_POOL: SharedObjectRef = {
  objectId:
    "0xdd4913fd7d5124f184bbbe6eba9db2a409485aeb012a16434e5185a2e1a21777",
  initialSharedVersion: 296783179,
  mutable: true,
};

export const LOOTBOX_POOL: SharedObjectRef = {
  objectId:
    "0x03ec757544cf23977b49ab6ff972eafba5ac78b14ff9f8b68c4c41f762806e3b",
  initialSharedVersion: 296783179,
  mutable: true,
};

export const GAME_STATUS: SharedObjectRef = {
  objectId:
    "0x42a3761883b81c632cfcd86341e7631030e8a457f4d146fba84ebd14c2a1c189",
  initialSharedVersion: 296783179,
  mutable: true,
};

export const CLOCK: SharedObjectRef = {
  objectId: "0x6",
  initialSharedVersion: 1,
  mutable: false,
};

export const RAFFLE_CENTER_ID =
  "0x6b3a43748c330d810f7d90690ec55ac9464c8d561e3dc15635904b9c7c702488";
