/// <reference path="./contracts/RawData.ts" />
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

	private _generateState(rawData: Contracts.RawData, state: Array<any>) : Array<any> {
		state[rawData.id] = {estimate: rawData.estimate, priority: rawData.priority, risk: rawData.risk, sprint: rawData.sprint}
		_(rawData.children).each(x => this._generateState(x, state))
		return state
	}

	generateState() : Array<any> {
		return this._generateState(this.rawData, [])
	}
}