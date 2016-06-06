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

describe("Hei", () => {
	it("should", () => {
/*		let x2js = new X2JSFactory();

		console.log(x2js)

		let xmlStr = "<item><subItem>text</subItem><subItem>habla!</subItem></item>"
		let node = x2js.parseXml(xmlStr)
		let json = x2js.xml2json<any>(node)

		console.log(json.item) */
/*		let x = new DOMParser()
		let result = x.parseFromString("<item><subItem>text</subItem><subItem>habla!</subItem></item>", "application/xml")

 		console.log(result) */

/*		let x = parseString("<item><subItem>text</subItem><subItem>habla!</subItem></item>", (err, result) => {
			console.dir(result)
		}) */

		let xml = new XmlConverter()

		let convPromise = xml.convert("<item><subItem><a>text</a></subItem><subItem><b>habla!</b></subItem></item>")
		convPromise.then(x => console.dir(x))
		let result = convPromise.then(res => {
			res.should.have.property("item")
			res.item.subItem.should.be.instanceof(Array)
			res.item.subItem[0].a[0].should.equal("text")
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
		})).then((res : any) => {
			res.should.have.property("rsp")
			res.rsp.ideas.length.should.equal(1)
			res.rsp.ideas[0].idea.length.should.equal(32)
			return Promise.resolve("it worked")
		}).should.eventually.equal("it worked")
	})
})