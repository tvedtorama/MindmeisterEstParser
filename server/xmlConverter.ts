/// <reference path="./IXmlConverter.ts" />
/// <reference path="../typings/xml2js/xml2js.d.ts" />

import {parseString} from 'xml2js'

export class XmlConverter implements Contracts.IXmlConverter {
	convert(str: string | Buffer) : Promise<Contracts.MindmeisterData> {
		return new Promise<Contracts.MindmeisterData>((resolve, reject) => {
			parseString(str.toString(), (err, res) => {
				if (err)
					reject(err)
				else {
					let convRes = <Contracts.MindmeisterData>{ rsp: { 
						ideas: res.rsp.ideas[0].idea.map(x => ({
						 id: x.id[0].toString(), 
						 title: x.title[0].toString(),
						 parentId: (x.parent || "").toString()
						})) } }
					resolve(convRes)
				}
			})
		});
	}
}