/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/express-jwt/express-jwt.d.ts" />

import * as express from 'express'
import * as jwt from 'express-jwt'
import * as fs from 'fs'

import {Factory} from './Factory'

var router = express.Router()

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