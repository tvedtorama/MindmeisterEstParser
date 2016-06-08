/// <reference path="./IMindmeisterApi.ts" />
/// <reference path="../typings/md5/md5.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />
/// <reference path="../typings/request/request.d.ts" />


import * as _ from 'lodash'
import * as request from 'request'

// import * as md5 from 'md5'
import md5 = require('md5') // Crap! had to use this weird syntax, due to the export syntax in the module...

export class MindmeisterApi implements Mindmeister.IApi {
	downloadMap(mapId: string, authData: Mindmeister.IAuthData) : Promise<string> {
		
		let args = {api_key: authData.apiKey, auth_token: authData.authToken, map_id: mapId, method: 'mm.maps.getMap', response_format: 'xml'}

		let str = _.toPairs(args).reduce((acc, val) => acc + val[0] + val[1], "")
		let md5Hash = md5(authData.secretKey + str)
		let signedArgs = Object.assign({}, args, {api_sig: md5Hash})
		let argsStr = _.toPairs(signedArgs).reduce((acc, val) => acc + (acc.length ? "&" : "") + val[0] + "=" + val[1], "")

		return new Promise((accept, reject) => {
			let result = request.get("https://www.mindmeister.com/services/rest?" + argsStr, (err, res, body) => {
				if (err) {
					console.error("error: " + err)
					reject(err)
				}
				else
					accept(body)
			})
		})
	}
}