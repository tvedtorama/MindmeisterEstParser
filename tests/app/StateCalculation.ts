/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
/// <reference path="../../typings/chai-as-promised/chai-as-promised.d.ts" />
/// <reference path="../../node_modules/typemoq/typemoq.node.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />

import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import {Mock, It, Times} from 'typemoq'

chai.use(chaiAsPromised)
chai.should()

import {State} from '../../app/State'

describe("State calculation", () => {
	let rd = <Contracts.RawData>{
		id: "1", children: [
			{
				id: "11", priority: 2, sprint: "hei_du", children: [
					{ id: "111", estimate: 23, children: [] },
					{ id: "112", estimate: 12.2, children: [] }
				]
			}
		]
	}

	let state: { [index: string]: Contracts.StateItem } = new State(rd).generateStateAndApplyParent() // {"1": {}, "11": {}, "111": {estimate: 20}, "112": {estimate: 12.2}}

	it("should calculate all items correctly at root", () => {

		let itemState = State.calculateAutoProps(rd, state)

		itemState.should.have.property("calculatedEstimate")
		itemState.calculatedEstimate.should.equal(35.2)
		itemState.calculatedSprint.should.equal("")
		itemState.calculatedPriority.should.equal(1)
	})


	it("should calculate derived items correctly at leaf", () => {

		let itemState = State.calculateAutoProps(rd.children[0].children[0], state)

		itemState.should.have.property("calculatedEstimate")
		itemState.calculatedEstimate.should.equal(23)
		itemState.calculatedSprint.should.equal("hei_du")
		itemState.calculatedPriority.should.equal(2)
	})

	it("should calculate derived items correctly at center", () => {

		let itemState = State.calculateAutoProps(rd.children[0], state)

		itemState.should.have.property("calculatedEstimate")
		itemState.calculatedEstimate.should.equal(35.2)
		itemState.calculatedSprint.should.equal("hei_du")
		itemState.calculatedPriority.should.equal(2)
	})


})