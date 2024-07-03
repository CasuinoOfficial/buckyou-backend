import { RAFFLE_PERIOD, START_TIME } from "../contract/settings";

// input: A<B, C, D<E>>
// output: [B, C, D<E>]
export function getFirstLayerGenerics(fullType: string): string[] {
  const leftIndex = fullType.indexOf("<");
  const rightIndex = fullType.lastIndexOf(">");
  return fullType.slice(leftIndex + 1, rightIndex).split(",");
}

export function getRaffleEpoch(timestamp: number): number {
  if (timestamp < START_TIME) {
    return 0;
  } else {
    return Math.floor((timestamp - START_TIME) / RAFFLE_PERIOD);
  }
}
