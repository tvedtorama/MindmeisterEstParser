import { INCREMENT, TOGGLE_CHILDREN, FILTER } from '../actions'

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
      case TOGGLE_CHILDREN:
      return [{key: nodeId, newState: Object.assign({}, state, {
        hideChildren: !state.hideChildren
      }), updateMode: updateNone }]
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

function createNewState(state, update) {
  return Object.assign({}, state, 
    _.fromPairs(update.map(x => [x.key, x.newState]))
  )
}

export default function (state = {}, action) {
  if (action.type === FILTER) {
    let update = _.toPairs(state).map(x => ({key: x[0], curState: x[1]})).
      map(x => ({pair: x, correct: (x.curState.calculatedPriority <= action.maxPri) === (x.curState.exclude ? false : true)})).
      filter(x => !x.correct).
      map(x => ({key: x.pair.key, newState: Object.assign({}, x.pair.curState, {
        exclude: !x.pair.curState.exclude
      })}))

      return createNewState(state, update)
  }

  const { nodeId } = action
  if (typeof nodeId === 'undefined') {
    return state
  }

  let update = node(state[nodeId], action, nodeId)
  if (update.length === 0)
    return state

  let newState = createNewState(state, update)

  if (update.filter(x => x.updateMode != updateNone).length === 0)
    return newState

//  let theUpdate = update[0]
  let recalculatedItems = iterateUp(newState[nodeId]).map(x => ({key: x.id, newState: State.calculateAutoProps(x, newState)}))

  return Object.assign({}, newState, 
    _.fromPairs(recalculatedItems.map(x => [x.key, x.newState]))
  )
}
