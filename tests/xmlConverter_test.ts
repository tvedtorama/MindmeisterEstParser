/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/chai-as-promised/chai-as-promised.d.ts" />
/// <reference path="../node_modules/typemoq/typemoq.node.d.ts" />
/// <reference path="../typings/node/node.d.ts" />

import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import {Mock, It, Times} from 'typemoq'
import * as fs from 'fs'

import {XmlConverter} from '../server/xmlConverter'

chai.use(chaiAsPromised)
chai.should()

describe("The xml converter", () => {
	it("should deal with inline xml", () => {
		let xml = new XmlConverter()

		let convPromise = xml.convert("<rsp><ideas><idea><id>abc</id><title>text</title></idea></ideas></rsp>")
		let result = convPromise.then(res => {
			res.should.have.property("rsp")
			res.rsp.ideas.should.be.instanceof(Array)
			res.rsp.ideas.length.should.equal(1)
			res.rsp.ideas[0].should.have.property("title")
			res.rsp.ideas[0].title.should.equal("text")
			res.rsp.ideas[0].parentId.should.equal("")
			res.rsp.ideas[0].id.should.equal("abc")
			return Promise.resolve("it worked")
		})
		return result.should.eventually.equal("it worked")
	})

	it("should load a real file", () => {
		return new Promise((resolve, reject) => fs.readFile("./tests/sampleMindmeister.xml", (err, data) => {
			if (err) {
				reject(err)
				return
			}

			let xml = new XmlConverter();
			let convPromise = xml.convert(data)

			let result = convPromise.then(res => {
				resolve(res)
			})
			convPromise.catch(err => {
				reject(err)
			})
		})).then((res: Contracts.MindmeisterData) => {
			res.should.have.property("rsp")
			res.rsp.ideas.length.should.equal(32)
			res.rsp.ideas[0].id.should.equal("711134826")
			res.rsp.ideas[0].title.should.equal("Root")
			return Promise.resolve("it worked")
		}).should.eventually.equal("it worked")
	})
})