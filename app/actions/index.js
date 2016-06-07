export const INCREMENT = 'INCREMENT'

export function increment(nodeId) {
  return {
    type: INCREMENT,
    nodeId
  }
}
