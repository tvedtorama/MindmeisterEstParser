/// <reference path="./IXmlConverter.ts" />


namespace Contracts {
	export interface RawData {
		id: string
		title: string
		dataId: string
		parent: RawData
		children: Array<RawData>
		estimate?: number
		priority?: number
		risk?: number
		sprint?: string
	}

	export interface IInfoCollector {
		collect(data: MindmeisterData)
	}
}
