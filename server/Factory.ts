/// <reference path="../typings/express/express.d.ts" />
/// <reference path="./IMindmeisterApi.ts" />


import {InfoCollector} from './InfoCollector'
import {XmlConverter} from './XmlConverter'
import {MindmeisterApi} from './MindmeisterApi'

import * as Express from 'express'

export class Factory {
	static getInfoCollector() : Contracts.IInfoCollector {
		return new InfoCollector();
	}
	static getXmlConverter() : Contracts.IXmlConverter {
		return new XmlConverter();
	}

	static getMindmeisterSecurityData(req: Express.Request) {
		return <Mindmeister.IAuthData>{apiKey: process.env.API_KEY, authToken: req.params.authToken, secretKey: process.env.SECRET_KEY}
	}

	static getMindmeisterApi() : Mindmeister.IApi {
		return new MindmeisterApi()
	}
}
