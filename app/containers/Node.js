import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

export class Node extends Component {
  constructor(props) {
    super(props)
    this.handleIncrementClick = this.handleIncrementClick.bind(this)
    this.renderChild = this.renderChild.bind(this)
  }

  handleIncrementClick() {
    const { increment, item } = this.props
    increment(item.id)
  }

  renderChild(child) {
    return (
      <li key={child.id}>
        <ConnectedNode item={child} />
      </li>
    )
  }

  render() {
    const { title, estimate, children } = this.props
    return (
      <div>
        {title + " "}
        {"{e: " + estimate + "}" }
        {' '}
        <button onClick={this.handleIncrementClick}>
          +
        </button>
        {' '}
        <ul>
          {children.map(this.renderChild)}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {children: ownProps.item.children, title: ownProps.item.title, ...state[ownProps.item.id]}
}

const ConnectedNode = connect(mapStateToProps, actions)(Node)
export default ConnectedNode
