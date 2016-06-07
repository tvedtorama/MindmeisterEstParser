import expect from 'expect'
import deepFreeze from 'deep-freeze'
import reducer from '../../app/reducers'
import { increment, createNode, deleteNode, addChild, removeChild } from '../../app/actions'

describe('reducer', () => {
  it('should provide the initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  it('should handle INCREMENT action', () => {
    const stateBefore = {
      'node_parent': {
        id: 'node_parent',
        calculatedEstimate: 200,
      },
      'node_0': {
        item: {parent: {id: 'node_parent', children: [{id: "node_0", children: []}]}, children: [], id: 'node_0'},
        id: 'node_0',
        estimate: 0,
      }
    }
    const action = increment('node_0')
    const stateAfter = {
      'node_parent': {
        id: 'node_parent',
        calculatedEstimate: 1,
        calculatedPriority: 1,
        calculatedSprint: "",
      },
      'node_0': {
        item: {parent: {id: 'node_parent', children: [{id: "node_0", children: []}]}, children: [], id: 'node_0'},
        id: 'node_0',
        estimate: 1,
        calculatedEstimate: 1,
        calculatedPriority: 1,
        calculatedSprint: "",
      }
    }

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })
})
