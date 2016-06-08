namespace Contracts {
	
	export interface StateItem {
		estimate?: number
		risk?: number
		sprint?: string
		priority?: number

		calculatedEstimate?: number
		calculatedPriority?: number
		calculatedSprint?: string

		exclude?: boolean
		hideChildren?: boolean

		item: Contracts.RawData
	}
}