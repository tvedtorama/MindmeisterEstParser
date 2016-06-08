import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import * as _ from 'lodash'

export class Node extends Component {
  constructor(props) {
    super(props)
    this.renderChild = this.renderChild.bind(this)
  }

  handleIncrementClick(amt) {
    const { increment, item } = this.props
    increment(item.id, amt)
  }

  handleToggleChildrenClick() {
    const { toggleChildren, item } = this.props
    toggleChildren(item.id)
  }

  renderChild(child) {
    return (
      <li key={child.id}>
        <ConnectedNode item={child} />
      </li>
    )
  }

  render() {
    const { title, estimate, priority, calculatedEstimate, calculatedPriority, children, hideChildren } = this.props
    const gotEstimate = !_.isUndefined(estimate)
    const gotPriority = !_.isUndefined(priority)    
    return (
      <div>
        <div className="node-data">
          <div className={"title priority_" + Math.floor(calculatedPriority)} onClick={e => this.handleToggleChildrenClick()} >{title + " " + (hideChildren && children.length ? "(+) " : "")}</div>
          <div className={gotEstimate ? "got-estimate" : ""}>{"{e:" + calculatedEstimate + "} " }</div>
          {gotEstimate ? [<button key="up" onClick={() => this.handleIncrementClick(1)}>+</button>, <button key="dn" onClick={e => this.handleIncrementClick(-1)}>-</button>] : null}
          <div className={gotPriority ? "got-priority" : ""}>{"{p:" + calculatedPriority + "}"}</div>
        </div>
        { 
          hideChildren ? null :
          <ul>
            {children.map(this.renderChild)}
          </ul>
        }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {children: ownProps.item.children, title: ownProps.item.title, ...state[ownProps.item.id]}
}

const ConnectedNode = connect(mapStateToProps, actions)(Node)
export default ConnectedNode
