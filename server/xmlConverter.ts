/// <reference path="./IXmlConverter.d.ts" />
/// <reference path="../typings/xml2js/xml2js.d.ts" />

import {parseString} from 'xml2js'

export class XmlConverter implements IXmlConverter{
	convert(str: string | Buffer) : any {
		return new Promise((resolve, reject) => {
			parseString(str.toString(), (err, res) => {
				if (err)
					reject(err)
				else
					resolve(res)
			})
		});
	}
}