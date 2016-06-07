/// <reference path="./contracts/RawData.ts" />
/// <reference path="./contracts/StateItem.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />

import * as _ from 'lodash'

export class State {
	constructor(public rawData: Contracts.RawData) {

	}

/*	private _getItem(rawData: Contracts.RawData, id: string) : Contracts.RawData {
		if (rawData.id === id) {
			return rawData
		}
		return _(rawData.children).map(x => this._getItem(x, id)).filter(x => !_.isUndefined(x)).take(1).value()[0]
	}

	getItem(id: string) {
		return this._getItem(this.rawData, id)
	} */

	private _generateState(rawData: Contracts.RawData, state: { [index: string]: Contracts.StateItem }): { [index: string]: Contracts.StateItem } {
		state[rawData.id] = <Contracts.StateItem>{estimate: rawData.estimate, priority: rawData.priority, risk: rawData.risk, sprint: rawData.sprint}
		_(rawData.children).each(x => {
			this._generateState(x, state)
			x.parent = rawData
		})
		return state
	}


	generateStateAndApplyParent() : {[index: string] : Contracts.StateItem} {
		return this._generateState(this.rawData, {})
	}

	static generateAutoPropsRecursive(rawData: Contracts.RawData, state: { [index: string]: Contracts.StateItem }) {
		state[rawData.id] = State.calculateAutoProps(rawData, state)
		_(rawData.children).each(x => State.generateAutoPropsRecursive(x, state))
	}

	private static _findItems<T>(rawData: Contracts.RawData, state: { [index: string]: Contracts.StateItem }, up: boolean, propSelector: (a: Contracts.StateItem) => T) : Array<T> {
		let searchItems = up ? (_.isUndefined(rawData.parent) ? [] : [rawData.parent]) : rawData.children
		let searchResult = _.flatten(searchItems.map(x => this._findItems(x, state, up, propSelector)))
		let myValue = propSelector(state[rawData.id])
		let myResult = !_.isUndefined(myValue)
		return _.flatten([searchResult, myResult ? [myValue] : []])
	}

	static calculateAutoProps(rawData: Contracts.RawData, state: {[index: string] : Contracts.StateItem}) : Contracts.StateItem {
		let calculatedEstimate = State._findItems(rawData, state, false, x => x.estimate).reduce((acc, val) => acc + val, 0)
		let calculatedPriority = State._findItems(rawData, state, true, x => x.priority).reduce((acc, val) => val, 1)
		let calculatedSprint = State._findItems(rawData, state, true, x => x.sprint).reduce((acc, val) => val, "")
		return Object.assign({ calculatedEstimate, calculatedSprint, calculatedPriority }, state[rawData.id])
	}
}