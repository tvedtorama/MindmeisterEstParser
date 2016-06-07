/// <reference path="./IInfoCollector.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />

import * as _ from 'lodash'

const regexes = { 
	sprint: /{.*(?:s:\s*(\w+)).*}/, 
	estimate: /{.*(?:e:\s*((?:\d|\.)+)).*}/,
	priority: /{.*(?:p:\s*((?:\d|\.)+)).*}/,
	risk: /{.*(?:r:\s*((?:\d|\.)+)).*}/,
}

export class InfoCollector implements Contracts.IInfoCollector {

	private findPropertyChildren(children: Contracts.RawData[]) : {filteredList: Contracts.RawData[], properties: {}} {
		// Look at children and determine which are holding properties, accumulate these and return the rest unchanged.
		let items = children.map(x => ({ x: x, properties: _.toPairs(regexes).
			map(p => ({key: p[0], res: p[1].exec(x.title) })).
			map(p => ({key: p.key, res: p.res, success: _.isArray(p.res)})).
			filter(p => p.success).
			map(p => ({key: p.key, value: p.key === "sprint" ? p.res[1] : parseFloat(p.res[1]) })) }))

		return {
			filteredList: items.filter(x => x.properties.length === 0).map(x => x.x),
			properties: _.fromPairs(_.flatten(items.map(x => x.properties.map(p => ({k: p.key, v: p.value})))).map(p => [p.k, p.v]))
		}
	}

	private cloneItem(src : any, parent: Contracts.RawData, data: Contracts.MindmeisterData) : Contracts.RawData {
		let newItem = <Contracts.RawData>Object.assign({}, src)
		let childItems = this.findChildItems(newItem, data)
		let filterData = this.findPropertyChildren(childItems)
		let mangledNewItem = <Contracts.RawData>Object.assign(newItem, 
			Object.assign({children:filterData.filteredList}, filterData.properties))
		return newItem
	}

	private findChildItems(parent: Contracts.RawData, data: Contracts.MindmeisterData) : Contracts.RawData[] {
		return data.rsp.ideas.filter(x => x.parentId === parent.id).map(x => this.cloneItem(x, parent, data))
	}

	collect(data: Contracts.MindmeisterData): Contracts.RawData {
		return this.cloneItem(data.rsp.ideas[0], null, data)
	}
}