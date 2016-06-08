/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/express-jwt/express-jwt.d.ts" />

import * as express from 'express'
import * as jwt from 'express-jwt'
import * as fs from 'fs'

import {Factory} from './Factory'

var router = express.Router()

router.use("/:mapId/:authToken", (req, res) => {
	let mindMeister = Factory.getMindmeisterApi()
	mindMeister.downloadMap(req.params.mapId, Factory.getMindmeisterSecurityData(req)).then(x => {
		let xmlConverter = Factory.getXmlConverter()
		return xmlConverter.convert(x)
	}).then(result => {
		let collector = Factory.getInfoCollector()
		let initialState = collector.collect(result)
		res.render('home', { lang: "en", title: "hei", html: "<span>hei</span>", initialState: JSON.stringify(initialState) })
	})
})

router.use("/$", (req, res) => {

	let xmlConverter = Factory.getXmlConverter()
	fs.readFile("./sampleMindmeister.xml", (err, data) => {
		xmlConverter.convert(data).then(result => {
			let collector = Factory.getInfoCollector()
			let initialState = collector.collect(result)
			res.render('home', { lang: "en", title: "hei", html: "<span>hei</span>", initialState: JSON.stringify(initialState) })
		}).catch(err => {
			res.render('error', { lang: "en", title: "error", html: `<span>${err}</span>`, initialState: JSON.stringify({ cool: true }) })
		})
	})
});

export {router}