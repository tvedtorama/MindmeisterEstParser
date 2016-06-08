import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import * as _ from 'lodash'

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
    const { title, estimate, calculatedEstimate, children } = this.props
    const gotEstimate = !_.isUndefined(estimate)
    return (
      <div>
        <div className="node-data">
          <div className="title">{title + " "}</div>
          <div className={gotEstimate ? "got-estimate" : ""}>{"{e: " + calculatedEstimate + "} " }</div>
          {gotEstimate ? <button onClick={this.handleIncrementClick}>+</button> : null}
        </div>
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
