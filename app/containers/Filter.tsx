
/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-redux/react-redux.d.ts" />

import * as React from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'

interface Props {
	filter: (maxPri: number) => void
}

class Filter extends React.Component<any, any> {
	constructor(props) {
		super(props)

		this.state = {value: 1}
	}

	onChange(e: React.FormEvent) {
		this.setState({ value: (e.target as any).value })
	}

	render() {
		return (<div>
			<span>enter max pri: </span>
			<input value={this.state.value} onChange={e => this.onChange(e)} />
			<button onClick={x => this.props.filter(this.state.value)}>filter</button>
		</div>)
	}
}

function mapStateToProps(state, ownProps) {
	return { }
}

const ConnectedNode = connect(mapStateToProps, actions as any)(Filter)
export default ConnectedNode
