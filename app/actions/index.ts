export const INCREMENT = 'INCREMENT'
export const TOGGLE_CHILDREN = 'TOGGLE_CHILDREN'
export const FILTER = 'FILTER'

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

export function filter(maxPri) {
	return {
		type: FILTER,
		maxPri
	}
}
