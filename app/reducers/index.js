import { INCREMENT } from '../actions'


function node(state, action) {
  switch (action.type) {
    case INCREMENT:
      return Object.assign({}, state, {
        estimate: state.estimate + 1
      })
    default:
      return state
  }
}

export default function (state = {}, action) {
  const { nodeId } = action
  if (typeof nodeId === 'undefined') {
    return state
  }

  return Object.assign({}, state, {
    [nodeId]: node(state[nodeId], action)
  })
}
