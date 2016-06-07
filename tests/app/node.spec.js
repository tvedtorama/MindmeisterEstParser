import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import ConnectedNode, { Node } from '../../app/containers/Node'

function setup(id, counter, childIds, parentId) {
  const actions = {
    increment: expect.createSpy(),
  }

  const eventArgs = {
    preventDefault: expect.createSpy()
  }

  const component = shallow(
    <Node item={{id}} calculatedEstimate={counter} parentId={parentId} children={childIds} {...actions} />
  )

  return {
    component: component,
    button: component.find('button'),
    childNodes: component.find(ConnectedNode),
    actions: actions,
    eventArgs: eventArgs
  }
}

describe('Node component', () => {
  it('should display counter', () => {
    const { component } = setup(1, 23, [])
    expect(component.text()).toMatch(/e: 23/)
  })

  it('should call increment on button click', () => {
    const { button, actions } = setup(1, 23, [])
    button.simulate('click')

    expect(actions.increment).toHaveBeenCalledWith(1)
  })



  describe('when given childIds', () => {
    it('should render child nodes', () => {
      const { childNodes } = setup(1, 23, [{id: 2} ,{id: 3}  ])
      expect(childNodes.length).toEqual(2)
    })
  })

})
