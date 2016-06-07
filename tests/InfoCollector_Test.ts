/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/chai-as-promised/chai-as-promised.d.ts" />
/// <reference path="../node_modules/typemoq/typemoq.node.d.ts" />
/// <reference path="../typings/node/node.d.ts" />



import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import {Mock, It, Times} from 'typemoq'
import * as fs from 'fs'

chai.use(chaiAsPromised)
chai.should()

import {InfoCollector} from '../server/InfoCollector'

describe("InfoCollector", () => {
	it("should convert to hierarchy", () => {
		let sample = <Contracts.MindmeisterData>{rsp: {ideas: [
			{id: "hei", title: "hallo" },
			{id: "hallo", parentId: "hei", title: "heizenn"},
		]}}

		let subject = new InfoCollector()

		let rawDataNode = subject.collect(sample)

		rawDataNode.children.should.be.instanceof(Array)
		rawDataNode.children.should.have.lengthOf(1)
		rawDataNode.children[0].title.should.equal("heizenn")
		// rawDataNode.children[0].parent.id.should.equal("hei") Parent not set up serverside
	})

	it("should apply data from property nodes", () => {
		let sample = <Contracts.MindmeisterData>{
			rsp: {
				ideas: [
					{ id: "hei", title: "hallo" },
					{ id: "hallo", parentId: "hei", title: "heizenn" },
					{ id: "prop", parentId: "hallo", title: "{e:200.5 s:the_huge}" },
					{ id: "hallo2", parentId: "hei", title: "heizenn2" },
					{ id: "prop2", parentId: "hallo2", title: "{r:20 e:  10.2}}" },
				]
			}
		}

		let subject = new InfoCollector()

		let rawDataNode = subject.collect(sample)

		rawDataNode.children[0].title.should.equal("heizenn")
		rawDataNode.children[0].estimate.should.equal(200.5)
		rawDataNode.children[0].sprint.should.equal("the_huge")
		rawDataNode.children[1].title.should.equal("heizenn2")
		rawDataNode.children[1].estimate.should.equal(10.2)
		rawDataNode.children[1].risk.should.equal(20)
	})

	it("should accept data in the middle of the tree", () => {
		let sample = <Contracts.MindmeisterData>{
			rsp: {
				ideas: [
					{ id: "hei", title: "hallo" },
					{ id: "child", parentId: "hei", title: "heizenn" },
					{ id: "prop", parentId: "child", title: "{e:200.5 s:the_huge}" },
					{ id: "childchild", parentId: "child", title: "heizenn2" },
					{ id: "prop2", parentId: "childchild", title: "{r:20 e:  10.2}}" },
				]
			}
		}

		let subject = new InfoCollector()

		let rawDataNode = subject.collect(sample)

		rawDataNode.children[0].title.should.equal("heizenn")
		rawDataNode.children[0].children[0].title.should.equal("heizenn2")
		rawDataNode.children[0].estimate.should.equal(200.5)
		rawDataNode.children[0].sprint.should.equal("the_huge")
		rawDataNode.children[0].children[0].estimate.should.equal(10.2)
		rawDataNode.children[0].children[0].risk.should.equal(20)
	})
})