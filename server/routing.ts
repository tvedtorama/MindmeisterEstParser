/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/express-jwt/express-jwt.d.ts" />

import * as express from 'express'
import * as jwt from 'express-jwt'

var router = express.Router()

router.use("/$", (req, res) => {
	res.render('home', { lang: "en", title: "hei", html: "<span>hei</span>", initialState: JSON.stringify({cool: true}) })
});

export {router}