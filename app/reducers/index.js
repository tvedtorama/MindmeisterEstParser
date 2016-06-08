import { INCREMENT } from '../actions'

import * as _ from 'lodash'

import {State} from '../State'

const updateUp = "UP"
const updateDown = "DOWN"
const updateNone = "NONE"

function node(state, action, nodeId) {
  switch (action.type) {
    case INCREMENT:
      return [{key: nodeId, newState: Object.assign({}, state, {
        estimate: Math.max(state.estimate + action.amount, 0)
      }), updateMode: updateUp }]
    default:
      return []
  }
}

function iterateUp(node) {
  let parent = node.item
  let retVal = []
  while (parent) {
    retVal.push(parent)
    parent = parent.parent
  }
  return retVal
} 

export default function (state = {}, action) {
  const { nodeId } = action
  if (typeof nodeId === 'undefined') {
    return state
  }

  let update = node(state[nodeId], action, nodeId)
  if (update.length === 0)
    return state

  let newState = Object.assign({}, state, 
    _.fromPairs(update.map(x => [x.key, x.newState]))
  )

  if (update.filter(x => x.updateMode != updateNone).length === 0)
    return newState

//  let theUpdate = update[0]
  let recalculatedItems = iterateUp(newState[nodeId]).map(x => ({key: x.id, newState: State.calculateAutoProps(x, newState)}))

  return Object.assign({}, newState, 
    _.fromPairs(recalculatedItems.map(x => [x.key, x.newState]))
  )
}
