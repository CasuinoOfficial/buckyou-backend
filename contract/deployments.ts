import { SharedObjectRef } from "@mysten/sui.js/bcs";

export const TYPE_ID =
  "0x0b1bd3db2664e3d980fa8e6f2a5391cad98bc082f8fec3ed62459b3731983e5e";

export const PACKAGE_ID =
  "0xa7533ea37be167feede14b7a5bd6bd9e938e61dfe068ff8e61d707ffbef95fee";

export const COIN_TYPE_WHITELIST: SharedObjectRef = {
  objectId:
    "0x24f313249ab68a0aa8740c404cc9d1c8a416fe6e1848f6977ad34b5a706e46b8",
  initialSharedVersion: 103355762,
  mutable: true,
};

export const OBJECT_TYPE_WHITELIST: SharedObjectRef = {
  objectId:
    "0xfc0cb95722d72a30fc21bb7fb87ccb7b43f8339f1ae5c8037eb132fecc8d48b9",
  initialSharedVersion: 103355762,
  mutable: true,
};

export const ORACLE: SharedObjectRef = {
  objectId:
    "0x97b836bdbaf8d438b9622f62ea3a9fe2db1488dbbfafdf0f5dd3ef7f8ca5b517",
  initialSharedVersion: 103355762,
  mutable: false,
};

export const ORACLE_MUT: SharedObjectRef = {
  objectId: ORACLE.objectId,
  initialSharedVersion: 103355762,
  mutable: true,
};

export const TROVE_MANAGER: SharedObjectRef = {
  objectId:
    "0x2ee9b5a7b961163296860d0203fca169d585cafe8b7ac9c031b649fb05974651",
  initialSharedVersion: 103355762,
  mutable: true,
};

export const PROFILE_MANAGER: SharedObjectRef = {
  objectId:
    "0x2f41325adba0388d1f0e53ef9cf9ff9fec9aa4d56baf08f2d6a7cf3143268243",
  initialSharedVersion: 103355762,
  mutable: true,
};

export const FINAL_POOL: SharedObjectRef = {
  objectId:
    "0x401d1b4d706fcc5386567ea7902b86f4475a0821479d37a5ec269fb12b33b9ee",
  initialSharedVersion: 103355762,
  mutable: true,
};

export const LOOTBOX_POOL: SharedObjectRef = {
  objectId:
    "0xf9f03c12e9090e1e35315921f1fcbe49f5142e655d6d055e6b1392074869fd75",
  initialSharedVersion: 103355762,
  mutable: true,
};

export const GAME_STATUS: SharedObjectRef = {
  objectId:
    "0x5c139f2f1bf1ed647326be94b57772a47ab52299eb7bff6577fc6d69387fec23",
  initialSharedVersion: 103355762,
  mutable: true,
};

export const CLOCK: SharedObjectRef = {
  objectId: "0x6",
  initialSharedVersion: 1,
  mutable: false,
};

export const RAFFLE_CENTER_ID =
  "0xce8c9a36f726a89212a78700d5410033c343eed7d5ed4701a0e59e5eb1f54a12";
