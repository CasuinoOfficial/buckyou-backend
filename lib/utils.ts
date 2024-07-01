// input: A<B, C, D<E>>
// output: [B, C, D<E>]
export function getFirstLayerGenerics(fullType: string): string[] {
  const leftIndex = fullType.indexOf("<");
  const rightIndex = fullType.lastIndexOf(">");
  return fullType.slice(leftIndex + 1, rightIndex).split(",");
}
