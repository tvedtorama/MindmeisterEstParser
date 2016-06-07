/// <reference path="./IXmlConverter.ts" />
/// <reference path="../app/contracts/RawData.ts" />


namespace Contracts {

	export interface IInfoCollector {
		collect(data: MindmeisterData) : RawData
	}
}
