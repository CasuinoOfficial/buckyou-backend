import { TransactionBlock } from "@mysten/sui.js/transactions";
import { HOUSE_SIGNER } from "./config";

async function main() {
  const tx = new TransactionBlock();
  const publisherObj = tx.object(
    "0xbbfc59666d50021b5d77a1b600656d6f6109b3ffcdf20f175994b10b3f2bd9ae",
  );
  const displayerTypes = [
    "0x80fe74322a141e1a4de653c7ed7f8341c457fb91c7415347ba5475cda8c40faf::ticket::Ticket<0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK>",
    "0x80fe74322a141e1a4de653c7ed7f8341c457fb91c7415347ba5475cda8c40faf::ticket::Ticket<0x980ec1e7d5a3d11c95039cab901f02a044df2d82bc79d99b60455c02524fad83::pup::PUP>",
    "0x80fe74322a141e1a4de653c7ed7f8341c457fb91c7415347ba5475cda8c40faf::ticket::Ticket<0xd441d82fa791d7e7fc89eb2a40b0714bd9a6a1aaf0c897d702802d30109c1f7b::red_envelope::RedEnvelope<0x2::sui::SUI>>",
    "0x80fe74322a141e1a4de653c7ed7f8341c457fb91c7415347ba5475cda8c40faf::ticket::Ticket<0xd441d82fa791d7e7fc89eb2a40b0714bd9a6a1aaf0c897d702802d30109c1f7b::red_envelope::RedEnvelope<0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK>>",
    "0x80fe74322a141e1a4de653c7ed7f8341c457fb91c7415347ba5475cda8c40faf::ticket::Ticket<0xd441d82fa791d7e7fc89eb2a40b0714bd9a6a1aaf0c897d702802d30109c1f7b::red_envelope::RedEnvelope<0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5::navx::NAVX>>",
    "0x80fe74322a141e1a4de653c7ed7f8341c457fb91c7415347ba5475cda8c40faf::ticket::Ticket<0xd441d82fa791d7e7fc89eb2a40b0714bd9a6a1aaf0c897d702802d30109c1f7b::red_envelope::RedEnvelope<0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS>>",
    "0x80fe74322a141e1a4de653c7ed7f8341c457fb91c7415347ba5475cda8c40faf::ticket::Ticket<0xd441d82fa791d7e7fc89eb2a40b0714bd9a6a1aaf0c897d702802d30109c1f7b::red_envelope::RedEnvelope<0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::FUD>>",
  ];
  const displayerObjs = displayerTypes.map((displayerType) => {
    const displayer = tx.moveCall({
      target: "0x2::display::new_with_fields",
      typeArguments: [displayerType],
      arguments: [
        publisherObj,
        tx.pure(["name", "description", "image_url", "project_url", "creator"]),
        tx.pure([
          // name
          "BuckYou BlastOff! Boarding Pass",
          // description
          "Destination: The moon. Your rocket ship ticket to a brighter tomorrow!",
          // image_url
          "https://dweb.link/ipfs/bafybeidjoulhiwjj57c7skjoypmqxieafna3llkljgxbr6lmgplfu5mkye",
          // project_url
          "https://www.doubleup.fun/blastoff",
          // creator
          "DoubleUp X Bucket",
        ]),
      ],
    });
    tx.moveCall({
      target: "0x2::display::update_version",
      typeArguments: [displayerType],
      arguments: [displayer],
    });
    return displayer;
  });
  tx.transferObjects(displayerObjs, HOUSE_SIGNER.getSuiAddress());
  const res = await HOUSE_SIGNER.signAndExecuteTransactionBlock({
    transactionBlock: tx,
    options: {
      showObjectChanges: true,
    },
  });
  console.log(
    res.objectChanges
      ?.filter((c) => c.type === "created")
      ?.map((c) => [c.objectId, c.objectType]),
  );
}

main().catch((err) => console.log(err));
