/// <reference path="./IXmlConverter.ts" />
/// <reference path="../typings/xml2js/xml2js.d.ts" />

import {parseString} from 'xml2js'
import * as _ from 'lodash'

export class XmlConverter implements Contracts.IXmlConverter {
	convert(str: string | Buffer) : Promise<Contracts.MindmeisterData> {
		return new Promise<Contracts.MindmeisterData>((resolve, reject) => {
			parseString(str.toString(), (err, res) => {
				if (err)
					reject(err)
				else {
					if (_.isArray(res.rsp.err)) {
						reject(new Error(res.rsp.err[0].$.msg))
					} else {
						let convRes = <Contracts.MindmeisterData>{ rsp: { 
							ideas: res.rsp.ideas[0].idea.map(x => ({
							 id: x.id[0].toString(), 
							 title: x.title[0].toString(),
							 parentId: (x.parent || "").toString()
							})) } }
						resolve(convRes)
					}
				}
			})
		});
	}
}