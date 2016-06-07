import {InfoCollector} from './InfoCollector'
import {XmlConverter} from './XmlConverter'

export class Factory {
	static getInfoCollector() : Contracts.IInfoCollector {
		return new InfoCollector();
	}
	static getXmlConverter() : Contracts.IXmlConverter {
		return new XmlConverter();
	}
}
