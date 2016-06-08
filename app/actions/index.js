export const INCREMENT = 'INCREMENT'
export function increment(nodeId, amount) {
  return {
    type: INCREMENT,
    nodeId,
    amount
  }
}
