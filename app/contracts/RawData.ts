namespace Contracts {
	export interface RawData {
		id: string
		title?: string
		dataId?: string
		parent?: RawData  // Can't be used when serializing, creates circular reference.
		children: Array<RawData>
		estimate?: number
		priority?: number
		risk?: number
		sprint?: string
	}
}