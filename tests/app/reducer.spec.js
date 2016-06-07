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
      'node_0': {
        id: 'node_0',
        estimate: 0,
        childIds: []
      }
    }
    const action = increment('node_0')
    const stateAfter = {
      'node_0': {
        id: 'node_0',
        estimate: 1,
        childIds: []
      }
    }

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })
})
