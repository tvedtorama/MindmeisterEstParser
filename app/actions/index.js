export const INCREMENT = 'INCREMENT'
export const TOGGLE_CHILDREN = 'TOGGLE_CHILDREN'

export function increment(nodeId, amount) {
  return {
    type: INCREMENT,
    nodeId,
    amount
  }
}

export function toggleChildren(nodeId) {
	return {
		type: TOGGLE_CHILDREN,
		nodeId
	}
}