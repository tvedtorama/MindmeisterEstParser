/// <reference path="../typings/node/node.d.ts" />

namespace Contracts {

	export interface MindmeisterData {
		rsp: {
			ideas: [{ id: string, title: string, parentId?: string }]
		}
	}

	export interface IXmlConverter {
		convert(str: string | Buffer): Promise<MindmeisterData>
	}

}